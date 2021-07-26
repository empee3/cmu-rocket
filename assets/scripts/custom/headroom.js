//Headroom.js
$("document").ready(function(){
  var myElement = document.querySelector(".navigation-main");
  var headroom  = new Headroom(myElement,{
      offset: 75,
      tolerance : {
          up : 20,
          down : 0
      }
    });
  headroom.init();
});
