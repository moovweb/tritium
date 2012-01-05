
# 10/28/11 - Brand Page Overhaul on Test Site
$("body") {
  $("form/div[@id='mainContainer']") {
    $("./br") {
      remove()
    }
    $("div[contains(@class,'contentContainer2')]") {    
      $("./br") {
        remove()
      }
      
      $("./div[@id='contentContainer2']") {
        $("./div") {
          attribute("style") {
            remove()
          }
        } 
        $("./br") {
          remove()
        }
      }
      
      $("//div[contains(@class,'vendor_dcm_1')]") {
        remove()
      }
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
            
      $("div[@id='deptFinder']") {
        remove() # delete old dept finder if exists
      }

      # Create Filter Template
      inject_top("<div id='deptFinder'><div id='deptFinderForm'><div id='deptFinderTitle' data-ur-id='refineWidget' data-ur-toggler-component='button' data-ur-state='enabled'><span class='icons-menu-open'></span><span class='icons-menu-closed'></span></div></div></div>")

      # Create Filter Title
      $("//div[@id='deptFinderTitle']") {
        move_here("//h1[@id='breadcrumb_vendor_name']","top")
        
        $("./h1") {
          inject_after("<h2></h2>") # create filter type template
        }
        
        $("./h2") {
          copy_here("//div[contains(@class,'catalogLeftNavFacetName')]") {
            $("./div") {
              remove()
            }
            $("./a") {
              name("span")
            }
            #remove()
          }
        }        
        inner_wrap("span")
      }

      $("//div[@id='deptFinderForm']") {
        $("./div[@id='deptFinderTitle']/span/h1") {
          remove()
        }
      }

      # Create Dropdown Options
      $("//div[@id='deptFinderForm']") {
        copy_here("//div[contains(@class,'catalogLeftNavFacetName')]") {
          attribute("class") {
            remove()
          }
          name("option")
        }
      }

      # Make hrefs relative and add event listener to goto link
      $("//div[@id='deptFinderForm']") {
        $("//ul[contains(@class,'catalogLeftNavFacetElementList')]") {
          move_here("./following-sibling::ul[contains(@class,'catalogLeftNavMoreFacetElementList')]/li","bottom")
        }
        move_here("//ul[contains(@class,'catalogLeftNavFacetElementList')]","bottom")
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

        $("./select") {  
          move_here("../option[1]", "top")
          attribute("onChange", "mw_gotoURL();")
          wrap("div", data-ur-id:"refineWidget", data-ur-toggler-component:"content", data-ur-state:"enabled")
        }
      }
      
      # Add text if search is completely refined
      $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[@id='deptFinderTitle']/span/h2[not(span)]") {
        inner("Shop by category:")
      }
      
      # Onchange event listener that allows for url change for multiple dropdown menus
      inject_top("<script type='text/javascript'> window.onload=function() {var p=document.getElementsByTagName('select');for(var i=0; i<p.length; i++){p[i].id='mw_select'+i; p[i].onchange=function(){ var dropdown = document.getElementById(this.id); document.location.href = dropdown.options[dropdown.selectedIndex].value;} }}</script>")
    
      move_here("table//div[@class='categoryFilter2']", "top") {
        move_here("table//tr[2]/td") {
          name("div")
          # Forget about the headers
          # move_here("../table//tr[1]/td[1]")
        }
        $("table") {
          remove()
        }
        # Move the reset filter back to the bottom
        move_here("div[@class='resetFilter']", "bottom") {
          $("a/img") {
            remove()
          }
        }
        # Inject a title for accordionization
        insert_top("div") {
          attribute("data-ur-id", "refineAccordion")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "enabled")
              # Add icons using sprites
          insert_top("span", class: "icons-menu-open")
          insert_top("span", class: "icons-menu-closed")
              # Add class so we can address the title specifically
          insert_top("span", "Refine Your Results:", class: "mw_refine_title")
        }
        $("div[position() > 1]") {
          attribute("data-ur-id", "refineAccordion")
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "enabled")
        }
      }

      # breadcrumb
      move_here("table/tr/td/div[@class='contentIndent']/div[@id='deptMainTitle']/table/tr/td", "top") {
        name("div")
        # case when no h1 or image ex. http://www.barenecessities.com/Sale-Loungewear_catalog_nxs,83.htm
        $("self::div[not(h1 or img)]") {
          inner($title) {
            replace(/(,| \|).*/, "")
          }
        }
        $("self::div[img]") {
          text(fetch("img/@alt"))
        }
        $("self::div[h1/font]") {
          text(fetch("h1/font/text()"))
        }
        $("self::div[h1]") {
          text(fetch("h1/text()"))
        }
        # only use title in breadcrumb if refined search
        match($title, /(,|\|).+ at \w+\.com/) {
          var("title") {
            replace(/( \||,).*/, "")
            prepend(" | ")
          }
          text() {
            append($title)
          }
        }
      }
      
      $("//div[@id='breadcrumb_container']") {
        remove()
      }
      
      # Sort dropdown
      $("//div[@class='sortBy']") {
        move_here(".//span[@class='thumbPagingLinkCont']")
        move_here("./table/tr/td[@class='sortByTd']", "before") {
          name("div")
          $("img") {
            wrap("span") {
              text("Sort: ")
            }
          }
          $("./select") {
            attribute("style", "")
            $("./option") {
              attribute("value") {
                value() {
                  rewrite("link")
                }
              }
            }
          }
        }
        $("./table") {
          remove()
        }

        $(".//a[contains(@name, 'Previous')]/img") {
          add_class("mw_prev_button")
          attribute("src", asset("images/prev.png"))
          attribute("width") {
            remove()
          }
          attribute("height") {
            remove()
          }
        }
        $(".//a[contains(@name, 'Next')]/img") {
          add_class("mw_next_button")
          attribute("src", asset("images/next.png"))
          attribute("width") {
            remove()
          }
          attribute("height") {
            remove()
          }
        }
        $("span[@class='thumbPagingLinkCont']") {
          inner() {
            replace(/>,</, ">&nbsp;|&nbsp;<")
            replace(/(\.\.\.)/, "&nbsp;|&nbsp;...&nbsp;|&nbsp;")
          }
        }
        $("div[@class='hrDots']") {
          remove()
        }
      }
      $("div[@class='sortBy'][2]") {
        attribute("id", "bottomSortBy")
      }
      $("div[@class='sortBy'][not (span[@class='thumbPagingLinkCont'])]") {
        remove()
      }

      $("//div[@class='searchResultsContainer']") {
        $("./div[contains(@class, 'searchResult_large')]") {
          $("./div[@class='searchProdDetails_large']") {
            $("./div[@class='searchProdPrice_large']/a/img") {
              remove()
            }
            # Remove "Exclusive Video" blurb
            $("./div[@class='searchProdNote_large' and contains(text(),'Exclusive Video')]") {
              remove()
            }
            $("./div[@class='searchProdNote_large']/div[@class='searchProdNote' and contains(text(),'Exclusive Video')]") {
              remove()
            }
            $("./div[@class='searchProdDesc']/a") {
              inner() {
                replace(/<\/b>.*?(\w)/m, "</b>#\\1")
              }
            }
          }
          $(".//a") {
            name("span")
          }
          wrap("a") {
            attribute("href", fetch(".//span[1]/@href"))
          }
          # late load search images
          $("./div[@class='searchProdImg_large']/span/img") {
            attribute("src") {
              #name("data-src")
            }
            attribute("class", "searchImage")
          }
        }
        $("./div[@class='clearHidden']") {
          remove()
        }
      }

      $("./table") {
        remove()
      }
      $("./div[@id='bottomSortBy']") {
        $("following-sibling::div[1]") {
          remove()
        }
      }
      # Add the free shipping banner here
      @import _free-shipping.ts
      # Remove the left nav AFTER getting the free shipping banner
      @import _remove_left_nav.ts
      $("following-sibling::div[1]") {
        remove()
      }
      
      # remove an inline style
      $("./div[@id='leftNavSpecial']") {
        attribute("style", "")
      }

      # cases when no styles found
      $("./div[@class='mainTitle']") {
        text(fetch("table/tr/td/img/@alt"))
      }
      $("./div[@id='contentMain2']") {
        move_here("./table/tr/td") {
          name("./div")
          $("./a/img") {
            remove()
          }
        }
        $("./table") {
          remove()
        }
      }
      $("./div[@id='rightNav']") {
        $("./div[@class='moduleHdr']") {
          text(fetch("img/@alt"))
        }
        $("./div[@class='moduleTopHdr']") {
          attribute("style", "")
          text(fetch("img/@alt"))
        }
        $("./div[@class='modulePadded'][2]") {
          move_here("div[@class='moduleContent']/table/tr/td[@class='moduleText']", "before") {
            name("div")
          }
          remove()
        }
        move_here("./div[@class='module']/div[@class='moduleContent']/div[@class='moduleTextFull']") {
          $("./img | ./a/img") {
            remove()
          }
        }
        $("./div[@class='module'] | ./div[@class='modulePadded'][1]") {
          remove()
        }
      }
      
      $("./div[contains(@class,'mw_acc')]") {
        remove()
      }
    }
  }
  
  # Ensures bottom nav gets put into the container 
  $("//div[@id='bottomSortBy']") {
    move_to("//div[contains(@class,'resultsHeader')][last()]", "top")
  }
  
  # Remove featured collections and excess text (we have no mockup of this yet)
  $("//div[contains(@class,'vendor_featured_container')] | //div[contains(@class,'vendor_seo_container')]") {
    remove()
  }
  
  # Remove second sort dropdown
  $("//div[contains(@class,'sortByTd')][last()]") {
    remove()
  }
  
  # Wrap bottom nav
  $("//div[contains(@class,'sortBy')][last()]") {
    attribute("style") {
      remove()
    }
    copy_here("//div[@class='sortByTd']")
    wrap("div", class:"resultsHeader")     
  }
}

