const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User.js");
const { generateToken } = require("../../utils/token");
const { deleteFile } = require("../../utils/deleteFile.js");

async function registerUser(req, res) {

  try {
    const user = new User(req.body);

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json("Ya existe un usuario registrado con este email. Por favor, utiliza otro email.");
    }

    if (req.file) {
      user.profileImg = req.file.path;
    }

    const userSaved = await user.save();

    return res.status(201).json(userSaved);
  } catch (error) {

    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(400).json("Error de registro. No se ha podido crear el usuario.");
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("No se ha encontrado al usuario");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id);
      return res.status(200).json({ message: "Acceso concedido. Recuerda que tu sesión caducará en 7 días", email, token });
    } else {
      return res.status(400).json("Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el inicio de sesión.");
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.user.role !== "Admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ message: "No tienes permiso para actualizar este perfil." });
    }

    if (updateData.role && !["Admin", "Client"].includes(updateData.role)) {
      return res.status(406).json({ message: 'El rol debe ser "Admin" o "Client".' });
    }

    if (updateData.role && req.user.role !== "Admin") {
      return res.status(403).json({ message: "No tienes permiso para modificar el rol." });
    }

    if (req.file) {
      updateData.profileImg = req.file.path;
    }

    const userUpdated = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!userUpdated) {
      return res.status(404).json({ message: "Usuario no encontrado. Asegúrate de introducir una id válida." });
    }

    return res.status(200).json(userUpdated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "No se ha podido actualizar el usuario." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "Admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ message: "AVISO: No tienes permiso para eliminar este perfil." });
    }

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (userDeleted.profileImg) {
      await deleteFile(userDeleted.profileImg);
    }

    return res.status(200).json({
      message: "Usuario eliminado con éxito.",
      element: userDeleted
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "No se ha podido eliminar el usuario." });
  }
};

module.exports = {
  registerUser, 
  loginUser, 
  updateUser, 
  deleteUser }