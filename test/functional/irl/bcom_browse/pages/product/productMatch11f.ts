$("/html"){
  log("---> using productMatch11f.ts")
  $("//comment()[contains(., 'Page')]"){
     text(){
       replace(/page:\s+?.+?-\s(\w.+?)\n/mi){
        $page_message = concat("\n\nthe product page type is: ", $1, "\n")
        log($page_message)
        $page_type = $1
      }
    }
  }
  # $page_type = "member"
  # $("//div[contains(@class, 'pdp_pricetc_master')]"){
  #   $page_type = "master"
  # }
  # log(concat("\n\n\n", $page_type))
  $("./body"){
    add_class("mw_product_page")
  
    match($path) {
      with(not(/CategoryID\=(3954|3955)/)) {
        log("--> Import product_base.ts")
        @import product_base.ts   
      }
    }

    match($page_type){
      with(/member/i){
        log("member product page selected")
        add_class("mw_member_product")
        log("--> Import member.ts")
        @import member.ts
      }
      with(/master/i){
        log("master product page selected")
        add_class("mw_master_product")
        log("--> Import master.ts")
        @import master.ts
      }
      else(){
        match($path){
          with(/CategoryID\=(3954|3955)/){
            add_class("mw_master_product mw_member_product mw_gift_card")
            log("--> Import product.ts")
            @import product.ts
            log("--> Import gift_card.ts (gift card page)")
            @import gift_card.ts
          }
          else(){
            add_class("mw_old_product")
            log("defaulting to old product page")
            log("--> Import product.ts")
            @import product.ts
            log("--> Import gift_card.ts (old product page)")
            @import gift_card.ts
          }
        }
      }
    }
    # Spriting
    $(".//div[@id='pdp_main']") {
      $(".//div[@class='pdp_atb_main']") {
        $("./img") {
          remove()
        }
      }
    }
    $(".//div[@id='mw_carousel_wrap']") {
      $("./div[@ps_button = 'prev']") {
        inject_bottom("<div class = 'sprite_cat-LArrow'></div>")
      }
      $("./div[@ps_button = 'next']") {
        inject_bottom("<div class = 'sprite_cat-RArrow'></div>")
      }
    }
    
    
  }
}