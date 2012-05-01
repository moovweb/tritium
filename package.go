package hermes

import(
	proto "code.google.com/p/goprotobuf/proto"
	"tritium/src/tritium/packager"
	"path/filepath"
)

// Assumes access to raw packages
// This will only be true on dev / build boxes

func NewRootPackage(rootPackagePath string, name string, dataPath string) (*packager.Package){
	rootPackage := packager.NewPackage(rootPackagePath, packager.PackageOptions{"stdout" : false,"output_tpkg" : false,"use_tpkg" : true})

	rootPackage.FallbackPath = filepath.Join(dataPath, "packages") 
	// This works out ok since the packager loadDependency() code path will check fallbacks for .tpkg's
	return rootPackage
}


func BuildRootPackage(rootPackage *packager.Package, rootPackagePath string, name string) (loadError *packager.Error){
	error := rootPackage.LoadFromPath(rootPackagePath, name )

	if error != nil {
		return error
	}

	info, err := packager.ReadPackageInfoFile(rootPackagePath)

	if err != nil {
		return &packager.Error{
		Code: packager.BUILD_ERROR,
		Message: *err,
		}
	}

	rootPackage.Name = proto.String( info.Name )

	return nil
}
