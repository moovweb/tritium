* Text.remove() is now Text.clear() 
  * Really don't think anyone is using this anyway
  * A macro for set("")
* select("/@attribute") is gone
  * use attribute()
* select("/text()") is gone. 
  * use text()
* select("/html()") is gone.
  * use inner()
* match(/h(i)/, "p\\1i") is now atch(/h(i)/, "p$1i")