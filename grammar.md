Updated EBNF-ish grammar for Tritium. Syntax for function definitions currently omitted. May contain errors.

Syntactic rules (specified with EBNF):
----------------

    script      ->  statement*

    statement   ->  import
                ->  expression
                
    import      ->  '@import' PATH

    expression  ->  STR
                ->  RGXP
                ->  call
                ->  variable

    call        ->  ID '(' arguments? ')' block?

    arguments   ->  argument (',' argument)*

    argument    ->  KWD? expression

    variable    ->  (GVAR | LVAR) ('=' expression)? block?

    block       ->  '{' statement* '}'


Lexical rules (specified with Ruby regexps):
--------------

    PATH  ->  [-+.*?:\/\w]+                  (reasonable filenames)

    STR   ->  "(\\.|[^"\\])*"                (double quoted strings)
          ->  '(\\.|[^'\\])*'                (single quoted strings)

    RGXP  ->  \/(\\.|[^\/\\])*\/[imxouesn]*  (Ruby regexps)
          ->  `(\\.|[^\\])*`[imxouesn]*      (backquoted regexps)

    ID    ->  \$|[_a-zA-Z](\w|\$)*           ('$' or the usual + '$')

    KWD   ->  [a-zA-Z_:][-\w:.]*:            (XML attrs ending with ':')

    GVAR  ->  \$\w+                          (the usual starting with '$')

    LVAR  ->  %\w+                           (the usual starting with '%')

Comment syntax:

    #.*                                      (single line)
    //.*                                     (single line)
    /* through matching */                   (multi-line, properly balanced)