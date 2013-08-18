# This test case failed was written because it fails with this error:
# xmlXPathCompOpEval: function not_matcher not found on script line 3 on script line 3 
html() {
  $("//*[contains(@class, 'xxx') and not(contains(@class, 'yyy'))]") {
    remove()
  }
}