require_relative "parser"
require_relative "macro"

module Tritium
  module Parser
    class MacroExpander
      attr :macros

      def initialize
        clear!
      end
      
      def clear!
        @macros = {}
        load_macros!
      end
      
      def load_macros!
        Macro.load_defaults.each {|m| register_macro(m)}
      end
      
      def load_macro(filename)
        register_macro(Macro.load_file(filename))
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
        parser         = macro_call[:parser]
        args           = pos_args + [kwd_args]

        macro = lookup_macro(signature)
        expansion_string = macro.expand(args)

        begin
          expansion = Parser.new(expansion_string,
                                 is_expansion: true,
                                 expander: self,
                                 errors: parser.errors,
                                 filename: parser.filename,
                                 path: parser.path,
                                 logger: parser.logger).parse
        rescue StandardError => e
          puts "Issue expanding"
          puts expansion_string
          raise e
        end

        if expansion
          expansion_site.add_statements(expansion.statements)
        
          # This is where we find the yield() call and put the block that the macro call had
          # into its rightful place.
          found = false
          expansion.each do |statement|
            if statement.respond_to?("name") && statement.name == :yield
              # this is a yield statement
              statement.parent.add_statements(block)
              statement.delete
              found = true
            end
          end
          if found == false
            throw "Must yield to something! (error with #{signature}. Script: #{expansion_string})"
          end
        end
      end
    end
  end
end
