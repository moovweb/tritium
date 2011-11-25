var("old_phone", "false")
match($user_agent, /Android 2\.(1|2)/) {
  var("old_phone", "true")
}
html() {
  $("html") {
    $("head") {
      insert("meta", id: "mw_link_rewriter_config", matcher: $rewrite_link_matcher_str, replacement: $rewrite_link_replacement)
    }
    $("body") {
      attribute("id", "mw_product_new")
      # changing this input is easier than rewriting many js functions to use mobile site
      $("input[@id='MACYS_baseHostName']") {
        attribute("value") {
          value() {
            rewrite("link")
          }
        }
      }
      # extract js variable
      $("script[not(@src or @language)][1]") {
        # if clickable_swatch is true, then there are actual product images corresponding to the swatches
        var("clickable_swatch", fetch("text()")) {
          replace(/.*MACYS\.pdp\.imageZoomer\.clickableSwatch = "/m, "")
          replace(/".*/m, "")
        }
      }
      $("div[@id='doc3']/div[@id='bd']") {
        # EXPLICIT: div[@id='pdpRoot']/div[@class='pdpMain']
        $("div[@id='pdpRoot']/div") {
          $("div[@id='pdpBreadcrumb']") {
            attribute("onclick", "history.go(-1)")
            text("back")
            inner_wrap("div")
          }
          # occasional banner
          $("div[@id='pdpEasyReturns']") {
            remove()
          }
          $("div[@id='pdpDetails']") {
            # when the product is 'currently unavailable'
            $("div[@class='productImageSection']/img") {
              attribute("src") {
                value() {
                  replace(/\?.*/, "")
                  append("?wid=290&qlt=90,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg&bgc=255,255,255")
                }
              }
            }
            $("div[@id='imageZoomer']") {
              add_class("old_phone")
              match($old_phone, "false") {
                attributes(class: "", data-ur-set: "carousel", data-ur-id: "pdp")
              }
              insert_top("a", class: "mvGalleryNextBtn", data-ur-carousel-component: "button", data-ur-carousel-button-type: "next", data-ur-state: "enabled")
              insert_top("a", class: "mvGalleryPrevBtn", data-ur-carousel-component: "button", data-ur-carousel-button-type: "prev", data-ur-state: "disabled")
              $("noscript") {
                name("div")
                attributes(id: "mw_img_container", data-ur-carousel-component: "scroll_container")
                var("shared_url", fetch("img/@src")) {
                  replace(/_.*/, "_")
                }
                # EXPLICIT: ul[@id='altImages']/li/img
                move_here("ul/li/img")
                $("img") {
                  attributes(class: "mw_main_img", data-ur-carousel-component: "item")
                  attribute("src") {
                    value() {
                      replace(/wid=\d+/, "wid=290")
                    }
                  }
                }
                $("img[last()]") {
                  add_class("mw_main_last")
                }
                match($clickable_swatch, "true") {
                  copy_here("../../div[@id='productDescription']/div[@id='productBox']/div[@id='pdpAttributes']/div[@class='colors']/ul/li/input") {
                    name("img")
                    attribute("value") {
                      name("src")
                      value() {
                        replace(/.*\//, "")
                        prepend($shared_url)
                        append("?wid=290&qlt=90,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg&bgc=255,255,255")
                      }
                    }
                    attribute("value", fetch("@id")) {
                      value() {
                        replace(/_imgurl/, "")
                      }
                    }
                    attributes(id: "", class: "mw_swatch_img")
                  }
                  $("img[@class='mw_swatch_img'][1]") {
                    attribute("data-ur-carousel-component", "item")
                  }
                }
                wrap("div", data-ur-carousel-component: "view_container", data-ur-touch: "disabled")
                $("ul") {
                  remove()
                }
              }
              $("self::*[div/div/img[last() = 1]]/a") {
                remove()
              }
              $("self::*[div/div/img[1][contains(@class, 'mw_main_last')]]/a[@class='mvGalleryNextBtn']") {
                remove()
              }
            }
            $("div[@id='productDescription']") {
              $("div[@id='productBox']/div[@id='orderByPhone']/..") {
               add_class("mvOrderByPhoneContainer")
              }
              # for currently unavailable products
              $("div[not(@id) or @id='notavailablePdpreviews']") {
                move_to("../../div[@class='productImageSection']", "before")
              }
              # move title/id to top
              $("div[@class='onlyAtMacysProdInfo' or @id='newProduct']") {
                $("div[@class='productID']") {
                  text() {
                    replace(/^\u00a0/, "")
                  }
                }
                move_to("../../div[@id='imageZoomer']", "before")
              }
              # copy price to top of page
              $("div[@id='priceInfo']") {
                copy_to("/html/body/div/div/div/div/div/div[@id='imageZoomer']", "before") {
                  attribute("id", "priceInfo2")
                  $("div[span[@class='priceSale']]/span[1]") {
                    remove()
                  }
                  $("div/input | div/span[@class='priceSaleEndText' or @class='pricingPolicy']") {
                    remove()
                  }
                  $("div[@class='standardProdPricingGroup']") {
                    $("span[last()]") {
                      name("div")
                    }
                    $("span") {
                      remove()
                    }
                  }
                }
                # EXPLICIT: div[@class='standardProdPricingGroup']/input[@id='policyURL']
                $("div/input[@id='policyURL']") {
                  attribute("value") {
                    value() {
                      rewrite("link")
                    }
                  }
                }
              }
              # EXPLICIT: div[@id='productBadges']/div[@class='badge']/a[@href='#pdpTabs']
              $("div[@id='productBadges']/div/a") {
                attribute("href", "#pdpoffers")
              }
              $("div[@id='pdpreviews']") {
                $("div[@id='BVQASummaryContainer']") {
                  remove()
                }
                # fb, twitter links
                move_here("../div[@id='productBox']/div[@id='socialLinks']/div[@id='BVRRSecondarySummaryContainer']")
                move_to("../../div[@id='imageZoomer']", "before")
              }
              # for master page
              $("div[@id='viewCollectionItemsButton']") {
                remove()
              }
              $("div[@id='expand']/span[@id='toggleImgs']") {
                  remove()
              }
              $("div[@id='productBox']") {
                move_here("div[@id='pdpAttributes']", "top") {
                  $("div[starts-with(@class, 'pdpShipDays')]") {
                    move_here("../../div[@id='pdpButtons']/div[@id='pdpQty']", "before")
                    move_here("../../../div[@id='productBadges']", "before")
                  }
                }
                move_here("../div[@id='productBadges']", "before")
                $("div[@id='pdpButtons']") {
                  # EXPLICIT: .../div[@class='registryContinueBtn']
                  $("div[@id='errorMsgPanel']/div[contains(@class, 'registryErrorMsgPanelFt')]/div") {
                    add_class("mvRedBtn")
                  }
                  # EXPLICIT : .../div[@class='registryDivButton']
                  $("div[@id='addToRegistryModal']/div[@class='divCart_wrapper']/div[@class='divCart_bottom']/div") {
                    $("input[@id='continueShopping']") {
                      add_class("mvDarkBtn")
                    }
                    $("input[@id='viewRegistry']") {
                      add_class("mvRedBtn")
                    }
                  }
                  insert("div", class: "mw_bag_buttons") {
                    copy_here("../../../div[@id='priceInfo']/div[@class='standardProdPricingGroup']") {
                      $("input") {
                        remove()
                      }
                    }
                    move_here("../img[@class='addToBagButton']") {
                      attribute("src", asset("buttons/addToBag.png", "image"))
                    }
                    move_here("../img[@id='updateButton']") {
                      attribute("src", asset("buttons/updateBag.png", "image"))
                    }
                    move_here("../img[@id='addAnotherButton']") {
                      attribute("src", asset("buttons/addAnotherToShoppingBag.png", "image"))
                    }
                    move_here("../img[starts-with(@id, 'ADDTOREGISTRY')]") {
                      attribute("src", asset("buttons/addToRegistry.png", "image"))
                    }
                    move_here("../img[starts-with(@id, 'finditinstore')]") {
                      attribute("src", asset("buttons/findInStore.png", "image"))
                    }
                    # make buttons look clickable
                    $("img") {
                      attribute("onclick", "void(0)")
                    }
                    move_here("../div[@class='onlineExclusiveText']")
                    move_here("div[@class='standardProdPricingGroup']/span[@class='priceSaleEndText']") 
                    move_here("div[@class='standardProdPricingGroup']/span[@id='pricingPolicyPopup']") {
                      attribute("id", "mw_pricingPolicyPopup")
                    }
                  }
                }
                # used on 'order by phone' pdp
                $("ul[@id='orderByPhoneButtons']") {
                  add_class("mw_bag_buttons")
                  move_here("../div[@id='orderByPhone']")
                  copy_here("../../div[@id='priceInfo']/div[@class='standardProdPricingGroup']", "top") {
                    $("input") {
                      remove()
                    }
                    $("span[@id='pricingPolicyPopup']") {
                      attribute("id", "mw_pricingPolicyPopup")
                      move_to("../..")
                    }
                  }
                  # EXPLICIT: li[1]/img[@id='orderByPhoneImage']
                  $("li[1]/img") {
                    attributes(id: "", src: asset("buttons/clickToCall.png", "image"))
                    wrap("a", href: "tel:800-289-6229")
                  }
                  # EXPLICIT: li[@class='findinstore']/img[starts-with(@id, 'finditinstore')]
                  $("li[@class='findinstore']/img") {
                    attribute("src", asset("buttons/findInStore.png", "image"))
                  }
                }
                $("div[@id='socialLinks']/div[@id='emailAndPrint']") {
                  # change all id's in here to 'emailImage' because their js looks for this particular id
                  attribute("id", "emailImage")
                  # make button look clickable
                  attribute("onclick", "console.log('')")
                  $("img[@id='emailImage']") {
                    attribute("src", asset("css/email.jpg", "image"))
                  }
                  insert("span", "Email To A Friend", id: "emailImage")
                  $("img[@id='printButton' or @id='shareSpacerRight']") {
                    remove()
                  }
                }
                # EXPLICIT: div[@id='bottomArea']/div[@id='pdpTabs']/div/div[@id='collectionItems']/div[@class='pricingPolicyInfo']
                move_here("../../div[@id='bottomArea']/div[@id='pdpTabs']/div/div/div[@class='pricingPolicyInfo']") {
                  # EXPLICIT: span[@id='pricingPolicyPopup']/input[@id='pricingPolicyURL']
                  $("span/input") {
                    attribute("value") {
                      value() {
                        rewrite("link")
                      }
                    }
                  }
                }
              }
              # color swatches
              $("div[@id='productBox']/div[@id='pdpAttributes'] | div[@id='masterColorSelection']") {
                @import _product-selections.ts
              }
            }
            # for in-stock items
            @import _product-acc.ts
            # EXPLICIT: .../div[starts-with(@class, 'registryClaimButton')]/div/input[@id='createRegistryButton' or @id='accessRegistryButton']
            #$("div[@id='bottomArea']/div[@id='registryClaim']/form/div[@class='registryClaimBody']/div[@class='registryClaimButtons']/div/div/input") {
            #  add_class("mvRedBtn")
            #}
            $("div[@id='bottomArea']/div[@id='pdpMasterAddToRegistryPanel']/div[@id='m_atr_buttons']") {
              $("img") {
                name("div")
                add_class("mvGrayBtn")
              }
              $("div[@id='m_atr_add_more']") {
                text("Add More")
              }
              $("div[@id='m_atr_view_my_registry']") {
                text("View Registry")
              }
            }
          }
          # for out-of-stock items
          @import _product-acc.ts
        }
        # EXPLICIT: div[@id='findItInStore']/div[@id='storeav-oy']/...
        $("div[@id='findItInStore']/div/div/div[@id='overlay-bd']") {
          $("div[@class='ovr-hdr cfx']") {
            move_here("div[1]")
          }
          # EXPLICIT: div[@class='ovr-bd-out']/form[@id='locatorForm']
          $("div[@class='ovr-bd-out']/form") {
            $("div[@class='ovr-bd-in']/div[@id='saData']/div[@id='srch-frm']") {
              move_here("div[@class='ovr-infrmb']")
            }
            $("div[@id='cont-frm2']") {
              move_here("div[starts-with(@class, 'submit-btn')]", "top") {
                add_class("mvRedBtn")
              }
            }
          }
        }
      }
      $("div[@id='pdpMasterAddToBagPanel']/div[@id='m_atb_buttons']") {
        $("img") {
          name("div")
          add_class("mvGrayBtn")
        }
        $("div[@id='m_atb_add_more']") {
          text("Add More")
        }
        $("div[@id='m_atb_checkout']") {
          text("Checkout")
        }
      }
      $("div[@id='pdpAddToBagPanel']") {
        # EXPLICIT: .../div[@class='rightCol']/div[@class='ftButtons']
        $("div[@class='bd']/div[@id='atb_content']/div[@id='atb_footer']/div[@class='rightCol']/div") {
          $("img[@id='btnContinueShopping']") {
            attribute("src", asset("buttons/continueShopping.png", "image"))
          }
          $("img[@id='btnCheckout']") {
            attribute("src", asset("buttons/checkout.png", "image"))
          }
        }
      }
      
     inject_top("<script type='text/javascript'>document.cookie='GCs=CartItem1_92_03_87_UserName1_92_4_02_;'</script>")
    
    }
  }
}
