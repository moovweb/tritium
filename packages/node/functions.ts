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

@func Node.index() {
  index(this()) {
    yield()
  }
}

@func Node.name(Text %value) {
  name() {
    set(%value)
    yield()
  }
}

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

@func Node.copy_here(Text %xpath, Text %pos) {
  copy_here(%xpath, position(%pos)) {
    yield() 
  }
}

@func Node.copy_here(Text %xpath) {
  copy_here(%xpath, position()) {
    yield() 
  } 
}

// Copy some shit
@func Node.copy_to(Text %xpath, Position %pos) {
  dup() {
    %calling_node = this()
    $(%xpath) {
      move(%calling_node, this(), %pos)
    }
    yield() 
  }
  
}
@func Node.copy_to(Text %xpath, Text %pos) {
  copy_to(%xpath, position(%pos)) {
    yield()
  } 
}

@func Node.copy_to(Text %xpath) {
  copy_to(%xpath, position()) {
    yield()
  } 
}

@func Node.inject(Text %html) {
  inject_at("bottom", %html) {
    yield() 
  } 
}
    
@func Node.move_to(Text %xpath, Position %pos) {
  %parent_node = this()
  $(%xpath) {
    move(%parent_node, this(), %pos)
    yield()
  }
}

@func Node.move_to(Text %xpath, Text %pos) {
  move_to(%xpath, position(%pos)) {
    yield()
  }
}

@func Node.move_to(Text %xpath) {
  move_to(%xpath, position()) {
    yield()
  }
}

@func Node.move_here(Text %where, Position %pos) {
  %parent = this()
  select(%where) {
    move(this(), %parent, %pos)
    yield()
  }
}

@func Node.move_here(Text %where, Text %pos) {
  move_here(%where, position(%pos)) {
    yield()
  }
}

@func Node.move_here(Text %where) {
  move_here(%where, position("bottom")) {
    yield()
  }
}

# DIRECTIONALS... UGH.

@func Node.insert(Text %tag) {
  insert_at(position(), %tag) {
    yield()
  }
}
@func Node.insert_bottom(Text %tag) {
  insert_at(position(), %tag) {
    yield()
  }
}
@func Node.insert_top(Text %tag) {
  insert_at(position("top"), %tag) {
    yield()
  }
}
@func Node.insert_after(Text %tag) {
  insert_at(position("after"), %tag) {
    yield()
  }
}
@func Node.insert_before(Text %tag) {
  insert_at(position("before"), %tag) {
    yield()
  }
}

@func Node.inject(Text %html) {
  inject_at(position("bottom"), %html) {
    yield()
  }
}
@func Node.inject_bottom(Text %html) {
  inject_at(position("bottom"), %html) {
    yield()
  }
}
@func Node.inject_top(Text %value) {
  inject_at(position("top"), %value) {
    yield()
  }
}
@func Node.inject_after(Text %value) {
  inject_at(position("after"), %value) {
    yield()
  }
}
@func Node.inject_before(Text %value) {
  inject_at(position("before"), %value) {
    yield()
  }
}

