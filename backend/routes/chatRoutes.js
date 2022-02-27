const express = require('express');
const {
    protect
} = require('../middleware/authMiddleware');
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    removeFromGroupChat,
    addToGroupChat
} = require("../controllers/chatControllers");

const router = express.Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroupChat);
router.route('/groupremove').put(protect, removeFromGroupChat);
router.route('/groupadd').put(protect, addToGroupChat);

module.exports = router;