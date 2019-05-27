json.array! @new_message do |message|
  json.content message.content
  json.image message.image.url
  json.date message.created_at.strftime('%Y/%m/%d %R')
  json.name message.user.name
  json.id message.id
end