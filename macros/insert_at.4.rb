->(args) do
  position, tag_name, contents, attributes = args
  result = "insert_at(#{position.to_script}, #{tag_name.to_script}) {\n"
  result << "  inner(#{contents.to_script})\n"
  result << "  attributes(#{attributes.to_script})\n"
  result << "  yield()\n"
  result << "}\n"
end