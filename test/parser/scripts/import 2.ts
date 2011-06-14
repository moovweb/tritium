move_here(".//div[@class='something']") {
  attribute("id", "algol")
  @import nested-import.ts
  wrap("span", id: "algol-span")
}