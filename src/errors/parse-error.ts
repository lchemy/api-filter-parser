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
		message: string | undefined,
		public input: string,
		public errors: AntlrError[]
	) {
		super(message);
	}
}
