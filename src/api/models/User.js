const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    profileImg: { type: String, trim: true, required: false, default: null },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true, minlength: [8, "Contraseña de 8 caracteres mínimo"] },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    role: { type: String, enum: ["Client", "Admin"], default: "Client" }
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  };

  if (this.role === "Admin") {
    this.role = "Client";
  };

  next();
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;