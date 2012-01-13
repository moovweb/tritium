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

// TODO(SJ) : This should really return a list of descendants
func (pkg *Package) FindDescendantType(thisType int32) int {	
	for index, someType := range(pkg.Types) {
		implements := proto.GetInt32(someType.Implements)
		if implements == thisType && implements != 0 {
			// The implements field defaults to 0. Base doesn't implement Base. Text doesn't implement Base
			// TODO(SJ): make the default value -1 so I know if its not set versus something is inheriting from base
			// pkg.Log.Info("=== %v is ancestor of %v === (%v is of type %v and implements : %v)\n", thisType, someType, proto.GetString(someType.Name), index, implements)
			return index
		}
	}
	return -1
}