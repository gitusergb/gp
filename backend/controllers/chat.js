const { askAI } = require("../utils/askAi");
const { convertExcelToJson } = require("../utils/convertojson");

async function uploadFileAndAskAI(req, res, next) {
  try {
    const prompt = req.body.prompt;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const jsonData = await convertExcelToJson(req.file.path);
    const aiResponse = await askAI(prompt, jsonData);
    res.json({
      message: "File uploaded and AI response generated successfully",
      data: { jsonData, aiResponse },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadFileAndAskAI };
