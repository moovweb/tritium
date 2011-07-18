->(args) do
  (args.first.collect do |key, value|
    %|attribute("#{key}", "#{value}")|
  end).join("\n")
end