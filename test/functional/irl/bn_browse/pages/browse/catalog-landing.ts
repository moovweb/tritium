$("body") {
  attribute("class", "mw_catalog_landing")
  $("form/div[@id='mainContainer']") {
    $("div[@class='mainContentContainer']") {
      #Search refinement widget
      $("div[@id='deptFinder']") {
        $("img") {
          remove()
        }
        $("div[@id='deptFinderForm']") {
          move_here("table//tr[1]/td") {
            name("div")
            attribute("data-ur-id", "refineWidget")
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            $("img") {
              remove()
            }
            move_here("../table//tr[2]/td[1]") {
              name("span")
            }
          }
          $("table") {
            remove()
          }
          # Pull in the titles for better styling
          move_here("../h2", "top")
          move_here("../h1", "top")
          $("h1") {
            inner() {
              append("&nbsp;")
            }
            wrap("span") {
              move_here("../h2") {
                # get rid of whitespace
                text() {
                  replace(/^[^\w]{2}/, "")
                }
              }
              wrap("div", id: "deptFinderTitle") {
                attribute("data-ur-id", "refineWidget")
                attribute("data-ur-toggler-component", "button")
                attribute("data-ur-state", "disabled")
              }
              # Add icons using sprites
              insert_bottom("span", class: "icons-menu-open")
              insert_bottom("span", class: "icons-menu-closed")
            }
          }
        }

        $("br") {
          remove()
        }
      }
      
      ###### New Test Site Content 10/11/11 #####
      copy_here("./div[@id='nxsHeaderBreadcrumb']","top")
      
      $("div[@id='deptFinder']") {
        remove() # delete old dept finder if exists
      }

      # Create Filter Template
      inject_top("<div id='deptFinder'><div id='deptFinderForm'><div id='deptFinderTitle' data-ur-id='refineWidget' data-ur-toggler-component='button' data-ur-state='disabled'><span class='icons-menu-open'></span><span class='icons-menu-closed'></span></div></div></div>")

      # Create Filter Title
      $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[@id='deptFinderTitle']") {
        move_here("../../../div[@id='nxsHeaderBreadcrumb'][2]/div[contains(@class,'RefinementDisplayText')]/strong","top")
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
              move_to("../..","top")
            }
            remove()
          }
        }        
        inner_wrap("span")
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
          wrap("div", data-ur-id:"refineWidget", data-ur-toggler-component:"content", data-ur-state:"disabled")
        }
      }
      
      # Add text if theres nothing else to refine.
      $("div[@id='deptFinder']/div[@id='deptFinderForm']/div[@id='deptFinderTitle']/span/h2[not(text())]") {
        inner("Refine your results:")
      }
      
      # Onchange event listener that allows for url change for multiple dropdown menus
      inject_top("<script type='text/javascript'> window.onload=function() {var p=document.getElementsByTagName('select');for(var i=0; i<p.length; i++){p[i].id='mw_select'+i; p[i].onchange=function(){ var dropdown = document.getElementById(this.id); document.location.href = dropdown.options[dropdown.selectedIndex].value;} }}</script>")
      
      $("./div[@id='nxsHeaderBreadcrumb'][2]") {
        remove()
      }
      
      # Add breadcrumbs
      move_here("./div[@id='nxsHeaderBreadcrumb']","top")
      $("./div[@id='nxsHeaderBreadcrumb']") {
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
        $("./span[last()]") {
          add_class("boldTxt")
        }
        add_class("categoryMainTitleTd")
      }
      
      ##### End of new site content #####
      
      # Remove the empty divs
      $("div[not (child::*)]") {
        remove()
      }
      $("div[@id='subContentContainer']") {
        # Remove junk
        $("div[@class='row_spacer' or @class='row_dashed' or @id='CopyBlock' or @id='linkPanel']") {
          remove()
        }
        $("table") {
          remove()
        }
        # Catalog items + thumbnails
        $("div[@class='module4x4']") {
          # Only keep the last 4x4 module
          $("div[@class='module4x4Row'][last()]/preceding-sibling::div[@class='module4x4Row']") {
            remove()
          }
          # Move the content out and remove this container
          move_here(".//td", "before") {
            name("div")
            add_class("mw_bra_catalog_tile")
            move_here(".//a[img] | .//div[@class='standard2Right']")
            $("table") {
              remove()
            }
            $("a/img") {
              attribute("src") {
                value() {
                  replace(/\?.*/, "?size=110,0")
                }
              }
            }
          }
          remove()
        }
        # sometimes the subheader is an image instead of text
        # ex. http://www.barenecessities.com/Mens-T-Shirts_catalog_nxs,44.htm
        $("div/div/img") {
          # fetch uniform style
          $("../../../div/div[1]/span[@style]") {
            var("subheader_style", fetch("@style"))
          }
          attribute("style", $subheader_style)
          name("span")
          text(fetch("@alt"))
          attribute("alt", "")
          attribute("class", "")
          attribute("src", "")
          attribute("title", "")
          insert_after("br")
          insert_after("br")
        }
        # Remove the empty divs
        $("div[not (child::*)]") {
          remove()
        }
        # Remove useless br
        $("br") {
          remove()
        }
        # Accordionize featured brands and styles
        $("div[@id='container05'] | div[@id='CategoryStyleLinksSection']") {
          var("toggler_id", fetch("@id"))
          move_here(".//h2") {
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
          }
          move_here(".//a")
          $("div | a[img]") {
            remove()
          }
          # Format the anchor tags to be accordian items
          $("a") {
            add_class("mw_acc_item")
            inner_wrap("span")
          }
          # Create the accordian content div and move the items inside of it
          $("a[1]") {
            insert_after("div", class: "mw_acc_items") {
              attribute("data-ur-toggler-component", "content")
              attribute("data-ur-state", "disabled")
              move_here("../a", "bottom")
            }
          }
        }
        # Create the main accordian div and move the two sections inside of it
        insert_after("div", class: "mw_acc") {
          move_here("../div/div[@id='container05']") {
            add_class("mw_acc_section")
            attribute("data-ur-set", "toggler")
          }
          move_here("../div/div[@id='CategoryStyleLinksSection']") {
            add_class("mw_acc_section")
            attribute("data-ur-set", "toggler")
          }
            # Change the H2s to divs and format them to be the accordian headers
          $(".//h2") {
            name("div")
            inner_wrap("span")
            add_class("mw_acc_header")
              # Add icons using sprites
            insert_bottom("div", class: "icons-accordion-closed")
            insert_bottom("div", class: "icons-accordion-open")
          }
        }
      }
      # Add the free shipping banner here
      @import _free-shipping.ts
      # Remove the left nav AFTER getting the free shipping banner
      @import _remove_left_nav.ts
      $("following-sibling::div[1]") {
        remove()
      }
      
      $("./div[contains(@class,'mw_acc')]") {
        remove()
      }
    }
  }
}
