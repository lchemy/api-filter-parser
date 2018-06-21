import { annotateParseError } from "./annotate-parse-error";
import { AntlrError } from "./antlr-error";

export class ParseError extends Error {
	get annotatedInput(): string {
		if (this._annotatedInput == null) {
			this._annotatedInput = annotateParseError(this);
		}
		return this._annotatedInput;
	}
	private _annotatedInput!: string;

	constructor(
		code: ParseErrorCode,
		public input: string,
		public errors: AntlrError[]
	) {
		super(messages[code]);
	}
}

export enum ParseErrorCode {
	ERR_UNRECOGNIZED_CHARACTERS = "ERR_UNRECOGNIZED_CHARACTERS",
	ERR_INVALID_TOKENS = "ERR_INVALID_TOKENS"
}

const messages: Record<ParseErrorCode, string> = {
	[ParseErrorCode.ERR_UNRECOGNIZED_CHARACTERS]: "Failed to parse input due to unrecognized characters",
	[ParseErrorCode.ERR_INVALID_TOKENS]: "Failed to parse input due to invalid tokens"
};
