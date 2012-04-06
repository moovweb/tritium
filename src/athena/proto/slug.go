package proto

func NewSlug(name string, version string, stages int) *Slug {
	slug := Slug{}
	slug.Name = &name
	slug.Version = &version
	slug.Transformers = make([]*Transform, stages)
	return &slug
}
