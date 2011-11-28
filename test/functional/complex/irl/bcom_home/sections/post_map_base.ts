# Spriting
$("body") {
  $(".//div[@class='mvHeaderWrapper']") {
    $(".//div[@class='bl_nav_top_logo']/a") {
      add_class("to_be_sprited-bloomingdales")
    }
    $(".//div[@class='bl_nav_top_sub_search_go']") {
      $("./input[@class='bl_nav_top_sub_search_go']") {
        add_class("to_be_sprited-go")
      }
    }
  }
  $(".//div[@class='mvBDFooterText']") {
    $(".//div[@id='mvPhoneIcon']") {
      add_class("to_be_sprited-phoneimg")
    }
  }
  $(".//div[contains(@class, 'mvRegistryLinkWrap')]") {
    $("./div[contains(@class, 'mvRegistryLink')]") {
      $("./div[not(contains(@class, 'mw_accord_icon'))]") {
        add_class("to_be_sprited-regestry")
      }
    }
  }
  $(".//div[contains(@class, 'mvBloomMenuHeader') and not(@id='mvBDBloomiesLink')]") {
    inject_bottom("<div class = 'mw_accord_icon to_be_sprited-pluss'></div>")
    # but we want the catalog to be open
    $("./span[contains(text(), 'catalog')]") {
      $("../div[contains(@class,'to_be_sprited-pluss')]") {
        $("./@class") {
          text() {
            replace(/to_be_sprited-pluss/, "to_be_sprited-minus")
          }
        }
      }
    }
  }
  $(".//div[@id='mvBDBloomiesLink']/a") {
    $("./img") {
      name("div")
      attribute("src", "")
      add_class("sprite_cat-z_bloom_logo_small")
    }
  }
  $(".//div[contains(@class, 'mw_master_prod_header')]") {
    inject_bottom("<div class = 'mw_accord_icon to_be_sprited-pluss'></div>")
  }
  $(".//div[contains(@class, 'mvBDAccordionContent' )]/div") {
    $("./a") {
      inject_bottom("<div class = 'to_be_sprited-rightArrow'></div>")
    }
  }
  $(".//div[@class='bl_nav_top_bag_text']") {
    $(".//a[@class='top_nav_link']") {
      inject_bottom("<div class = 'to_be_sprited-rightArrow'></div>")
    }
  }
  $(".//div[contains(@class, 'gn_left_nav_top')]/a") {
    inject_bottom("<div class = 'to_be_sprited-rightArrow'></div>")
  }
  $(".//div[contains(@class, 'mvUlGroup')]") {
    $(".//li[@class='gn_left_nav2_standard']/a") {
     insert_bottom("div", class: "to_be_sprited-rightArrow") 
    }
  }
}