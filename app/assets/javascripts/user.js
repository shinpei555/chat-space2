$(function() {
  var searchList = $ ('#user-search-result');
  function appendUserToSearchList(user) {
    var html = 
             `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${user.name} </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=" ${user.id} " data-user-name="${user.name}">追加</div>
              </div>`
    searchList.append(html);
  }

    $('#user-search-field').on('keyup', function() {
      var input = $('#user-search-field').val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
        // processData: false,
        // contentType: false
      })
      
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUserToSearchList(user);
          });
        }
        else {
          appendErrorMessage('一致するユーザーはいません');
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
        });
    });
});