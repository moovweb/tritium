class Tritium::Engines::Debug
  class Step::Node < Step
    def search(selector)
      @object.xpath(selector)
    end
    
    def select(selector)
      start = Time.now
      child_nodeset = search(selector)
      
      debug_log("Searching #{object.path} with #{selector} and found #{child_nodeset.size} matches")
      
      @debug[:search_time_ns] = ((Time.now - start) * 1000000000).to_i
      
      child_nodeset.each_with_index do |child_node, index|
        debug_log("Match ##{index + 1} at #{child_node.path}")
        @name = child_node.path
        execute_children_on(child_node)
      end
    end
    
    def remove
      debug_log("Removing #{object.path}")
      object.remove
    end
    
    def html
      debug_log("Opening the raw text HTML of #{@object.path}")
      @object.inner_html = execute_children_on(@object.inner_html)
    end
    
    def text
      @object.content = execute_children_on(@object.content)
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
      to = @object.xpath(selector).first
      return if to.nil?
      position_node(to, @object, position)
      execute_children_on(to)
    end
    
    def move_here(selector, position = "bottom")
      move(selector, @object, position)
    end
    
    def move(what, to, position)
      if what.is_a?(String)
        what = node.xpath(what)
      end

      if to.is_a?(String)
        to = node.xpath(to)
      end

      to = [to].flatten
      what = [what].flatten

      to.each do |to_target|
        what.each do |what_target|
          position_node(to_target, what_target, position)
          execute_children_on(what_target)
        end
      end
    end
    
    def copy_to(selector, position = "bottom")
      move(@object.dup, selector, position)
    end
    
    def copy_here(selector, position = "bottom")
      target = @object.xpath(selector).first
      if target.nil?
        log("copy_here(#{selector.inspect}) failed to copy.")
      else
        move(target.dup, @object, position)
      end
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