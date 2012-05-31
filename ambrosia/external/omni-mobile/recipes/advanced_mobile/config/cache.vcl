
/*
 * Default Cache.vcl
 *
 * By default, any responses with Cache-Control set correctly are cached.
 *
 * If you don't want to cache anything, you need to update vcl_fetch and
 * comment out some lines so return(pass) is always called.
 *
 * If you do want to cache with more granularity, read up on Varnish 
 * configurations and modify this file CAREFULLY.
 */

sub vcl_fetch {
  /*
   * Default Varnish logic EXCEPT:
   *   (1) Responses with a set-cookie header can still make their way
   *       into the cache. But I remove the set-cookie header in those instances.
   *   (2) Instead of using 'beresp.cacheable' to determine cacheability,
   *       I am checking for Cache-Control public
   */

  // Copy the X-Mob-Type type from the request header into the response header
  set beresp.http.X-Mob-Type = req.http.X-Mob-Type;

   // This caches any response w max-age in the Cache-Control header
   // for the duration specified in the header. We expect assets to have these headers set.
   // Comment out the 4 lines below if you don't want to cache anything
   if (beresp.http.Cache-Control ~ "(public|max\-age)") {
    remove beresp.http.Set-Cookie;
    return (deliver);
  }

  return (pass);
}

sub vcl_recv {
  set req.backend = application_director;
  
  /*
   * Default Varnish Caching logic with four exceptions:
   * (1) requests with cookies are cacheable
   * (2) X-Forwarded-For is only set when the client ip is not 127.0.0.1
   * (3) X-Moov-Secure requests are not cacheable
   * (4) Set the QA backend server to <customer>_appv01 which has a fixed IP
   * (5) Set the X-Mob-Type header based on user agent
   * (6) requests for assets are cacheable   
   */
  
  // Cache all assets
  if (req.url ~ "\.(png|gif|jpeg|jpg|ico|swf|css|js)(\?[a-z0-9%&]+)?$") {
    unset req.http.Cookie;
  }  
  if (req.http.Content-Type ~ "png|gif|jpeg|jpg|ico|swf|css|javascript") {
    unset req.http.Cookie;
  }  
  
  
  // Set the X-Mob-Type based on the user agent
  set req.http.X-Mob-Type = "1";

  // Use the following lines to vary the cache for any user agents that will be
  // served different content; here's an example for blackberry
  /*
  if (req.http.User-Agent ~ "BlackBerry[0-9]{4}\/(4\.6|4\.7|4\.8|5\.)") {
    set req.http.X-Mob-Type = "2";
  }
  */

  if (req.http.host ~ "^mstage") {
    set req.backend = {{#GOPERIOD#ProjectName}}_appv01;
    set req.http.X-QA = "true";
  }

  if (client.ip != "127.0.0.1") {
    if (req.http.x-forwarded-for) {
      set req.http.X-Forwarded-For =
        req.http.X-Forwarded-For ", " client.ip;
    } else {
      set req.http.X-Forwarded-For = client.ip;
    }
  }

  if (req.request != "GET" &&
      req.request != "HEAD" &&
      req.request != "PUT" &&
      req.request != "POST" &&
      req.request != "TRACE" &&
      req.request != "OPTIONS" &&
      req.request != "DELETE") {
    /* Non-RFC2616 or CONNECT which is weird. */
    return (pipe);
  }
  
  if (req.request != "GET" && req.request != "HEAD") {
    /* We only deal with GET and HEAD by default */
    return (pass);
  }
  
  if (req.http.x-moov-secure) {
    /* This request originated as an HTTPS request: not cacheable */
    return (pass);
  }
  if (req.http.Authorization) {
    /* Not cacheable by default */
    return (pass);
  }

  return (lookup);
}

sub vcl_hash {
  /*
   * Start default.vcl
   * Copied from default config so we can use the default hash and add the
   * X-Mob-Type to it.
   */
  set req.hash += req.url;
  if (req.http.host) {
    set req.hash += req.http.host;
  } else {
    set req.hash += server.ip;
  }
  /*
   * End default.vcl
   */

  // Add the X-Mob-Type to the hash value
  set req.hash += req.http.X-Mob-Type;

  // Return the custom hash value to Varnish
  return (hash);
}

/*
 * Error page to be presented should there be a problem in the cache
 */
sub vcl_error {
  set obj.http.Content-Type = "text/html; charset=utf-8";
  synthetic{"
  <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
  <html>
  <head>
  <title>Something went wrong</title>
  </head>
  <body>
  <style>body {background-color: #eee;} div {padding:10px;} #coming-soon {font-size: 30px;} #explanation {font-size: 15px;}</style><div id='coming-soon'>Looks like something went wrong here!</div><div id='explanation'>We're currently experiencing a technical issue. Please try to refresh the page or visit us on our <a href='www.{{#GOPERIOD#Domain}}' desktop site</a>. We apologize for the inconvenience.</div>
  </body>
  </html>
  "};
  return (deliver);
}
