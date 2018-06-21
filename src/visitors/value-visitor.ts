import { AbstractParseTreeVisitor } from "@lchemy/antlr4ts/tree";
import { raw } from "@lchemy/orm";
import { Field, Orm, PluckedJoinManyField, WrappedRaw } from "@lchemy/orm/models";

import {
	BooleanValueContext,
	FieldValueContext,
	NumberValueContext,
	RawFnContext,
	RawValueContext,
	StringValueContext
} from "../codegen/ApiFilterParser";
import { ApiFilterVisitor } from "../codegen/ApiFilterVisitor";

import { VisitorContext } from "./visitor-context";

export type ValueType = Field | WrappedRaw | boolean | number | string;
export class ValueVisitor extends AbstractParseTreeVisitor<ValueType> implements ApiFilterVisitor<ValueType> {
	constructor(private context: VisitorContext) {
		super();
	}

	visitStringValue(ctx: StringValueContext): string {
		const text = ctx.STRING().text;
		return text.substring(1, text.length - 1);
	}

	visitNumberValue(ctx: NumberValueContext): number {
		return Number(ctx.NUMBER().text);
	}

	visitFieldValue(ctx: FieldValueContext): Field | boolean {
		const path = ctx.FIELD()!.text;

		// handle boolean cases
		if (path === "true") {
			return true;
		}
		if (path === "false") {
			return false;
		}

		return this.getFieldWithPath(this.context.orm, path);
	}

	visitRawValue(ctx: RawValueContext): WrappedRaw | Field {
		const key = ctx.RAW().text.substr(1),
			subqueryTarget = this.context.subqueryTarget;
		if (key === "field") {
			if (!(subqueryTarget instanceof PluckedJoinManyField)) {
				throw new Error(`Expected subquery target to be a plucked join many field`);
			}
			return subqueryTarget["🜁"].pluckField;
		} else if (key.startsWith("parent") && this.context.orm.$parent != null && subqueryTarget != null) {
			// 7 because we want everything after "parent."
			const path = key.substr(7);
			return this.getFieldWithPath(this.context.orm.$parent, path);
		} else if (raw.hasOwnProperty(key)) {
			const rawValue = (raw as any)[key];
			if (typeof rawValue === "function") {
				throw new Error(`Unexpected raw function key ${ key } used as a raw key`);
			}
			return rawValue;
		}

		throw new Error(`Unexpected raw key ${ key }`);
	}

	visitRawFn(ctx: RawFnContext): WrappedRaw {
		const key = ctx.RAW().text.substr(1);

		if (raw.hasOwnProperty(key)) {
			const rawFn = (raw as any)[key] as (...args: any[]) => WrappedRaw;
			if (typeof rawFn !== "function") {
				throw new Error(`Unexpected raw key ${ key } used as a raw function key`);
			}

			const values = ctx.value().map((valueCtx) => valueCtx.accept(this));

			let rawValue: WrappedRaw;
			try {
				rawValue = rawFn(...values);
			} catch {
				throw new Error(`Failed to evaluate raw function key ${ key }`);
			}

			if (!(rawValue instanceof WrappedRaw)) {
				throw new Error(`Unexpected output from raw function key ${ key }`);
			}

			return rawValue;
		}

		throw new Error(`Unexpected raw function key ${ key }`);
	}

	protected defaultResult(): ValueType {
		throw new Error("Unexpected call for value default result");
	}

	private getFieldWithPath(orm: Orm, path: string): Field {
		const field = path.split(".").reduce<any>((memo, key) => {
			if (memo == null) {
				return undefined;
			}
			return memo[key];
		}, orm);

		if (!(field instanceof Field)) {
			throw new Error(`Invalid field ${ path }`);
		}

		if (this.context.maxDepth != null && field["🜁"].depth > this.context.maxDepth) {
			throw new Error(`Failed to get field at ${ path }, exceeds max depth`);
		}

		return field;
	}
}
