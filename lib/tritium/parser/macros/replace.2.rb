->(args) do
  what, with = args
%|replace(#{what.to_script}) {
  set(#{with.to_script})
  yield()
}|
end