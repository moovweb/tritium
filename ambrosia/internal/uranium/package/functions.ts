@func XMLNode.ur_attribute(Text %attr_modifier, Text %value) {
  attribute(concat("data-ur-", %attr_modifier), %value)
}

@func XMLNode.ur_set(Text %type) {
  ur_attribute("set", %type)
}


@func XMLNode.ur_component(Text %widget_type, Text %component_type) {
  ur_attribute(concat(%widget_type, "-component"), %component_type)
}


@func XMLNode.toggler(Text %button, Text %content) {
      ur_set("toggler")
      $(%button) {
                 ur_component("toggler", "button")
                 ur_attribute("state", "disabled")
      }
      $(%content) {
                 ur_component("toggler", "content")
                 ur_attribute("state", "disabled")
      }
}
