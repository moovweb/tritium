# This should use the older version of set defined in its dependency,
# but that dependency should not be re-exported and erroneously shadow the
# newer version.
@func Text.somefunc(Text %val) {
	set(%val)
}