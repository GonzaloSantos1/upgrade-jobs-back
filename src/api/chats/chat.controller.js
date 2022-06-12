const Chat = require('./chat.model');

const getOne = async (req, res, next) => {
  try {
    const { room } = req.params;
    const chat = await Chat.findOne({ room: room });
    res.status(200).json(chat);
  } catch (error) {
    return next(error);
  }
};

const postOne = async (req, res, next) => {
  try {
    const chat = new Chat(req.body);
    const chatDB = await chat.save();
    return res.status(201).json(chatDB);
  } catch (error) {
    return next(error);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chat = new Chat(req.body);
    chat._id = id;
    const updateChat = await Chat.findByIdAndUpdate(id, chat);
    return res.status(200).json(updateChat);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOne,
  postOne,
  patchOne,
};
