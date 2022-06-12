const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    room: {type: String, require: true},
    messages: [{type: Object}]
  },
);

const Chat = mongoose.model('Chats', ChatSchema);
module.exports = Chat;