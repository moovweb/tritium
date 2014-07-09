package null

func GetString(p *string) string {
  if p == nil {
    return ""
  }
  return *p
}