
#Content::Inject::InjectHTML
#[["html", "<ul class=\"mRQFormQuestionsListItemAnswerSliderSteps\"> \t   <li><div>1</div></li>   <li><div>2</div></li>    <li><div>3</div></li>    <li><div>4</div></li>    <li><div>5</div></li>    <li><div>6</div></li>    <li><div>7</div></li>   </ul>"], ["add_after", ".mRQFormQuestionsListItemAnswerSlider"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
$("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSlider ')]") {
  inject_after("<ul class=\"mRQFormQuestionsListItemAnswerSliderSteps\"> 	   <li><div>1</div></li>   <li><div>2</div></li>    <li><div>3</div></li>    <li><div>4</div></li>    <li><div>5</div></li>    <li><div>6</div></li>    <li><div>7</div></li>   </ul>")
}
  
 