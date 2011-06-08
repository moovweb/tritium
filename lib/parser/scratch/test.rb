require_relative "parser"

include Tritium::Parser

def test()
  path, name = "scripts", "false-negatives.ts"
  script_string = File.read(File.join(path, name))
  parser = Parser.new(script_string, filename: name, path: path)
  parser.parse()
end

puts test
