package docstrings

const (
  DATA_PREMISSIONS_ERR = "Data directory '%s' exists but has " +
               "restrictive permissions. Make sure you have read/write " +
               "access.\n Try running `sudo chown -hR <your username> %s`"

  DATA_MISC_CACHE_ERR = "Data directory %s' does not exist and we couldn't create it because of the following error:\n%s"

  DATA_CHOWN_ERR = "Couldn't change the owner of directory: %s"
               )