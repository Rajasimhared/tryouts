const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

const sendMessage = asyncHandler(async(req, res) => {
    const {
        content,
        chatId
    } = req.body;
    if (!content || !chatId) {
        console.log('Invalid data in request');
        return res.status(400);
    }
    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        })
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.json(message);
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
    }
});

const allMessages = asyncHandler(async(req, res) => {
    console.log(req.params.chatId)
    try {
        const message = await Message.find({
            chat: req.params.chatId
        }).populate("sender", "name pic email").populate("chat");
        console.log(message)
        res.json(message);
    } catch (error) {
        throw new Error(error.message);
        res.status(400);
    }
})
module.exports = {
    sendMessage,
    allMessages
};