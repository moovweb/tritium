class Tritium::Engines::Debug
  class Step::Attribute < Step
    def remove
      @object.remove
    end

    def name
      @object.name = execute_children_on(@object.name)
    end

    def value
      @object.value = execute_children_on(@object.value)
    end
  end
end