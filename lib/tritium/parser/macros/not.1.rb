->(args) do
  what = args.first
  use_method = ((what.returns == "Regexp") ? "regexp" : "text")
%|not_#{use_method}(#{what.to_script}) {
  yield()
}|
end