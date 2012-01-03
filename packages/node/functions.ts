@func position() {
  position("bottom") 
}

@func Node.copy_here(Text %xpath) {
  copy_here(%xpath, position()) {
    yield() 
  } 
}

@func Node.copy_here(Text %xpath, Text %pos) {
  copy_here(%xpath, position(%pos)) {
    yield() 
  } 
}

@func Node.copy_here(Text %xpath, Position %pos) {
  $(%xpath) {
    dup() {
      move(%pos, node(1), node(3))
      yield() 
    } 
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

