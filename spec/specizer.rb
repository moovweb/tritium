require 'yaml'
file = YAML.load(open("spec.3.yml"))
types = file["Functions"]

types.each do |type, functions|
  functions.each do |name, function|
    stub = "func "
    if function['doc']
      stub =  ("// " + function['doc'] + "\n" + stub)
    end
    
    if type != "Base"
      stub << (type + ".")
    end
    stub << name + "("
    
    args = []
    (function['arguments'] || []).each do |arg|
      arg_name = (arg["name"] || "arg").downcase.gsub(" ", "_")
      arg_type = arg["type"] || "Text"
      args << (arg_type + " %" + arg_name)
    end
    stub << args.join(", ")
    stub << ") "
    returns = "Text"
    if function["returns"].is_a? String
      returns = function["returns"] 
    end
    stub << "//#{returns}"
    #{type}.#{name}() (#{returns})"
    if function["opens"]
      stub << ("," + function["opens"])
    end
    puts (stub + "\n\n")
  end
end