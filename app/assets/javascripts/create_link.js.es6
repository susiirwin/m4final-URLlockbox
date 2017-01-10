var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $newLinkTitle = $("#link-title");
  $newLinkUrl  = $("#link-url");

  $("#new-link").on('submit', createLink);

  displayExistingLinks();
})

function displayExistingLinks(){
  $.get("api/v1/links")
  .then(function(links){
    links.forEach(renderLink)
  })
}

function createLink (event){
  event.preventDefault();

  console.log("win")

  var link = getLinkData();

  $.post("/api/v1/links", link)
   .then( renderLink )
   .fail( displayFailure )
 }

function getLinkData() {
 return {
   title: $newLinkTitle.val(),
   url: $newLinkUrl.val()
 }
}

function renderLink(link){

  $("#links-list").prepend( linkHTML(link) )
  if (link.read === false) {
    attachReadEvent(link.id)
  } else {
    attachUnreadEvent(link.id)
  }
  clearLink();
}

function attachReadEvent(id){
  $(`#link-${id} .mark-read`).on('click', markRead)
}

function attachUnreadEvent(id){
  $(`#link-${id} .mark-read`).on('click', markUnread)
}

function markRead(){
  var readLink = $(this).data("url")
  var id = $(this).data("id")

  $.ajax( {
    method: 'PUT',
    data: {read: true},
    url: `api/v1/links/${id}`
  })
  .then($(`#link-${id} .mark-read`).text('Mark as Unread'))
  .then($(`#link-${id} .link_read`).text('true'))
  .then($(`#link-${id}`).addClass('read'))
  .then(attachUnreadEvent(id))
}

function markUnread(){
  var readLink = $(this).data("url")

  var id = $(this).data("id")
  $.ajax( {
    method: 'PUT',
    data: {read: false},
    url: `api/v1/links/${id}`
  })
  .then($(`#link-${id} .mark-read`).text('Mark as Read'))
  .then($(`#link-${id} .link_read`).text('false'))
  .then($(`#link-${id}`).removeClass('read'))
  .then(attachReadEvent(id))
}

function linkHTML(link) {if (link.read === false){

    return `<div class='link' data-id='${link.id}' id="link-${link.id}">
              <p class='link-title'>${ link.title }</p>
              <p class='link-url' >${ link.url }</p>

              <p class="link_read">
                ${ link.read }
              </p>
              <p class="link_buttons" >
                <button class="mark-read" data-id='${link.id}' data-url='${link.url}'>Mark as Read</button>
                <button class='edit-link'>Edit</button>
                <button class='delete-link'>Delete</button>
              </p>
            </div>`
          } else {
            return `<div class='link read' data-id='${link.id}' id="link-${link.id}">
              <p class='link-title'>${ link.title }</p>
              <p class='link-url' >${ link.url }</p>

              <p class="link_read">
                ${ link.read }
              </p>
              <p class="link_buttons" >
                <button class="mark-read" data-id='${link.id}' data-url='${link.url}'>Mark as Unead</button>
                <button class='edit-link'>Edit</button>
                <button class='delete-link'>Delete</button>
              </p>
            </div>`
          }
}

function clearLink() {
  $newLinkTitle.val("");
  $newLinkUrl.val("");
}

function displayFailure(failureData){
  console.log("FAILED attempt to create new Link: " + failureData.responseText);
}
