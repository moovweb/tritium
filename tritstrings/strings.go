package tritstrings

const (
	SQUID_PARSER_LAYER_NOT_GIVEN_ERR = "%s:%d -- required layer not provided; please make sure you've specified all necessary layers in the start-up options"
	SQUID_PARSER_AMBIGUOUS_LAYER_IMPORT_ERR = "%s:%d -- layer imports may not be used when multiple layers are active"
	SQUID_PARSER_LAYER_FILE_NOT_FOUND_ERR = "%s:%d -- required layer import (%s) has no corresponding Tritium file (want %s)"
	UTIL_INVALID_LAYER_NAME_ERR = "Provided layer name `%s` is not allowed; please consult documentation on layers at http://developer.moovweb.com."
)