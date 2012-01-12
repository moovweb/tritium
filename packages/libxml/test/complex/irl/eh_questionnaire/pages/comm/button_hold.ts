# Add the forward back sub nav
insert_before("div", id: "mw_subnav")
$("//ul[@class='sub-nav']") {
  move_to("//div[@id='mw_subnav']")
}
insert_before("div", class: "mw_hr")
insert_after("div", class: "mw_hr")
