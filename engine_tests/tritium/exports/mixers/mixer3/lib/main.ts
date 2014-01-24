// to make sure it uses the set defined in its dependecny, but later make sure it's not exported
@func Text.somefunc(Text %val) {
	set("not blah " + %val)
}