package client

import (
	"bufio"
	"bytes"
	"compress/flate"
	"compress/gzip"
	"crypto/tls"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"tritium/dependencies/mirrorhttp"
)

//TODO(NOJ): Deprecate this flag once we support http_proxy by default.
var HTTP_PROXY_SUPPORT bool = true

var HttpHeaderBodySepSig = []byte("\r\n\r\n")
var AlternativeHttpHeaderBodySepSig = []byte("\n\n")
var ContentEncodingKey = http.CanonicalHeaderKey("content-encoding")
var ErrorHttpServerShouldSaveReadData = errors.New("Server context should set SaveReadData to true")
var ErrorIncompleteRequest = errors.New("Incomplete Http Request")
var ErrorIncompleteResponse = errors.New("Incomplete Http Response")

type UpstreamHttpRequest struct {
	Request       *http.Request
	Ssl           bool
	VerifySslCert bool
	RawHeader     []byte
	Body          []byte
}

type UpstreamHttpResponse struct {
	Header    http.Header
	RawHeader []byte
	Body      []byte
	Response  *http.Response
	Separator []byte
}

func (req *UpstreamHttpRequest) Bytes() []byte {
	data := append(req.RawHeader, HttpHeaderBodySepSig...)
	if len(req.Body) > 0 {
		data = append(data, req.Body...)
	}
	return data
}

func (resp *UpstreamHttpResponse) Bytes() []byte {
	separator := resp.Separator
	if separator == nil {
		separator = HttpHeaderBodySepSig
	}
	data := append(resp.RawHeader, separator...)
	if len(resp.Body) > 0 {
		data = append(data, resp.Body...)
	}
	return data
}

func (uResponse *UpstreamHttpResponse) UnzipBody() (err error) {
	contentEncodings := uResponse.Header[ContentEncodingKey]
	if len(contentEncodings) == 0 {
		return nil
	}

	enc := strings.ToLower(contentEncodings[0])
	var unzipped []byte
	if enc == "deflate" {
		reasponseAsReader := bytes.NewBuffer(uResponse.Body)
		decompressor := flate.NewReader(reasponseAsReader)
		unzipped, err = ioutil.ReadAll(decompressor)
		if err == nil {
			uResponse.Body = unzipped
		}
		decompressor.Close()
	} else if enc == "gzip" {
		reasponseAsReader := bytes.NewBuffer(uResponse.Body)
		decompressor, err := gzip.NewReader(reasponseAsReader)
		if err == nil {
			unzipped, err = ioutil.ReadAll(decompressor)
			if err == nil {
				uResponse.Body = unzipped
			} else if err == io.ErrUnexpectedEOF {
				//we want to return what has been decompressed so far
				uResponse.Body = unzipped
			}
			decompressor.Close()
		}
	}
	return
}

type ClientConn struct {
	brw *bufio.ReadWriter
	dr  *mirrorhttp.DupReader
	net.Conn
	proxyUrl *url.URL
}

func NewClientConn(conn net.Conn, proxyUrl *url.URL) (cc *ClientConn) {
	cc = &ClientConn{}
	cc.dr = &mirrorhttp.DupReader{Reader: conn}
	cc.dr.Enable()
	br := bufio.NewReader(cc.dr)
	bw := bufio.NewWriter(conn)
	cc.brw = bufio.NewReadWriter(br, bw)
	cc.Conn = conn
	cc.proxyUrl = proxyUrl
	return
}

func Connect(addr string, deadline time.Time) (cc *ClientConn, err error) {
	if addr == "" {
		addr = ":http"
	}

	var proxyUrl *url.URL = nil
	var perr error = nil
	if HTTP_PROXY_SUPPORT {
		proxyUrl, perr = ProxyFromEnvironment(addr)
		if perr == nil && proxyUrl != nil {
			// Port 8080 seems to be the most common proxy port.
			addr = AddrFromURL(proxyUrl, ":8080")
		}
	}

	var conn net.Conn
	if deadline.IsZero() {
		conn, err = net.Dial("tcp", addr)
	} else {
		conn, err = net.DialTimeout("tcp", addr, deadline.Sub(time.Now()))
	}

	if err != nil && proxyUrl != nil {
		err = fmt.Errorf("Error connecting to http_proxy %s: %s", proxyUrl.Host, err.Error())
		return
	} else if err != nil {
		return
	}

	cc = NewClientConn(conn, proxyUrl)
	return
}

