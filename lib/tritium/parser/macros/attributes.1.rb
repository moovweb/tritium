->(args) do
  (args.first.collect do |key, value|
    if key.is_a?(Symbol)
      key = key.to_s
    end
    %|attribute(#{key.to_script}, #{value.to_script}) { yield() }|
  end).join("\n")
end