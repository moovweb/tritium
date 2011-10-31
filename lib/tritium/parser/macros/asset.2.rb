# This is a deprecation macro

->(args) do
  file_name, type = args
  location = ""
  
  if type.value == "stylesheet"
    location = "/stylesheets/.css/"
  elsif type.value == "js"
    location = "/javascript/"
  elsif type.value == "image"
    location = "/images/"
  end
  "asset(concat(#{location.inspect}, #{file_name.to_script})) { yield() }"
end