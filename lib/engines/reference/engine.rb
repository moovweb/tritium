require_relative "../base"

module Tritium
  module Engines
    class Reference < Base
      require_relative 'scope'
      
      def run(doc, options = {})
        # Setup options
        env = options["env"] || options[:env] || {}
        start = Time.now

        root_scope = Scope::Text.new(doc.dup)
        root_scope.logger = @logger
        root_scope.env.merge! env
        #puts @root_instruction.to_debug_script
        root_scope.instance_eval(@root_instruction.to_debug_script)

        took = Time.now - start
        @logger.stats("Script took #{took} sec to process") if @logger.respond_to? :stats
        [root_scope.text, root_scope.export_vars]
      rescue StandardError => e
        e.message.gsub!(/$/, " on script line #{$line.to_s}")
        raise e
      end
    end
  end
end
