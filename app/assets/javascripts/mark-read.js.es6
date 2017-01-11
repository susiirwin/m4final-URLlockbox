var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $('#links-list').on('click', 'button.mark-read', function(){

    var $this = $(this);
    var linkId = $this.parents('.link').data('id');


    var readLink = $(this).data("url")

    $.ajax( {
      method: 'POST',
      data: {url: readLink},
      url: "https://si-m4-final-service.herokuapp.com/links"
    })
  })
})
