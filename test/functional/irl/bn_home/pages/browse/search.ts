$mw_searcherror = "false"

$("body") {
  
  # Add page specific class
  attribute("class", "mw_search")

  $("form") {
    # attribute("action") {
    #   # They hardcoded their form action and are using some weird JS to
    #   # override it. Just remove it and use our own JS.
    #   remove()
    # }
    # attribute("name") {
    #   remove()
    # }
    # attribute("id") {
    #   remove()
    # }
    $("div[@id='mainContainer']/div[@class='mainContentContainer']") {
      
      # Hotfix for new site changes
      # Fixing breadcrumbs, removing ads, implementing filters
      $("./div[@id='contentContainer2']") {
        $("./div[contains(@class,'searchBreadCrumb')]") {
          add_class("resultsHeader")
        }
        $("//span[@id='ctl00_cphMainContent_BusinessRules1']/..") {
          remove()
        }
        
        # Create Filters
        $("div[@id='deptFinder']") {
          remove() # delete old dept finder if exists
        }

        # Create Filter Template if there is no error
        $("./../..//span[@id='ctl00_cphMainContent_ZeroResults_lblSearchTerm']") {
          $mw_searcherror = "true"
        }
        
        log(concat("SEARCH ERROR: ", $mw_searcherror))
        
        match($mw_searcherror) {
          with(/false/) {
             inject_top("<div id='deptFinder'><div id='deptFinderForm'><div id='deptFinderTitle' data-ur-id='refineWidget' data-ur-toggler-component='button' data-ur-state='disabled'><span class='icons-menu-open'></span><span class='icons-menu-closed'></span></div></div></div>")
          }
        }

        # Create Filter Title
        $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[@id='deptFinderTitle']") {
          copy_here("../../../div[contains(@class,'resultsHeader')]/span[contains(@class,'searchBreadCrumbText')]//h1","top")

          $("./h1") {
            inject_after("<h2></h2>") # create filter type template
          }

          $("./h2") {
            copy_here("./../../../../../..//div[contains(@class,'searchLeftNavDimensionName')]") # get filter types
            $("./div[contains(@class,'searchLeftNavDimensionName')]") {
              inner_wrap("span")
              $("span") {
                move_to("./../..","bottom")
              }
              remove()
            }
          }        
          inner_wrap("span")
        }

        # Create Dropdown Options
        $("div[@id='deptFinder']/div[@id='deptFinderForm']") {
          copy_here("../../../../..//div[contains(@class,'searchLeftNavDimensionName')]")
          $("div[contains(@class,'searchLeftNavDimensionName')]") {
            attribute("class") {
              #remove()
            }
            name("option")
          }
        }

        # Make hrefs relative and add event listener to goto link
        $("div[@id='deptFinder']/div[@id='deptFinderForm']") {
          $("../../../..//ul[contains(@class,'searchLeftNavDimensionValueList')]") {
            move_here("./following-sibling::ul[contains(@class,'searchLeftNavMoreDimensionValueList')]/li","bottom")
          }
          move_here("../../../..//ul[contains(@class,'searchLeftNavDimensionValueList')]","bottom")
          $("ul") {
            $("li/a") {
              attribute("href") {
                value() {
                  replace(/.+\.com/, "")
                }
                name("value")
              }
              name("option")
            }
            name("select")
          }

          $("select") {  
            move_here("../option[1]", "top")
            attribute("onChange", "mw_gotoURL();")
            wrap("div", data-ur-id:"refineWidget", data-ur-toggler-component:"content", data-ur-state:"disabled")
          }
          #inject_bottom("<div class='resetFilter' data-ur-id='refineWidget' data-ur-toggler-component='content' data-ur-state='disabled'></div>")
        }

        # Create "New Search" filter
        # $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[contains(@class,'resetFilter')]") {
        #   copy_here("../../../div[@id='nxsHeaderBreadcrumb'][2]/a[2]")
        #   $("a") {
        #     text("New Search")
        #   }
        # }

        # Use breadcrumbs to build refined search
        copy_here("//span[contains(@class,'searchBreadCrumbText')]","bottom")
        
        $("./span[contains(@class,'searchBreadCrumbText')]") {
          wrap_text_children("div", class: "mw_txtWidget", data-ur-id:"refineWidget", data-ur-toggler-component:"content", data-ur-state:"disabled")
          $("./div | *[2]") {
            remove()
          }
          $("./a/text()") {          
            wrap("div", class: "mw_txtWidget", data-ur-id:"refineWidget", data-ur-toggler-component:"content", data-ur-state:"disabled")
          }
          $("./b") {          
            wrap("div", class: "mw_txtWidget", data-ur-id:"refineWidget", data-ur-toggler-component:"content", data-ur-state:"disabled")
          }
          $("div") {
            move_to("../../..//div[@id='deptFinderTitle']","after")
          }
          $("a/div") {
            move_to("../../..//div[@id='deptFinderTitle']","after")
          }
          remove()
        }

        # Remove pipes and delete extra (empty) divs
        $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[contains(@class,'mw_txtWidget')]") {
          text() {
            replace(/\|/,"")
          }
          wrap_text_children("span", class: "widgetTxt")
        }

        # Remove extra divs
        $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[contains(@class,'mw_txtWidget')][not(span)]") {
          #remove()
        }

        # Add text if search is completely refined
        $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[@id='deptFinderTitle']/span/h2[not(span)]") {
          inner("refine your results")
        }

        # Onchange event listener that allows for url change for multiple dropdown menus
        inject_top("<script type='text/javascript'> window.onload=function() {var p=document.getElementsByTagName('select');for(var i=0; i<p.length; i++){p[i].id='mw_select'+i; p[i].onchange=function(){ var dropdown = document.getElementById(this.id); document.location.href = dropdown.options[dropdown.selectedIndex].value;} }}</script>")
      
        # "Your results" should be at the top
        move_here("./div[contains(@class,'searchBreadCrumb')]","top")
      }
      
      # message when no results found
      move_here("div[@id='contentContainer2']/table[@id='Table1']//div[font]", "top")
      # message when searching for similar query
      move_here("div[@id='contentContainer2']/table[@id='Table1']//div[@class='SearchBreadcrumb'][span]", "top")
      move_here("div[@id='contentContainer2']/table[@id='Table1']//font[2]", "top")
      move_here("div[@id='contentContainer2']/table[@id='Table1']//font[1]", "top")
      
      $("//div[contains(@class,'sortBy')]") {
        inject_before("<div class='mw_sortBy'></div>") {
          name("div")
          attribute("class", "resultsHeader")
          attribute("style") {
            remove()
          }
          move_here("./../..//div[contains(@class,'sortBy')][1]//td[@class='sortByTd']") {
            name("div")
            $("img") {
              wrap("span") {
                text(fetch("img/@alt")) {
                  replace(" by", "")
                  append(" ")
                }
              }
            }
            $("select") {
              attribute("style", "")
              $("option") {
                attribute("value") {
                  value() {
                    rewrite("link")
                  }
                }
                text() {
                  replace("by ", "")
                  replace("-to-", "-")
                }
              }
            }
          }
        }
      }

      $("div[@id='contentContainer2']") {
        # removed occasional top banner
        $("div[@class='standard2Container']") {
          remove()
        }
        # remove occasional bottom banner
        $("div[img and *[last()=1]]") {
          remove()
        }
        move_here("../div[@id='searchBar']", "top")

        $("table[@id='refineResultsContainer']") {
          insert_before("div", id: "refineResultsContainer")
        }

        $("div[@id='refineResultsContainer']") {
          move_here("../table[@id='refineResultsContainer']//b") {
            name("span")
            # Add class so we can address the title specifically
            add_class("mw_refine_title")
            wrap("div") {
              attribute("data-ur-id", "refineAccordion")
              attribute("data-ur-toggler-component", "button")
              attribute("data-ur-state", "disabled")
              # Add icons using sprites
              insert_bottom("span", class: "icons-menu-open")
              insert_bottom("span", class: "icons-menu-closed")
            }
          }
          move_here("../table[@id='refineResultsContainer']//select") {
            attribute("style") {
              remove()
            }
            wrap("div") {
              attribute("data-ur-id", "refineAccordion")
              attribute("data-ur-toggler-component", "content")
              attribute("data-ur-state", "disabled")
            }
          }

          move_here("../../div[@class='resultsHeader'][1]", "after") {
            $("b") {
              text() {
                replace(/\s+\(|\)/, "")
                prepend("Found:")
              }
            }
          }
        }

        $("table[@id='Table1']") {
          remove()
        }
        $("table[@id='refineResultsContainer']") {
          remove()
        }

        $("div[@class='sortBy']") {
          move_here("table//td[last()]/*")
          $("table") {
            remove()
          }

          # remove related category links (e.g., search for 'panties')
          $("preceding-sibling::span[table][1]") {
            remove()
          }

          # remove "show all" link (e.g., search for 'pantyhose')
          $("div/span[@class='ItemsPerPageChoice']") {
            remove()
          }

          # hide the results per page widget
          $("select") {
            add_class("mw_hidden")
          }
        }

        # Restructure search result listing
        $("div[@class='searchResultsContainer']") {
          # Restructure search result item
          $("div[contains(@class, 'searchResult_large')]") {
            # Convert all anchors inside the search result
            $(".//a") {
              name("span")
            }
            $("div[@class='searchProdDetails_large']") {
              $("div[@class='searchProdPrice_large']/span/img") {
                remove()
              }
              # Remove "Exclusive Video" blurb
              $("div[@class='searchProdNote_large' and contains(text(),'Exclusive Video')]") {
                remove()
              }
              $("div[@class='searchProdNote_large']/div[@class='searchProdNote' and contains(text(),'Exclusive Video')]") {
                remove()
              }
              # add hash sign in front of style no.
              $("div[@class='searchProdDesc']/span") {
                wrap_text_children("span")
                
                $("./br") {
                  remove()
                }
                
                $("./b") {
                  wrap("div", class: "mw_item_brand")
                }
                
                $("./span[1]") {
                  attribute("class", "mw_style_no")
                  
                  move_to("../div")
                  
                  text() {
                    replace("^\s*|\s*$")
                  }
                }
                
                $("./span[1]") {
                  attribute("class", "mw_item_name")
                  
                  text() {
                    replace("^\s*|\s*$")
                  }
                }
                
              }
            }
            wrap("a") {
              attribute("href", fetch(".//span[1]/@href"))
            }
            # late load search images
            $("div[@class='searchProdImg_large']/span/img[@class='searchImage']") {
              attribute("src") {
                name("data-src")
              }
            }
          }
          $("div[@class='clearHidden']") {
            remove()
          }
        }

        $("table") {
          remove()
        }
        $("div[@id='bottomSortBy']") {
          $("following-sibling::div[1]") {
            remove()
          }
        }

        $("div[@class='sortBy']") {
          $(".//*[contains(@alt, 'Previous')]") {
            add_class("mw_prev_button")
            attribute("src", asset("images/prev.png"))
            attribute("width") {
              remove()
            }
            attribute("height") {
              remove()
            }
          }
          $(".//*[contains(@alt, 'Next')]") {
            add_class("mw_next_button")
            attribute("src", asset("images/next.png"))
            attribute("align", "")
            attribute("width") {
              remove()
            }
            attribute("height") {
              remove()
            }
          }
          $("span[@class='thumbPagingLinkCont']") {
            log(fetch("text()"))
            inner() {
              replace(/>,</, ">&nbsp;|&nbsp;<")
              replace(/(\.\.\.)/, "&nbsp;|&nbsp;...&nbsp;|&nbsp;")
            }
          }
        }

        $("div[@class='sortBy'][not (span[@class='thumbPagingLinkCont'])]") {
          remove()
        }
      }
      $("div[@class='sortBy']") {
        attribute("id", "bottomSortBy")
      }
      # Add the free shipping banner here
      @import _free-shipping.ts
      # Remove the left nav AFTER getting the free shipping banner
      @import _remove_left_nav.ts
      $("following-sibling::div[1]") {
        remove()
      }
    }
    
    # Implement sortByTd container
    $("//div[@id='contentContainer2']") {
      $("./div[contains(@class,'resultsHeader')][2]/div[contains(@class,'sortByTd')]") {
        move_to("./../../div[@id='deptFinder']","after")
      }
      $("./div[contains(@class,'resultsHeader')][2]") {
        remove()
      }
    }
    
    # Catalog changes 10/24/11
    $(".//div[contains(@class,'searchResult_large')]") {
      # Remove "X CUP AVAILABLE" and promo note
      $("./div[not(@class)] | .//div[contains(@class,'searchProdNote_large')]") {
        remove()
      }
      # Move swatches above the price
      $("./div[contains(@class,'swatch_thumbnail')]") {
        move_to("./..//div[contains(@class,'searchProdDesc')]","after")
      }
    }
    
    # Remove Excess Containers
    $(".//div[@id='deptFinderForm']/div[contains(@class,'mw_txtWidget')]") {
      remove()
    }
    
    # Ensures bottom nav gets put into the container 
    $("//div[@id='bottomSortBy']") {
      move_to("//div[contains(@class,'resultsHeader')][last()]", "top")
    }
    
    # Final cleanups
    $(".//span[@href]") {
      attribute("href") {
        remove()
      }
    }
    $(".//img[@onmouseover or @onmouseout]") {
      attribute("onmouseover") {
        remove()
      }
      attribute("onmouseout") {
        remove()
      }
    }
    
  } # End of Form
} # End of Body