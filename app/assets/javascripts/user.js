// $(function() {
$(document).on('turbolinks:load', function() {
  var searchList = $ ('#user-search-result');
  var menberList = $ ('#chat-group-users');
  function appendUserToSearchList(user) {
    var html = 
             `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${user.name} </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=" ${user.id} " data-user-name="${user.name}">追加</div>
              </div>`
    searchList.append(html);
  }

  function appendErrorMessage() {
    var html = 
              `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
              </div>`
    searchList.append(html);
  }
  
  function appendMembers(userName, userId) {
    var html =
              `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value=' ${userId} '>
                <p class='chat-group-user__name'> ${userName} </p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
               </div>`
    menberList.append(html);
 }


    // インクリメンタルサーチ
    $('#user-search-field').on('keyup', function() {
      var input = $('#user-search-field').val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
      })
      
      .done(function(users) {
        
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function( user ){
            appendUserToSearchList(user);
          });
        }
        else {
          appendErrorMessage();
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
        });
    });
    // ユーザー追加
    $(document).on("click", ".user-search-add", function () {
      var userName = $(this).attr('data-user-name');
      var userId = $(this).attr('data-user-id');
      $(this).parent().remove();
      appendMembers(userName, userId);
      
      
    });
    // ユーザー削除
    $(document).on("click", ".user-search-remove", function(){
      $(this).parent().remove();
    });
});