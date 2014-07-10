package mixer

import (
  "errors"
  "io/ioutil"
  "path/filepath"
  "regexp"
  "strings"
)

import (
  "tritium/dependencies/butler/crypto"
  "tritium/dependencies/butler/data"
  . "tritium/dependencies/butler/docstrings"
  pb "code.google.com/p/goprotobuf/proto"
  "tritium/proto"
  "tritium/dependencies/versions"
)

type ParseError struct {
  message string
}

func (e *ParseError) Error() string {
  return e.message
}

const DEFAULT_MIXER = "omni-mobile"
const MIXER_LOCK = "Mixer.lock"

var regex = regexp.MustCompile("([s\\w\\-]+)\\s*\\(\\s*=?\\s*(\\d+\\.\\d+\\.?\\d*)")

func GetMixerPath(name, versionPattern string) (string, error) {
  if len(name) == 0 {
    name = DEFAULT_MIXER
  }

  mixerRoot, err := data.GetMixerPath()
  if err != nil {
    return "", err
  }

  mixerPath, err := versions.FindByNameAndVersionLatest(mixerRoot, name, versionPattern)
  if err != nil {
    return "", err
  }
  if mixerPath == nil {
    return "", errors.New(MIXER_BAD_VERSION_ERR + versionPattern)
  }
  return mixerPath.String(), nil
}

func OpenMixer(path string) (*proto.Mixer, error) {
  data, err := ioutil.ReadFile(path)

  if err != nil {
    return nil, err
  }

  data = crypto.Decrypt(data)
  mxr := &proto.Mixer{}
  err = pb.Unmarshal(data, mxr)

  if err != nil {
    return nil, err
  }

  return mxr, nil
}

func GetMixerFromFile(filename string) (*proto.Mixer, error) {
  //TODO If filename is a .mxr file, do the stuff below, if it's a Lock
  //file, use ParseMixerLock and then call GetMixer, if it's a directory,
  //append the mixer.lock filename and then call ParseMixerLock.
  dataPath, err := data.GetDataPath()
  if err != nil {
    return nil, err
  }
  if !strings.HasPrefix(filename, dataPath) {
    filename = filepath.Join(dataPath, filename)
  }
  return OpenMixer(filename)
}

func GetMixer(name, versionPattern string) (*proto.Mixer, error) {
  mixerPath, err := GetMixerPath(name, versionPattern)
  if err != nil {
    return nil, err
  }
  return OpenMixer(mixerPath)
}

// ParseMixerLock, return the name and version of the mixer in the mixer version
// file from a project path.
func ParseMixerLock(projectPath string) (mixerName string, mixerVersion string, err error) {
  fileName := filepath.Join(projectPath, MIXER_LOCK)
  rawFileContent, err := ioutil.ReadFile(fileName)
  if err != nil {
    return "", "", err
  }

  stringFileContent := regex.FindSubmatch(rawFileContent)
  if len(stringFileContent) != 3 {
    return "", "", &ParseError{MIXER_LOCK_PARSE_ERR + fileName}
  }
  mixerName = strings.TrimSpace(string(stringFileContent[1]))
  mixerVersion = strings.TrimSpace(string(stringFileContent[2]))
  return mixerName, mixerVersion, nil
}

func ParseMultiMixerLock(projectPath string) (mixerNames, mixerVersions []string, err error) {
  fileName := filepath.Join(projectPath, MIXER_LOCK)
  rawFileContent, err := ioutil.ReadFile(fileName)
  if err != nil {
    return nil, nil, err
  }

  lines := strings.Split(string(rawFileContent), "\n")
  for _, line := range lines {
    if len(line) == 0 {
      continue
    }
    nameAndVersion := regex.FindSubmatch([]byte(line))
    if len(nameAndVersion) != 3 {
      return nil, nil, &ParseError{MIXER_LOCK_INTERPRET_ERR + fileName}
    }
    mixerNames = append(mixerNames, strings.TrimSpace(string(nameAndVersion[1])))
    mixerVersions = append(mixerVersions, strings.TrimSpace(string(nameAndVersion[2])))
  }

  return mixerNames, mixerVersions, nil
}