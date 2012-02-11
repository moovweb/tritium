set("<doc><one /><two /><two /></doc>")
xml() {
  $one = select("//one")
  $two = select("//two")
  $three = select("/doc/*")
}
set($one + $two + $three)