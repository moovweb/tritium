
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
        attr :export_vars
        include Tritium::Parser::Instructions
        include BaseFunctions
        include TextFunctions
        include NodeFunctions
        include AttributeFunctions

        def initialize(logger, options = {})
          @logger = logger
          @env = options["env"] || options[:env] || {}
          @matchers = []
          @export_vars = []
          @stack = []
        end
        
        def process(ins, ctx)
          @stack.push ctx
          if ins.is_a?(Invocation)
            # Collect and evaluate the pos_args
            pos_args, kwd_args = process_args(ins, ctx)
            #puts ctx.type.inspect
            if ins.base?
              base_invocation(ins, ctx, pos_args, kwd_args)
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
        ensure
          @stack.pop
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
          ins.statements.each do |statement|
            result = process(statement, ctx)
            if result == false
              return
            end
          end
        end
      end
    end
  end
end