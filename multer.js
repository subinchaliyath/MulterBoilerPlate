const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");
const fs = require("fs/promises");

const UPLOAD_DIRECTORY = "./public";

const checkIfDirectoryExists = async () => {
  try {
    await fs.stat(UPLOAD_DIRECTORY);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(UPLOAD_DIRECTORY);
    }
  }
};

const storage = multer.diskStorage({
  async destination(req, file, callback) {
    try {
      await checkIfDirectoryExists();
      callback(null, UPLOAD_DIRECTORY);
    } catch (err) {
      callback(err);
    }
  },

  async filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${v4()}${fileExtension}`;
    callback(null, fileName);
  },
});

const uploader = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
});

const getUploadedFiles = async () => {
  return await fs.readdir(UPLOAD_DIRECTORY);
};

const findUploadedFile = async (fileName) => {
  const info = await fs.stat(path.resolve(UPLOAD_DIRECTORY, fileName));
  console.log({ info });
  return info;
};

module.exports = {
  findUploadedFile,
  getUploadedFiles,
  uploader,
  UPLOAD_DIRECTORY,
};
