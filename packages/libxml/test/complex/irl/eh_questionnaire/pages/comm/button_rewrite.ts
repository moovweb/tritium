log(concat("Button rewriting: ", fetch(".")))
match(fetch(".")) {
  with(/\s*Send (h.. )?your Questions\s*/) {
    add_class("icons-send_questions")
    inner("")
  }
  with(/\s*Send (h.. )?a Message\s*/) {
    add_class("icons-message")
    inner("")
  }
  with(/\s*Read (her )?Answers\s*/) {
    add_class("icons-read_her_answers")
    inner("")
  }
  with(/\s*Read (his )?Answers\s*/) {
    add_class("icons-read_his_answers")
    inner("")
  }
  with(/\s*Send Message\s*/) {
    add_class("icons-message")
    inner("")
  }
  with(/\s*Send Questions\s*/) {
    add_class("icons-send_questions")
    inner("")
  }
  with(/\s*Save\s*/) {
    add_class("icons-save")
    inner("")
  }
  with(/\s*Send an eHarmony Mail\s*/) {
    add_class("icons-mail")
    inner("")
  }
  with(/\s*Respond to (h.. )?Questions\s*/) {
    add_class("icons-rmessage")
    inner("")
  }
  with(/\s*Respond to (h.. )?Message\s*/) {
    add_class("icons-rmessage")
    inner("")
  }
  with(/\s*Respond to (h.. )?eHarmony Mail\s*/) {
    add_class("icons-rmessage")
    inner("")
  }
  with(/\s*Read eHarmony Mail Decision\s*/) {
    add_class("icons-read_mail_decision")
    inner("")
  }
  with(/\s*Read Must Haves/) {
    add_class("icons-read_must_haves_cant_stands")
    inner("")
  }
  with(/\s*Send Must Haves/) {
    add_class("icons-send_must_haves_cant_stands")
    inner("")
  }
  with(/\s*Send (h.. )?an eHarmony Mail\s*/) {
    add_class("icons-mail")
    inner("")
  }
  with(/\s*Send Answers\s*/) {
    add_class("icons-send_answers")
    inner("")
  }
  with(/Answer/) {
    add_class("icons-answer_questions")
    inner("")
  }
  with(/Return to My Matches/) {
    add_class("icons-return")
    inner("")
    $("//a[@class='mw_back_button']") {
      remove()
    }
  }
  with(/Close Match/) {
    add_class("icons-close_match")
    inner("")
  }
  with("Begin Open Communication") {
    add_class("icons-mail")
    inner("")
  }
  with(/Read Safety Tips/) {
    add_class("icons-read_safety_tips")
    inner("")
  }
  with("Respond to eHarmony Mail") {
    add_class("icons-mail")
    inner("")
  }
  with(/\s*Send\s*/) {
    add_class("icons-send")
    inner("")
  }
  else() {
    log(concat("!!!! Did not match ANY button write", fetch(".")))
  }
}