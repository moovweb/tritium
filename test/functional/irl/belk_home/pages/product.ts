# Working example http://www.m.belk.com/AST/Main/Belk_Primary/Women/Shop/Sweaters/Cardigans_Twin_Sets/PRD~180129842128BE/ND+New+Directions+Pointelle+Back+Cardigan.jsp?off=16

attribute("id", "mw_pdp")

$(".//div[@id='productSet']") {
  $("/html/body") {
    add_class("mw_prod_sub_prod")
  }
}

# so that the images look nicer when zoomed
#$("/html/body/script") {
#  inner() {
#    # replace their default product images with this one
#    # because of the way their js updates the main product image and alternate view images,
#    # doing this also replaces those alternate view images with this one
#    # their js swaps out P_PROD and puts in P_SWATCH
#    replace(/P_PROD/, "blog")
#  }
#}

$("/html/body[contains(@class, 'mw_prod_sub_prod')]") {
  $(".//div[@id='BVCustomerRatings'][2]") {
    remove()
  }
  $(".//div[@id='BVCustomerRatings']") {
    move_to("../../div[@id='prod_main_desc']", "after")
  }
  $(".//div[@class='overall_desc']") {
    $(".//div[@id='scroll_down']") {
      remove()
    }
    attribute("data-ur-toggler-component", "content")
    attribute("data-ur-state", "disabled")
    wrap("div") {
      attribute("data-ur-set", "toggler")
      move_to("//div[@id='prod_detail_tabs']", "top")
      inject_top("<div data-ur-state='disabled' data-ur-toggler-component='button'>Description</div>") {
        inject_bottom("<div class='icons-nav_arrow_dn'></div>")
        inject_bottom("<div class='icons-nav_arrow_up'></div>")
      }
    }
  }
  $(".//div[@id='productSet']") {
    $("./div[contains(@class, 'sel_options')]") {
      var("uniqueId") {
        set(fetch("@id"))
        prepend("Qty-")
      }
      $("./div[@class='options']") {
        $("./div[@class='colors']") {
          add_class("mw_product_option")
        }
        $("./div[@class='quantity']") {
          $("./div[contains(@class, 'control')]") {
            $("./select[@name='ADD_CART_ITEM_ARRAY<>quantity']") {
              attribute("data-ur-select-buttons-component", "select")
              attribute("data-ur-id", $uniqueId)
            }
          }
          $("./label") {
            inner() {
              set("")
            }
            wrap("span") {
              add_class("mw_selected_qty")
              move_here("../div[contains(@class, 'control')]")
            }
          }
        }
      }
      $("./div[@class='image_wrap']") {
        inject_after("<div class='mw_sub_prod_details'></div>") {
          move_here("../div[@class='title'] | ../div[@class='priceWrapper'] | ../div[@class='details']")
          #$("./div[@class='title']") {
          #  move_here("../div[@class='options']/div[@class='quantity']")
          #}
        }
      }
      $("./div[@class='options']/div[@class='quantity']") {
        $("./p[@class='inv_level']") {
          move_to("../../../div[@class='mw_sub_prod_details']", "bottom")
        }
      }
    }
  }
}

# products w/o sub products
$("/html/body[not (contains(@class, 'mw_prod_sub_prod'))]") {
  # Setup the size accordion / div list from select
  $(".//div[@class='sel_options']") {
    $("./form") {
      $("./div[@id='div_size_1']") {
        # This seems like a fragile selector
        inner_wrap("div", class: "mw_size")
        $("./label") {
          attribute("for") {
            remove()
          }
        }
      
        $("(./select[@id='size'])") {
          attribute("select-list", "Size")
        }
      }
      
      $("./div[@id='div_color_1']") {
        # This also seems like a fragile selector

        add_class("mw_product_option")
        attribute("data-ur-set", "toggler")
      
        $("./label[@for='size']") {
          attribute("for") {
            remove()
          }
          wrap("span") {
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "enabled")
            move_here("../select | ../span[@class='current']")
            inject_bottom("<div class='icons-subnav_arrow_up'></div>")
            inject_bottom("<div class='icons-subnav_arrow_dn'></div>")
            $("./label") {
              text() {
                append(":")
              }
            }
          }
        }
        $("./div[@class='swatch_list']") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "enabled")
        }
      }
      $("./div[@class='quantity']") {
        $("./div[@class='control']") {
          #$("./select[@id='quantity']") {
          #  attribute("data-ur-select-buttons-component", "select")
          #  attribute("data-ur-id", "QtySelectButtons")
          #}
          insert_bottom("span") {
            add_class("mw_selected_qty")
            move_here("../../label")
            move_here("../select")
          }
        }      
        move_to("../div[@id='div_size_1']", "before")
      }
      $("./div[@id='div_size_1']") {
        insert_after("div", class: "mw_product_options_wrap")
      }
      $("./div[@class='mw_product_options_wrap']") {
        move_here("../div[@id='div_size_1']")
        move_here("../div[@class='quantity']")
      }
    }
  }
}

