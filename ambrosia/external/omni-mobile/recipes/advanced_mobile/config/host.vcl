
backend manhattan-generator_appv01 {
  .host = "127.0.0.1";
  .port = "9991";
  .probe = {
            .url = "/moov_check";
            .interval = 5s;
            .timeout = 1s;
            .window = 5;
            .threshold = 3;
  }
}
