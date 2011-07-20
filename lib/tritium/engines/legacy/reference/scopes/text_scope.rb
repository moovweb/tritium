require_relative '../scope'

module Tritium::Engines::Reference::Scope
  class Text < Base
    attr :text

    # @private
    def initialize(text, root = nil, parent = nil)
      @text = text
      @root = root || self
      super
    end

    def set(text)
      @text = text
    end

    def replace(matcher, &block)
      if matcher.is_a? String
        matcher = Regexp.new(matcher)
      end

      @text.gsub!(matcher) do |match|
        $~.captures.each_with_index do |arg, index|
          var("#{index + 1}", arg)
        end
        (replace = open_text_scope_with("", &block)) if block
        
        # Find all instances of "\\1" and similar, and replace them with var('1') (and similar, obvs)
        replace.gsub(/[\\\$]([\d])/) do |var_match|
          var($1)
        end
      end 
    end
  
    def remove(matcher = nil)
      if matcher
        replace(matcher, "")
      else
        @text = ""
      end
    end
    
    def doc(type = 'xhtml', &block)
      parser_klass = Tritium::Engines.xml_parsers[type]
      doc = parser_klass.parse(@text)
      node_scope = Tritium::Engines::Reference::Scope::Node.new(doc, @root, self)
      node_scope.instance_eval(&block) if block
      @text = node_scope.node.send("to_" + type)
    end
    
    def xml(&block)
      doc "xml", &block
    end
    def xhtml(&block)
      doc "xhtml", &block
    end
    def html_fragment(&block)
      doc "html_fragment", &block
    end
    def html(&block)
      doc "html", &block
    end
  
    def append(text)
      @text << text
    end

    def prepend(text)
      @text.insert(0,text)
    end
  end
end
