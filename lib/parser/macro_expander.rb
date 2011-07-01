require_relative "parser"

module Tritium
  module Parser
    class MacroExpander
      @@macros = {}
      def expand(macro_call)
        macro_name     = macro_call[:name]
        pos_args       = macro_call[:pos_args]
        kwd_args       = macro_call[:kwd_args]
        block          = macro_call[:block]          || []
        expansion_site = macro_call[:expansion_site]

        expander = @@macros[[macro_name, pos_args.length]]
        if kwd_args.empty? then
          expansion_string = expander.call(*pos_args)
        else
          expansion_string = expander.call(*pos_args, kwd_args)
        end

        expansion = Parser.new(expansion_string,
                               macro_calls: @macro_calls).parse

        expansion.statements.each { |statement|
          expansion_site.statements << statement
        }

        last_statement = expansion_site.statements.last
        block.each { |statement|
          last_statement.statements << statement
        } if InvocationWithBlock === last_statement
      end

      def expand_all
        @macro_calls.each { |macro_call| expand macro_call }
      end
    end
  end
end
