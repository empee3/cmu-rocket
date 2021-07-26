///////////////////////Drop Menu///////////////////////
//open
$('.top-level-a').click(function() {
  var $this = $(this),
  notThis = $this.hasClass('open');

  if (!notThis) {
     $('.top-level-a').removeClass('open');
    $('html').removeClass('disable-scroll');
   }
  $this.toggleClass('open');
  $('html').toggleClass('disable-scroll');
});
//close if not this nav item or outside of nav fully
$(document).on('click', function(event) {
  if (!$(event.target).closest('.top-level-li').length) {
    $('.top-level-a').removeClass('open');
  }
});
