import { annotateParseError, checkRangesIntersect, getErrorRanges, simplifyRanges } from "./annotate-parse-error";
import { AntlrError, AntlrErrorRange } from "./antlr-error";
import { ParseError } from "./parse-error";

describe("annotate parse error", () => {
	it("should check ranges intersect", () => {
		// 0-1
		// 0-1
		expect(checkRangesIntersect({
			start: 0,
			end: 1
		}, {
			start: 0,
			end: 1
		})).toBe(true);

		// 0-1
		// 0---2
		expect(checkRangesIntersect({
			start: 0,
			end: 1
		}, {
			start: 0,
			end: 2
		})).toBe(true);

		// 0---2
		// 0-1
		expect(checkRangesIntersect({
			start: 0,
			end: 2
		}, {
			start: 0,
			end: 1
		})).toBe(true);

		//   1-2
		// 0---2
		expect(checkRangesIntersect({
			start: 1,
			end: 2
		}, {
			start: 0,
			end: 2
		})).toBe(true);

		// 0---2
		//   1-2
		expect(checkRangesIntersect({
			start: 0,
			end: 2
		}, {
			start: 1,
			end: 2
		})).toBe(true);

		// 0---2
		//   1---3
		expect(checkRangesIntersect({
			start: 0,
			end: 2
		}, {
			start: 1,
			end: 3
		})).toBe(true);

		//   1---3
		// 0---2
		expect(checkRangesIntersect({
			start: 1,
			end: 3
		}, {
			start: 0,
			end: 2
		})).toBe(true);

		// 0-1
		//   1-2
		expect(checkRangesIntersect({
			start: 0,
			end: 1
		}, {
			start: 1,
			end: 2
		})).toBe(true);

		//   1-2
		// 0-1
		expect(checkRangesIntersect({
			start: 1,
			end: 2
		}, {
			start: 0,
			end: 1
		})).toBe(true);

		// 0-1
		//     2-3
		expect(checkRangesIntersect({
			start: 0,
			end: 1
		}, {
			start: 2,
			end: 3
		})).toBe(false);

		//     2-3
		// 0-1
		expect(checkRangesIntersect({
			start: 2,
			end: 3
		}, {
			start: 0,
			end: 1
		})).toBe(false);
	});

	it("should simplify ranges", () => {
		// empty case
		expect(simplifyRanges([])).toEqual([]);

		// 0-1
		expect(simplifyRanges([{
			start: 0,
			end: 1
		}])).toEqual([{
			start: 0,
			end: 1
		}]);

		// 0-1
		// 0-1
		expect(simplifyRanges([{
			start: 0,
			end: 1
		}, {
			start: 0,
			end: 1
		}])).toEqual([{
			start: 0,
			end: 1
		}]);

		// 0-1
		// 0---2
		expect(simplifyRanges([{
			start: 0,
			end: 1
		}, {
			start: 0,
			end: 2
		}])).toEqual([{
			start: 0,
			end: 2
		}]);

		// 0---2
		// 0-1
		expect(simplifyRanges([{
			start: 0,
			end: 2
		}, {
			start: 0,
			end: 1
		}])).toEqual([{
			start: 0,
			end: 2
		}]);

		//   1-2
		// 0---2
		expect(simplifyRanges([{
			start: 1,
			end: 2
		}, {
			start: 0,
			end: 2
		}])).toEqual([{
			start: 0,
			end: 2
		}]);

		// 0---2
		//   1-2
		expect(simplifyRanges([{
			start: 0,
			end: 2
		}, {
			start: 1,
			end: 2
		}])).toEqual([{
			start: 0,
			end: 2
		}]);

		// 0---2
		//   1---3
		expect(simplifyRanges([{
			start: 0,
			end: 2
		}, {
			start: 1,
			end: 3
		}])).toEqual([{
			start: 0,
			end: 3
		}]);

		//   1---3
		// 0---2
		expect(simplifyRanges([{
			start: 1,
			end: 3
		}, {
			start: 0,
			end: 2
		}])).toEqual([{
			start: 0,
			end: 3
		}]);

		// 0-1
		//   1-2
		expect(simplifyRanges([{
			start: 0,
			end: 1
		}, {
			start: 1,
			end: 2
		}])).toEqual([{
			start: 0,
			end: 2
		}]);

		//   1-2
		// 0-1
		expect(simplifyRanges([{
			start: 1,
			end: 2
		}, {
			start: 0,
			end: 1
		}])).toEqual([{
			start: 0,
			end: 2
		}]);

		// 0-1
		//     2-3
		expect(simplifyRanges([{
			start: 0,
			end: 1
		}, {
			start: 2,
			end: 3
		}])).toEqual([{
			start: 0,
			end: 1
		}, {
			start: 2,
			end: 3
		}]);

		//     2-3
		// 0-1
		expect(simplifyRanges([{
			start: 2,
			end: 3
		}, {
			start: 0,
			end: 1
		}])).toEqual([{
			start: 2,
			end: 3
		}, {
			start: 0,
			end: 1
		}]);
	});

	it("should get error ranges", () => {
		expect(getErrorRanges("123456789\n123456789\n123456789", [
			antlrError({
				start: {
					row: 1,
					column: 0
				},
				end: {
					row: 1,
					column: 1
				}
			}),
			antlrError({
				start: {
					row: 2,
					column: 0
				},
				end: {
					row: 3,
					column: 2
				}
			})
		])).toEqual([{
			start: 0,
			end: 1
		}, {
			start: 10,
			end: 22
		}]);
	});

	it("should annotate the input", () => {
		const input = "123456789\n123456789\n123456789";

		expect(annotateParseError(parseError(input, [{
			start: {
				row: 1,
				column: 0
			},
			end: {
				row: 1,
				column: 0
			}
		}]))).toBe("->START<-123456789\n123456789\n123456789");

		expect(annotateParseError(parseError(input, [{
			start: {
				row: 3,
				column: 9
			},
			end: {
				row: 3,
				column: 9
			}
		}]))).toBe("123456789\n123456789\n123456789->EOL<-");

		expect(annotateParseError(parseError(input, [{
			start: {
				row: 2,
				column: 5
			},
			end: {
				row: 2,
				column: 5
			}
		}]))).toBe("123456789\n12345-><-6789\n123456789");

		expect(annotateParseError(parseError(input, [{
			start: {
				row: 1,
				column: 0
			},
			end: {
				row: 1,
				column: 9
			}
		}]))).toBe("->123456789<-\n123456789\n123456789");

		expect(annotateParseError(parseError(input, [{
			start: {
				row: 2,
				column: 4
			},
			end: {
				row: 3,
				column: 5
			}
		}]))).toBe("123456789\n1234->56789\n12345<-6789");

		expect(annotateParseError(parseError(input, [{
			start: {
				row: 1,
				column: 0
			},
			end: {
				row: 1,
				column: 9
			}
		}, {
			start: {
				row: 2,
				column: 4
			},
			end: {
				row: 3,
				column: 5
			}
		}]))).toBe("->123456789<-\n1234->56789\n12345<-6789");

		expect(annotateParseError(parseError(input, [{
			start: {
				row: 2,
				column: 4
			},
			end: {
				row: 3,
				column: 5
			}
		}, {
			start: {
				row: 1,
				column: 0
			},
			end: {
				row: 1,
				column: 9
			}
		}]))).toBe("->123456789<-\n1234->56789\n12345<-6789");
	});
});

function antlrError(range: AntlrErrorRange): AntlrError {
	return new AntlrError("Test Range", range);
}

function parseError(input: string, ranges: AntlrErrorRange[]): ParseError {
	return new ParseError("Test Ranges", input, ranges.map((range) => antlrError(range)));
}
