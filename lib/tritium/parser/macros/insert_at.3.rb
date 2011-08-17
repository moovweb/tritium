->(args) do
  position, tag_name, rest = args
  result = "insert_at(#{position}, #{tag_name}) {\n"
  if rest.is_a?(Hash)
    result << "  attributes(#{rest.to_tritium})\n"
  else
    result << "  inner() { set(#{rest.to_tritium}) }\n"
  end
  result << "    yield()\n"
  result << "}\n"
end