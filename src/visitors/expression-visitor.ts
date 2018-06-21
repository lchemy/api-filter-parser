import { AbstractParseTreeVisitor } from "@lchemy/antlr4ts/tree";
import {
	BetweenFilterNode,
	ColumnField,
	DerivedField,
	EqualFilterNode,
	Filter,
	GreaterThanEqualFilterNode,
	GreaterThanFilterNode,
	ILikeFilterNode,
	InFilterNode,
	IsNotNullFilterNode,
	IsNullFilterNode,
	JoinManyField,
	JoinOneField,
	LessThanEqualFilterNode,
	LessThanFilterNode,
	LikeFilterNode,
	NotBetweenFilterNode,
	NotEqualFilterNode,
	NotILikeFilterNode,
	NotInFilterNode,
	NotLikeFilterNode,
	PartitionedJoinManyField,
	PluckedJoinManyField,
	PluckedJoinOneField,
	WrappedRaw
} from "@lchemy/orm/models";

import {
	GroupingExpressionContext,
	NestedExpressionContext,
	OpBetweenExpressionContext,
	OpComparisonExpressionContext,
	OpExistsExpressionContext,
	OpHaveCountExpressionContext,
	OpInExpressionContext,
	OpLikeExpressionContext,
	OpNullCheckExpressionContext
} from "../codegen/ApiFilterParser";
import { ApiFilterVisitor } from "../codegen/ApiFilterVisitor";
import { ExpressionError, ExpressionErrorCode } from "../errors";

import { ValueType, ValueVisitor } from "./value-visitor";
import { VisitorContext } from "./visitor-context";

export class ExpressionVisitor extends AbstractParseTreeVisitor<Filter> implements ApiFilterVisitor<Filter> {
	private get valueVisitor(): ValueVisitor {
		if (this._valueVisitor == null) {
			this._valueVisitor = new ValueVisitor(this.context);
		}
		return this._valueVisitor;
	}
	private _valueVisitor!: ValueVisitor;

	constructor(private context: VisitorContext) {
		super();
	}

