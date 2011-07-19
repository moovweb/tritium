
# set("hi")
require_relative 'context'

module Tritium
  module Engines
    class Standard < Base
      class Run
        include Tritium::Parser::Instructions

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
        
        def base_invocation(ins, args, kwds)
          case ins.name
          when :var
            
          end
        end
        
        def text_invocation(ins, ctx, args, kwds)
          case ins.name
          when :set
            ctx.set(args.first)
          when :html, :xml, :xhtml, :html_fragment
            doc = Context[ins, Tritium::Engines.xml_parsers[ins.name.to_s].parse(ctx.value)]
            run_children(ins, doc)
            ctx.set(doc.value.send("to_#{ins.name}"))
          when :prepend
            ctx.set(args.first + ctx.value)
          when :append
            ctx.set(ctx.value + args.first)
          else
            throw "Unknown method #{ins.name} in Text scope"
          end
        end
      end
    end
  end
end