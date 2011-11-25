##### Payment ######
$("/html/body") {
  add_class(" mw_checkout_payment")

  ## fix for the header - structure is different on this page
  ## bottoms lines have been modified to accomodate
  $(".//div[@id='logo']") {
    wrap("div", id: "mw_header")
    $("./a") {
      add_class("icons-logo")
      $("./img") {
        remove()
      }
    }
  }
  $(".//div[@id='sd']") {
    $("./div[@class='cta']") {
      remove()
    }
    $("./div[@class='promo']") {
      move_to("../../div[@class='summary_of_charges']")
    }
  }
  $(".//div[contains(@id, 'main')]") {
    add_class("mw_main_shopping")
  }
  $(".//span[@class='hover_modal_container']") {
    attribute("data-ur-set", "toggler")
    $("./a") {
      attribute("class", "")
      attribute("href", "javascript:void(0)")
      attribute("data-ur-toggler-component", "button")
    }
    $("./div") {
      attribute("class", "")
      attribute("data-ur-toggler-component", "content")
    }
  }
  $(".//div[@id='content']") {
    $("./h1") {
      remove()
    }

    $("./div[@id='checkout_shipping']") {
      $("./form[@id='form_checkout_billing']") {
        $("./fieldset/ol[@class='address_form']/li[label[@for='txt_area_code']]") {
          add_class("mw_phone_fields")
        }
        $(".//ul[@id='credit_card_list']") {
          remove()
        }
        $("./h2") {
          inject_before("<div class='mw_checkout_billing'></div>")
        }
        $("./h2 | ./ol[@class='existing'] | ./fieldset") {
          move_to("(preceding-sibling::div[@class='mw_checkout_billing'])[last()]")
        }
        $("./div[@id='credit_card_wrap']") {
          inject_before("<div class='mw_checkout_billing_cc'></div>")
        }
        $("./div[not(@class='actions')] | input") {
          move_to("(preceding-sibling::div[@class='mw_checkout_billing_cc'])[last()]")
        }
        $("./div[@class='actions']") {
          $("./button[@class='action_1']") {
            $("./div") {
              name("span")
            }
            inject_bottom("<span>&rsaquo;</span>")
          }
        }
      }
    }
    # $("./div[@id='checkout_shipping' and @class='existing']") {
    #   attribute("mw_what")
    #   $(".//div[@class='mw_checkout_billing_cc']") {
    #     add_class("mw_hide")
    #   }
    # }
  }
  ## ACCORDION FOR BELK REWARD DOLLARS USING THE ORIGINAL ACCORDION BUILD BY SEAN
  #$(".//li[contains(@class,'card_id')]") {
  #  $("./span[@class='hover_modal_container']") {
  #    attribute("data-ur-set", "toggler")
  #    $("./a") {
  #      attribute("class", "") # get rid of the classes here - they are keyed for hover events
  #      attribute("href", "javascript:void(0)")
  #      attribute("data-ur-toggler-component", "button")
  #    }
  #    $("./div") {
  #      attribute("class", "") # get rid of the classes here - they are keyed for hover events
  #      attribute("data-ur-toggler-component", "content")
  #    }
  #  }
  #}
  ## ACCORDION FOR BELK REWARD DOLLARS USING THE ORIGINAL ACCORDION BUILD BY SEAN
  #$(".//div[@id='rewards_dollars_wrap']") {
  #  var("accd_name",fetch("@id"))
  #  $(".//a[@id='lnk_use_reward_dollars']"){
  #    attribute("mw_accordion",$accd_name)
  #    attribute("class"," mw_accordion_button closed")
  #    attribute("href","javascript:void(0)")
  #  }
  #  $("./fieldset"){
  #    attribute("mw_accordion",$accd_name)
  #    attribute("class","mw_accordion_content closed")    
  #  }
  #  # ANOTHER ACCORDION FOR "WHAT IS THIS?" AFTER YOU SELECT BELK AS CREDIT CARD TYPE
  #  $(".//span[@class='hover_modal_container']") {
  #    attribute("data-ur-set", "toggler")
  #    move_to("//div[@id='rewards_dollars_wrap']/fieldset","after")
  #    attribute("class", "")
  #    $("./a[@class='hover_modal_a']") {
  #      attribute("data-ur-toggler-component", "button")
  #      attribute("class", "")
  #      attribute("href", "javascript:void(0)")
  #    }
  #  }
  #  $(".//div[@class='hover_modal_div']"){
  #    attribute("data-ur-toggler-component", "content")
  #    $("../.") {
  #      attribute("class", "mw_belk_rewards_tip")
  #    }
  #  }
  #}
  ##Reviews Section
  #$("//div[@id='rewards_dollars_wrap']"){
  #  $(".//legend"){
  #    attribute("class","mwRewardsDollarInfo") 
  #    name("div")
  #  }
  #}
  #
  #
  #
  ##If the user is already logged in and navigates to the checkout flow he/she will see this
  #$("//div[@id='checkout_shipping' and @class='existing']"){
  #  # This page is also used for edit
  #  # but there's an element that needs to be hidden if the user is not in edit mode
  #  $("./form/fieldset[not (ol/li/input[@id='txt_first_name'])]") {
  #    add_class("mw_hide") 
  #  }
  #  $(".//button[contains(@class,'action_3')]"){
  #    attribute("class"){
  #      value{
  #        append("  mw_back_to_bag")
  #      }
  #    }
  #  }
  #  $(".//div[@id='txt_security_number']/span[@class='hover_modal_container']") {
  #    attribute("data-ur-set", "toggler")
  #    #move_to("//div[@id='rewards_dollars_wrap']/fieldset","after")
  #    $("./a[@class='hover_modal_a']"){
  #      attribute("data-ur-toggler-component", "button")
  #      attribute("class", "")
  #      attribute("href", "javascript:void(0)")
  #    }
  #  }
  #  $(".//div[@id='txt_security_number']"){
  #    $(".//div[contains(@class,'hover_modal_div')]"){
  #      attribute("data-ur-toggler-component", "content")
  #      attribute("class", "")
  #      add_class("mw_whatsThisBelk2")
  #    }
  #  }
  #}
  #
  #
  ##ASSIGNING THE CLASS FOR THE NEXT AND BACK BUTTON IN ORDER TO PREVENT REPETITIVE CSS IN ALL THE CHECKOUT STEPS
  #$("//div[@class='actions']/button"){
  #  attribute("class","mwContinueNextStepBTN")
  #}
  #$("//div[@id='sd']"){
  #  $("./div[@class='promo']/a"){
  #      attribute("class","mwBacktoShoppingBTN")
  #  }
  #  $("./div[@class='promo']/div[@id='shipPromoMsg']"){
  #    remove()
  #  }
  #  $("./div[@class='cta']"){
  #    remove()
  #  }
  #}
}
