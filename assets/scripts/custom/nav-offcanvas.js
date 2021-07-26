///////////////////////Nav Offcanvas///////////////////////
$('.trigger').click(function() {
  var $this = $(this),
  notThis = $this.hasClass('open'),
  thisNav = $this.attr("rel");
  //close if you click another menu trigger
  if (!notThis) {
    $('.triggered-area, .trigger').removeClass('open');
    if ( $( '.trigger' ).hasClass( "block-scroll" ) ){
      $('html').removeClass('disable-scroll');
      $('#overlay-mobile').removeClass('visible');
    }
  }
  //open the nav
  $this.toggleClass('open');
  $("#"+thisNav).toggleClass('open');
  if ( $( this ).hasClass( "block-scroll" ) ){
    $('html').toggleClass('disable-scroll');
    $('#overlay-mobile').toggleClass('visible');
  }
});
//close if you click on anything but this nav item or a trigger
$(document).on('click', function(event) {
  if (!$(event.target).closest('.triggered-area, .trigger').length) {
    $('.triggered-area, .trigger').removeClass('open');
    if ( $( '.trigger' ).hasClass( "block-scroll" ) ){
      $('html').removeClass('disable-scroll');
      $('#overlay-mobile').removeClass('visible');
    }
  }
});

// //Close button
// $('.offcanvas-close-button').click(function() {
//   $('.triggered-area, .trigger').removeClass('open');
//   $('html').removeClass('disable-scroll');
//   $('#overlay-mobile').removeClass('visible');
// });
