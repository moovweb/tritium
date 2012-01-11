$("/html/body/div/form[not(@id)]") {
  
  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[4]//table//tr[1]/td/p"), class: "mw_rq_subsection_header") {
    inner() {
      replace("<strong>", "")
      replace("</strong>", "")
      replace(/, .+?(True|False)\.\s*/, ", please select $1. ")
    }
  }

  $mw_rq_true_false_id = "mw_rq_14_1"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[3]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[3]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_2"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[4]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[4]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_3"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[5]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[5]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_4"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[6]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[6]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_5"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[7]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[7]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_6"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[8]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[8]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_7"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[9]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[9]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_8"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[10]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[10]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_9"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[11]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[11]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_10"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[12]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[12]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_11"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[13]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[13]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_12"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[14]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[14]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_13"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[15]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[15]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_14"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[16]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[16]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_15"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[17]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[17]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_16"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[18]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[18]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_17"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[19]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[19]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_18"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[20]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[20]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
  $mw_rq_true_false_id = "mw_rq_14_19"
  $mw_rq_true_false_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[21]/td[not(@align) and text()]"
  $mw_rq_true_false_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[21]/td/input[@type='radio']"
  
  @import _true_false.f.ts
 
}