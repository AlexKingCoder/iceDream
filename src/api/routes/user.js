const userRouter = require("express").Router();
const { registerUser, loginUser, updateUser, deleteUser } = require('../controllers/user.js');
const { isAuth } = require("../../middlewares/auth.js");
const upload = require("../../middlewares/file.js");

userRouter.post("/register", upload.single("profileImg"), registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update/:id", isAuth, upload.single("profileImg"), updateUser);
userRouter.delete("/delete/:id", isAuth, deleteUser);

module.exports = userRouter;