import { AntlrError } from "./antlr-error";
import { ParseError } from "./parse-error";

export interface Range {
	start: number;
	end: number;
}

export function annotateParseError(error: ParseError): string {
	const { input, errors } = error;

	const ranges = getErrorRanges(input, errors).sort((a, b) => {
		return a.start > b.start ? -1 : 1;
	});

	const chars = input.split("");
	ranges.forEach((range) => {
		if (range.start !== range.end) {
			chars.splice(range.end, 0, "<-");
			chars.splice(range.start, 0, "->");
		} else if (range.start === 0) {
			chars.unshift("->START<-");
		} else if (range.end === input.length) {
			chars.push("->EOL<-");
		} else {
			chars.splice(range.end, 0, "-><-");
		}
	});

	return chars.join("");
}

export function getErrorRanges(input: string, errors: AntlrError[]): Range[] {
	const lines = input.split("\n");

	// get the starting index of each line
	const lineIndices = lines.reduce((memo, line, i) => {
		memo[i + 1] = memo[i] + line.length + 1;
		return memo;
	}, [0] as number[]);

	// get the error ranges
	const ranges = errors.map((error) => {
		const start = lineIndices[error.range.start.row - 1] + error.range.start.column,
			end = lineIndices[error.range.end.row - 1] + error.range.end.column;
		return { start, end } as Range;
	});

	return simplifyRanges(ranges);
}

export function simplifyRanges(ranges: Range[]): Range[] {
	return ranges.reduce((memo, range) => {
		const intersect = memo.find((target) => checkRangesIntersect(range, target));

		if (intersect != null) {
			intersect.start = Math.min(intersect.start, range.start);
			intersect.end = Math.max(intersect.end, range.end);
		} else {
			memo.push({ ...range });
		}

		return memo;
	}, [] as Range[]);
}

export function checkRangesIntersect(range0: Range, range1: Range): boolean {
	return (range0.start <= range1.start && range1.start <= range0.end) ||
		(range0.start <= range1.end && range1.end <= range0.end) ||
		(range1.start <= range0.start && range0.start <= range1.end) ||
		(range1.start <= range0.end && range0.end <= range1.end);
}
