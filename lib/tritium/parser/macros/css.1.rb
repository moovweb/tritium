->(args) do
  css_selector = args.first
  xpath_selector = Nokogiri::CSS.xpath_for(css_selector.value)[0]
%|$css_to_xpath {
  set(".#{xpath_selector}")
  yield()
}|
end
