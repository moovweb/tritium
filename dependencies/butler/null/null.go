package null

/*
 * Helper routines for simplifying the fetching of optional fields of basic type.
 * If the field is missing, they return the zero for the type.
 */

//TODO: Check to see if we can deprecate these guys in 3.6/7
// GetBool is a helper routine that returns an optional bool value.
func GetBool(p *bool) bool {
	if p == nil {
		return false
	}
	return *p
}

// GetInt32 is a helper routine that returns an optional int32 value.
func GetInt32(p *int32) int32 {
	if p == nil {
		return 0
	}
	return *p
}

// GetInt64 is a helper routine that returns an optional int64 value.
func GetInt64(p *int64) int64 {
	if p == nil {
		return 0
	}
	return *p
}

// GetFloat32 is a helper routine that returns an optional float32 value.
func GetFloat32(p *float32) float32 {
	if p == nil {
		return 0
	}
	return *p
}

// GetFloat64 is a helper routine that returns an optional float64 value.
func GetFloat64(p *float64) float64 {
	if p == nil {
		return 0
	}
	return *p
}

// GetUint32 is a helper routine that returns an optional uint32 value.
func GetUint32(p *uint32) uint32 {
	if p == nil {
		return 0
	}
	return *p
}

// GetUint64 is a helper routine that returns an optional uint64 value.
func GetUint64(p *uint64) uint64 {
	if p == nil {
		return 0
	}
	return *p
}

// GetString is a helper routine that returns an optional string value.
func GetString(p *string) string {
	if p == nil {
		return ""
	}
	return *p
}
