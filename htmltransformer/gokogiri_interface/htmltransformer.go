package gokogiri_interface

import (
	"gokogiri/html"
	"gokogiri/xml"
	"gokogiri/xpath"
	"time"
	ht "tritium/htmltransformer"
)

type GokogiriHtmlTransformer struct {
}

type GokogiriXmlTransformer struct {
}

type GokogiriXpathTransformer struct {
}

type XmlParseOption int

const (
	XML_PARSE_RECOVER    ParseOption = 1 << iota // recover on errors
	XML_PARSE_NOENT                              // substitute entities
	XML_PARSE_DTDLOAD                            // load the external subset
	XML_PARSE_DTDATTR                            // default DTD attributes
	XML_PARSE_DTDVALID                           // validate with the DTD
	XML_PARSE_NOERROR                            // suppress error reports
	XML_PARSE_NOWARNING                          // suppress warning reports
	XML_PARSE_PEDANTIC                           // pedantic error reporting
	XML_PARSE_NOBLANKS                           // remove blank nodes
	XML_PARSE_SAX1                               // use the SAX1 interface internally
	XML_PARSE_XINCLUDE                           // Implement XInclude substitition
	XML_PARSE_NONET                              // Forbid network access
	XML_PARSE_NODICT                             // Do not reuse the context dictionnary
	XML_PARSE_NSCLEAN                            // remove redundant namespaces declarations
	XML_PARSE_NOCDATA                            // merge CDATA as text nodes
	XML_PARSE_NOXINCNODE                         // do not generate XINCLUDE START/END nodes
	XML_PARSE_COMPACT                            // compact small text nodes; makes tree read-only
	XML_PARSE_OLD10                              // parse using XML-1.0 before update 5
	XML_PARSE_NOBASEFIX                          // do not fixup XINCLUDE xml//base uris
	XML_PARSE_HUGE                               // relax any hardcoded limit from the parser
	XML_PARSE_OLDSAX                             // parse using SAX2 interface before 2.7.0
	XML_PARSE_IGNORE_ENC                         // ignore internal document encoding hint
	XML_PARSE_BIG_LINES                          // Store big lines numbers in text PSVI field
)

func (html *GokogiriHtmlTransformer) Parse(content, inEncoding, url []byte, options XmlParseOption, outEncoding []byte) (doc ht.Document, err error) {

}
