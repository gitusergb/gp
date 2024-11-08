const express = require('express');
const multer = require('multer');
const { uploadFileAndAskAI } = require('../controllers/chat');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadFileAndAskAI);

module.exports = router;
