module Tritium
  module Serializer
    class ObjectSerializer
      def initialize(ts_file)
        @path = File.absolute_path(ts_file).force_encoding("BINARY")
        @object = ::ScriptObject.new(:name => @path)
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
          convert_function_call(ins)
        elsif ins.is_a? Tritium::Parser::Instructions::Literal
          convert_literal(ins)
        elsif ins.is_a? Tritium::Parser::Instructions::Import
          convert_import(ins)
        else 
          convert_block(ins)
        end
      end

      def convert_block(ins)
        obj = Instruction.new(:type => Instruction::InstructionType::BLOCK,
                                :children => convert_instructions(ins.statements))
        #set_scope(ins, obj)
        obj
      end

      def convert_function_call(ins)
        func = Instruction.new(:type => Instruction::InstructionType::FUNCTION_CALL)

        func.value = ins.name.to_s

        func.children = convert_instructions(ins.statements)
        func.arguments = convert_instructions(ins.pos_args)
        func
      end

      def convert_literal(ins)
        if ins.regexp?
          Instruction.new(:type => Instruction::InstructionType::FUNCTION_CALL,
                          :value => "regexp".force_encoding("BINARY"),
                          :children => [convert_text(ins)])
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
          @import_scopes << ins.scope.name
        end
        obj = Instruction.new(:type => Instruction::InstructionType::IMPORT,
                                :import_index => @imports.index(ins.location))

      end
    end
  end
end