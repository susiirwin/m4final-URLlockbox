var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $('#links-list').on('click', 'button.mark-unread', function(){
    console.log("unread")

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
