///////////////////////Nav Search-Drop///////////////////////

$('.search-trigger').click(function() {
  var $this = $(this),
  notThis = $this.hasClass('open'),
  thisNav = $this.attr("rel");
  //close if you click another menu trigger
  if (!notThis) {
    $('.search-trigger').removeClass('open');
   }
  //open the nav
  $this.toggleClass('open');
  $("#"+thisNav).toggleClass('open');
});
//close if not this nav item or outside of nav fully
$(document).on('click', function(event) {
  if ($('.search-drop').hasClass('open') && !$(event.target).closest('.search-trigger, .search-drop').length) {
    $('.search-drop').removeClass('open');
    $("#"+thisNav).removeClass('open');
  }
});
