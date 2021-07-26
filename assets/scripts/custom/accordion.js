//http://web-accessibility.carnegiemuseums.org/code/accordions/

var accordionButtons = $('.accordion-controls li button');

function accordionToggle() {
  $('.accordion-controls li button').on('click', function(e) {
    $control = $(this);

    accordionContent = $control.attr('aria-controls');
    // checkOthers($control[0]);

    isAriaExp = $control.attr('aria-expanded');
    newAriaExp = (isAriaExp == "false") ? "true" : "false";
    $control.attr('aria-expanded', newAriaExp);

    isAriaHid = $('#' + accordionContent).attr('aria-hidden');
    if (isAriaHid == "true") {
      $(this).next('div').attr('aria-hidden', "false");
      $(this).next('div').css('display', 'block');
    } else {
      $(this).next('div').attr('aria-hidden', "true");
      $(this).next('div').css('display', 'none');
    }
  });
};


//call this function on page load
accordionToggle();


//close accorions by default
function checkInitialState() {
  for (var i=0; i<accordionButtons.length; i++) {
    if (($(accordionButtons[i]).attr('aria-expanded')) == 'false') {
      $(accordionButtons[i]).next('div').css('display', 'none');
    }
  }
};
checkInitialState();
