package tritium

import(
	"log"
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

func (pkg *Package) GetProtoTypeId(name *string) (*int32) {
	scopeTypeId := 0

	typeName := proto.GetString(name)
	if len(typeName) > 0 {
		scopeTypeId = pkg.GetTypeId(typeName)

		if scopeTypeId == -1 {
			// ERROR
			log.Panic("Didn't find type ", typeName)
		}
		//println("Set scope ID to ", scopeTypeId)
	}


	return proto.Int32(int32(scopeTypeId))

}