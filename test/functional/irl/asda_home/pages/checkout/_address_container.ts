#checkout_address_container.ts
$("./body") {
  add_class("mw_checkout_address")
  $("./div[@id='mw_mainWrapper']") {
    # Remove the header
    $("./div[@id='header']") {
      remove()
    }
    $("./div[@class='noframes-content']") {
      $("./div[@id='account']") {
        $("./div[@class='full-content-no-margin']") {
          attribute("id", "mw_address_wrapper")
          # Move the header out of the table and remove the table
          $("./table") {
            $("./tr") {
              $("./td") {
                $("./fieldset") {
                  attribute("style") {
                    remove()
                  }
                  move_to("../../../..", "top")
                }
              }
            }
            remove()
          }
        }
        $("./div") {
          $("./table") {
            $(".//button") {
              remove()
            }
            attribute("style") {
              remove()
            }
          }
          $("./div[@id='account']") {

            /* the BRs within the pheight class are used for spacing within there seems most robust to just leave them in place and let them do the spacing*/
            $(".//br[not(ancestor::div[@class='pheight'])]") {
              remove()
            }

            $("./form") {
              $("./div") {
                attribute("style") {
                   remove()
                }

                $(".//span") {
                  attribute("style") {
                    remove()
                  }
                }

                $(".//button") {
                  move_to('./../../../../..', "top")
                }

                # Remove the edit instructions button and label
                $("./div") {
                  $("./div[@class='pheight']") {
                    $("./p") {
                      attribute("style") {
                        remove()
                      }
                    }
                    $("./div") {
                      remove()
                    }
                  }
                  $("./div[@class='mainadd']") {
                    remove()
                  }
                }
              }
              
            }
            $("./div") {
              attribute("style") {
                 remove()
              }        
              
            }
            # Remove styles and legends
            $("./div[@id='order']") {
              $("./form") {
                $("./fieldset") {
                  attribute("style") {
                     remove()
                  }
                  
                  $(".//div") {
                    attribute("style") {
                      remove()
                    }
                  }
                  
                  $("./div[@class='left']") {
                    $("./label") {
                      attribute("style") {
                        remove()
                      }
                    }
                    $("./fieldset") {
                      attribute("style") {
                         remove()
                      }
                      # Remove the legend
                      $("./legend") {
                        remove()
                      }
                      $("./h3") {
                        attribute("style") {
                           remove()
                        }
                      }
                      
                      $("./label") {
                        attribute("style") {
                          remove()
                        }
                      }
                      $("./button") {
                        attribute("class", "button")
                        attribute("style") {
                          remove()
                        }
                      }
                    }
                  }
                # Remove the legend
                  $("./legend") {
                    remove()
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
