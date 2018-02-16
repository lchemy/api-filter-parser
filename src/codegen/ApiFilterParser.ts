// Generated from ApiFilter.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from '@lchemy/antlr4ts/atn/ATN'
import { ATNDeserializer } from '@lchemy/antlr4ts/atn/ATNDeserializer'
import { FailedPredicateException } from '@lchemy/antlr4ts/FailedPredicateException'
import { NotNull } from '@lchemy/antlr4ts/Decorators'
import { NoViableAltException } from '@lchemy/antlr4ts/NoViableAltException'
import { Override } from '@lchemy/antlr4ts/Decorators'
import { Parser } from '@lchemy/antlr4ts/Parser'
import { ParserRuleContext } from '@lchemy/antlr4ts/ParserRuleContext'
import { ParserATNSimulator } from '@lchemy/antlr4ts/atn/ParserATNSimulator'
import { ParseTreeListener } from '@lchemy/antlr4ts/tree/ParseTreeListener'
import { ParseTreeVisitor } from '@lchemy/antlr4ts/tree/ParseTreeVisitor'
import { RecognitionException } from '@lchemy/antlr4ts/RecognitionException'
import { RuleContext } from '@lchemy/antlr4ts/RuleContext'
import { RuleVersion } from '@lchemy/antlr4ts/RuleVersion'
import { TerminalNode } from '@lchemy/antlr4ts/tree/TerminalNode'
import { Token } from '@lchemy/antlr4ts/Token'
import { TokenStream } from '@lchemy/antlr4ts/TokenStream'
import { Vocabulary } from '@lchemy/antlr4ts/Vocabulary'
import { VocabularyImpl } from '@lchemy/antlr4ts/VocabularyImpl'

import * as Utils from '@lchemy/antlr4ts/misc/Utils'

import { ApiFilterListener } from './ApiFilterListener';
import { ApiFilterVisitor } from './ApiFilterVisitor';


export class ApiFilterParser extends Parser {
	public static readonly T__0=1;
	public static readonly T__1=2;
	public static readonly T__2=3;
	public static readonly OP_NULL_CHECK=4;
	public static readonly OP_COMPARISON=5;
	public static readonly OP_LIKE=6;
	public static readonly OP_BETWEEN=7;
	public static readonly OP_IN=8;
	public static readonly OP_EXISTS=9;
	public static readonly AND=10;
	public static readonly OR=11;
	public static readonly HAVE_COUNT=12;
	public static readonly RAW=13;
	public static readonly FIELD=14;
	public static readonly STRING=15;
	public static readonly NUMBER=16;
	public static readonly SPACE=17;
	public static readonly RULE_filter = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_value = 2;
	public static readonly RULE_grouping = 3;
	public static readonly ruleNames: string[] = [
		"filter", "expression", "value", "grouping"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, "'('", "','", "')'", undefined, undefined, undefined, undefined, 
		undefined, undefined, "'and'", "'or'", "'have count'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, undefined, "OP_NULL_CHECK", "OP_COMPARISON", 
		"OP_LIKE", "OP_BETWEEN", "OP_IN", "OP_EXISTS", "AND", "OR", "HAVE_COUNT", 
		"RAW", "FIELD", "STRING", "NUMBER", "SPACE"
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ApiFilterParser._LITERAL_NAMES, ApiFilterParser._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return ApiFilterParser.VOCABULARY;
	}

	@Override
	public get grammarFileName(): string { return "ApiFilter.g4"; }

	@Override
	public get ruleNames(): string[] { return ApiFilterParser.ruleNames; }

