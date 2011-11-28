# Handle "sub-group" accordions on master pages

$("div[@id='bottomArea']") {
  $("div[@id='pdpTabs']") {
    # remove 'Q & A' section
    $("div/div[@id='pdpqa']") {
      remove()
    }
    $("ul") {
      # remove 'Q & A' tab
      $("li[starts-with(@class, 'tabProductQA')]") {
        remove()
      }
      # EXPLICIT: li[contains(@class, 'tabsHeader')]
      $("li") {
        attribute("data-ur-set", "toggler")
        $("a") {
          attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
          insert("span", "+", class: "mvPlus")
          insert("span", "&minus;", class: "mvMinus")
        }
        $("a[@href='#pdpreviews']") {
          attribute("href", "#pdpreviewsTabContent")
        }
        # EXPLICIT: ../../div[@class='yui-content']
        move_here("../../div/div[1]") {
          attributes(data-ur-toggler-component: "content", data-ur-state: "disabled")
        }
        # EXPLICIT: div[@id='memberProductDetails']/div[@id='prdDesc']/ul[@id='bullets']/...
        $("div[@id='memberProductDetails']/div[@id='prdDesc']/ul/li[a[contains(@href, 'podcast')]]") {
          # remove video links
          remove()
        }
        # EXPLICIT: div[@id='pdpshipping']/div[@id='pdpshippingNreturn']/ul[@class='prodInfoList']/...
        $("div[@id='pdpshipping']/div/ul/li/span[@class='shippingNreturn']") {
          #attribute("onclick") {
          #  value() {
          #    replace(/.*?('.*?').*/m, "window.location=\\1")
          #  }
          #}
        }
        # master pages
        $("div[@id='collectionItems']") {
          attribute("data-ur-state", "enabled")
          $("div[@id='pdpAttributes']") {
            $("div[@class='memberProducts'] | div[@id='pdpAttributes'][not(div[@id='memberGroupLatches'])]/div") {
              @import _product-item-acc.ts
            }
            # for master pages with subheaders
            # EXPLICIT: h1[@class='productHeader']
            $("h1") {
              attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
              add_class("mvDarkGrayBar")
              insert("span", "+", class: "mvPlus")
              insert("span", "&minus;", class: "mvMinus")
              wrap("div", class: "mw_sub_acc", data-ur-set: "toggler") {
                insert("div", data-ur-toggler-component: "content", data-ur-state: "disabled")
              }
            }
            $("div[@class='memberProducts']") {
              move_to("preceding-sibling::div[@class='mw_sub_acc'][1]/div")
            }
            # for master pages with groups
            $("div[@id='pdpAttributes'][div[@id='memberGroupLatches']]") {
              # EXPLICIT: div[@id='masterGroupLatches']/ul[@class='latches']/li[starts-with(@class, 'horizontal latch')]
              $("div[@id='memberGroupLatches']") {
                $("div[@class='latchName']") {
                  remove()
                }
                # EXPLICIT: ul[@class='latches']
                $("ul") {
                  # EXPLICIT: li[contains(@class, 'latch')]
                  $("li") {
                    attribute("data-ur-set", "toggler")
                    var("member_id", fetch("@id"))
                    $("div[1]") {
                      add_class("mvDarkGrayBar")
                      attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
                      insert("span", "+", class: "mvPlus")
                      insert("span", "&minus;", class: "mvMinus")
                    }
                    insert("div", data-ur-toggler-component: "content", data-ur-state: "disabled")
                  }
                  $("li[1]/div[@data-ur-toggler-component='content']") {
                    move_here("../../../../div[starts-with(@class, 'memberProducts')]") {
                      @import _product-item-acc.ts
                    }
                    inner_wrap("div", id: "mw_master_wrapper")
                  }
                }
              }
            }
          }
        }
      }
      # move product details section down into accordion
      $("li[starts-with(@class, 'tabCollectionItems')]") {
        move_here("../../../../div[@id='productDescription']/div[@id='productDetails']", "after") {
          name("li")
          attribute("data-ur-set", "toggler")
          add_class("tabsHeader")
          # EXPLICIT: ul[@id='bullets']/li/a[contains(@href, 'podcast')]
          $("ul/li[a[contains(@href, 'podcast')]]") {
            # remove video links
            remove()
          }
          inner_wrap("div", data-ur-toggler-component: "content", data-ur-state: "disabled")
          move_here("div/div[@id='productDetailsHeader']", "top") {
            name("a")
            attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
            insert("span", "+", class: "mvPlus")
            insert("span", "&minus;", class: "mvMinus")
          }
        }
      }
    }
  }
  # EXPLICIT: .../div[@class='registryContinueBtn']
  $("div[@id='errorMsgPanel']/div[contains(@class, 'registryErrorMsgPanelFt')]/div") {
    add_class("mvRedBtn")
  }
}
