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
    
@func Node.inner(Text %html) {
  inner() {
    set(%html) 
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

# DIRECTIONALS... UGH.

@func Node.insert(Text %value) {
  insert_at(position("bottom"), %value) {
    yield()
  }
}
@func Node.insert_top(Text %value) {
  insert_at(position("top"), %value) {
    yield()
  }
}
@func Node.insert_after(Text %value) {
  insert_at(position("after"), %value) {
    yield()
  }
}
@func Node.insert_before(Text %value) {
  insert_at(position("before"), %value) {
    yield()
  }
}

@func Node.inject(Text %value) {
  inject_at(position("bottom"), %value) {
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

