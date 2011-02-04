module Tritium
  module Scope
    module NodesetModules
      module SelectionMethods
        #
        # The select function is the primary way to organize your
        # script. It represents searching the Nodeset scope its set
        # inside.
        #
        # When the select() is at the root of the document, it searches
        # the entire tree. However, when its nested, it only searches a
        # subtree of nodes.
        #
        #
        #  select("head") {
        #    select("/meta") {
        #      remove()
        #    }
        #  }
        #
        # @param [String] subtree_selector An XPath or CSS3 selector
        #
        # @yield [Scope::Nodeset] A Nodeset scope representing all of the matched elements
        # @return [nil]
        def select(selector, &block)
          child_nodeset = @nodeset.search(selector)
          #child_nodeset.each do |node|
          #  puts "Selector #{selector} matched #{node.path()}"
          #end
          if child_nodeset.size > 0
            child_scope = Scope::Nodeset.new(child_nodeset, @root, self)
            child_scope.instance_eval(&block)
          end
        end
  
        # This is a way to address a Nodeset's attributes
        # for modification purposes. There are several different
        # ways to work with this method.
        #
        # Calling this will apply to *every* node in the Nodeset.
        # Please use another select() if you'd like to only work
        # with nodes having a particular attribute.
        #
        # If you request an attribute that doesn't exist, it gets
        # created automatically. 
        #
        # You can yield to the attribute block and get an Attribute
        # scope, as described below.
        #
        #  select("img")
        #     name("a") # Renames the tag
        #     attribute("src") {
        #       name {
        #         # Changes the name of the attribute from 'src' to 'href'
        #         set("href")
        #       }
        #       value {
        #         # rewrites the value with the result of a url filter
        #         set(filter_url(text))
        #       }
        #     }
        #  }
        #
        #
        #
        # *Note*: If you are trying to delete
        # attributes, you could have a massive inefficiency if 
        # you had a huge Nodeset and then created-then-destroyed
        # attributes on all of them. Always select *only* nodes with the 
        # desired attribute before running this function.
        #
        # 
        #
        # @param [String] Name The name of the attribute
        #
        # @yield [Scope::Attribute] A found or newly created Attribute scope
        # @return [nil]
        def attribute(name, value = nil, &block)
          if name.is_a?(String)
            @nodeset.each do |node|
              if value
                node[name] = value.to_s
              end

              attribute_node = node.attributes[name]

              # If we don't have an attribute, make one!
              if attribute_node.nil?
                node[name] = ""
                attribute_node = node.attributes[name]
              end

              if block
                attribute_scope = Scope::Attribute.new(attribute_node, @root, self)
                attribute_scope.instance_eval(&block)
              end
            end
          end
        end

        def html(&block)
          @nodeset.each do |node|
            node.inner_html = open_text_scope_with(node.inner_html, &block)
          end
        end
        alias inner html
      end
    end
  end
end