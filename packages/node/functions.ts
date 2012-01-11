
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
      # move(this(), this(), %pos)
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
  # %parent_node = this()
  # THIS shit breaks. The linker thinks %parent_node returns text
  $(%xpath) {
    # move(%parent_node, this(), %pos)
#    move(this(), this(), %pos) # stupid, just want it to pass
    # This is borked even w the above hack. the %pos variable is interpreted as a Text type
    yield()
  }
}

@func Node.move_to(Text %xpath, Text %pos) {
  move_to(%xpath, position(%pos))
}

# DIRECTIONALS... UGH.

@func Node.insert(Text %value) {
  insert_at(position("bottom"), %value)
}
@func Node.insert_top(Text %value) {
  insert_at(position("top"), %value)
}
@func Node.insert_after(Text %value) {
  insert_at(position("after"), %value)
}
@func Node.insert_before(Text %value) {
  insert_at(position("before"), %value)
}

@func Node.inject(Text %value) {
  inject_at(position("bottom"), %value)
}
@func Node.inject_top(Text %value) {
  inject_at(position("top"), %value)
}
@func Node.inject_after(Text %value) {
  inject_at(position("after"), %value)
}
@func Node.inject_before(Text %value) {
  inject_at(position("before"), %value)
}

