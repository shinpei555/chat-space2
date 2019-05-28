class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
# Rspecでバリデーション追加
  # validates :image, presence: true
  validates :group_id, presence: true
  validates :user_id, presence: true

  mount_uploader :image, ImageUploader
end
