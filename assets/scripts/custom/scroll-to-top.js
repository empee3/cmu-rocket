//Scroll to top link
var $toplink = $('.back-to-top');
$toplink.click(function() {
    $('html, body').animate({
        scrollTop: $('body').offset().top
    }, 500);
});
