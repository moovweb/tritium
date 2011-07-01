require_relative "parser"
require_relative "macro"

module Tritium
  module Parser
    class MacroExpander
      def initialize
        @macros = {}
        load_macros!
      end
      
      def load_macros!
        Macro.load_defaults.each {|m| register_macro(m)}
      end

      # Returns true or false if the signature matches a macro
      def is_macro?(signature)
        !!lookup_macro(signature)
      end
      
      def lookup_macro(signature)
        @macros[signature]
      end
      
      def register_macro(macro)
        @macros[macro.signature] = macro
      end
      
      def expand(macro_call)
        signature      = macro_call[:signature]
        pos_args       = macro_call[:pos_args]
        kwd_args       = macro_call[:kwd_args]       || {}
        block          = macro_call[:block]          || []
        expansion_site = macro_call[:expansion_site]
        errors         = macro_call[:errors]
        args           = pos_args + [kwd_args]

        macro = lookup_macro(signature)
        expansion_string = macro.expand(args)

        expansion = Parser.new(expansion_string,
                               macro_calls: @macro_calls,
                               expander: self,
                               errors: errors).parse

        if expansion
          expansion_site.statements += expansion.statements

          last_statement = expansion_site.statements.last
          if last_statement.is_a?(InvocationWithBlock)
            last_statement.statements += block
          end
        end
      end
    end
  end
end
