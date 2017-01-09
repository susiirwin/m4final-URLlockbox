var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  console.log('loaded')


  $('#links-list').on('click', 'button.mark-read', function(){
    console.log('win')
    // var $this = $(this);
    var linkId = $this.parents('.link').data('id');

    // $.ajax({
    //   url: '/api/v1/links/' + linkId,
    //   method: 'PATCH',
    //   data: {read: true}
    // });

  var readLink = $(this).data("url")

  $.ajax( {
    method: 'POST',
    data: {url: readLink},
    url: "https://si-m4-final-service.herokuapp.com/links"
  })
  })
})
