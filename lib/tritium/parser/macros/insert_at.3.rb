->(args) do
  position, tag_name, rest = args
  result = "insert_at(#{position.to_script}, #{tag_name.to_script}) {\n"
  if rest.is_a?(Hash)
    result << "  attributes(#{rest.to_script})\n"
  else
    result << "  inner() { set(#{rest.to_script}) }\n"
  end
  result   << "  yield()\n"
  result << "}\n"
end