	@Override
	public get serializedATN(): string { return ApiFilterParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ApiFilterParser._ATN, this);
	}
	@RuleVersion(0)
	public filter(): FilterContext {
		let _localctx: FilterContext = new FilterContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ApiFilterParser.RULE_filter);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 8;
			this.expression(0);
			this.state = 9;
			this.match(ApiFilterParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	@RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, ApiFilterParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 59;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,2,this._ctx) ) {
			case 1:
				{
				_localctx = new OpNullCheckExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 12;
				this.value();
				this.state = 13;
				this.match(ApiFilterParser.OP_NULL_CHECK);
				}
				break;
			case 2:
				{
				_localctx = new OpComparisonExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 15;
				this.value();
				this.state = 16;
				this.match(ApiFilterParser.OP_COMPARISON);
				this.state = 17;
				this.value();
				}
				break;
			case 3:
				{
				_localctx = new OpLikeExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 19;
				this.value();
				this.state = 20;
				this.match(ApiFilterParser.OP_LIKE);
				this.state = 21;
				this.value();
				}
				break;
			case 4:
				{
				_localctx = new OpBetweenExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 23;
				this.value();
				this.state = 24;
				this.match(ApiFilterParser.OP_BETWEEN);
				this.state = 25;
				this.value();
				this.state = 26;
				this.match(ApiFilterParser.AND);
				this.state = 27;
				this.value();
				}
				break;
			case 5:
				{
				_localctx = new OpInExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 29;
				this.value();
				this.state = 30;
				this.match(ApiFilterParser.OP_IN);
				this.state = 31;
				this.match(ApiFilterParser.T__0);
				this.state = 32;
				this.value();
				this.state = 37;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===ApiFilterParser.T__1) {
					{
					{
					this.state = 33;
					this.match(ApiFilterParser.T__1);
					this.state = 34;
					this.value();
					}
					}
					this.state = 39;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 40;
				this.match(ApiFilterParser.T__2);
				}
				break;
			case 6:
				{
				_localctx = new OpExistsExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 42;
				this.value();
				this.state = 43;
				this.match(ApiFilterParser.OP_EXISTS);
				this.state = 48;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
				case 1:
					{
					this.state = 44;
					this.match(ApiFilterParser.T__0);
					this.state = 45;
					this.expression(0);
					this.state = 46;
					this.match(ApiFilterParser.T__2);
					}
					break;
				}
				}
				break;
			case 7:
				{
				_localctx = new OpHaveCountExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 50;
				this.value();
				this.state = 51;
				this.match(ApiFilterParser.HAVE_COUNT);
				this.state = 52;
				this.match(ApiFilterParser.OP_COMPARISON);
				this.state = 53;
				this.value();
				}
				break;
			case 8:
				{
				_localctx = new NestedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 55;
				this.match(ApiFilterParser.T__0);
				this.state = 56;
				this.expression(0);
				this.state = 57;
				this.match(ApiFilterParser.T__2);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 67;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,3,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new GroupingExpressionContext(new ExpressionContext(_parentctx, _parentState));
					this.pushNewRecursionContext(_localctx, _startState, ApiFilterParser.RULE_expression);
					this.state = 61;
					if (!(this.precpred(this._ctx, 9))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 9)");
					this.state = 62;
					this.grouping();
					this.state = 63;
					this.expression(10);
					}
					} 
				}
				this.state = 69;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,3,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ApiFilterParser.RULE_value);
		try {
			this.state = 74;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ApiFilterParser.RAW:
				_localctx = new RawValueContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 70;
				this.match(ApiFilterParser.RAW);
				}
				break;
			case ApiFilterParser.FIELD:
				_localctx = new FieldValueContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 71;
				this.match(ApiFilterParser.FIELD);
				}
				break;
			case ApiFilterParser.STRING:
				_localctx = new StringValueContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 72;
				this.match(ApiFilterParser.STRING);
				}
				break;
			case ApiFilterParser.NUMBER:
				_localctx = new NumberValueContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 73;
				this.match(ApiFilterParser.NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public grouping(): GroupingContext {
		let _localctx: GroupingContext = new GroupingContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ApiFilterParser.RULE_grouping);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 76;
			_la = this._input.LA(1);
			if ( !(_la===ApiFilterParser.AND || _la===ApiFilterParser.OR) ) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\x13Q\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03\x02"+
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03"+
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03"+
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03&\n\x03\f\x03"+
		"\x0E\x03)\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03"+
		"\x03\x03\x05\x033\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03"+
		"\x03\x03\x03\x03\x03\x03\x05\x03>\n\x03\x03\x03\x03\x03\x03\x03\x03\x03"+
		"\x07\x03D\n\x03\f\x03\x0E\x03G\v\x03\x03\x04\x03\x04\x03\x04\x03\x04\x05"+
		"\x04M\n\x04\x03\x05\x03\x05\x03\x05\x02\x02\x03\x04\x06\x02\x02\x04\x02"+
		"\x06\x02\b\x02\x02\x03\x03\x02\f\rY\x02\n\x03\x02\x02\x02\x04=\x03\x02"+
		"\x02\x02\x06L\x03\x02\x02\x02\bN\x03\x02\x02\x02\n\v\x05\x04\x03\x02\v"+
		"\f\x07\x02\x02\x03\f\x03\x03\x02\x02\x02\r\x0E\b\x03\x01\x02\x0E\x0F\x05"+
		"\x06\x04\x02\x0F\x10\x07\x06\x02\x02\x10>\x03\x02\x02\x02\x11\x12\x05"+
		"\x06\x04\x02\x12\x13\x07\x07\x02\x02\x13\x14\x05\x06\x04\x02\x14>\x03"+
		"\x02\x02\x02\x15\x16\x05\x06\x04\x02\x16\x17\x07\b\x02\x02\x17\x18\x05"+
		"\x06\x04\x02\x18>\x03\x02\x02\x02\x19\x1A\x05\x06\x04\x02\x1A\x1B\x07"+
		"\t\x02\x02\x1B\x1C\x05\x06\x04\x02\x1C\x1D\x07\f\x02\x02\x1D\x1E\x05\x06"+
		"\x04\x02\x1E>\x03\x02\x02\x02\x1F \x05\x06\x04\x02 !\x07\n\x02\x02!\""+
		"\x07\x03\x02\x02\"\'\x05\x06\x04\x02#$\x07\x04\x02\x02$&\x05\x06\x04\x02"+
		"%#\x03\x02\x02\x02&)\x03\x02\x02\x02\'%\x03\x02\x02\x02\'(\x03\x02\x02"+
		"\x02(*\x03\x02\x02\x02)\'\x03\x02\x02\x02*+\x07\x05\x02\x02+>\x03\x02"+
		"\x02\x02,-\x05\x06\x04\x02-2\x07\v\x02\x02./\x07\x03\x02\x02/0\x05\x04"+
		"\x03\x0201\x07\x05\x02\x0213\x03\x02\x02\x022.\x03\x02\x02\x0223\x03\x02"+
		"\x02\x023>\x03\x02\x02\x0245\x05\x06\x04\x0256\x07\x0E\x02\x0267\x07\x07"+
		"\x02\x0278\x05\x06\x04\x028>\x03\x02\x02\x029:\x07\x03\x02\x02:;\x05\x04"+
		"\x03\x02;<\x07\x05\x02\x02<>\x03\x02\x02\x02=\r\x03\x02\x02\x02=\x11\x03"+
		"\x02\x02\x02=\x15\x03\x02\x02\x02=\x19\x03\x02\x02\x02=\x1F\x03\x02\x02"+
		"\x02=,\x03\x02\x02\x02=4\x03\x02\x02\x02=9\x03\x02\x02\x02>E\x03\x02\x02"+
		"\x02?@\f\v\x02\x02@A\x05\b\x05\x02AB\x05\x04\x03\fBD\x03\x02\x02\x02C"+
		"?\x03\x02\x02\x02DG\x03\x02\x02\x02EC\x03\x02\x02\x02EF\x03\x02\x02\x02"+
		"F\x05\x03\x02\x02\x02GE\x03\x02\x02\x02HM\x07\x0F\x02\x02IM\x07\x10\x02"+
		"\x02JM\x07\x11\x02\x02KM\x07\x12\x02\x02LH\x03\x02\x02\x02LI\x03\x02\x02"+
		"\x02LJ\x03\x02\x02\x02LK\x03\x02\x02\x02M\x07\x03\x02\x02\x02NO\t\x02"+
		"\x02\x02O\t\x03\x02\x02\x02\x07\'2=EL";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ApiFilterParser.__ATN) {
			ApiFilterParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ApiFilterParser._serializedATN));
		}

		return ApiFilterParser.__ATN;
	}

}

