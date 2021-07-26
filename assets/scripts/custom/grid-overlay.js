///////// Grid Overlay button //////////////////
$(document).ready(function(){
  $('.grid-trigger').click(function() {
    var $this = $(this)
    $this.toggleClass('activate');
    $('.grid-overlay').toggleClass('visible');
  });
});
