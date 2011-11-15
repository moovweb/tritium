#### COMMENT -- JP -- 5/26/2011 ####
######################################################################
# You need to add some info about this file at the top. What is it for? 
# Where does it get applied? A refURL? 
######################################################################

#### COMMENT -- JP -- 5/26/2011 ####
######################################################################
# Do you need a whole file to remove only one item? Is there any way 
# to do this somewhere else? 
######################################################################
$("/html/body/form/div[@id='mainContainer']/div[@id='leftNav']") {
  remove()
}
