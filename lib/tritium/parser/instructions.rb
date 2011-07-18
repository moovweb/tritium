module Tritium
  module Parser
    module Instructions
      %w(base literal reference invocation inline_block).each do |file|
        require_relative "instructions/#{file}"
      end
    end
  end
end