	visitGroupingExpression(ctx: GroupingExpressionContext): Filter {
		const group = ctx.grouping().text,
			[left, right] = ctx.expression().map((exprCtx) => exprCtx.accept(this));
		switch (group) {
			case "and":
				return left.and(right);
			case "or":
				return left.or(right);
			default:
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_GROUPING, group);
		}
	}

	visitOpNullCheckExpression(ctx: OpNullCheckExpressionContext): Filter {
		const op = ctx.OP_NULL_CHECK().text,
			value = toColumnValue(ctx.value().accept(this.valueVisitor));

		switch (op) {
			case "is null":
				return new IsNullFilterNode(value);
			case "is not null":
				return new IsNotNullFilterNode(value);
			default:
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
		}
	}

	visitOpComparisonExpression(ctx: OpComparisonExpressionContext): Filter {
		const op = ctx.OP_COMPARISON().text;

		const [left, right] = ctx.value().map((valueCtx) => {
			return toColumnValue(valueCtx.accept(this.valueVisitor));
		});

		switch (op) {
			case "eq":
				return new EqualFilterNode(left, right);
			case "neq":
				return new NotEqualFilterNode(left, right);
			case "gt":
				return new GreaterThanFilterNode(left, right);
			case "gte":
				return new GreaterThanEqualFilterNode(left, right);
			case "lt":
				return new LessThanFilterNode(left, right);
			case "lte":
				return new LessThanEqualFilterNode(left, right);
			default:
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
		}
	}

	visitOpLikeExpression(ctx: OpLikeExpressionContext): Filter {
		const op = ctx.OP_LIKE().text;

		const [left, right] = ctx.value().map((valueCtx) => {
			return toColumnValue(valueCtx.accept(this.valueVisitor));
		});

		switch (op) {
			case "like":
				return new LikeFilterNode(left, right);
			case "not like":
				return new NotLikeFilterNode(left, right);
			case "ilike":
				return new ILikeFilterNode(left, right);
			case "not ilike":
				return new NotILikeFilterNode(left, right);
			default:
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
		}
	}

	visitOpBetweenExpression(ctx: OpBetweenExpressionContext): Filter {
		const op = ctx.OP_BETWEEN().text;

		const [left, start, end] = ctx.value().map((valueCtx) => {
			return toColumnValue(valueCtx.accept(this.valueVisitor));
		});

		switch (op) {
			case "between":
				return new BetweenFilterNode(left, [start, end]);
			case "not between":
				return new NotBetweenFilterNode(left, [start, end]);
			default:
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
		}
	}

	visitOpInExpression(ctx: OpInExpressionContext): Filter {
		const op = ctx.OP_IN().text;

		const [left, ...values] = ctx.value().map((valueCtx) => {
			return toColumnValue(valueCtx.accept(this.valueVisitor));
		});

		switch (op) {
			case "in":
				return new InFilterNode(left, values);
			case "not in":
				return new NotInFilterNode(left, values);
			default:
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
		}
	}

	visitOpExistsExpression(ctx: OpExistsExpressionContext): Filter {
		const op = ctx.OP_EXISTS().text,
			left = ctx.value().accept(this.valueVisitor) as any,
			subqueryCtx = ctx.expression();

		if (isJoinOneField(left) || isPluckedJoinOneField(left)) {
			if (subqueryCtx != null) {
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_SUBQUERY_FOR_JOIN_ONE, op);
			}
			switch (op) {
				case "exists":
					return left.$exists();
				case "not exists":
					return left.$notExists();
				default:
					throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
			}
		}

		if (isJoinManyField(left) || isPartitionedJoinManyField(left) || isPluckedJoinManyField(left)) {
			const joinOrm = isJoinManyField(left) ? left["🜁"].join : left["🜁"].joinField["🜁"].join;

			const expressionVisitor = new ExpressionVisitor({
				orm: joinOrm,
				maxDepth: this.context.maxDepth,
				subqueryTarget: left
			});

			const subquery = subqueryCtx != null ? subqueryCtx.accept(expressionVisitor) : undefined;

			switch (op) {
				case "exists":
					return (left as any).$exists(subquery);
				case "not exists":
					return (left as any).$notExists(subquery);
				default:
					throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
			}
		}

		throw new ExpressionError(ExpressionErrorCode.ERR_EXPECTED_JOIN_FIELD, left);
	}

	visitOpHaveCountExpression(ctx: OpHaveCountExpressionContext): Filter {
		const op = ctx.OP_COMPARISON().text;

		const [left, rawRight] = ctx.value().map((valueCtx) => {
			return valueCtx.accept(this.valueVisitor) as any;
		});

		if (!isJoinManyField(left) && !isPartitionedJoinManyField(left) && !isPluckedJoinManyField(left)) {
			throw new ExpressionError(ExpressionErrorCode.ERR_EXPECTED_JOIN_MANY_FIELD, left);
		}

		const right = toColumnValue(rawRight);

		switch (op) {
			case "eq":
				return left.$haveCountEq(right);
			case "neq":
				return left.$haveCountNeq(right);
			case "gt":
				return left.$haveCountGt(right);
			case "gte":
				return left.$haveCountGte(right);
			case "lt":
				return left.$haveCountLt(right);
			case "lte":
				return left.$haveCountLte(right);
			default:
				throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR, op);
		}
	}

	visitNestedExpression(ctx: NestedExpressionContext): Filter {
		return ctx.expression().accept(this);
	}

	protected defaultResult(): Filter {
		throw new ExpressionError(ExpressionErrorCode.ERR_UNEXPECTED_DEFAULT, undefined);
	}
}

function toColumnValue(value: ValueType): number | boolean | string | ColumnField | DerivedField | WrappedRaw {
	if (
		typeof value === "boolean" ||
		typeof value === "number" ||
		typeof value === "string" ||
		value instanceof ColumnField ||
		value instanceof DerivedField ||
		value instanceof WrappedRaw
	) {
		return value;
	}
	if (isPluckedJoinOneField(value)) {
		return value["🜁"].pluckField;
	}
	throw new ExpressionError(ExpressionErrorCode.ERR_INVALID_VALUE, value);
}

function isJoinOneField(value: any): value is JoinOneField {
	return value instanceof JoinOneField;
}

function isPluckedJoinOneField(value: any): value is PluckedJoinOneField {
	return value instanceof PluckedJoinOneField;
}

function isJoinManyField(value: any): value is JoinManyField {
	return value instanceof JoinManyField;
}

function isPartitionedJoinManyField(value: any): value is PartitionedJoinManyField {
	return value instanceof PartitionedJoinManyField;
}

function isPluckedJoinManyField(value: any): value is PluckedJoinManyField {
	return value instanceof PluckedJoinManyField;
}
