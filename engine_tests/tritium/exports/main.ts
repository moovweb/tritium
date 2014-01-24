html_fragment_doc("utf-8", "utf-8") {
	select(".//div[@class='overridden']") {
		# Should call the new, overridden `set` -- i.e., the new version shouldn't
		# be clobbered by the old version even though the latter is part of a
		# mixer that's imported after the one containing the new version.
		inner() {
			set("hi")
		}
	}
	select(".//div[@class='original']") {
		inner() {
			somefunc("hi") # should call the old `set`
		}
	}
}