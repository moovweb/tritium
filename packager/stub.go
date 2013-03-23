package packager

type Packager struct {
  MixerDir      string
  IncludePaths  []string
  IsTransformer bool
}

func Id(x string) string {
  return x
}