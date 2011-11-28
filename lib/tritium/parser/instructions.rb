module Tritium
  module Parser
    module Instructions
      %w(base literal invocation block import).each do |file|
        require_relative "instructions/#{file}"
      end
    end
  end
end
