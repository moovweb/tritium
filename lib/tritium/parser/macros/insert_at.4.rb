->(args) do
  position, tag_name, contents, attributes = args
  result = "insert_at(#{position}, #{tag_name}) {\n"
  result << "  inner(#{contents})\n"
  result << "  attributes(#{attributes.to_tritium})\n"
  result << "  yield()\n"
  result << "}\n"
end