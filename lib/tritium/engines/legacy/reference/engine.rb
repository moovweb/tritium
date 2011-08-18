require_relative "../legacy_base"

module Tritium
  module Engines
    class Reference < LegacyBase
      require_relative 'scope'
      
      def run(doc, options = {})
        # Setup options
        env = options["env"] || options[:env] || {}

        root_scope = Scope::Text.new(doc.fix_encoding.dup)
        root_scope.logger = @logger
        root_scope.env.merge! env
        #puts @root_instruction.to_debug_script
        root_scope.instance_eval(@root_instruction.to_debug_script)

        [root_scope.text, root_scope.export_vars]
      rescue StandardError => e
        e.message.gsub!(/$/, " on script line #{$line.to_s}")
        raise e
      end
    end
  end
end
