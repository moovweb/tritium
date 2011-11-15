// Load offers items to correct location and adds the toggler.
function mw_assets(myXML){
  var offers  = myXML.match(/<offers>(.+?)<\/offers>/)[1];
  var rand
  offers = offers.replace(/<offer>/ig, "<div class=\"mw_offer\">");
  offers = offers.replace(/<\/offer>/ig, "</div>");
  offers = offers.replace(/<bloomingdales>/ig, "<div>");
  offers = offers.replace(/<\/bloomingdales>/ig, "</div>");

  x$("#bl_hp_main")[0].innerHTML = offers;

  x$("div#bl_hp_main > div.mw_offer:nth-of-type(2n+1)").each(function(){
    var myHTML = "";
    myHTML = this.innerHTML.replace(/(<\/?)a/gi, "$1div");
    myHTML = myHTML.replace(/<div/, "<div class=\"mw_offer_title\"");
    this.innerHTML = myHTML;
  });
  
  x$("div#bl_hp_main > div.mw_offer:nth-of-type(2n)").each(function(){
    x$(this.previousElementSibling).bottom(this);
  });
  
  x$("div#bl_hp_main > div.mw_offer > div.mw_offer_title").each(function(){
    var rand =Math.random() * 11;
    rand = rand.toString().replace(/^.+?\./, "");
    this.setAttribute('data-ur-id', rand);
    this.setAttribute("data-ur-state", "disabled")
    this.setAttribute("data-ur-toggler-component", "button")
    this.parentElement.setAttribute('data-ur-id', rand);
    this.parentElement.setAttribute("data-ur-state", "disabled")
    this.parentElement.setAttribute("data-ur-toggler-component", "content")
  });
}