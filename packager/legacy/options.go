package legacy

type PackageOptions map[string]bool

var defaultOptions PackageOptions
var buildOptions PackageOptions

func BuildOptions() PackageOptions {
	if buildOptions == nil {
		buildOptions = PackageOptions{
			"stdout":      true,
			"output_tpkg": true,
			"use_tpkg":    false,
		}
	}
	return buildOptions
}

func fetchDefaultOptions() PackageOptions {
	if defaultOptions == nil {
		defaultOptions = PackageOptions{
			"stdout":      false,
			"output_tpkg": false,
			"use_tpkg":    true,
		}
	}
	return defaultOptions
}
