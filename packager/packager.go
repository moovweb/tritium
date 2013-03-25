package packager

import (
  "os"
  "path/filepath"
)

import (
  // proto "code.google.com/p/goprotobuf/proto"
  tp "tritium/proto"
)

type Packager struct {
  MixerDir      string
  IncludePaths  []string
  IsTransformer bool
  *tp.Mixer
}

const (
  libDir    = "lib"
  scriptDir = "scripts"
  entryFile = "main.ts"
)

func New(relSrcDir string) *Packager {
  pkger := new(Packager)

  wd, wdErr := os.Getwd()
  if wdErr != nil {
    panic("unable to determine current directory for mixer creation")
  }

  absSrcDir, absErr := filepath.Abs(relSrcDir)
  if absErr != nil {
    panic("unable to absolutize mixer source directory for mixer creation")
  }

  pkger.MixerDir        = absSrcDir
  pkger.IncludePaths    = make([]string, 1)
  pkger.IncludePaths[0] = wd

  pkger.Mixer = tp.NewMixer(absSrcDir)

  return pkger
}

func Id(x string) string {
  return x
}