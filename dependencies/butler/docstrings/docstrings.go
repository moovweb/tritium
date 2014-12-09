package docstrings

const (
  AMAZON_BAD_PRESIGNED_URL_ERR = "Incorrect presigned URL received."

  ARCHIVE_COPY_ERR = "%s: expected to copy %d bytes. Actually copied %d bytes"

  ARCHIVE_DIR_MAKE_ERR = "Error when trying to make folder %s.\n%s"

  ARCHIVE_FILE_MAKE_ERR = "Error when trying to make file %s.\n%s"

  BACKOFF_SIG_ERR = "Hey buddy, I'm busy right now."

  BACKOFF_DROP_ERR = "Exceeded maximum number of backoff attempts."

  BACKOFF_SLOT_TIME_ERR = "Backoff slot time must be greater than zero."

  BACKOFF_MAX_TIMES_ERR = "Backoff max attempts must be greater than zero."

  DAEMON_PIDFILE_ERR = "Couldn't create pidfile "

  DAEMON_ERR_LIST_ERR = "The following errors were found:"

  DATA_PREMISSIONS_ERR = "Data directory '%s' exists but has " +
               "restrictive permissions. Make sure you have read/write " +
               "access.\n Try running `sudo chown -hR <your username> %s`"

  DATA_MISC_CACHE_ERR = "Data directory %s' does not exist and we couldn't create it because of the following error:\n%s"

  DATA_CHOWN_ERR = "Couldn't change the owner of directory: %s"

  DOWNLOAD_NON_200_STATUS_ERR = "The return status code is not 200"

  FILEUTIL_COPY_ERR = "Copy: expected to copy %d bytes. Actually copied %d bytes."

  FILEUTIL_COPY_PERM_ERR = "Copy: could not set file permissions for %s."

  FILEUTIL_PROJECT_ERR = "Not a Moovweb project (%s file doesn't exist)."

  HOSTS_INVALID_ASSET_HOST_ERR = "'%s' is not a valid asset host."

  HOSTS_INVALID_SERVER_ERR = "'%s' does not represent a valid server."

  INPUT_ECHO_OFF_ERR = "Error turning off echo"

  INPUT_ECHO_ON_ERR = "Error turning on echo"

  MIXER_BAD_VERSION_ERR = "No mixers found that fit version pattern: "

  MIXER_LOCK_PARSE_ERR = "Could not obtain mixer name and version from lock file "

  MIXER_LOCK_INTERPRET_ERR = "Unable to interpret lock file "

  SERVER_ALREADY_RUNNING_ERR = "It looks like there is already an instance of `moov server` running. Please end this instance before attempting to start the server."

  SERVER_PORT_IN_USE_TEMPLATE_ERR = "Sorry, port %d is in use by another application so we can not start the %s server on this port.\nPlease terminate this applicaiton or specify a different port via the `%s` option."

  SERVER_PORT_USED_BY_MOOV_ERR = "Sorry, port %d is in use by another instance of `moov server` so we can not start the %s server on this port.\nPlease end this process before attempting to start another instance."
)