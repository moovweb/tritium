require 'json'
require_relative '../../parser/instruction'

module Tritium
  module Engines
    class Debug
      class Database
        def initialize(db_location)
          if File.exists?(db_location)
            `rm #{File.absolute_path(db_location)}`
          end

          @db = Sequel.sqlite(db_location)
          
          @db.create_table :instructions do
            primary_key :id
            String :name
            String :args
            Integer :parent_id
            index :parent_id
            String :scope
            String :iid
            index :iid
            String :arg_for_iid
            index :arg_for_iid
            Integer :line_number
            String :script_name
            String :line
            String :processed_line
            String :stub
          end
          
          @db.create_table :steps do
            primary_key :id
            String :sid
            index :sid
            Integer :instruction_id
            index :instruction_id
            Integer :parent_id
            index :parent_id
            String :log
            Integer :total_time_cs
            Integer :search_time_cs
            Integer :time_cs
          end
        end
        
        def insert_instruction(instruction, parent_id = nil)
          data = instruction.to_hash
          args = data[:args].collect do |arg|
            if arg.is_a?(::Tritium::Parser::Instruction)
              ins = @db[:instructions].filter(:iid => arg.iid).update(:parent_id => nil, :arg_for_iid => instruction.iid)
              "INSTRUCTION_#{arg.iid}"
            elsif arg.is_a?(Regexp)
              arg.inspect[1..-2]
            else
              arg
            end
          end
          data[:args] = args.to_json
          data[:iid] = instruction.iid
          if parent_id
            data[:parent_id] = parent_id
          end
          id = @db[:instructions].insert(data)
          instruction.children.each do |child|
            insert_instruction(child, id)
          end
        end
        
        def insert_step(step, parent_id = nil)
          data = {}
          data[:sid] = step.debug[:step_id]
          data[:log] = step.debug[:log].to_json
          data[:total_time_cs] = step.debug[:total_time_cs] 
          data[:instruction_id] = @db[:instructions].select(:id).filter(:iid => step.instruction.iid).first[:id]
          data[:search_time_cs] = step.debug[:search_time_cs]
          data[:parent_id] = parent_id
          data[:time_cs] = step.debug[:time_cs]
          id = @db[:steps].insert(data)
          step.children.each do |child_set|
            child_set.each do |child|
              insert_step(child, id)
            end
          end
        end
      end
    end
  end
end