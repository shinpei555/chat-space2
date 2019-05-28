require 'rails_helper'
describe Message do
  describe '#create' do
    it "is invalid without a content" do
      message = Message.new(content: "テキスト", image: "kkk", group_id: 1, user_id: 1)
      message.valid?
      expect(message.errors[:content][:image]).to include("can't be blank")
    end
  end
end