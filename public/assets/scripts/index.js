var $jq = jQuery.noConflict();

(function () {
  const d = document;
  var accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
    setAccordionAria,
    switchAccordion,
    touchSupported = 'ontouchstart' in window,
    pointerSupported = 'pointerdown' in window,
    buttonToggles = d.querySelectorAll('.rocket-buttons .buttons li a'),
    rocket = d.getElementById('rocket'),
    clouds = d.querySelectorAll('.cloud');

  // Only add bounce animation if browser is not Safari
  if (!!window.chrome || !!window.sidebar || '\v' == 'v') {
    rocket.style.animation = 'bounce 1.4s infinite';
  }

  // Remove focus outline for users not using keyboard only
  handleFirstTab = function (e) {
    if (e.keyCode === 9) {
      // the "I am a keyboard user" key (tab)
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  };
  window.addEventListener('keydown', handleFirstTab);

  skipClickDelay = function (e) {
    e.preventDefault();
    e.target.click();
  };

  setAriaAttr = function (el, ariaType, newProperty) {
    el.setAttribute(ariaType, newProperty);
  };
  setAccordionAria = function (el1, el2, expanded) {
    switch (expanded) {
      case 'true':
        setAriaAttr(el1, 'aria-expanded', 'true');
        setAriaAttr(el2, 'aria-hidden', 'false');
        break;
      case 'false':
        setAriaAttr(el1, 'aria-expanded', 'false');
        setAriaAttr(el2, 'aria-hidden', 'true');
        break;
      default:
        break;
    }
  };

  // Set focus for accessibility
  /*setFocus = function(element) {
        element.focus();
        console.log(document.activeElement);
        if (element === document.activeElement){ // Checking if the target was focused
            return false;
        } else {
            element.tabIndex = -1; // Adding tabindex for elements not focusable
            element.focus(); // Setting focus
         }
    }*/

  scrollToItem = function (element) {
    // jQuery for now
    $jq('html,body').animate({ scrollTop: $jq(element).offset().top }, 600);

    //setFocus(element.querySelector('a'));

    /*var diff = (element.offsetTop-window.scrollY)/20;
        if (!window._lastDiff) {
            window._lastDiff = 0;
        }

        if (Math.abs(diff)>2) {
            window.scrollTo(0, (window.scrollY+diff))
            clearTimeout(window._TO)

            if(diff !== window._lastDiff){
                window._lastDiff = diff;
                window._TO=setTimeout(scrollToItem, 15, element);
            }
        } else {
            window.scrollTo(0, element.offsetTop)
        }*/
  };

  // Open accordions when rocket component clicked
  switchAccordion = function (e) {
    e.preventDefault();

    var thisAnswer = e.target.parentNode.parentNode.nextElementSibling, //The expanded text
      thisQuestion = e.target.parentNode; //The link element that has been clicked

    // This is a keypress event, set the vars to accomondate for event bubbling
    if (e.target.classList.contains('js-accordionTrigger')) {
      thisAnswer = e.target.parentNode.nextElementSibling;
      thisQuestion = e.target;
    }

    // Switch in propulsion smoke graphic for final step
    if (thisQuestion.parentNode.parentNode.id == 'step6') {
      propulsionImg = thisQuestion.querySelector('#nosmoke'); //Default no smoke image
      propulsionImgSmoke = thisQuestion.querySelector('#smoke'); //Smoke image
      propulsionImgSmoke.classList.toggle('visible');
    }

    //setFocus(thisQuestion);

    if (thisAnswer.classList.contains('is-collapsed')) {
      setAccordionAria(thisQuestion, thisAnswer, 'true');
    } else {
      setAccordionAria(thisQuestion, thisAnswer, 'false');
    }
    thisQuestion.classList.toggle('is-collapsed');
    thisQuestion.classList.toggle('is-expanded');
    thisAnswer.classList.toggle('is-collapsed');
    thisAnswer.classList.toggle('is-expanded');
    thisAnswer.classList.toggle('animateIn');
    rocket.classList.toggle('paused');

    if (thisQuestion.classList.contains('is-collapsed')) {
      setTimeout(function () {
        scrollToItem(document.getElementById('rocket-buttons'));
      }, 800);
    }

    clouds.forEach((cloud) => {
      cloud.classList.toggle('fade-cloud');
    });

    // Set active state of corresponding bottom button
    currElem = thisQuestion.getAttribute('data-element');
    document
      .querySelector(`.rocket-buttons li a[data-element='${currElem}']`)
      .classList.toggle('active');
  };

  // Trigger accordion open when bottom button is clicked
  expandAccordion = function (e) {
    const buttonElem = e.target,
      aid = buttonElem.getAttribute('href'),
      aidString = aid.toString().replace('#', '');
    aidLink = document.getElementById(aidString).getElementsByTagName('img')[0];

    e.preventDefault();
    scrollToItem(document.getElementById(aidString));

    // Trigger click on accordion component only if not already expanded
    //if ((aidLink).parentNode.classList.contains('is-collapsed')) {
    setTimeout(function () {
      aidLink.click();
    }, 800);
    //}
  };

  // Add event listeners to rocket accordion components and bottom buttons
  accordionToggles.forEach((accordionToggle, index) => {
    /*if (touchSupported) {
        accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
        buttonToggles[i].addEventListener('touchstart', expandAccordion, false);
      }
      if (pointerSupported) {
        accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
        buttonToggles[i].addEventListener('pointerdown', expandAccordion, false);
    }*/
    accordionToggle.addEventListener('click', switchAccordion, false);
    accordionToggle.addEventListener(
      'keydown',
      function (e) {
        var key = e.which.toString();

        if (key.match(/13|32/)) {
          switchAccordion(e);
        }
      },
      false
    );
    buttonToggles.forEach((buttonToggle, index) => {
      buttonToggle.addEventListener('click', expandAccordion, false);
      buttonToggle.setAttribute('data-element', [index]);
    });

    accordionToggle.setAttribute('data-element', [index]);
  });

  // Rellax
  var rellax = new Rellax('.rellax');
})();
