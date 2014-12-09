package proto

import (
	"tritium/dependencies/butler/null"
	pb "code.google.com/p/goprotobuf/proto"
)

func (pkg *Package) GetTypeId(name string) int {
	for id, typ := range pkg.Types {
		if null.GetString(typ.Name) == name {
			return id
		}
	}
	return -1
}

func (pkg *Package) GetTypeName(id int32) string {
	return null.GetString(pkg.Types[id].Name)
}

func (pkg *Package) GetProtoTypeId(name *string) *int32 {
	scopeTypeId := 0

	typeName := null.GetString(name)
	if len(typeName) > 0 {
		scopeTypeId = pkg.GetTypeId(typeName)

		if scopeTypeId == -1 {
			panic("Didn't find type " + typeName)
		}
		//println("Set scope ID to ", scopeTypeId)
	}
	return pb.Int32(int32(scopeTypeId))
}

// TODO(SJ) : This should really return a list of descendants
func (pkg *Package) FindDescendantType(thisType int32) int {
	for index, someType := range pkg.Types {
		implements := null.GetInt32(someType.Implements)
		if implements == thisType && implements != 0 {
			// The implements field defaults to 0. Base doesn't implement Base. Text doesn't implement Base
			// TODO(SJ): make the default value -1 so I know if its not set versus something is inheriting from base
			// pkg.Log.Info("=== %v is ancestor of %v === (%v is of type %v and implements : %v)\n", thisType, someType, null.GetString(someType.Name), index, implements)
			// println("CHECK:", someType.GetName(), "implements", pkg.GetTypeName(someType.GetImplements()))
			return index
		}
	}
	return -1
}

// assumes that the ID of a given type will be >= to the IDs of its ancestors
func (pkg *Package) AncestorOf(anc, dec int32) bool {
	for dec >= anc {
		if dec == anc {
			return true
		} else {
			dec = pkg.Types[dec].GetImplements()
		}
	}
	return false
}