# Old Content
$("body") {
  attribute("class", "mw_brand")

  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav']") {
      remove()
    }
    $("div[@class='bn_footer_width']") {
      remove()
    }

    $("div[@class='contentContainer2']") {
      $("div[@id='rightNavClear']") {
        remove()
      }

      $("div[@id='contentMain2Clear']") {
        move_here("div[@class='vendorFeature']/div[@class='vendorFeatureLeft']//img", "before") {
          wrap("div", id: "mw_titlebar") {
            text(fetch("img/@alt"))
          }
        }

        # Not worth it
        # move_here("div[@class='vendorFeaturesLink']", "before")

        move_here("div[@class='vendorCategories']/div[@class='vendorModule']/div[@class='moduleContent']", "before") {
          $(".//div[@class='moduleMore']") {
            remove()
          }
          $(".//div[@class='moduleBg']") {
            attribute("align") {
              remove()
            }
          }
          $(".//img") {
            attribute("width") {
              remove()
            }
            attribute("height") {
              remove()
            }
            attribute("src") {
              value() {
                replace(/\?.*/, "?size=120,120")
              }
            }
          }

          $(".//a") {
            name("span")
          }
          $("div[contains(concat(' ', @class, ' '), ' overLay ')]") {
            name("span")
          }
          wrap("a") {
            attribute("href", fetch(".//span[@href][1]/@href"))
          }
        }

        remove()
      }
      
      move_here("div[@id='mw_titlebar']", "before")
      move_here("div[@id='searchBar']", "before")
    }
  }
}
