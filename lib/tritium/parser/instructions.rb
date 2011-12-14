module Tritium
  module Parser
    module Instructions
      %w(base literal invocation block import local_var).each do |file|
        require_relative "instructions/#{file}"
      end
    end
  end
end
