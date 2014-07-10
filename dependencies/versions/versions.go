package versions

import (
  "errors"
  "strconv"
  "strings"
)

type Version struct {
  Major int
  Minor int
  Patch int
}

func NewVersion(rawVersions string) (*Version, error) {
  rawVersions = strings.Trim(rawVersions, "\r\n ")
  rawVersions = trimExtension(rawVersions)

  versions := strings.Split(rawVersions, ".")

  if len(versions) < 2 {
    return nil, errors.New("Invalid version string(" + rawVersions + "). Must be of the form x.x or x.x.x")
  }

  majorVersion, err := strconv.Atoi(versions[0])

  if err != nil {
    return nil, err
  }

  minorVersion, err := strconv.Atoi(versions[1])

  if err != nil {
    return nil, err
  }

  var patchVersion int

  if len(versions) == 3 {
    patchVersion, err = strconv.Atoi(versions[2])

    if err != nil {
      return nil, err
    }
  }

  return &Version{
    Major: majorVersion,
    Minor: minorVersion,
    Patch: patchVersion,
  }, nil
}

func Split(fullName string) (name string, version string, err error) {
  segments := strings.Split(fullName, "-")

  if len(segments) < 2 {
    return "", "", errors.New("Invalid fullname.  No version suffix found.")
  }
  name = segments[0]

  versions := strings.SplitN(segments[len(segments)-1], ".", 4)

  if len(versions) < 3 {
    return "", "", errors.New("Invalid fullname.  No minor version or patch version found.")
  }

  return name, strings.Join(versions[:3], "."), nil
}

func GetVersion(fullName string) (*Version, error) {
  _, version, err := Split(fullName)
  if err != nil {
    return nil, err
  }
  return NewVersion(version)
}

// TODO(SJ) : Support a slice of patterns
func (v *Version) Matches(pattern string) (match bool, err error) {
  if len(pattern) == 0 {
    return true, nil
  }

  p, err := NewPattern(pattern)

  if err != nil {
    return false, err
  }

  match = p.Match(v)

  return
}

func (v *Version) String() string {
  var output string

  output += strconv.Itoa(v.Major)
  output += "." + strconv.Itoa(v.Minor)

  // Patch level is auto-populated for now
  //  if v.Patch != nil {
  output += "." + strconv.Itoa(v.Patch)
  //  }

  return output
}

func (v *Version) Compare(rawVersion string) int {
  v2, err := NewVersion(rawVersion)
  if err != nil {
    return 1
  }

  if v.Major != v2.Major {
    return v.Major - v2.Major
  }

  if v.Minor != v2.Minor {
    return v.Minor - v2.Minor
  }

  return v.Patch - v2.Patch
}
