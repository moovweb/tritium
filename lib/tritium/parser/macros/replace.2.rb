->(args) do
  what, with = args
%|replace(#{what.inspect}) {
  set(#{with.inspect})
  yield()
}|
end