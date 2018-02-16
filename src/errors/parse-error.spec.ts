import { AntlrError } from "./antlr-error";
import { ParseError } from "./parse-error";

describe("", () => {
	it("should create annotated inputs", () => {
		const error = new ParseError("Test Error", "123456789", [
			new AntlrError("Test Error", {
				start: {
					row: 1,
					column: 0
				},
				end: {
					row: 1,
					column: 9
				}
			})
		]);

		expect(error.annotatedInput).toBe("->123456789<-");
	});

	// TODO: can this be done better?
	it("should cache the annotated inputs", () => {
		const error = new ParseError("Test Error", "123456789", [
			new AntlrError("Test Error", {
				start: {
					row: 1,
					column: 0
				},
				end: {
					row: 1,
					column: 9
				}
			})
		]);

		expect(error.annotatedInput).toBe("->123456789<-");
		expect(error.annotatedInput).toBe("->123456789<-");
	});
});
