import { TerminalNode } from "@lchemy/antlr4ts/tree";

import {
	ApiFilterParser,
	FieldValueContext,
	GroupingContext,
	GroupingExpressionContext,
	NumberValueContext,
	OpBetweenExpressionContext,
	OpComparisonExpressionContext,
	OpExistsExpressionContext,
	OpHaveCountExpressionContext,
	OpInExpressionContext,
	OpLikeExpressionContext,
	OpNullCheckExpressionContext,
	ValueContext
} from "../codegen/ApiFilterParser";
import { $teachersOrm } from "../tests/mocks";

import { ExpressionVisitor } from "./expression-visitor";

describe("expression visitor", () => {
	it("should throw on unexpected grouping", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const groupingCtx = new GroupingContext(undefined as any, undefined as any);
		const node = new TerminalNode({
			text: "invalid grouping"
		} as any);
		groupingCtx.addChild(node);

		const ctx = new GroupingExpressionContext(ValueContext.emptyContext());
		ctx.addChild(groupingCtx);

		expect(() => {
			visitor.visitGroupingExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected null check", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpNullCheckExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid null op",
			type: ApiFilterParser.OP_NULL_CHECK
		} as any);
		ctx.addChild(valueCtx(NumberValueContext, "1", ApiFilterParser.NUMBER));
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpNullCheckExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected comparison", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpComparisonExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid comparison op",
			type: ApiFilterParser.OP_COMPARISON
		} as any);
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpComparisonExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected like", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpLikeExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid like op",
			type: ApiFilterParser.OP_LIKE
		} as any);
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpLikeExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected between", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpBetweenExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid between op",
			type: ApiFilterParser.OP_BETWEEN
		} as any);
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpBetweenExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected in", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpInExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid in op",
			type: ApiFilterParser.OP_IN
		} as any);
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpInExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected join one exists", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpExistsExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid exists op",
			type: ApiFilterParser.OP_EXISTS
		} as any);
		ctx.addChild(valueCtx(FieldValueContext, "school", ApiFilterParser.FIELD));
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpExistsExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected join many exists", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpExistsExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid exists op",
			type: ApiFilterParser.OP_EXISTS
		} as any);
		ctx.addChild(valueCtx(FieldValueContext, "classes", ApiFilterParser.FIELD));
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpExistsExpression(ctx);
		}).toThrow();
	});

	it("should throw on invalid exists", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpExistsExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "exists",
			type: ApiFilterParser.OP_EXISTS
		} as any);
		ctx.addChild(valueCtx(FieldValueContext, "id", ApiFilterParser.FIELD));
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpExistsExpression(ctx);
		}).toThrow();
	});

	it("should throw on unexpected count", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpHaveCountExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid have count op",
			type: ApiFilterParser.OP_COMPARISON
		} as any);
		ctx.addChild(valueCtx(FieldValueContext, "classes", ApiFilterParser.FIELD));
		ctx.addChild(valueCtx(NumberValueContext, "1", ApiFilterParser.NUMBER));
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpHaveCountExpression(ctx);
		}).toThrow();
	});

	it("should throw on invalid count", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpHaveCountExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "invalid have count op",
			type: ApiFilterParser.OP_COMPARISON
		} as any);
		ctx.addChild(valueCtx(FieldValueContext, "id", ApiFilterParser.FIELD));
		ctx.addChild(valueCtx(NumberValueContext, "1", ApiFilterParser.NUMBER));
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpHaveCountExpression(ctx);
		}).toThrow();
	});

	it("should throw on invalid value", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		const ctx = new OpComparisonExpressionContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "eq",
			type: ApiFilterParser.OP_COMPARISON
		} as any);
		ctx.addChild(valueCtx(FieldValueContext, "classNames", ApiFilterParser.FIELD));
		ctx.addChild(node);

		expect(() => {
			visitor.visitOpComparisonExpression(ctx);
		}).toThrow();
	});

	it("should throw when trying to access default result", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ExpressionVisitor({ orm });

		expect(() => {
			visitor.visitChildren({} as any);
		}).toThrow();
	});
});

function valueCtx<T extends ValueContext>(ctor: new (ctx: ValueContext) => T, text: string, type: number): T {
	const ctx = new ctor(ValueContext.emptyContext());
	const node = new TerminalNode({ text, type } as any);
	ctx.addChild(node);
	return ctx;
}
