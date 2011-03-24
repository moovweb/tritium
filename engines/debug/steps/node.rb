class Tritium::Engines::Debug
  class Step::Node < Step
    def search(selector)
      @object.xpath(selector)
    end
    
    def select(selector)
      start = Time.now
      child_nodeset = search(selector)
      
      log("Searching #{object.path} with #{selector} and found #{child_nodeset.size} matches")
      
      @debug[:search_time_cs] = ((Time.now - start) * 10000).to_i
      
      child_nodeset.each_with_index do |child_node, index|
        log("Entering #{selector} match ##{index + 1} at #{child_node.path}")
        @name = child_node.path
        execute_children_on(child_node)
        log("Finishing #{selector} match ##{index + 1} at #{child_node.path}")
      end
      
      log("Closing #{selector}")
    end
    
    def remove
      log("Removing #{object.path}")
      object.remove
    end
    
    def html
      log("Opening the raw text HTML of #{@object.path}")
      @object.inner_html = execute_children_on(@object.inner_html)
    end
    
    def attribute(name)
      attribute_node = @object.attributes[name]
      if attribute_node.nil?
        @object[name] = ""
        attribute_node = @object.attributes[name]
      end
      
      @object.attributes[name] = execute_children_on(attribute_node)
    end
    
    def move_to(selector, position = "bottom")
      target_node = search(selector).first
      return nil if target_node.nil?

      position_node(target_node, @object, position)

      execute_children_on(target_node)
      @object
    end
    
    def name
      @object.name = execute_children_on(@object.name)
    end
    
    # Simply opens a Positional block
    # We don't have to do anything, because this engine works with the ExpansionReader
    # which has turned
    #
    #
    #  bottom {
    #    action
    #  }
    #
    # into
    #
    #  var('position', 'bottom')
    #  positioned {
    #    action
    #  }
    def position
      execute_children_on(@object)
    end
  end
end