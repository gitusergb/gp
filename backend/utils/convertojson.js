const xlsx = require("xlsx");

async function convertExcelToJson(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    return jsonData;
  } catch (error) {
    console.error('Error uploading file and asking AI:', error);
  }
}

module.exports = { convertExcelToJson };
