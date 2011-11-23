module Tritium
  module Serializer
    require_relative 'tritium.pb'

    def self.process_file(ts_file)
      filename = ts_file.split("/").last
      path = ts_file.split("/")[0..-2].join("/")
      parser = Tritium::Parser::Parser.new(:filename => filename, :path => path)
      root = parser.parse
      script = Script.new(:root => convert_instruction(root))
      result = script.encode
      puts result.to_s.size
      puts result.to_s.inspect
    end
    
    def self.convert_instruction(ins)
      obj = Script::Instruction.new
      set_name(obj, ins)
      obj["type"] = instruction_type(ins)
      obj.children = ins.statements.collect { |c| convert_instruction(c) }
      obj.arguments = ins.args.collect { |c| convert_instruction(c) } if ins.respond_to?("args")
      obj
    end
    
    def self.set_name(obj, ins)
      if ins.is_a? Tritium::Parser::Instructions::Invocation
        const_name = ins.name.to_s.upcase.to_sym
        if Script::Instruction::Function.constants.include?(const_name)
          obj.invocation_name = Script::Instruction::Function.const_get(const_name)
          return
        end
      end
      obj.name = ins.name.to_s.force_encoding("BINARY") if ins.respond_to?("name")
    end
    
    def self.instruction_type(ins)
      if ins.is_a? Tritium::Parser::Instructions::Invocation
        return Script::Instruction::Type::INVOCATION
      elsif ins.is_a? Tritium::Parser::Instructions::Literal
        if ins.regexp?
          return Script::Instruction::Type::REGEXP
        else
          return Script::Instruction::Type::STRING
        end
      else 
        return Script::Instruction::Type::BLOCK
      end
    end
  end
end