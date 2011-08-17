->(args) do
  (args.first.collect do |key, value|
    %|attribute("#{key}", #{value}) { yield() }|
  end).join("\n")
end