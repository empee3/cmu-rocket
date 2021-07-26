////////Expanding Side Nav/////////
$(document).ready(function() {
    $('body').addClass('js');
    var $menu = $('#expanding-side-nav'),
        $toplink = $('#expanding-side-nav-top-link'),
        $menulink = $('.expanding-side-menu-link'),
        $menuTrigger = $('.has-subnav > .side-more-link');

  $menulink.click(function(e) {
    e.preventDefault();
    $menulink.toggleClass('active');
  });

  $menuTrigger.click(function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active').next('ul').toggleClass('active');
  });


  $menulink.click(function() {
      $('html, body').animate({
          scrollTop: $menu.offset().top
      }, 500);
  });

  $toplink.click(function() {
      $('html, body').animate({
          scrollTop: $('body').offset().top
      }, 500);
  });

    /* setting the default states. */
    // first set an active class on all ULs that are the parent of the current page.
    $('.expanding-side-menu .current-page').parents('nav ul').addClass('active');
    // then expand the .side-more-link of all currently expanded ULs in the nav.
    $('.expanding-side-menu .current-page').parents('nav ul.active').prev().find('.side-more-link').addClass('active');
    // then make the chidren of the current node visible.
    $('.expanding-side-menu .current-page ~ ul').addClass('active');
    // and make the current node + sign a minus
    $('.expanding-side-menu .current-page').parents('nav ul.active li').find('.side-more-link').addClass('active');

    // if current page has children open the first level
    $('.expanding-side-menu .has-subnav.current-page').children().addClass('active');
});
