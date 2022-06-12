const ChatRoutes = require('express').Router();

const { getOne, postOne, patchOne } = require('./chat.controller');

ChatRoutes.get('/:room', getOne);
ChatRoutes.post('/', postOne);
ChatRoutes.patch('/:id', patchOne);

module.exports = ChatRoutes;
