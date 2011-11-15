# for webinc.belkqaa.com
$("/html/body[contains(@class, 'mw_redesign')]") {
  attribute("mw_what")
  $("./div[@id='wrapper']/div[@id='page']/div[@id='article']") {
    $("./div[@class='gels']") {
      remove()
    }
    $("./div[contains(@class, 'hero')]") {
      $("./div[@class='landForms']") {
        attribute("id", "mw_bridal_reg")
        $("./form") {
          attribute("data-ur-toggler-component", "content")
          wrap("div") {
            attribute("data-ur-set", "toggler")
            insert_top("div") {
              attribute("data-ur-toggler-component", "button")
              $("../form[@class='findForm']") {
                $("../div") {
                  insert_bottom("div", "Find a Registry", class: "mw_nav_text")
                }
                $("./div[@class='wedRegLandRow']") {
                  $("./button") {
                    text("Find")
                  }
                  $("./span[@id='spn_registry_num']") {
                    $("./select") {
                      attribute("style", "")
                    }
                  }
                }
                # take all the labels and input and strip their style attribute
                $(".//label | .//input[@type!='submit']") { # submit button is exception
                  attribute("style") {
                    remove()
                  }
                }
              }
              $("../form[@class='wedRegLandCreateForm']") {
                $("../div") {
                  insert_bottom("div", "Create a Registry", class: "mw_nav_text")
                }
                $("./button") {
                  text("Create")
                }
              }
              $("../form[@class='wedRegLandManageForm']") {
                $("../div") {
                  insert_bottom("div", "Manage Your Registry", class: "mw_nav_text")
                }
                $("./button") {
                  text("Manage")
                }
              }
            }
            $("./div") {
              insert_bottom("div", class: "icons-nav_arrow_dn")
              insert_bottom("div", class: "icons-nav_arrow_up")
            }
          }
        }
      }
    }
  }
}

$("/html/body[not (contains(@class, 'mw_redesign'))]") {
  $("./ul") {
    attribute("id", "mw_bridal_reg")
    $("./li") {
      attribute("data-ur-set", "toggler")
      $("./h2") {
        attribute("data-ur-toggler-component", "button")
        inner_wrap("div", class: "mw_nav_text")
        inject_bottom("<div class='icons-nav_arrow_dn'></div>")
        inject_bottom("<div class='icons-nav_arrow_up'></div>")
      }
      $("./div[@class='section']") {
        attribute("data-ur-toggler-component", "content")
        $("./form") {
          #var("frmQueryParam"){
          #  set(fetch("@name"))
          #}
          #var("frmURL"){
          #  set(fetch("@action"))
          #  append("?mw_form=")
          #  append($frmQueryParam)
          #}
          #attribute("action", $frmURL)
          $("./ul") {
            $("./li") {
              $("./a[contains(.,'Forgot your Password')]") {
                $("../.") {
                  add_class("mw_forgot_pass")
                }
              }
            }
          }
        }
      }
    }
    $(".//button[@name='find' or @name='create' or @name='go']") {
      add_class("mwContinueNextStepBTN")
    }
    
    # the go button is a background image on the desktop site, needs text
    # convention on the desktop site for the other buttons is <button><div>Button Text</div></button>
    $(".//button[@name='go']") {
      attribute("value", "Go")
      inject_bottom("<div>Go</div>")
    }
  }
}

