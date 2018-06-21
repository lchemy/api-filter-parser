grammar ApiFilter;

filter: expression EOF;

expression
  : expression grouping expression          # groupingExpression
  | value OP_NULL_CHECK                     # opNullCheckExpression
  | value OP_COMPARISON value               # opComparisonExpression
  | value OP_LIKE value                     # opLikeExpression
  | value OP_BETWEEN value AND value        # opBetweenExpression
  | value OP_IN '(' value (',' value)* ')'  # opInExpression
  | value OP_EXISTS ('(' expression ')')?   # opExistsExpression
  | value HAVE_COUNT OP_COMPARISON value    # opHaveCountExpression
  | '(' expression ')'                      # nestedExpression
  ;

value
  : RAW '(' value (',' value)* ')' #rawFn
  | RAW     # rawValue
  | STRING  # stringValue
  | NUMBER  # numberValue
  | FIELD   # fieldValue
  ;

OP_NULL_CHECK: 'is null' | 'is not null';
OP_COMPARISON: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';
OP_LIKE: 'like' | 'not like' | 'ilike' | 'not ilike';
OP_BETWEEN: 'between' | 'not between';
OP_IN: 'in' | 'not in';
OP_EXISTS: 'exists' | 'not exists';

grouping: AND | OR;
AND: 'and';
OR: 'or';

HAVE_COUNT: 'have count';

RAW: '$' FIELD;

FIELD: FIELD_START FIELD_CHAR*;
fragment FIELD_START: [A-Za-z_];
fragment FIELD_CHAR: (FIELD_START | [.$]);

STRING: '"' (ESCAPED_CHAR | .)*? '"';
fragment ESCAPED_CHAR: '\\' .;

NUMBER: SIGN? DECIMAL EXPONENT?;
fragment SIGN: '+' | '-';
fragment INTEGER: [0-9]+;
fragment DECIMAL: INTEGER+ ('.' INTEGER+)?;
fragment EXPONENT: ('e' | 'E') SIGN? INTEGER;

SPACE: [ \t\r\n]+ -> skip;
