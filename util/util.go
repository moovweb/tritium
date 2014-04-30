package util

import(
	"fmt"
	"regexp"

	. "tritium/tritstrings"
)

type Range struct {
	Start int
	End   int
}

func ValidateLayerName(name string) error {
  // TODO: actually validate the name
  var validID = regexp.MustCompile(`^-?([a-zA-Z_]|[^\x00-\x7F])([-a-zA-Z0-9_]|[^\x00-\x7F])*$`)
  if validID.MatchString(name) {
  	return nil
  }
  return fmt.Errorf(UTIL_INVALID_LAYER_NAME_ERR, name)
}