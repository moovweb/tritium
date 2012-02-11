package api

import (
	"io/ioutil"
)

type Key struct {
	Value     *[]byte
	validated bool
}

func NewKey(location *string) *Key {
	var value *[]byte

	if location != nil {
		data, err := ioutil.ReadFile(*location)

		if err != nil {
			panic("Cannot find key file: " + *location)
		}

		value = &data
	}

	return &Key{
		Value:     value,
		validated: false,
	}
}

func (k *Key) Validate() bool {
	if k.validated {
		return true
	}

	if k.Value != nil {

		// Fuck yea. Heavy duty security
		// TODO(SJ): Hook into apollo here ... hit some https controller that looks up this github key

		if len(*k.Value) > 10 {
			k.validated = true
			return true
		}
	}

	return false
}
