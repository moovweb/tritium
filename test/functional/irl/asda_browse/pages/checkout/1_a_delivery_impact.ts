# The "Delivery Impact" 
# Url: haveyouforgottencontainer.jsp
# Url: havuforgottenframe
match($path){

  with(/\/checkout\/haveyouforgottencontainer/) {
    $("body"){
      add_class("mw_delivery_impact_container")
    }
  }
  
  with(/havuforgottenframe\.jsp/){
    $("body"){
      add_class("mw_delivery_impact_main_frame")
      $("./div[@id='mw_mainWrapper']") {
        $("./div[@id='topbox']  | ./div[@id='boxerror'] | ./h1[@class='hideoffscreen'] | ./ul[contains(@class, 'hideoffscreen')] | .//div[@class='dropbelow'] | ./div[@id='footer'] | ./div/div[@id='options'] | ./div/div[@id='RotatingContainer']") {
          remove()
        }

        $("./div[contains(@class, 'productsdisplay')]") {
          $("./div[@class='shelf']") {
          
            $("./div[contains(@class,'item')]") {
              attribute("style", "")
              
              # Removing unneccesary elements
              $("./h4[@class='hideoffscreen']") {
                remove()
              }
     
              
              # adding a unique class to the elements that has no image
              $(".//div[@class='itemimage' and contains(@data-style,'no-image-available')]") {
                add_class("mw_noImageAvailable")  
              }
              
              $("./div[@class='itemcontent']") {
                # Opening another scope for this function since, we
                # want this to global(shef and item view) and not conditional
                $(".//fieldset") {
                  # Removing the kg text from some of the products
                  inner() {
                    replace(/kg/, "<span class='mw_kg'>kg</span>")
                  }
                  
                  $("./input[@type='image']") {
                    remove()
                  }
                  
                  $("./input[@class='quantity']") {
                    attribute("pattern", "[0-9]*")
                    attribute("onlbur","if (this.value == '') {this.value = '1.0';}")
                    attribute("onfocus","if (this.value == '1.0') {this.value = '';}")

                  }
                }
                
                # Items added to the trolley
                $(".//div[@class='list_alert']") {
                  move_to("../../ul", "bottom")
                }
                
                # Adding a class to container div.items since
                # the scope after this will look for div that only have .items class
                # will make that condintional to only shelf view pages
                $(".//fieldset[@class='listviewfieldset']") {
                  $("../../../../..") {
                    add_class("mw_listView")
                  }
                  $(".//span[@class='hide']") {
                    remove()
                  }
                }

                # Changing anchor contents to full titles rather than shortened text
                $("./ul/li/a[@title]") {
                  inner() {
                    set(fetch("./@title"))
                  }
                }
              }
            } # Ending Item
            
            $("./div[contains(@class, 'item') and not(contains(@class, 'mw_by_kg'))]") {
              add_class("mw_by_qty")
              $(".//input[@class = 'quantity']") {
                attribute("onlbur","if (this.value == '') {this.value = '1';}")
                attribute("onfocus","if (this.value == '1') {this.value = '';}")
#                 attribute("value","1")
                inject_before("<span class='mw_qty'>Qty</span>")
              }
            }

          } # Ending Shelf
        } # Ending Product Display
      }
    }
  }
}
