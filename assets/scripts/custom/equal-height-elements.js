//Equal Height flex box fallback
$(document).ready(function() {
  // Get an array of all element heights
  var elementHeights = $('.no-flexbox .flex-item, .no-flexwrap .flex-item').map(function() {
    return $(this).height();
  }).get();

  // Math.max takes a variable number of arguments
  // `apply` is equivalent to passing each height as an argument
  var maxHeight = Math.max.apply(null, elementHeights);

  // Set each height to the max height
  $('.no-flexbox .flex-item, .no-flexwrap .flex-item').height(maxHeight);
});
