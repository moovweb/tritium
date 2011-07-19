
# set("hi")
require_relative 'context'
require_relative 'scopes/text'
require_relative 'scopes/base'
require_relative 'scopes/node'
require_relative 'scopes/attribute'

module Tritium
  module Engines
    class Standard < Base
      class Run
        include Tritium::Parser::Instructions
        include BaseFunctions
        include TextFunctions
        include NodeFunctions
        include AttributeFunctions

        def initialize(options = {})
          @env = options["env"] || options[:env] || {}
        end
        
        def process(ins, ctx)
          if ins.is_a?(Invocation)
            # Collect and evaluate the pos_args
            pos_args, kwd_args = process_args(ins, ctx)
            if ins.base?
              base_invocation(ins, pos_args, kwd_args)
            elsif ctx.type == "Text"
              text_invocation(ins, ctx, pos_args, kwd_args)
            elsif ctx.type == "Node" || ctx.type == "XMLNode"
              node_invocation(ins, ctx, pos_args, kwd_args)
            elsif ctx.type == "Attribute"
              attribute_invocation(ins, ctx, pos_args, kwd_args)
            end
          elsif ins.is_a?(InlineBlock)
            run_children(ins, ctx)
          elsif ins.is_a?(Literal)
            ins.value
          end
        end
        
        def process_args(ins, ctx)
          pos_args = ins.pos_args.collect do |arg|
            if arg.is_a?(Instruction)
              process(arg, ctx)
            else
              arg
            end
          end
          
          kwd_args = {}
          ins.kwd_args.each do |key, value|
            if value.is_a?(Instruction)
              value = process(arg, ctx)
            end
            kwd_args[key] = value
          end
          [pos_args, kwd_args]
        end
        
        def run_children(ins, ctx)
          # we are a block of somesort!
          if ins.respond_to?("statements")
            ins.statements.each do |statement|
              process(statement, ctx)
            end
          end
        end
      end
    end
  end
end