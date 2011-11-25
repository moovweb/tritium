# observations:
# when the user chooses to create a new registry
# and signs in with an account that already has a registry,
# they are taken back to the registry page and the only option available is to find a registry

$(".//div[contains(@class, 'hover_modal_container')] | .//span[contains(@class, 'hover_modal_container')]") {
  attribute("data-ur-set", "toggler")
  attribute("class", "")
  $("./a[contains(@class, 'hover_modal_a')]") {
    attribute("class", "")
    attribute("href", "javascript:void(0)")
    attribute("data-ur-toggler-component", "button")
  }
  $("./div[contains(@class, 'hover_modal_div')]") {
    attribute("data-ur-toggler-component", "content")
  }
}
