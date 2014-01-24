html_fragment_doc("utf-8", "utf-8") {
	select(".//div[1]") {
		inner() {
			set("hi")
		}
	}
	select(".//div[2]") {
		inner() {
			somefunc("hi")
		}
	}
}