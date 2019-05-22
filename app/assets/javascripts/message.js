$(function() {
  function buildHTML(message){
  var insertImage = '';
  if (message.image_url) {
    insertImage = `<img src="${message.image_url}">`;
  }
  var html = `<div class="message">
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.name}
                </div>
                <div class="upper-message__date">
                    ${message.date}
                </div>
              </div>
              <div class="lower-meesage">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                ${insertImage}
              </div>
            </div>`;
  return html
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    console.log(data);
    var html = buildHTML(data);
    $('.form__submit').prop('disabled', false);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: 1000}, 500, 'swing');
    $('.form__message').val('');
    $('.hidden').val('');
  })
  .fail(function(){
    alert('error').fadeOut("slow");
  })
 });
});