export class FilterContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public EOF(): TerminalNode { return this.getToken(ApiFilterParser.EOF, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return ApiFilterParser.RULE_filter; }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterFilter) listener.enterFilter(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitFilter) listener.exitFilter(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitFilter) return visitor.visitFilter(this);
		else return visitor.visitChildren(this);
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor();
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent?: ParserRuleContext, invokingState?: number) {
		if (parent !== undefined && invokingState !== undefined) {
			super(parent, invokingState);
		} else {
			super();
		}
	}
	@Override public get ruleIndex(): number { return ApiFilterParser.RULE_expression; }
 
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class OpNullCheckExpressionContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	public OP_NULL_CHECK(): TerminalNode { return this.getToken(ApiFilterParser.OP_NULL_CHECK, 0); }
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterOpNullCheckExpression) listener.enterOpNullCheckExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitOpNullCheckExpression) listener.exitOpNullCheckExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitOpNullCheckExpression) return visitor.visitOpNullCheckExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class GroupingExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public grouping(): GroupingContext {
		return this.getRuleContext(0, GroupingContext);
	}
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterGroupingExpression) listener.enterGroupingExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitGroupingExpression) listener.exitGroupingExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitGroupingExpression) return visitor.visitGroupingExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class OpBetweenExpressionContext extends ExpressionContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	public OP_BETWEEN(): TerminalNode { return this.getToken(ApiFilterParser.OP_BETWEEN, 0); }
	public AND(): TerminalNode { return this.getToken(ApiFilterParser.AND, 0); }
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterOpBetweenExpression) listener.enterOpBetweenExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitOpBetweenExpression) listener.exitOpBetweenExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitOpBetweenExpression) return visitor.visitOpBetweenExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class NestedExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterNestedExpression) listener.enterNestedExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitNestedExpression) listener.exitNestedExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitNestedExpression) return visitor.visitNestedExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class OpInExpressionContext extends ExpressionContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	public OP_IN(): TerminalNode { return this.getToken(ApiFilterParser.OP_IN, 0); }
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterOpInExpression) listener.enterOpInExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitOpInExpression) listener.exitOpInExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitOpInExpression) return visitor.visitOpInExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class OpHaveCountExpressionContext extends ExpressionContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	public HAVE_COUNT(): TerminalNode { return this.getToken(ApiFilterParser.HAVE_COUNT, 0); }
	public OP_COMPARISON(): TerminalNode { return this.getToken(ApiFilterParser.OP_COMPARISON, 0); }
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterOpHaveCountExpression) listener.enterOpHaveCountExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitOpHaveCountExpression) listener.exitOpHaveCountExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitOpHaveCountExpression) return visitor.visitOpHaveCountExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class OpComparisonExpressionContext extends ExpressionContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	public OP_COMPARISON(): TerminalNode { return this.getToken(ApiFilterParser.OP_COMPARISON, 0); }
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterOpComparisonExpression) listener.enterOpComparisonExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitOpComparisonExpression) listener.exitOpComparisonExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitOpComparisonExpression) return visitor.visitOpComparisonExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class OpLikeExpressionContext extends ExpressionContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	public OP_LIKE(): TerminalNode { return this.getToken(ApiFilterParser.OP_LIKE, 0); }
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterOpLikeExpression) listener.enterOpLikeExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitOpLikeExpression) listener.exitOpLikeExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitOpLikeExpression) return visitor.visitOpLikeExpression(this);
		else return visitor.visitChildren(this);
	}
}
export class OpExistsExpressionContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	public OP_EXISTS(): TerminalNode { return this.getToken(ApiFilterParser.OP_EXISTS, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterOpExistsExpression) listener.enterOpExistsExpression(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitOpExistsExpression) listener.exitOpExistsExpression(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitOpExistsExpression) return visitor.visitOpExistsExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class ValueContext extends ParserRuleContext {
	constructor();
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent?: ParserRuleContext, invokingState?: number) {
		if (parent !== undefined && invokingState !== undefined) {
			super(parent, invokingState);
		} else {
			super();
		}
	}
	@Override public get ruleIndex(): number { return ApiFilterParser.RULE_value; }
 
