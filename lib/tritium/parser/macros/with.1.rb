->(args) do
  what = args.first
  if what.is_a? Tritium::Parser::Instructions::ExpansionInlineBlock
    what = what.statements.first
  end
  if what.is_a?(Tritium::Parser::Instructions::Invocation) && [:not_text, :not_regexp].include?(what.name)
    "not(#{what.pos_args.first.to_script}) { yield() }"
  else 
    use_method = ((what.returns == "Regexp") ? "regexp" : "text")
  %|with_#{use_method}(#{what.to_script}) {
    yield()
  }|
  end
end