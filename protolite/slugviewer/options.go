package slugviewer

import "flag"
import "errors"

type Options struct {
	SlugLoc string
	TimeOnly bool
}

func (opt *Options) SetDefaults() {
	opt.SlugLoc = ""
	opt.TimeOnly = false
}

func (opt *Options) Reconcile() error {
	if len(opt.SlugLoc) == 0 {
		return errors.New("Slug wasn't specified, can't view nothing.")
	}
	return nil
}

func (opt *Options) SetupFlags(flags *flag.FlagSet) {
	flags.StringVar(
		&opt.SlugLoc,
		"slug",
		opt.SlugLoc,
		"The slug to view, can be passed as a regular argument as well.")
	flags.BoolVar(
		&opt.TimeOnly,
		"timer",
		opt.TimeOnly,
		"Only report the unmarshal time, don't show the slug in 'readable' format.")
}
