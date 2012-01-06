package tritium

import(
	proto "goprotobuf.googlecode.com/hg/proto"
)

func (pkg *Package) GetTypeId(name string) (int) {
	for id, typ := range(pkg.Types) {
		if proto.GetString(typ.Name) == name {
			return id
		}
	}
	return -1
}