// We'll try to verify the hostname of the upstream against all the provided
// hostnames.  If one of them matches, we consider it a success.  If all of them
// fail, hostname verification fails.
func ConnectTLS(addr string, hostNames []string, TLSClientConfig *tls.Config, deadline time.Time) (cc *ClientConn, err error) {

	raw_conn, err := Connect(addr, deadline)
	if err != nil {
		return nil, err
	}

	// If we're proxying, we need to establish a connection between us, proxy, and
	// the upstream we want to verify.  Doing a CONNECT request to the proxy will
	// turn the proxy into a tunnel between us and the upstream, so we can handshake
	// with the upstream instead of the proxy.
	var proxyUrl *url.URL = nil
	var perr error = nil
	if HTTP_PROXY_SUPPORT {
		proxyUrl, perr = ProxyFromEnvironment(addr)
		if perr == nil && proxyUrl != nil {
			connectReq := &http.Request{
				Method: "CONNECT",
				URL:    &url.URL{Opaque: addr},
				Host:   addr,
				Header: make(http.Header),
			}
			if proxyUrl.User != nil {
				encodedUser := base64.URLEncoding.EncodeToString([]byte(proxyUrl.User.String()))
				connectReq.Header.Set("Proxy-Authorization", "Basic "+encodedUser)
			}
			connectReq.Write(raw_conn)
			// Read response.
			br := bufio.NewReader(raw_conn)
			resp, err := http.ReadResponse(br, connectReq)
			if err != nil {
				raw_conn.Close()
				return nil, err
			}
			if resp.StatusCode != 200 {
				raw_conn.Close()
				return nil, errors.New(resp.Status)
			}
		} else if perr != nil {
			return nil, perr
		}
	}

	verifyErrorMsg := "Upstream certificate validation failed. If you are aware that the upstream host has an invalid certificate, you may either:\n(1) Run moov server with the --verify-ssl-cert=false flag.\n(2) Add host %s to the whitelist.\n\nVerify error: (%s)"

	tlsconn := tls.Client(raw_conn.Conn, TLSClientConfig)
	if err = tlsconn.Handshake(); err != nil {
		tlsconn.Close()
		if proxyUrl != nil {
			return nil, fmt.Errorf("http_proxy %s handshake error: %s", proxyUrl.Host, err.Error())
		} else {
			return nil, fmt.Errorf(verifyErrorMsg, hostNames[0], err.Error())
		}
	}
	if !TLSClientConfig.InsecureSkipVerify {
		// Verify that the upstream is recognized as one of the hostnames provided.
		for _, hostName := range hostNames {
			if err = tlsconn.VerifyHostname(hostName); err == nil {
				break
			}
		}
		if err != nil {
			tlsconn.Close()
			if proxyUrl != nil {
				return nil, fmt.Errorf("http_proxy %s failed to verify hostname: %s", proxyUrl.Host, err.Error())
			} else {
				return nil, fmt.Errorf(verifyErrorMsg, hostNames[0], err.Error())
			}
		}
	}

	cc = NewClientConn(tlsconn, proxyUrl)
	return
}

func (cc *ClientConn) Close() {
	cc.Conn.Close()
	cc.dr.Reset()
}

var transferEncodingSig = []byte("Transfer-Encoding:")

