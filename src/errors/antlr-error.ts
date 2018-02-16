export interface AntlrErrorPosition {
	column: number;
	row: number;
}

export interface AntlrErrorRange {
	start: AntlrErrorPosition;
	end: AntlrErrorPosition;
}

export class AntlrError extends Error {
	constructor(message: string | undefined, public range: AntlrErrorRange) {
		super(message);
	}
}
