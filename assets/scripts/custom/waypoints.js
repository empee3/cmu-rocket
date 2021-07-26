//Waypoints
$(document).ready(function(){
  $('.fade-in').waypoint(function() {
    $(this).toggleClass('set');
  }, { offset: '200%' });

  $('.fade-in').waypoint(function() {
    $(this).removeClass('set');
    $(this).toggleClass('visible');
  }, { offset: '95%' });
});
