Full EBNF-ish grammar for Tritium. May contain errors.

Syntactic rules (specified with EBNF):
--------------------------------------

    script      ->  statement*

    statement   ->  import
                ->  expression
                ->  definition
                
    import      ->  '@import' PATH

    expression  ->  STR
                ->  RGXP
                ->  POS
                ->  read
                ->  call
                ->  variable
                
    read        ->  'read' '(' STR ')'

    call        ->  ID '(' arguments? ')' block?

    arguments   ->  argument (',' argument)*

    argument    ->  KWD? expression

    variable    ->  (GVAR | LVAR) ('=' expression)? block?

    block       ->  '{' statement* '}'
    
    definition  ->  '@func' TYPE '.' id '(' parameters? ')' block
    
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