/* move user nickname after review title */
inject_after("<script type='text/javascript'>var b = document.getElementById('BVRRContainer');if(b) { b.addEventListener('DOMNodeInserted', function(e) { moveAfterMultiple('.BVRRUserNicknameContainer','.BVRRReviewTitle') }, false); }</script>")
insert_after("script", type: "text/javascript", src: asset("javascript/pdp.js"))

/* move pdp social share to after title */
inject_after("<script type='text/javascript'>var f = document.getElementById('BVRRSummaryContainer'); if(f) { f.addEventListener('DOMNodeInserted', function(e) { var c = document.getElementsByClassName('BVRRSocialBookmarkingLinks')[0]; var d = document.getElementById('p_price'); if(c && d) { moveAfter(c, d); } }, false); }</script>")

/* remove the reviews accordion if there are no reviews */
inject_after("<script type='text/javascript'>document.addEventListener('DOMNodeInserted', function() { var el = document.getElementsByClassName('BVRRRatingSummaryNoReviews')[0]; if(el) { var pn = document.getElementById('community_tabs'); if(pn) { pn.parentNode.removeChild(pn); } } }, false);</script>")

# this product page is shared with the wedding registry product pages
### /* start registry stuff */ ###

$(".//button[@name='add_to_registry']") {
  inject_bottom("<div>Add to Registry</div>")
}

$(".//div[@id='slider-container']") {
  remove()
}

$(".//img[contains(@alt, 'Register Now')]") {
  remove()
}

### /* end registry stuff */ ###

# bazaarvoice has an element whose innerhtml is the url that they use to submit reviews
# this needs to be rewritten because they use this url as a query param when submitting reviews or voting on helpfulness of reviews
# example:
# http://mlocal.reviews.belk.com/8131/2900438SANDY/review/17730687/negative.htm?format=embedded&return=http%3A%2F%2Fmlocal.www.belk.com%2FAST%2FMain%2FBelk_Primary%2FJuniors%2FRelated_Shop%2FShoes%2FPRD~2900438SANDY%2FYellow%2BBox%2BSandy.jsp%3Fsku_id%3D1689949375790960%26quantity%3D2&innerreturn=http%3A%2F%2Fmlocal.reviews.belk.com%2F8131%2F2900438SANDY%2Freviews.htm%3Fformat%3Dembedded&user=__USERID__&submissionparams=__BVSUBMISSIONPARAMETERS__&submissionurl=http%3A%2F%2Fwww.belk.com%2Fshop%2Freview_submit.jsp%3FPRODUCT%253C%253Eprd_id%3D845524441875596%26FOLDER%253C%253Efolder_id%3D2534374302095042%26bmUID%3D1305674158511
$("./div[@id='BVContainerPageURL']") {
  inner() {
    rewrite("link")
  }
}

$(".//div[(@id='subnav') or (@id='snifferModal')]") {
  remove()
}

# Not sure if some of these will be styled / incorporated into the header, but for now, get rid of it
$(".//*[(@id='promo') or (@id='main_nav') or (@id='cross_sell') or (@id='more_from')]") {
  remove()
}

# Passthrough reviews iframe:
$(".//iframe[contains(@src,'reviews')]") {
  attribute("src") {
    value() {
      rewrite("link")
    }
  }
}

# removing this also gets rid of the facebook 'like' iframe
$(".//div[@id='right_col']") {
  remove()
}

