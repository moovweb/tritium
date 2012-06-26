$use_global_replace_vars = "true"
set("moov$1web")
replace(/.*/) {
	# We expect the $1 to get clobbered
}

