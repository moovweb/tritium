
# ----- ParsedHTMLBlocks ----
html() {
  #Global Header & Breadcrumbs
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Inject::InjectHTML
    #  #[["html", "<div class=\"mHeader\"> \t<div class=\"mHeaderHome\"> \t\t<a href=\"http://www.eharmony.com\" class=\"mHeaderHomeLink\"></a> \t</div>  \t<div class=\"mHeaderLogo\"></div> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    #  $("(//body/*[position() = 1 and self::*])[1]") {
    #    inject_before("<div class=\"mHeader\"> 	<div class=\"mHeaderHome\"> 		<a href=\"http://www.eharmony.com\" class=\"mHeaderHomeLink\"></a> 	</div>  	<div class=\"mHeaderLogo\"></div> </div>")
    #  }
    #  
    #  
    
    # Remove eH Premier
    $("//*[@id='premier-banner']") {
      remove()
    }
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<ul class=\"mBreadcrumbs\"> \t<li class=\"mBreadcrumbItem\"><a href=\"#\" class=\"mBreadcrumbItemLink\">Select A Plan</a></li> \t<li class=\"mBreadcrumbItem\"><a href=\"#\" class=\"mBreadcrumbItemLink\">Payment Info</a></li> \t<li class=\"mBreadcrumbItem\"><a href=\"#\" class=\"mBreadcrumbItemLink\">Order Confirmation</a></li> </ul>"], ["add_after", ""], ["multiple", ""], ["add_before", "body form"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//body//form)[1]") {
      inject_before("<ul class=\"mBreadcrumbs\"> 	<li class=\"mBreadcrumbItem\"><a href=\"#\" class=\"mBreadcrumbItemLink\">Select A Plan</a></li> 	<li class=\"mBreadcrumbItem\"><a href=\"#\" class=\"mBreadcrumbItemLink\">Payment Info</a></li> 	<li class=\"mBreadcrumbItem\"><a href=\"#\" class=\"mBreadcrumbItemLink\">Order Confirmation</a></li> </ul>")
    }
    
    
  # end BasicGroup
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  
  #
  #Content::CSS::AddCSS
  #[["css_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/subscription_global_doug.css?moov_cache_name=eharmony-subscription_global_doug.css&moov_cache_version=998689328529"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("v1/subscription_global"))
  }
  
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #Footer
  #  #Group::BasicGroup
  #  #[]
  #  # No need to wrap the contents at all
  #    #
  #    #Content::Formatting::WrapElement
  #    #[["selector", ".moovweb_footer, .desktop_site"], ["class_name", "mFooter mBodySegment"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
  #    var("found", "false")
  #    match($found, "false") {
  #      $("(//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')])[1]") {
  #        var("found", "true")
  #        insert_before("div") {
  #          attribute("the_wrapper", "true")
  #          attribute("class", "mFooter mBodySegment")
  #          move_here("//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')][not (@the_wrapper)]", "bottom")
  #          move_here("//*[contains(concat(' ', @class, ' '), ' desktop_site ')][not (@the_wrapper)]", "bottom")
  #          attribute("the_wrapper") {
  #            remove()
  #          }
  #        }
  #      }
  #    }
  #    match($found, "false") {
  #      $("(//*[contains(concat(' ', @class, ' '), ' desktop_site ')])[1]") {
  #        var("found", "true")
  #        insert_before("div") {
  #          attribute("the_wrapper", "true")
  #          attribute("class", "mFooter mBodySegment")
  #          move_here("//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')][not (@the_wrapper)]", "bottom")
  #          move_here("//*[contains(concat(' ', @class, ' '), ' desktop_site ')][not (@the_wrapper)]", "bottom")
  #          attribute("the_wrapper") {
  #            remove()
  #          }
  #        }
  #      }
  #    }
  #    
  #    
  #  # end BasicGroup
  #  
  
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #JS Optimization
  #  #Group::BasicGroup
  #  #[]
  #  # No need to wrap the contents at all
  #    #
  #    #Content::Javascript::RemoveScriptTagContains
  #    #[["match", "fbcdn"]]
  #    $("//script[contains(text(),'fbcdn')]") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Javascript::RemoveScriptTagSrcContains
  #    #[["src_phrase", "quant"]]
  #    $("//script[contains(@src, 'quant')]") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Javascript::RemoveScriptTagSrcContains
  #    #[["src_phrase", "fbcdn"]]
  #    $("//script[contains(@src, 'fbcdn')]") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Javascript::RemoveScriptTagSrcContains
  #    #[["src_phrase", "blockui"]]
  #    $("//script[contains(@src, 'blockui')]") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Javascript::RemoveScriptTagSrcContains
  #    #[["src_phrase", "jquery.min"]]
  #    $("//script[contains(@src, 'jquery.min')]") {
  #      remove()
  #    }
  #    
  #    
  #  # end BasicGroup
  #  
  
  
}