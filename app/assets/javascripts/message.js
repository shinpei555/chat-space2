$(function() {
  // $(document).on('turbolinks:load', function() {
    function buildHTML(message){
    var insertImage = message.image ? `<img src="${message.image}">` : '';
    var html = `<div class="message" data-id= ${message.id} >
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
      var html = buildHTML(data);
      $('.form__submit').prop('disabled', false);
      $('.messages').append(html);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
      $('.hidden').val('');
    })
    .fail(function(){
      alert('error').fadeOut("slow");
    })
   });
  
    
    var reloadMessages = function() {
      var last_message_id = $('.message:last').data('id');
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: './api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = insertHTML + buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('エラー');
      });
    };
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 5000);
    };
    
  });