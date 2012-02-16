@func XMLNode.ur_attribute(Text %attr_modifier, Text %value) {
  attribute(concat("data-ur-", %attr_modifier), %value)
}

@func XMLNode.ur_set(Text %type) {
  ur_attribute("set", %type)
}


@func XMLNode.ur_component(Text %widget_type, Text %component_type) {
  ur_attribute(concat(%widget_type, "-component"), %component_type)
}

## Thoughts: 
## - cleanToggler() for no state? defaultToggler() for 'on' state?
## - cleanTabs() for all disabled? defaultTabs() for first pair 'on' ? nthTabs() to activate nth pair?
##   - maybe activateTab() to turn a specific tab on (but this would have to re-search)


# TOGGLER #

@func XMLNode.ur_toggler(Text %button, Text %content) {
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

# TABS #

@func XMLNode.ur_tabs(Text %button, Text %content) {
  ur_set("tabs")

  $(%button) {
    ur_attribute("state", "disabled")
    match( index(), "1" ) {
      ur_attribute("state", "enabled")
    }
    ur_component("tabs", "button")
    ur_attribute("tab-id", concat("tab", index()))
    var("button_count", index() )    
  }
  
  $(%content) {
    ur_attribute("state", "disabled")
    match( index(), "1" ) {
      ur_attribute("state", "enabled")
    }
    ur_component("tabs", "content")
    ur_attribute("tab-id", concat("tab", index()))                 
    var("content_count", index() )    
  }
  
  match($address_count) {
    not($content_count) {
      log("UR WARNING: Unequal number of tab buttons/contents")
    }
  }
}

# MAPS #

## -- add a config_map() function to set callbacks / icon / button ?

@func XMLNode.ur_map(Text %addresses, Text %descriptions, Text %canvas)  {
  ur_set("map")  

  $(%addresses) {
    ur_attribute("map", "address")
    var("address_count", index() )
  }
  
  $(%descriptions) {
    ur_attribute("map", "description")
    var("description_count", index() )    
  }  
  
  match($address_count) {
    not($description_count) {
      log("UR WARNING: Inequal number of addresses / descriptions")
    }
  }
  
  $(%canvas) {
    ur_attribute("map","canvas")
  }
  
}

@func XMLNode.ur_map(Text %addresses, Text %descriptions, Text %canvas, Text %callback)  {
  ur_attribute("callback", %callback)
  map(%addresses, %descriptions, %canvas)
}


# GEOCODE #
# CAROUSEL #
# ZOOM PREVIEW #
# SELECT LIST #
# SELECT BUTTONS #
# FONT RESIZER #
