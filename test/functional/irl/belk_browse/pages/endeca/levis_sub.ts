$("/html") {
  $(".//link[@mw_keep]") {
    remove()
  }
  $("./body") {
    add_class("mw_levis_sub")
    add_class("mw_featured_shop")
    $("./div[@id='page_wrapper']/div[@id='page']") {
      $("./div[@id='head' or @id='header']") {
        $(".//div[@class='nav']") {
          remove()
        }
        $(".//div[@id='promo']") {
          remove()
        }
      }
      $("./div[@id='main']") {
        $("./div[@id='content']") {
          $("./div[@id='lbs']") {
            $("./div[@class='wrapper' or @id='holdMe']") {
              $("./div[contains(@class, 'landing-page') or @id='wrapThis']") {
                $("./div[@class='nav' or @id='mainNav']") {
                  remove()
                }
                $("./div[@class='content' or @id='mainContent']") {
                  $(".//img") {
                    remove()
                  }
                  $("./div[@id='overlay']") {
                    $("./div[@id='extTop']") {
                      remove()
                    }
                    $("./div[@id='extBtm']") {
                      remove()
                    }
                    $("./div[@id='extMid']") {
                      attribute("style", "")
                      $("./a") {
                        $linkText = fetch("./@href")
                        $linkText {
                          replace(/\/([-\w]+)\.jsp/, "$1")
                        }
                        $linkText = $1
                        log("*******************")
                        log($linkText)
                        log("*******************")
                        insert_bottom("div", class: "mw_nav_text", $linkText)
                        insert_bottom("div", class: "icons-subnav_arrow_right")
                        wrap("div", class: "mw_levis_link")
                        $("./img") {
                          remove()
                        }
                      }
                    }
                  }
                  $("./a") {
                    $linkText = fetch("./@href")
                    $linkText {
                      replace(/\/([-\w]+)\.jsp/, "$1")
                    }
                    $linkText = $1
                    #inner($linkText)
                    #inner() {
                    #  replace(/_/, " ")
                    #}
                    insert_bottom("div", class: "mw_nav_text", $linkText) {
                      inner() {
                        replace(/_/, " ")
                      }
                    }
                    insert_bottom("div", class: "icons-subnav_arrow_right")
                    wrap("div", class: "mw_levis_link")
                  }
                  $("./div[@class='top' or @class='middle' or @class='bottom']") {
                    remove()
                  }
                }
              }
              $("./div[@class='header' or @id='topBar']") {
                remove()
              }
              $("./div[@class='footer' or @id='bottomBar']") {
                remove()
              }
            }
          }
        }
      }
    }
  }
  $("./body[contains(@class, 'mw_extended_sizes')]") {
    $(".//div[@id='extMid']") {
      $("./div[@class='mw_levis_link']") {
        $("./a") {
          $linkText = fetch("./@href")
          $linkText {
            replace(/\/([-\w]+)\/[-\w]+\.jsp/, "$1")
          }
          $linkText = $1
          log("*******************")
          log($linkText)
          log("*******************")
          $("./div[@class='mw_nav_text']") {
            inner($linkText)
            inner() {
              replace(/_/, " ")
            }
          }
        }
      }
    }
  }
  $("./body[contains(@class, 'mw_curve')]") {
    $(".//div[@class='content']") {
      $("./div[@class='mw_levis_link'][1]") {
        remove()
      }
      $("./div[@class='mw_levis_link']") {
        $("./a") {
          $linkText = fetch("./@href")
          $linkText {
            replace(/\/([-\w]+)\/[-\w]+\/[-\w]+\.jsp/, "$1")
          }
          $linkText = $1
          log("*******************")
          log($linkText)
          log("*******************")
          $("./div[@class='mw_nav_text']") {
            inner($linkText)
            inner() {
              replace(/_/, " ")
            }
          }
        }
      }
    }
  }
  $("./body[contains(@class, 'mw_levis_women')]") {
    $(".//div[@class='content']") {
      $("./div[@class='mw_levis_link'][1]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boot and Flare")
          }
        }
      }
      $("./div[@class='mw_levis_link'][2]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Skinny and Straight")
          }
        }
      }
      $("./div[@class='mw_levis_link'][3]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("For Misses")
          }
        }
      }
      $("./div[@class='mw_levis_link'][4]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("For Plus")
          }
        }
      }
    }
  }
  $("./body[contains(@class, 'mw_levis_juniors')]") {
    $(".//div[@class='content']") {
      $("./div[@class='mw_levis_link'][1]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boot and Flare")
          }
        }
      }
      $("./div[@class='mw_levis_link'][2]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Skinny and Straight")
          }
        }
      }
      $("./div[@class='mw_levis_link'][3]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Leggings")
          }
        }
      }
      $("./div[@class='mw_levis_link'][4]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("For Juniors")
          }
        }
      }
    }
  }
  $("./body[contains(@class, 'mw_levis_boys')]") {
    $(".//div[@class='content']") {
      $("./div[@class='mw_levis_link'][1]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Slim 4-7")
          }
        }
      }
      $("./div[@class='mw_levis_link'][2]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Slim 8-20")
          }
        }
      }
      $("./div[@class='mw_levis_link'][3]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Boot 4-7")
          }
        }
      }
      $("./div[@class='mw_levis_link'][4]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Boot 8-20")
          }
        }
      }
      $("./div[@class='mw_levis_link'][5]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Relaxed 4-7")
          }
        }
      }
      $("./div[@class='mw_levis_link'][6]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Relaxed 8-20")
          }
        }
      }
      $("./div[@class='mw_levis_link'][7]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Skinny 4-7")
          }
        }
      }
      $("./div[@class='mw_levis_link'][8]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Boys Skinny 8-20")
          }
        }
      }
    }
  }
  $("./body[contains(@class, 'mw_levis_girls')]") {
    log("what what what")
    $(".//div[@id='extMid']") {
      log("what what what")
      $("./div[@class='mw_levis_link'][1]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Girls 4 - 6X")
          }
        }
      }
      $("./div[@class='mw_levis_link'][2]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Girls 7 - 16")
          }
        }
      }
      $("./div[@class='mw_levis_link'][3]") {
        $("./a") {
          $("./div[@class='mw_nav_text']") {
            inner("Toddlers")
          }
        }
      }
    }
  }
}