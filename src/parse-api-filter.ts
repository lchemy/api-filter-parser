import { ANTLRInputStream, CommonTokenStream } from "@lchemy/antlr4ts";
import { Filter, Orm, OrmRef } from "@lchemy/orm";

import { ApiFilterLexer } from "./codegen/ApiFilterLexer";
import { ApiFilterParser } from "./codegen/ApiFilterParser";
import { ErrorListener, ParseError, ParseErrorCode } from "./errors";
import { ExpressionVisitor } from "./visitors";

export async function parseApiFilter(ormRef: OrmRef<Orm>, input: string, maxDepth?: number): Promise<Filter> {
	const orm = await ormRef["🜅"],
		inputStream = new ANTLRInputStream(input),
		lexer = new ApiFilterLexer(inputStream),
		tokenStream = new CommonTokenStream(lexer),
		parser = new ApiFilterParser(tokenStream);

	const lexerErrorListener = new ErrorListener();
	lexer.removeErrorListeners();
	lexer.addErrorListener(lexerErrorListener);

	const parserErrorListener = new ErrorListener();
	parser.removeErrorListeners();
	parser.addErrorListener(parserErrorListener);

	const filter = parser.filter(),
		expression = filter.expression();

	if (lexerErrorListener.errors.length > 0) {
		throw new ParseError(ParseErrorCode.ERR_UNRECOGNIZED_CHARACTERS, input, lexerErrorListener.errors);
	}

	if (parserErrorListener.errors.length > 0) {
		throw new ParseError(ParseErrorCode.ERR_INVALID_TOKENS, input, parserErrorListener.errors);
	}

	const expressionVisitor = new ExpressionVisitor({ orm, maxDepth });
	return expression.accept(expressionVisitor);
}
