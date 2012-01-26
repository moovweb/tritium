require_relative '../../../extensions/matcher'
module Tritium
  module Engine
    class Standard < Base
      module BaseFunctions
        def base_invocation(ins, ctx, args, kwds)
          case ins.name
          when :var
            value = @env[args.first] || ""
            if args[1] != nil
              value = args[1]
            end
            value_ctx = Context[ins, value]
            run_children(ins, value_ctx)
            @env[args.first] = value_ctx.value
            return value_ctx.value
          when :regexp
            return Regexp.new(args.first)
          when :concat
            return args.join("")
          when :match
            @matchers.push(args.first)
            @should_continue.push(true)
            run_children(ins, ctx)
            @matchers.pop
            return (!@should_continue.pop).to_s # Return T/F as a string based off if we ever matched anything
          when :not_text, :not_regexp, :with_text, :with_regexp
            return "false" if !@should_continue.last
            matcher = @matchers.last
            with = args.first
            with.opposite = (ins.name.to_s.index("not") == 0)
            #puts "Tested that #{matcher.inspect}.#{ins.stub} and came out with #{with.match?(matcher)} (opposite #{with.opposite})"
            if with.match?(matcher)
              run_children(ins, ctx)
              @should_continue[-1] = false # Make sure that we stop!
              return "true"
            else
              return "false"
            end
          when :time
            start = Time.now
            run_children(ins, ctx)
            return ((Time.now - start).to_f * 1000000).to_s
          when :index
            index_ctx = ctx
            while index_ctx.index == nil
              index_ctx = @stack[@stack.index(index_ctx) - 1]
              if index_ctx.nil? || index_ctx == ctx
                warn(ins, "Only use index nested inside of a Select")
                return "0"
              end
            end
            return index_ctx.index.to_s
          when :path
            # We need to find a parent who has a Node!
            node = @node_stack.last
            if node.nil?
              return ""
            end
            result = node.path
            fetch_ctx = Context[ins, result]
            run_children(ins, fetch_ctx)
            return fetch_ctx.value
          when :length
            return args.first.to_s.length.to_s
          when :node
            return @node_stack[@node_stack.size - args.first.to_i]
          when :fetch
            # We need to find a parent who has a Node!
            selector = args.first
            node = @node_stack.last
            if node.nil?
              return ""
            end
  
            result = node.xpath(selector.to_s).first
            if result.is_a?(Nokogiri::XML::Attr)
              result = result.value
            end
            fetch_ctx = Context[ins, result.to_s]
            run_children(ins, fetch_ctx)
            return fetch_ctx.value
          when :export
            value_ctx = Context[ins, ""]
            run_children(ins, value_ctx)
            @export_vars << [args[0], value_ctx.value]
            return value_ctx.value
          when :dump
            value = ctx.value.to_s
            return value
          when :log
            text = Context[ins, args.first]
            run_children(ins, text)
            @logger.info(text.value)
          when :upcase
            return args.first.upcase
          when :downcase
            return args.first.downcase
          when :debug
            # Ignore this
            run_children(ins, ctx)
          else
            throw "Method #{ins.name} not implemented in Base scope"
          end
        end
      end
    end
  end
end
