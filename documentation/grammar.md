Full EBNF-ish grammar for Tritium. May contain errors.

Syntactic rules (specified with EBNF):
--------------------------------------

    script      ->  (statement | signature | definition)*

    statement   ->  import
                ->  expression
                
    import      ->  '@import' (PATH | STR)

    expression  ->  term ('+' term)*
    
    term        ->  literal
                ->  read
                ->  call
                ->  cast
                ->  variable
                -> '(' expression ')'
    
    literal     ->  STR | RGXP | POS
                
    read        ->  'read' '(' STR ')'

    call        ->  ID '(' arguments? ')' block?
    
    cast        ->  TYPE '(' expression ')' block?

    arguments   ->  argument (',' argument)*

    argument    ->  KWD? expression

    variable    ->  (GVAR | LVAR) ('=' expression)? block?

    block       ->  '{' statement* '}'
    
    signature   ->  abstractor TYPE TYPE?
    
    definition  ->  abstractor block
    
    abstractor  ->  '@func' (TYPE '.')? id '(' parameters? ')'
        
    parameters  ->  parameter (',' parameter)*
    
    parameter   ->  TYPE LVAR


Lexical rules (specified with Ruby regexps):
--------------------------------------------

    PATH  ->  [-+.*?:\/\w]+                  (reasonable filenames)

    STR   ->  "(\\.|[^"\\])*"                (double quoted strings)
          ->  '(\\.|[^'\\])*'                (single quoted strings)

    RGXP  ->  \/(\\.|[^\/\\])*\/[imxouesn]*  (Ruby regexps)
          ->  `(\\.|[^\\])*`[imxouesn]*      (backquoted regexps)

    POS   ->  top|bottom|before|after        (keywords for positions)

    TYPE  ->  [A-Z](\w)*                     (capitalized identifiers)

    ID    ->  \$|[_a-z](\w|\$)*              (uncapitalized identifiers + $)
    
    KWD   ->  [a-zA-Z_:][-\w:.]*:            (XML attrs ending with ':')

    GVAR  ->  \$\w+                          (the usual starting with '$')

    LVAR  ->  %\w+                           (the usual starting with '%')

Comment syntax:
---------------

    # through end of line                    (single line)
    // through end of line                   (single line)
    /* through matching */                   (multi-line, properly balanced)