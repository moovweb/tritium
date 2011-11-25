require_relative '../../../extensions/matcher'
module Tritium
  module Engine
    class Standard < Base
      module BaseFunctions
        def base_invocation(ins, ctx, args, kwds)
          case ins.name
          when :var
            value = @env[args.first] || ""
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
            run_children(ins, ctx)
            @matchers.pop
          when :not_text, :not_regexp, :with_text, :with_regexp
            matcher = @matchers.last
            with = args.first
            with.opposite = (ins.name.to_s.index("not") == 0)
            #puts "Tested that #{matcher.inspect}.#{ins.stub} and came out with #{with.match?(matcher)} (opposite #{with.opposite})"
            if with.match?(matcher)
              run_children(ins, ctx)
              return false # signal to stop!
            end
            return "false"
          when :time
            start = Time.now
            run_children(ins, ctx)
            return ((Time.now - start).to_f * 100000).to_s
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