export class ExpressionError<C extends ExpressionErrorCode> extends Error {
	constructor(public code: C, data: ExpressionErrorDataTypes[C]) {
		super(messages[code].call(undefined, data));
	}
}

export enum ExpressionErrorCode {
	ERR_UNEXPECTED_DEFAULT = "ERR_UNEXPECTED_DEFAULT",
	ERR_UNEXPECTED_GROUPING = "ERR_UNEXPECTED_GROUPING",
	ERR_UNEXPECTED_OPERATOR = "ERR_UNEXPECTED_OPERATOR",
	ERR_UNEXPECTED_SUBQUERY_FOR_JOIN_ONE = "ERR_UNEXPECTED_SUBQUERY_FOR_JOIN_ONE",
	ERR_EXPECTED_JOIN_FIELD = "ERR_EXPECTED_JOIN_FIELD",
	ERR_EXPECTED_JOIN_MANY_FIELD = "ERR_EXPECTED_JOIN_MANY_FIELD",
	ERR_INVALID_VALUE = "ERR_INVALID_VALUE"
}

export interface ExpressionErrorDataTypes {
	[ExpressionErrorCode.ERR_UNEXPECTED_DEFAULT]: undefined;
	[ExpressionErrorCode.ERR_UNEXPECTED_GROUPING]: string;
	[ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR]: string;
	[ExpressionErrorCode.ERR_UNEXPECTED_SUBQUERY_FOR_JOIN_ONE]: string;
	[ExpressionErrorCode.ERR_EXPECTED_JOIN_FIELD]: any;
	[ExpressionErrorCode.ERR_EXPECTED_JOIN_MANY_FIELD]: any;
	[ExpressionErrorCode.ERR_INVALID_VALUE]: any;
}

const messages = {
	[ExpressionErrorCode.ERR_UNEXPECTED_DEFAULT]: () => "Unexpected call for expression default result",
	[ExpressionErrorCode.ERR_UNEXPECTED_GROUPING]: (group) => `Unexpected grouping ${ group }`,
	[ExpressionErrorCode.ERR_UNEXPECTED_OPERATOR]: (op) => `Unexpected operator ${ op }`,
	[ExpressionErrorCode.ERR_UNEXPECTED_SUBQUERY_FOR_JOIN_ONE]: (op) => `Unexpected subquery with operator ${ op } for join one field`,
	[ExpressionErrorCode.ERR_EXPECTED_JOIN_FIELD]: (value) => `Expected ${ value } to be a join one field or a join many field`,
	[ExpressionErrorCode.ERR_EXPECTED_JOIN_MANY_FIELD]: (value) => `Expected ${ value } to be a join many field`,
	[ExpressionErrorCode.ERR_INVALID_VALUE]: (value) => `Expected ${ value } to be number, string, column field, derived field, or raw`
} as {
	[C in ExpressionErrorCode]: (data: ExpressionErrorDataTypes[C]) => string;
};
