const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {

    let folder = "IceDreamV1";

    if (req.originalUrl.includes("/admin/create-ingredient")) {
      folder += "/ingredientes";
    } 

    else if (req.originalUrl.includes("/users/register")) {
      folder += "/usuarios";
    } 

    else {
      folder += "/otros";
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;