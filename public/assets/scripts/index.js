var $jq = jQuery.noConflict();

(function () {
  const d = document;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
  var accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
    setAccordionAria,
    switchAccordion,
    buttonToggles = d.querySelectorAll('.rocket-buttons .buttons li a'),
    rocket = d.getElementById('rocket'),
    clouds = d.querySelectorAll('.cloud');

  // Only add bounce animation if browser is not Safari, and prefers-reduced-motion is not set
  if (!!window.chrome || !!window.sidebar || '\v' == 'v') {
    if (!prefersReducedMotion.matches) {
      rocket.style.animation = 'bounce 1.4s infinite';
    }
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

  scrollToItem = function (element) {
    // jQuery for now
    $jq('html,body').animate({ scrollTop: $jq(element).offset().top }, 600);
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

    rocket.classList.toggle('paused'); // Stops the rocket bounce animation while an item is expanded

    if (thisQuestion.classList.contains('is-collapsed')) {
      setTimeout(function () {
        if (!prefersReducedMotion.matches) {
          scrollToItem(document.getElementById('rocket-buttons'));
        }
      }, 800);
    }

    // Fade the cloud svgs when an item is expanded for easier reading
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
  expandAccordion = function (e, buttonToggle) {
    const buttonElem = buttonToggle,
      aid = buttonElem.getAttribute('href'),
      aidString = aid.toString().replace('#', ''),
      aidLink = document
        .getElementById(aidString)
        .getElementsByTagName('img')[0];

    e.preventDefault();
    scrollToItem(document.getElementById(aidString));

    // Trigger click on accordion component only if not already expanded
    // if ((aidLink).parentNode.classList.contains('is-collapsed')) {
    setTimeout(function () {
      aidLink.click();
    }, 800);
    //}
  };

  // Add event listeners to rocket accordion components and bottom buttons
  accordionToggles.forEach((accordionToggle, index) => {
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
    accordionToggle.setAttribute('data-element', index);
  });

  buttonToggles.forEach((buttonToggle, index) => {
    buttonToggle.addEventListener('click', (e) =>
      expandAccordion(e, buttonToggle)
    );
    buttonToggle.setAttribute('data-element', index);
  });

  // Rellax
  if (!prefersReducedMotion.matches) {
    var rellax = new Rellax('.rellax');
  }
})();
