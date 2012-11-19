"Searches the tree and selects all nodes matching **%xpath**."

@func Node.$(Text %xpath) {
  select(%xpath) {
    yield()
  }
}

@func position() {
  position("bottom") 
}

@func Node.node() {
  this() {
    yield()
  }
}

"Returns the number of the current node in relation to its siblings (e.g. $(\"./div\") { log(index()) } will return \"1\" if the div is the first div child, 2 if it is the second div child, and so on)."

@func Node.index() {
  index(this()) {
    yield()
  }
}

"Renames the current node to the tag specified by **%value**. For example, `name(\"span\")`."

@func Node.name(Text %value) {
  name() {
    set(%value)
    yield()
  }
}

"Copies the node specified by **%xpath** to the currently-selected node, at the position **%pos**."

@func Node.copy_here(Text %xpath, Position %pos) {
  %calling_node = this()
  $(%xpath) {
    dup() {
      move(this(), %calling_node, %pos)
      # same deal as below ... %pos is treated like Text
      yield() 
    }
  }
}

"Copies the node specified by **%xpath** to the currently-selected node, at the position **%pos**."

@func Node.copy_here(Text %xpath, Text %pos) {
  copy_here(%xpath, position(%pos)) {
    yield() 
  }
}

"Copies the node specified by **%xpath** to the currently-selected node."

@func Node.copy_here(Text %xpath) {
  copy_here(%xpath, position()) {
    yield() 
  } 
}


"Copies the currently-selected node to the node specified by **%xpath**, at the position **%pos**."

@func Node.copy_to(Text %xpath, Position %pos) {
  dup() {
    %calling_node = this()
    $(%xpath) {
      move(%calling_node, this(), %pos)
    }
    yield() 
  }
  
}

"Copies the currently-selected node to the node specified by **%xpath**, at the position **%pos**."

@func Node.copy_to(Text %xpath, Text %pos) {
  copy_to(%xpath, position(%pos)) {
    yield()
  } 
}

"Copies the currently-selected node to the node specified by **%xpath**."

@func Node.copy_to(Text %xpath) {
  copy_to(%xpath, position()) {
    yield()
  } 
}

"Injects HTML (specified by **%html**) into the current node. For example, `inject(\"file.html\")`."

@func Node.inject(Text %html) {
  inject_at("bottom", %html) {
    yield() 
  } 
}

"Moves the currently-selected node to the node specified by **%xpath**, at the position **%pos**."

@func Node.move_to(Text %xpath, Position %pos) {
  %parent_node = this()
  $(%xpath) {
    move(%parent_node, this(), %pos)
    yield()
  }
}

"Moves the currently-selected node to the node specified by **%xpath**, at the position **%pos**."

@func Node.move_to(Text %xpath, Text %pos) {
  move_to(%xpath, position(%pos)) {
    yield()
  }
}

"Moves the currently-selected node to the node specified by **%xpath**."

@func Node.move_to(Text %xpath) {
  move_to(%xpath, position()) {
    yield()
  }
}

"Moves the node specified by **%xpath** to the currently-selected node, at the position **%pos**."

@func Node.move_here(Text %where, Position %pos) {
  %parent = this()
  select(%where) {
    move(this(), %parent, %pos)
    yield()
  }
}

"Moves the node specified by **%xpath** to the currently-selected node, at the position **%pos**."

@func Node.move_here(Text %where, Text %pos) {
  move_here(%where, position(%pos)) {
    yield()
  }
}

"Moves the node specified by **%xpath** to the currently-selected node."

@func Node.move_here(Text %where) {
  move_here(%where, position("bottom")) {
    yield()
  }
}

# DIRECTIONALS... UGH.

" Inserts a tag (specified by **%tag**) in the currently-selected node. "

@func Node.insert(Text %tag) {
  insert_at(position(), %tag) {
    yield()
  }
}

" Inserts a tag (specified by **%tag**) at the bottom of the currently-selected node."

@func Node.insert_bottom(Text %tag) {
  insert_at(position(), %tag) {
    yield()
  }
}

" Inserts a tag (specified by **%tag**) at the top of the currently-selected node."

@func Node.insert_top(Text %tag) {
  insert_at(position("top"), %tag) {
    yield()
  }
}

"Inserts a tag (specified by **%tag**) after the currently-selected node."

@func Node.insert_after(Text %tag) {
  insert_at(position("after"), %tag) {
    yield()
  }
}

"Inserts a tag (specified by **%tag**) before the currently-selected node."

@func Node.insert_before(Text %tag) {
  insert_at(position("before"), %tag) {
    yield()
  }
}

"Injects HTML (specified by **%html**) into the current node. For example, `inject(\"file.html\")`."

@func Node.inject(Text %html) {
  inject_at(position("bottom"), %html) {
    yield()
  }
}

"Injects HTML (specified by **%html**) at the bottom of the current node. For example, `inject_bottom(\"file.html\")`."

@func Node.inject_bottom(Text %html) {
  inject_at(position("bottom"), %html) {
    yield()
  }
}

"Injects HTML (specified by **%html**) at the top of the current node. For example, `inject_top(\"file.html\")`."

@func Node.inject_top(Text %html) {
  inject_at(position("top"), %html) {
    yield()
  }
}

"Injects HTML (specified by **%html**) after the current node. For example, `inject_after(\"file.html\")`."

@func Node.inject_after(Text %html) {
  inject_at(position("after"), %html) {
    yield()
  }
}

"Injects HTML (specified by **%html**) before the current node. For example, `inject_before(\"file.html\")`."

@func Node.inject_before(Text %html) {
  inject_at(position("before"), %html) {
    yield()
  }
}

