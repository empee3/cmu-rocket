//Nav Tabs
// http://www.entheosweb.com/tutorials/css/tabs.asp

//Progressive Enhancement bits:
$("document").ready(function(){
  $(".drop-tab-content").hide();
  $(".drop-tab-content:first").show();
});
//The main bits
$("ul.drop-tabs li").click(function() {
  $(".drop-tab-content").hide();
  var activeTab = $(this).attr("rel");
  $("#"+activeTab).fadeIn();

  $("ul.drop-tabs li").removeClass("active");
  $(this).addClass("active");
});