func (cc *ClientConn) SendAndReceive(request *http.Request, rawRequest []byte) (uResponse *UpstreamHttpResponse, err error) {
	if cc.proxyUrl != nil {
		// TODO(NOJ) This is very inefficient, too many string concats, change to
		// byte buffers and appending.
		//
		// To turn this request into a proxy request...
		// 1. Change the path to be [req.scheme] + :// + [req.Host|req.URL.Host] + [req.URL.RequestURI()]
		// 2. Add Proxy-Connection: close header
		// 3. Check if we need to add Proxy-Authentication header.
		host := request.Host
		if len(host) == 0 {
			host = request.URL.Host
		}
		uri := request.URL.Scheme + "://" + host + request.URL.RequestURI()

		rawheader, rawbod, sep, err := SeparateHttpHeaderBody(rawRequest)
		if err != nil {
			return nil, err
		}
		// TODO(NOJ): WARNING! This will break if someone changed the scheme, method,
		// or path in tritium via request_main.ts or a custom mixer!  Those changes
		// would only be reflected in rawRequest.  Proper solution is to parse
		// rawRequest and get the info from there.  Either via tritium or Go.
		command := fmt.Sprintf("%s %s %s", request.Method, uri, request.Proto)
		newheader := string(rawheader)
		newheader = command + newheader[strings.Index(newheader, "\r\n"):]
		newheader += "\r\nProxy-Connection: close"
		if u := cc.proxyUrl.User; u != nil {
			newheader += "\r\nProxy-Authorization: Basic " + base64.URLEncoding.EncodeToString([]byte(u.String()))
		}
		rawRequest = append([]byte(newheader), sep...)
		if len(rawbod) > 0 {
			rawRequest = append(rawRequest, rawbod...)
		}
	}

	_, err = mirrorhttp.Write(cc.brw.Writer, rawRequest)
	if err != nil {
		return
	}

	httpResponse, err := http.ReadResponse(cc.brw.Reader, &http.Request{Method: request.Method})
	if err != nil {
		return
	}

	body, err := ioutil.ReadAll(httpResponse.Body)
	if err != nil {
		return
	}

	rawResponse := cc.dr.Bytes()

	//now we have finished reading the response
	//The response is saved in two places (essentially duplicated)
	//1. is the parsed response: httpResponse
	//2. is the raw response: rawResponse
	//we choose to use the raw response because we want minimum changes to the response string
	//However, we may still have to use the parsed response if it comes back in chunked encoding
	//the http pkg deals with the chunks, and the parsed http response is the assembled, complete response

	uResponse = &UpstreamHttpResponse{}
	uResponse.Header = httpResponse.Header
	uResponse.Response = httpResponse

	//separate the raw response into header and body
	RawHeader, RawBody, separator, err := SeparateHttpHeaderBody(rawResponse)
	if err != nil {
		return
	}

	uResponse.Body = RawBody
	uResponse.Separator = separator

	//detect if the raw response contains chunked encoding
	//should use a regex
	if bytes.Index(RawHeader, transferEncodingSig) >= 0 {
		buf := bytes.NewBuffer(nil)
		if httpResponse.Request != nil {
			httpResponse.Request.Method = strings.ToUpper(httpResponse.Request.Method)
		}
		text := httpResponse.Status
		if text == "" {
			text = http.StatusText(httpResponse.StatusCode)
			if len(text) == 0 {
				text = "status code " + strconv.Itoa(httpResponse.StatusCode)
			}
		}
		io.WriteString(buf, "HTTP/"+strconv.Itoa(httpResponse.ProtoMajor)+".")
		io.WriteString(buf, strconv.Itoa(httpResponse.ProtoMinor)+" ")
		io.WriteString(buf, text+"\r\n")

		uResponse.Header.Write(buf)
		RawHeader = buf.Bytes()
		if headerLen := len(RawHeader); headerLen > 2 {
			if string(RawHeader[headerLen-2:]) == "\r\n" {
				RawHeader = RawHeader[:headerLen-2]
			}
		}
		uResponse.Body = body
	}

	err = uResponse.UnzipBody()
	if err != nil {
		return
	}

	uResponse.RawHeader = RawHeader
	return
}

func SeparateHttpHeaderBody(raw []byte) (header, body, separator []byte, err error) {
	separator = HttpHeaderBodySepSig
	endOfHeader := bytes.Index(raw, separator)
	if endOfHeader < 0 {
		separator = AlternativeHttpHeaderBodySepSig
		endOfHeader = bytes.Index(raw, separator)
		if endOfHeader < 0 {
			err = ErrorIncompleteResponse
			return
		}
	}
	header = raw[:endOfHeader]
	endOfHeader += len(separator)
	body = raw[endOfHeader:]
	return
}

func ProxyFromEnvironment(addr string) (*url.URL, error) {
	if !strings.HasPrefix(addr, "http://") && !strings.HasPrefix(addr, "https://") {
		addr = "http://" + addr
	}
	u, err := url.Parse(addr)
	if err != nil {
		return nil, nil // don't care, not proxy-able.
	}
	//TODO(NOJ): This is somewhat of a hack: after seeing the source code of this
	//method, I know that the only thing they look at from the given HTTP request
	//structure is the URL, hence why that's the only thing I'm including in the
	//argument.  Look into sending the actual request here, or make this slightly
	//less hacky.
	u, err = http.ProxyFromEnvironment(&http.Request{URL: u})
	if err != nil {
		u = nil
	}
	return u, err
}

func AddrFromURL(u *url.URL, defaultPort string) string {
	addr := u.Host
	if !strings.ContainsRune(addr, ':') {
		if u.Scheme == "https" {
			addr += ":443"
		} else if u.Scheme == "http" {
			addr += ":80"
		} else {
			addr += defaultPort
		}
	}
	return addr
}
