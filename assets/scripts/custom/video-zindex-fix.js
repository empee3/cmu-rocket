//Fix z-index youtube video embedding
//http://stackoverflow.com/questions/9074365/youtube-video-embedded-via-iframe-ignoring-z-index
$(document).ready(function (){
    $('iframe').each(function(){
        var url = $(this).attr("src");
        $(this).attr("src",url+"?wmode=transparent");
    });
});