	public copyFrom(ctx: ValueContext): void {
		super.copyFrom(ctx);
	}
}
export class StringValueContext extends ValueContext {
	public STRING(): TerminalNode { return this.getToken(ApiFilterParser.STRING, 0); }
	constructor(ctx: ValueContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterStringValue) listener.enterStringValue(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitStringValue) listener.exitStringValue(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitStringValue) return visitor.visitStringValue(this);
		else return visitor.visitChildren(this);
	}
}
export class RawValueContext extends ValueContext {
	public RAW(): TerminalNode { return this.getToken(ApiFilterParser.RAW, 0); }
	constructor(ctx: ValueContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterRawValue) listener.enterRawValue(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitRawValue) listener.exitRawValue(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitRawValue) return visitor.visitRawValue(this);
		else return visitor.visitChildren(this);
	}
}
export class NumberValueContext extends ValueContext {
	public NUMBER(): TerminalNode { return this.getToken(ApiFilterParser.NUMBER, 0); }
	constructor(ctx: ValueContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterNumberValue) listener.enterNumberValue(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitNumberValue) listener.exitNumberValue(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitNumberValue) return visitor.visitNumberValue(this);
		else return visitor.visitChildren(this);
	}
}
export class FieldValueContext extends ValueContext {
	public FIELD(): TerminalNode { return this.getToken(ApiFilterParser.FIELD, 0); }
	constructor(ctx: ValueContext) { super(); this.copyFrom(ctx); }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterFieldValue) listener.enterFieldValue(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitFieldValue) listener.exitFieldValue(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitFieldValue) return visitor.visitFieldValue(this);
		else return visitor.visitChildren(this);
	}
}


export class GroupingContext extends ParserRuleContext {
	public AND(): TerminalNode | undefined { return this.tryGetToken(ApiFilterParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(ApiFilterParser.OR, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return ApiFilterParser.RULE_grouping; }
	@Override
	public enterRule(listener: ApiFilterListener): void {
		if (listener.enterGrouping) listener.enterGrouping(this);
	}
	@Override
	public exitRule(listener: ApiFilterListener): void {
		if (listener.exitGrouping) listener.exitGrouping(this);
	}
	@Override
	public accept<Result>(visitor: ApiFilterVisitor<Result>): Result {
		if (visitor.visitGrouping) return visitor.visitGrouping(this);
		else return visitor.visitChildren(this);
	}
}


