var("title", fetch("head/title/text()"))

$("body") {
  attribute("class", "mw_catalog_style_vendor")

  $("./div[@class='sortBy']") {
    move_here(".//span[@class='thumbPagingLinkCont']")
    move_here("table/tr/td[@class='sortByTd']", "top") {
      name("div")
      $("img") {
        wrap("span") {
          text(fetch("img/@alt"))
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
        }
        wrap("div")
      }
    }
    $("table") {
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
  
  $("./div[@class='sortBy'][2]") {
    attribute("id", "bottomSortBy")
  }
  
  $("./div[@class='sortBy'][not (span[@class='thumbPagingLinkCont'])]") {
    remove()
  }

  $("form/div[@id='mainContainer']") {
    $("div[contains(@class,'contentContainer2')]") {

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

      ###### New Test Site Content 10/11/11 #####
      copy_here("./div[@id='nxsHeaderBreadcrumb']","top")

      $("div[@id='deptFinder']") {
        remove() # delete old dept finder if exists
      }

      # Create Filter Template
      inject_top("<div id='deptFinder'><div id='deptFinderForm'><div id='deptFinderTitle' data-ur-id='refineWidget' data-ur-toggler-component='button' data-ur-state='enabled'><span class='icons-menu-open'></span><span class='icons-menu-closed'></span></div></div></div>")

      # Create Filter Title
      $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[@id='deptFinderTitle']") {
        move_here("//*[contains(@class,'RefinementDisplayText')]/strong","top")
        $("//*[contains(@class,'RefinementDisplayText')]") {
          remove()
        }

        $("strong") {
          name("h1")
        }

        $("h1") {
          inject_after("<h2></h2>") # create filter type template
        }

        $("h2") {
          copy_here("../../../../..//div[contains(@class,'catalogLeftNavFacetName')]") # get filter types
          $("div[contains(@class,'catalogLeftNavFacetName')]") {
            inner_wrap("span")
            $("span") {
              move_to("../..","bottom")
            }
            remove()
          }
        }        
        inner_wrap("span")
      }

      $("div[@id='deptFinder']/div[@id='deptFinderForm']") {
        $("div[@id='deptFinderTitle']/span/h1") {
          remove()
        }
      }

      # Create Dropdown Options
      $("div[@id='deptFinder']/div[@id='deptFinderForm']") {
        copy_here("../../../../..//div[contains(@class,'catalogLeftNavFacetName')]")
        $("div[contains(@class,'catalogLeftNavFacetName')]") {
          attribute("class") {
            remove()
          }
          name("option")
        }
      }

      # Make hrefs relative and add event listener to goto link
      $("div[@id='deptFinder']/div[@id='deptFinderForm']") {
        $("../../../..//ul[contains(@class,'catalogLeftNavFacetElementList')]") {
          move_here("./following-sibling::ul[contains(@class,'catalogLeftNavMoreFacetElementList')]/li","bottom")
        }
        move_here("../../../..//ul[contains(@class,'catalogLeftNavFacetElementList')]","bottom")
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
          wrap("div", data-ur-id:"refineWidget", data-ur-toggler-component:"content", data-ur-state:"enabled")
        }
        inject_bottom("<div class='resetFilter' data-ur-id='refineWidget' data-ur-toggler-component='content' data-ur-state='enabled'></div>")
      }

      # Create "New Search" filter
      $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[contains(@class,'resetFilter')]") {
        copy_here("//div[@id='nxsHeaderBreadcrumb']/span[a][2]/a")
        $("a") {
          text("New Search")
        }
      }

      # Remove extra divs
      $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[contains(@class,'mw_txtWidget')][not(span)]") {
        remove()
      }

      # Add text if search is completely refined
      $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[@id='deptFinderTitle']/span/h2[not(span)]") {
        inner("Refine your results:")
      }

      # Onchange event listener that allows for url change for multiple dropdown menus
      inject_top("<script type='text/javascript'> window.onload=function() {var p=document.getElementsByTagName('select');for(var i=0; i<p.length; i++){p[i].id='mw_select'+i; p[i].onchange=function(){ var dropdown = document.getElementById(this.id); document.location.href = dropdown.options[dropdown.selectedIndex].value;} }}</script>")

      ##### End of new site content #####

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

      $("div[@class='searchResultsContainer']") {
        $("div[contains(@class, 'searchResult_large')]") {
          $("div[@class='searchProdDetails_large']") {
            $("div[@class='searchProdPrice_large']/a/img") {
              remove()
            }
            # Remove "Exclusive Video" blurb
            $("div[@class='searchProdNote_large' and contains(text(),'Exclusive Video')]") {
              remove()
            }
            $("div[@class='searchProdNote_large']/div[@class='searchProdNote' and contains(text(),'Exclusive Video')]") {
              remove()
            }
            $("div[@class='searchProdDesc']/a") {
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
          $("div[@class='searchProdImg_large']/span/img") {
            attribute("src") {
              name("data-src")
            }
            attribute("class", "searchImage")
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
      # Add the free shipping banner here
      @import _free-shipping.ts
      # Remove the left nav AFTER getting the free shipping banner
      @import _remove_left_nav.ts
      $("following-sibling::div[1]") {
        remove()
      }

      # remove an inline style
      $("div[@id='leftNavSpecial']") {
        attribute("style", "")
      }

      #cases when no styles found
      $("div[@class='mainTitle']") {
        text(fetch("table/tr/td/img/@alt"))
      }
      $("div[@id='contentMain2']") {
        move_here("table/tr/td") {
          name("div")
          $("a/img") {
            remove()
          }
        }
        $("table") {
          remove()
        }
      }
      $("div[@id='rightNav']") {
        $("div[@class='moduleHdr']") {
          text(fetch("img/@alt"))
        }
        $("div[@class='moduleTopHdr']") {
          attribute("style", "")
          text(fetch("img/@alt"))
        }
        $("div[@class='modulePadded'][2]") {
          move_here("div[@class='moduleContent']/table/tr/td[@class='moduleText']", "before") {
            name("div")
          }
          remove()
        }
        move_here("div[@class='module']/div[@class='moduleContent']/div[@class='moduleTextFull']") {
          $("img | a/img") {
            remove()
          }
        }
        $("div[@class='module'] | div[@class='modulePadded'][1]") {
          remove()
        }
      }

      $("./div[contains(@class,'mw_acc')]") {
        remove()
      }
      
      # Put breadcrumbs in containers
      move_here("./div[@id='nxsHeaderBreadcrumb']","top") {
        wrap_text_children("span")
        $("./div | ./br") {
          remove()
        }
        $("./a") {
          name("span")
        }
        $("./h1") {
          attribute("style") {
            remove()
          }
          name("span")
        }
        add_class("categoryMainTitleTd")
        $("./span[contains(@class,'RefinementDisplayText')]") {
          remove()
        }
        $("./span/text()[not(normalize-space(.))]") {
          remove()
        }
        $("./span[normalize-space(.)][last()]") {
          add_class("boldTxt")
        }
      }
    }
    #Ensures bottom nav gets put into the container 
    $("//div[@id='bottomSortBy']") {
      move_to("//div[contains(@class,'resultsHeader')][last()]", "top")
    }
  }
  
  # Remove extra header/search if it exists.  Showing on some pages.
  $("//div[@id='deptFinderTitle']//h2[2] | //div[@class='resetFilter']/a[2]") {
    remove()
  }
  
  # Remove "new search" on fresh page
  $("//a[contains(text(),'New Search')][@title='Home']/.. | //div[@class='resetFilter'][not(a)]") {
    remove()
  }
  
  # Use second set of breadcrumbs to build refined search
  $("//div[@id='nxsHeaderBreadcrumb'][2]") {
    
    # Remove first two breadcrumbs (Home and landing page, nothing is refined at this point)
    # also removing excess text spans
    $("./span[a][1] | ./span[a][2] | ./span[not(a)]") {
      remove()
    }
    
    # Last breadcrumb is not a link, treating this differently
    $("./span[contains(@class,'boldTxt')]") {
      name("div")
      text() {
        replace(/\|/,"")
      }
      attribute("class", "mw_txtWidget")
      attribute("data-ur-id", "refineWidget")
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "enabled")
    }
    
    # Take leftover links and convert them to txtWidgets
    $(".//a") {
      name("div")
      attribute("class", "mw_txtWidget")
      attribute("data-ur-id", "refineWidget")
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "enabled")
    }
    
    # Move to refine widget
    $(".//div[@data-ur-id='refineWidget']") {
      move_to("//div[@id='deptFinderTitle']","after")
    }
    
    # Remove extra breadcrumb container
    remove()
  }
  
  # Sort By Fix
  $("//div[@class='sortBy'][2]") {
    remove() # will be copied
  }
  $("//div[@class='sortBy']") {
    $("//select[@onchange='sortRecords(this);']") {
      move_to("//div[@class='sortBy']", "top")
      attribute("style") {
        remove()
      }
      $("./option") {
        attribute("value") {
          value() {
            rewrite("link")
          }
        }
      }
    }
    $("./*[not(@onchange)]") {
      remove() # THIS REMOVES PAGINATION, NEEDS TO BE REIMPLEMENTED LATER
    }
    insert_bottom("span", "Sort By: ")
    copy_to("//div[contains(@class,'searchResultsContainer')]", "after")
  }
}