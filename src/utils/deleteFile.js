const cloudinary = require("cloudinary").v2;

const deleteFile = (url) => {
  if (!url) {
    console.error("URL no proporcionada para eliminar imagen");
    return Promise.reject("URL no válida");
  }

  const array = url.split("/");
  const name = array.at(-1).split(".")[0];

  const folderIndex = array.indexOf("IceDreamV1");
  if (folderIndex === -1 || folderIndex + 2 >= array.length) {
    console.error("No se pudo determinar la ruta en Cloudinary:", url);
    return Promise.reject("Ruta de imagen no válida en Cloudinary");
  }

  const folder = array.slice(folderIndex, -1).join("/");
  const public_id = `${folder}/${name}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, { resource_type: "image" }, (error, result) => {
      if (error) {
        console.error("Error al eliminar la imagen: ", error);
        return reject(error);
      }
      console.log("Imagen eliminada de Cloudinary: ", result);
      resolve(result);
    });
  });
};

module.exports = { deleteFile };