->(args) do
  position, tag_name, *rest = args
  result = "insert_at(#{position}, #{tag_name}) {\n"
  if rest.first.is_a?(String)
    result << "  inner() { set(#{rest}) }\n"
  end
  if rest.last.is_a?(Hash)
    result << "  attributes(#{rest.last.to_tritium})\n"
  end
  result << "}\n"
end