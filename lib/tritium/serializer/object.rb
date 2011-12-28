module Tritium
  module Serializer
    class ObjectSerializer
      def initialize(ts_file)
        @path = File.absolute_path(ts_file).force_encoding("BINARY")
        @object = ::ScriptObject.new(:name => @path)
        @imports = []
      end
      
      def process
        parser = Tritium::Parser::Parser.new(@path)
        ins = parser.parse
        @object.root = convert_block(ins)
        @object
      end
      
      def encode
        @object.encode
      end
      
      def convert_instructions(ins_set)
        (ins_set.collect do |ins|
          convert_instruction(ins)
        end).flatten
      end

      def convert_instruction(ins)
        if ins.is_a? Tritium::Parser::Instructions::Invocation
          o = convert_function_call(ins)
        elsif ins.is_a? Tritium::Parser::Instructions::Literal
          o = convert_literal(ins)
        elsif ins.is_a? Tritium::Parser::Instructions::Import
          o = convert_import(ins)
        else 
          o = convert_block(ins)
        end
        o.line_number = ins.line_num
        return o
      end

      def convert_block(ins)
        Instruction.new(:type => Instruction::InstructionType::BLOCK,
                        :children => convert_instructions(ins.statements))
      end

      def convert_function_call(ins)
        func = Instruction.new(:type => Instruction::InstructionType::FUNCTION_CALL)

        func.value = ins.name.to_s.force_encoding("BINARY")

        func.children = convert_instructions(ins.statements)
        func.arguments = convert_instructions(ins.pos_args)
        func
      end

      def convert_literal(ins)
        if ins.regexp?
          obj = Instruction.new(:type => Instruction::InstructionType::FUNCTION_CALL)
          obj.value = "regexp".force_encoding("BINARY")
          obj.children = [convert_text(ins)]
          obj
        else
          convert_text(ins)
        end
      end
      
      def convert_text(ins)
        obj = Instruction.new
        obj['type'] = Instruction::InstructionType::TEXT
        obj.value = ins.value.to_s.force_encoding("BINARY")
        obj
      end

      def convert_import(ins)
        if !@imports.include?(ins.location)
          @imports << ins.location
          # @import_scopes << ins.scope.name
        end
        obj = Instruction.new(:type => Instruction::InstructionType::IMPORT,
                                :import_index => @imports.index(ins.location))

      end
    end
  end
end
