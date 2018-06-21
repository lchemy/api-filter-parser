export class ValueError<C extends ValueErrorCode> extends Error {
	constructor(public code: C, data: ValueErrorDataTypes[C]) {
		super(messages[code].call(undefined, data));
	}
}

export enum ValueErrorCode {
	ERR_UNEXPECTED_DEFAULT = "ERR_UNEXPECTED_DEFAULT",
	ERR_INVALID_RAW_FUNCTION = "ERR_INVALID_RAW_FUNCTION",
	ERR_UNEXPECTED_RAW_FUNCTION_AS_RAW = "ERR_UNEXPECTED_RAW_FUNCTION_AS_RAW",
	ERR_INVALID_RAW = "ERR_INVALID_RAW",
	ERR_UNEXPECTED_RAW_AS_RAW_FUNCTION = "ERR_UNEXPECTED_RAW_AS_RAW_FUNCTION",
	ERR_RAW_FUNCTION_FAILED = "ERR_RAW_FUNCTION_FAILED",
	ERR_INVALID_RAW_FUNCTION_OUTPUT = "ERR_INVALID_RAW_FUNCTION_OUTPUT",
	ERR_INVALID_FIELD = "ERR_INVALID_FIELD",
	ERR_FIELD_MAX_DEPTH_FAILED = "ERR_FIELD_MAX_DEPTH_FAILED",
	ERR_EXPECTED_SUBQUERY_FOR_PLUCKED_JOIN_MANY = "ERR_EXPECTED_SUBQUERY_FOR_PLUCKED_JOIN_MANY"
}

export interface ValueErrorDataTypes {
	[ValueErrorCode.ERR_UNEXPECTED_DEFAULT]: undefined;
	[ValueErrorCode.ERR_UNEXPECTED_RAW_FUNCTION_AS_RAW]: string;
	[ValueErrorCode.ERR_UNEXPECTED_RAW_AS_RAW_FUNCTION]: string;
	[ValueErrorCode.ERR_INVALID_RAW_FUNCTION]: string;
	[ValueErrorCode.ERR_INVALID_RAW]: string;
	[ValueErrorCode.ERR_RAW_FUNCTION_FAILED]: string;
	[ValueErrorCode.ERR_INVALID_RAW_FUNCTION_OUTPUT]: string;
	[ValueErrorCode.ERR_INVALID_FIELD]: string;
	[ValueErrorCode.ERR_FIELD_MAX_DEPTH_FAILED]: string;
	[ValueErrorCode.ERR_EXPECTED_SUBQUERY_FOR_PLUCKED_JOIN_MANY]: undefined;
}

const messages = {
	[ValueErrorCode.ERR_UNEXPECTED_DEFAULT]: () => "Unexpected call for value default result",
	[ValueErrorCode.ERR_UNEXPECTED_RAW_FUNCTION_AS_RAW]: (key) => `Unexpected raw function key ${ key } used as a raw key`,
	[ValueErrorCode.ERR_UNEXPECTED_RAW_AS_RAW_FUNCTION]: (key) => `Unexpected raw key ${ key } used as a raw function key`,
	[ValueErrorCode.ERR_INVALID_RAW_FUNCTION]: (key) => `Invalid raw function key ${ key }`,
	[ValueErrorCode.ERR_INVALID_RAW]: (key) => `Invalid raw key ${ key }`,
	[ValueErrorCode.ERR_RAW_FUNCTION_FAILED]: (key) => `Failed to evaluate raw function key ${ key }`,
	[ValueErrorCode.ERR_INVALID_RAW_FUNCTION_OUTPUT]: (key) => `Invalid output from raw function key ${ key }`,
	[ValueErrorCode.ERR_INVALID_FIELD]: (path) => `Invalid field ${ path }`,
	[ValueErrorCode.ERR_FIELD_MAX_DEPTH_FAILED]: (path) => `Failed to get field at ${ path }, exceeds max depth`,
	[ValueErrorCode.ERR_EXPECTED_SUBQUERY_FOR_PLUCKED_JOIN_MANY]: () => "Expected subquery target to be a plucked join many field"
} as {
	[C in ValueErrorCode]: (data: ValueErrorDataTypes[C]) => string;
};
