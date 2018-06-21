// Generated from ApiFilter.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from '@lchemy/antlr4ts/tree/ParseTreeVisitor'

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
import { RawFnContext } from './ApiFilterParser';
import { RawValueContext } from './ApiFilterParser';
import { NumberValueContext } from './ApiFilterParser';
import { FieldValueContext } from './ApiFilterParser';
import { FilterContext } from './ApiFilterParser';
import { ExpressionContext } from './ApiFilterParser';
import { ValueContext } from './ApiFilterParser';
import { GroupingContext } from './ApiFilterParser';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ApiFilterParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ApiFilterVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `opNullCheckExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpNullCheckExpression?: (ctx: OpNullCheckExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `groupingExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupingExpression?: (ctx: GroupingExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `opBetweenExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpBetweenExpression?: (ctx: OpBetweenExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `nestedExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNestedExpression?: (ctx: NestedExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `opInExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpInExpression?: (ctx: OpInExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `opHaveCountExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpHaveCountExpression?: (ctx: OpHaveCountExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `opComparisonExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpComparisonExpression?: (ctx: OpComparisonExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `opLikeExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpLikeExpression?: (ctx: OpLikeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `opExistsExpression`
	 * labeled alternative in `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpExistsExpression?: (ctx: OpExistsExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringValue?: (ctx: StringValueContext) => Result;
	/**
	 * Visit a parse tree produced by the `rawFn`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRawFn?: (ctx: RawFnContext) => Result;
	/**
	 * Visit a parse tree produced by the `rawValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRawValue?: (ctx: RawValueContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberValue?: (ctx: NumberValueContext) => Result;
	/**
	 * Visit a parse tree produced by the `fieldValue`
	 * labeled alternative in `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldValue?: (ctx: FieldValueContext) => Result;
	/**
	 * Visit a parse tree produced by `ApiFilterParser.filter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilter?: (ctx: FilterContext) => Result;
	/**
	 * Visit a parse tree produced by `ApiFilterParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `ApiFilterParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;
	/**
	 * Visit a parse tree produced by `ApiFilterParser.grouping`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrouping?: (ctx: GroupingContext) => Result;
}

