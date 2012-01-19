package api

import(
	keys "tritium/api/key"
	"path/filepath"
	"os"
	)

type User struct {
	Name string
	Email string
	id string
	key *keys.Key
	approved map[string]bool
}

var SessionUser *User

func FetchSessionUser() *User {
	home := os.Getenv("HOME")
	path := filepath.Join(home, ".ssh/id_rsa.pub")

	if SessionUser != nil {
		return SessionUser
	} else {
		SessionUser = NewUser(path)
	}

	// TODO(SJ): Make a prompt to ask for the keys location?
	// The SDK should know where the github key is ...

	if SessionUser == nil {
		panic("Could not load user information at:" + path)
	}

	if !SessionUser.Validate() {
		panic("Invalid API key at " + path + ".")
	}


	return SessionUser

}


func NewUser(location string) *User {
	//TODO(SJ): Populate other fields from apollo

	return &User{
	Name: "",
	Email: "",
	id:"",
	key: keys.NewKey(&location),
	approved: make(map[string]bool),
	}
}

func (user *User)Validate() bool {
	return user.key.Validate()
}

func (user *User)RequestFeature(feature string) bool {
	allowed := false
	
	if user.approved[feature] == true {
		return true
	}

	// TODO(SJ) : Make apollo call here
	
	// For now, make something up

	if len(*user.key.Value) > 100 {
		allowed = true
		user.approved[feature] = true
	}
	
	return allowed
}
