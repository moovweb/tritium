inject_top("<ul class=\"mw_subscription_breadcrumbs\"></ul>")

$("./ul[@class='mw_subscription_breadcrumbs']") {
  inject_bottom("<li><a href=\"#\">Select A Plan</a></li>")
  inject_bottom("<li><a href=\"#\">Payment Info</a></li>")
  inject_bottom("<li><a href=\"#\">Order Confirmation</a></li>")
}