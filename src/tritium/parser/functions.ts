@import "foo.ts"

@func Text.sayHi(Text %s) Text

@func Text.sayHi(Text %s) {
  concat("hi ", %s)
}

@import ../blah.ts

@func Text.myConcat(Text %s, Text %t) Text Text

@func Text.myConcat(Text %s, Text %t, Text %u) {
  concat(%s, %t, %u)
}