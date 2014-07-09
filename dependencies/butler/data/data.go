package data

import (
  "errors"
  "fmt"
  "io/ioutil"
  "os"
  "os/user"
  "path/filepath"
  "strconv"

  "tritium/dependencies/butler/fileutil"
  . "tritium/dependencies/butler/docstrings"
)

var AUTO_CREATE_MODE bool = true

const defaultDataDir = ".moovweb"

var dataDirCache = ""

func GetDataPath() (string, error) {
  if len(dataDirCache) != 0 {
    return dataDirCache, nil
  }

  dataDirCache = os.Getenv("GOHATTAN_DATA")

  if len(dataDirCache) == 0 {
    dataDirCache = filepath.Join(os.Getenv("HOME"), defaultDataDir)
  }

  if AUTO_CREATE_MODE {
    // Creating the data dir is lazy (if things exist, we don't create them)
    // so opt to always call create the first time we're ran in case
    // any one file or so is missing.
    var msg string
    err := createDataDir(dataDirCache)
    if err != nil {
      if os.IsPermission(err) {
        msg = fmt.Sprintf(DATA_PREMISSIONS_ERR, dataDirCache, dataDirCache)
      } else {
        msg = fmt.Sprintf(DATA_MISC_CACHE_ERR, dataDirCache, err.Error())
      }
      return "", errors.New(msg)
    }
  }

  return dataDirCache, nil
}

func GetDefaultDataPath() string {
  return filepath.Join(os.Getenv("HOME"), defaultDataDir)
}

func GetMixerPath() (string, error) {
  dataPath, err := GetDataPath()
  if err != nil {
    return "", err
  }
  return filepath.Join(dataPath, "mixers"), nil
}

func GetKeysPath() (string, error) {
  dataPath, err := GetDataPath()
  if err != nil {
    return "", err
  }
  return filepath.Join(dataPath, "keys"), nil
}

func GetPackagesPath() (string, error) {
  dataPath, err := GetDataPath()
  if err != nil {
    return "", err
  }
  return filepath.Join(dataPath, "packages"), nil
}

func createDataDir(datadir string) error {
  defer ChownToUser(datadir)

  err := os.MkdirAll(datadir, fileutil.DIR_PERMS)
  if err != nil && !os.IsExist(err) {
    return err
  }
  err = os.Mkdir(filepath.Join(datadir, "mixers"), fileutil.DIR_PERMS)
  if err != nil && !os.IsExist(err) {
    return err
  }
  err = os.Mkdir(filepath.Join(datadir, "keys"), fileutil.DIR_PERMS)
  if err != nil && !os.IsExist(err) {
    return err
  }
  err = os.Mkdir(filepath.Join(datadir, "packages"), fileutil.DIR_PERMS)
  if err != nil && !os.IsExist(err) {
    return err
  }
  return createKeys(filepath.Join(datadir, "keys"))
}

func ChownToUser(datadir string) (uid int, gid int, err error) {
  // This will do nothing in windows since the SUDO_USER var is never set,
  // which is fine since we always run gitbash in admin mode in windows.
  if os.Getenv("SUDO_USER") != "" {
    // Change the permissions of the files we just created to that of the
    // original user's.
    uid, gid = os.Getuid(), os.Getgid()
    u, err := user.Lookup(os.Getenv("SUDO_USER"))
    if err != nil {
      return uid, gid, fmt.Errorf(DATA_CHOWN_ERR, datadir)
    }
    uid, _ = strconv.Atoi(u.Uid)
    gid, _ = strconv.Atoi(u.Gid)
    os.Chown(datadir, uid, gid)
  }
  return
}

func createKeys(keydir string) error {
  keyfilename, keydata := keyData()
  certfilename, certdata := certData()

  keyfilename = filepath.Join(keydir, keyfilename)
  certfilename = filepath.Join(keydir, certfilename)

  err := writeIfNotExist(keyfilename, []byte(keydata))
  if err != nil {
    return err
  }
  return writeIfNotExist(certfilename, []byte(certdata))
}

func writeIfNotExist(filename string, data []byte) error {
  _, err := ioutil.ReadFile(filename)
  if err != nil && os.IsNotExist(err) {
    return ioutil.WriteFile(filename, data, fileutil.FILE_PERMS)
  }
  return nil
}