// Generated from ApiFilter.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from '@lchemy/antlr4ts/tree/ParseTreeListener'

import { OpNullCheckExpressionContext } from './ApiFilterParser';
import { GroupingExpressionContext } from './ApiFilterParser';
import { OpBetweenExpressionContext } from './ApiFilterParser';
import { NestedExpressionContext } from './ApiFilterParser';
import { OpInExpressionContext } from './ApiFilterParser';
import { OpHaveCountExpressionContext } from './ApiFilterParser';
import { OpComparisonExpressionContext } from './ApiFilterParser';
import { OpLikeExpressionContext } from './ApiFilterParser';
import { OpExistsExpressionContext } from './ApiFilterParser';
import { StringValueContext } from './ApiFilterParser';
import { RawValueContext } from './ApiFilterParser';
import { NumberValueContext } from './ApiFilterParser';
import { FieldValueContext } from './ApiFilterParser';
import { FilterContext } from './ApiFilterParser';
import { ExpressionContext } from './ApiFilterParser';
import { ValueContext } from './ApiFilterParser';
import { GroupingContext } from './ApiFilterParser';


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ApiFilterParser`.
 */
export interface ApiFilterListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `opNullCheckExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOpNullCheckExpression?: (ctx: OpNullCheckExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `opNullCheckExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOpNullCheckExpression?: (ctx: OpNullCheckExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `groupingExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterGroupingExpression?: (ctx: GroupingExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `groupingExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitGroupingExpression?: (ctx: GroupingExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `opBetweenExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOpBetweenExpression?: (ctx: OpBetweenExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `opBetweenExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOpBetweenExpression?: (ctx: OpBetweenExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `nestedExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNestedExpression?: (ctx: NestedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `nestedExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNestedExpression?: (ctx: NestedExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `opInExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOpInExpression?: (ctx: OpInExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `opInExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOpInExpression?: (ctx: OpInExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `opHaveCountExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOpHaveCountExpression?: (ctx: OpHaveCountExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `opHaveCountExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOpHaveCountExpression?: (ctx: OpHaveCountExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `opComparisonExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOpComparisonExpression?: (ctx: OpComparisonExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `opComparisonExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOpComparisonExpression?: (ctx: OpComparisonExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `opLikeExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOpLikeExpression?: (ctx: OpLikeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `opLikeExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOpLikeExpression?: (ctx: OpLikeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `opExistsExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOpExistsExpression?: (ctx: OpExistsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `opExistsExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOpExistsExpression?: (ctx: OpExistsExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `stringValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	enterStringValue?: (ctx: StringValueContext) => void;
	/**
	 * Exit a parse tree produced by the `stringValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	exitStringValue?: (ctx: StringValueContext) => void;
	/**
	 * Enter a parse tree produced by the `rawValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	enterRawValue?: (ctx: RawValueContext) => void;
	/**
	 * Exit a parse tree produced by the `rawValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	exitRawValue?: (ctx: RawValueContext) => void;
	/**
	 * Enter a parse tree produced by the `numberValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	enterNumberValue?: (ctx: NumberValueContext) => void;
	/**
	 * Exit a parse tree produced by the `numberValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	exitNumberValue?: (ctx: NumberValueContext) => void;
	/**
	 * Enter a parse tree produced by the `fieldValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	enterFieldValue?: (ctx: FieldValueContext) => void;
	/**
	 * Exit a parse tree produced by the `fieldValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	exitFieldValue?: (ctx: FieldValueContext) => void;
	/**
	 * Enter a parse tree produced by `ApiFilterParser.filter`.
	 * @param ctx the parse tree
	 */
	enterFilter?: (ctx: FilterContext) => void;
	/**
	 * Exit a parse tree produced by `ApiFilterParser.filter`.
	 * @param ctx the parse tree
	 */
	exitFilter?: (ctx: FilterContext) => void;
	/**
	 * Enter a parse tree produced by `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;
	/**
	 * Enter a parse tree produced by `ApiFilterParser.grouping`.
	 * @param ctx the parse tree
	 */
	enterGrouping?: (ctx: GroupingContext) => void;
	/**
	 * Exit a parse tree produced by `ApiFilterParser.grouping`.
	 * @param ctx the parse tree
	 */
	exitGrouping?: (ctx: GroupingContext) => void;
}

