
  json.content  @message.content
  json.image    @message.image
  json.name     @message.user.name
  json.id       @message.id
  json.date     @message.created_at.strftime('%Y/%m/%d %R')