->(args) do
  what = args.first
  use_method = ((what.returns == "Regexp") ? "regexp" : "text")
%|replace_#{use_method}(#{what.to_script}) {
  yield()
}|
end