$(".//div[@id='content']") {
  $("./ul[contains(@class,'prev_next')]") {
    remove()
  }
  $("./div[@id='slider-container']") {
    remove()
  }
  
  ### Setup Zoom Preview ###
  $(".//div[@id='prod_preview']") {
    #attribute("data-ur-set","zoom-preview")
    #attribute("data-ur-state","disabled")
    #attribute("data-ur-id","HeroZoomPreview") # So that I can call this instances methods later
    
    # stripping out these src requests because their javascript updates it anyway.
    # this is done in conjunction with replacing P_PROD with blog (a nicer zoomed image)
    $("./div[@id='alternate_images']") {
      $("./a") {
        attribute("href", "javascript:void(0)")
        $("./img") {
          attribute("src", "")
          attribute("width", "")
          attribute("height", "")
        }
      }
    }
    $("./div[@class='image_wrap']") {
      $("./span[contains(@class,'ribbon')]") {
        $("../.") {
          add_class("mw_ribbonfull")
        }
        move_to("../a[@id='zoom_image_main']", "top")
      }
      $("./a[@id='zoom_image_main']") {
        $("./span[contains(@class,'best_seller')]") {
          inner() {
            set("<div><span>Best</span><span>Seller</span></div>")
          }
        }
    
        $("./span[contains(@class,'top_rated')]") {
          inner() {
            set("<div><span>Customer</span><span>Top Rated</span></div>")
          }
        }
        
        $("./span[contains(@class,'new_arrival')]") {
          inner() {
            set("<div><span>New</span><span>Arrival</span></div>")
          }
        }
        
        $("./span[contains(@class,'wishlist_favorite')]") {
          inner() {
            set("<div><span>Wishlist</span><span>Favorite</span></div>")
          }
        }
      }

      #attribute("data-ur-zoom-preview-component","container")

      #$("./a[@id='zoom_image_main']/img") {
      #  attribute("data-ur-zoom-preview-component", "normal_image")
      #  attribute("data-ur-zoom-modifier-match", "layer=comp.*")
      #  attribute("data-ur-zoom-modifier-replace", "$PROD_DETAIL_ZOOM$")
      #}
      
      $("./a[@id='zoom_image_main']") {
      #  attribute("id", "mw_zoom_img_main")
        attribute("class", "mw_zoom_img_main")
        insert_bottom("div", class: "mw_zoom_icon_container") {
          insert_bottom("div", class: "mw_zoom_icon") {
            insert_bottom("div", class: "icons-white_nav_arrow_dn")
            insert_bottom("div", class: "icons-white_nav_arrow_up")
          }
        }
        $("./img") {
          attribute("src") {
            value() {
              replace(/P_PROD/, "blog")
            }
          }
        }
      }
      $("./span[contains(text(),'Click image to zoom')]") {
        remove()
      }

      #bottom() {
      #  insert_tag("img") { 
      #    # (All the things I want to insert here cause parse errors)
      #    attribute("data-ur-zoom-preview-component", "zoom_image")
      #    attribute("data-ur-src-modifier-match", 'layer=comp.*P_SWATCH.*')
      #    attribute("data-ur-src-modifier-replace", "$PROD_DETAIL_ZOOM$")
      #  }
      #  insert_tag("img") {
      #    attribute("data-ur-zoom-preview-component", "button")
      #    attribute("data-ur-src-modifier-match",".PROD_DETAIL_ZOOM.")
      #    attribute("data-ur-src-modifier-replace","layer=comp&\$P_PROD\$")
      #  }
      #}
    }
    #$("./div[@id='alternate_images']") {
    #  attribute("data-ur-zoom-preview-component","thumbnails")
    #}
    # update the image topper text based on the class name
  }
  
  # product options
  $(".//div[@id='prod_details']") {
    $("./div[@id='prod_options']") {
      #commenting out for now.  this works initially because the server outputs the text, but when the user chooses a size, our changes are overwritten by the js
      #$("./p[@id='p_price']"){
      #  # wrap the cents of a price in a sup (superscript) tag
      #  $("./span[@class='sale_price' or @class='original_price' or @class='price']"){
      #    html{
      #      replace(/\.(\d\d)/,"<sup class='mw_cents'>\\1</sup>")
      #    }
      #  }
      #}
      # we cannot currently wrap all elements into one div, so have to create a separate div, and move items into it
      $("./h1") {
        inner() {
          replace(/&amp;reg/, "&reg;") 
        }
        inject_after("<div id='mw_prod_info'></div>") {
          inject_bottom("<div id='mw_prod_pricing'></div>") {
            move_here("../../p[@id='p_price' or @id='p_price_savings']", "bottom")
          }
          move_here("../../div[@id='prod_preview']/div[@id='BVCustomerRatings']", "bottom")
        }
      }
      
      # make the free gift modal dialog use a smaller image
      $("./div[@id='modal_lto_container']") {
        $("./div[@class='content']") {
          $("./div[@class='col left']") {
            $("./img") {
              attribute("src") {
                value() {
                  replace(/P_PROD/, "P_THUMB")
                }
              }
            }
          }
        }
      }
      $(".//*[@class='sizing_guide_modal_div' or @class='sizing_guide_modal_a']") {
        remove()
      }
    }
  }

  $(".//div[contains(@class,'cartActions')]") {
    $(".//button[@name='add_to_cart']") {
      inject_bottom("<div class='mw_bag_icon'><div class='icons-shopping_bag'></div></div><div class='mw_bag_text'>Add to Shopping Bag</div>")
    }
  }

  # Detail accordions:
  $(".//div[@id='prod_detail_tabs']") {
    $("./ul[@class='tabs_nav']") {
      attribute("class", "mw_tabs_nav_nerfed")
      $("./li") {
        attribute("data-ur-set", "toggler")
        $("./a[@href='#description_tab']") {
          attribute("id", "mw_description_tab")
          attribute("href", "javascript:void(0)")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
          inject_bottom("<div class='icons-nav_arrow_dn'></div>")
          inject_bottom("<div class='icons-nav_arrow_up'></div>")
        }
        $("./a[@href='#about_this_brand_tab']") {
          attribute("id", "mw_brand_tab")
          attribute("href", "javascript:void(0)")
          attribute("style", "")
          attribute("data-ur-toggler-component", "button")
          inject_bottom("<div class='icons-nav_arrow_dn'></div>")
          inject_bottom("<div class='icons-nav_arrow_up'></div>")
        }
        $("./a[@href='#shipping_and_returns_tab']") {
          attribute("id", "mw_shipping_tab")
          attribute("href", "javascript:void(0)")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
          inject_bottom("<div class='icons-nav_arrow_dn'></div>")
          inject_bottom("<div class='icons-nav_arrow_up'></div>")
        }
      }
    }
    $("./div[@id='description_tab']") {
      move_to("../ul/li/a[@id='mw_description_tab']", "after")
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "disabled")
    }
    $("./div[@id='shipping_and_returns_tab']") {
      move_to("../ul/li/a[@id='mw_shipping_tab']", "after")
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "disabled")
      attribute("style", "")
      attribute("id", "")
      attribute("class", "")
    }
    $("./div[@id='about_this_brand_tab']") {
      attribute("style", "")
      move_to("../ul/li/a[@id='mw_brand_tab']", "after")
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "disabled")
    }
  }
  
  #community tab
  
  $(".//div[@id='community_tabs']") {
    $("./ul[@class='tabs_nav']") {
      $("./li") {
        #attribute("data-ur-set", "toggler")
        $("./a") {
          attribute("id", "mw_reviews")
          attribute("data-ur-id", "mw_reviews_acc")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
          inject_bottom("<div class='icons-nav_arrow_dn'></div>")
          inject_bottom("<div class='icons-nav_arrow_up'></div>")
        }
      }
    }
    $("./div[@id='cust_reviews_tab']") {
      #move_to("../ul/li/a[@id='mw_reviews']", "after")
      attribute("data-ur-id", "mw_reviews_acc")
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "disabled")
    }
  }
  
  
  # special offers
  $(".//div[@id='extra_html_gel_2']") {
    attribute("data-ur-set", "toggler")
    $("./h3") {
      attribute("data-ur-toggler-component", "button")
      attribute("data-ur-state", "enabled")
      inject_bottom("<div class='icons-nav_arrow_dn'></div>")
      inject_bottom("<div class='icons-nav_arrow_up'></div>")
      insert_after("div", class: "mw_special_offers", data-ur-toggler-component: "content", data-ur-state: "enabled")
    }

    $("./p") {
      move_to("(preceding-sibling::div[@class='mw_special_offers'])[last()]")
    }
  }
}
