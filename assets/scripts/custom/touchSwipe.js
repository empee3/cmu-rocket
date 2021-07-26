//TouchSwipe.js
 $(function() {
  $(".overlay").swipe( {
    swipe:function() {
      $('.top-level-a.open').removeClass('open');
      $('.navigation.open').removeClass('open');
      $('.overlay.visible, .offcanvas-close').removeClass('visible');
      $('html.disable-scroll').removeClass('disable-scroll');
    }
  });
 });
