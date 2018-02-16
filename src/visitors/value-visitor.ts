import { AbstractParseTreeVisitor } from "@lchemy/antlr4ts/tree";
import { raw } from "@lchemy/orm";
import { Field, Orm, PluckedJoinManyField, WrappedRaw } from "@lchemy/orm/models";

import {
	FieldValueContext,
	NumberValueContext,
	RawValueContext,
	StringValueContext
} from "../codegen/ApiFilterParser";
import { ApiFilterVisitor } from "../codegen/ApiFilterVisitor";

import { VisitorContext } from "./visitor-context";

export type ValueType = Field | WrappedRaw | number | string;
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

	visitFieldValue(ctx: FieldValueContext): Field {
		const path = ctx.FIELD()!.text;
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
			return (raw as any)[key];
		}

		throw new Error(`Unexpected raw key ${ key }`);
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
