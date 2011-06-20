require_relative "parser"

module Tritium
  module Parser
    class MacroExpander
      @@macros = {}

      def splice(node)
        case node
        when Literal
          val = eval(node.to_s)
          return Regexp === val ? val.inspect : val
        when Hash
          result = ""
          node.each { |k,v| result << ", #{k}: #{v}" }
          result[0,2] = ""
          return result
        else
          return node.to_s
        end
      end

      def expand(macro_call)
        macro_name     = macro_call[:name]
        pos_args       = macro_call[:pos_args]
        kwd_args       = macro_call[:kwd_args]
        block          = macro_call[:block]          || []
        expansion_site = macro_call[:expansion_site]

        expander = @@macros[[macro_name, pos_args.length]]
        expansion = expander.call(*pos_args, kwd_args)

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

    # require_relative "macros"
  end
end
