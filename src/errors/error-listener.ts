import { ANTLRErrorListener, CommonToken, RecognitionException, Recognizer, Token } from "@lchemy/antlr4ts";

import { AntlrError } from "./antlr-error";

export class ErrorListener implements ANTLRErrorListener<CommonToken | number> {
	errors: AntlrError[] = [];

	syntaxError<T extends Token | number>(
		_0: Recognizer<T, any>,
		offendingSymbol: T | undefined,
		line: number,
		charPositionInLine: number,
		msg: string,
		_1: RecognitionException | undefined
	): void {
		const error = new AntlrError(msg, {
			start: {
				column: charPositionInLine,
				row: line
			},
			end: {
				column: charPositionInLine + 1,
				row: line
			}
		});

		if (offendingSymbol != null && typeof offendingSymbol === "object") {
			const { startIndex, stopIndex } = offendingSymbol as Token;
			error.range.end.column = charPositionInLine + stopIndex - startIndex + 1;
		}

		this.errors.push(error);
	}
}
