import { TerminalNode } from "@lchemy/antlr4ts/tree";

import { ApiFilterParser, RawValueContext, ValueContext } from "../codegen/ApiFilterParser";
import { $teachersOrm } from "../tests/mocks";

import { ValueVisitor } from "./value-visitor";

describe("value visitor", () => {
	it("should throw on raw $field with invalid subquery target", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ValueVisitor({ orm, subqueryTarget: orm.classes });

		const ctx = new RawValueContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "$field",
			type: ApiFilterParser.RAW
		} as any);
		ctx.addChild(node);

		expect(() => {
			visitor.visitRawValue(ctx);
		}).toThrow();
	});

	it("should throw on invalid raw key", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ValueVisitor({ orm });

		const ctx = new RawValueContext(ValueContext.emptyContext());
		const node = new TerminalNode({
			text: "$invalidRaw",
			type: ApiFilterParser.RAW
		} as any);
		ctx.addChild(node);

		expect(() => {
			visitor.visitRawValue(ctx);
		}).toThrow();
	});

	it("should throw when trying to access default result", async () => {
		const orm = await $teachersOrm["🜅"],
			visitor = new ValueVisitor({ orm });

		expect(() => {
			visitor.visitChildren({} as any);
		}).toThrow();
	});
});
