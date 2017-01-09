$(document).ready(function(){
  $('.mark-read').on('click', submitReadLink)
});

function submitReadLink(){
  var readLink = $(this).data("url")

  $.ajax( {
    method: 'POST',
    data: {url: readLink},
    url: "https://si-m4-final-service.herokuapp.com//links"
  })
}
