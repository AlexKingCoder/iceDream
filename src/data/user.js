const bcrypt = require("bcrypt");
const User = require("../api/models/User");

const users = [
  {
    name: "Alex",
    email: "alex.ice@mail.com",
    password: "ThisIsMyPassword1",
  },
  {
    name: "Diana",
    email: "diana.vegana@mail.com",
    password: "ThisIsMyPassword2",
  },
  {
    name: "Pedro",
    email: "pedro.rodriguez@mail.com",
    password: "ThisIsMyPassword3",
  },
  {
    name: "Sergio",
    email: "sergiocastellano96@mail.com",
    password: "ThisIsMyPassword4",
  },
  {
    name: "Alicia",
    email: "alicia.maravilla@mail.com",
    password: "ThisIsMyPassword5",
  },
  {
    name: "Berta",
    email: "berta.rock@mail.com",
    password: "ThisIsMyPassword6",
  },
  {
    name: "Iván",
    email: "ivan.ivienen@mail.com",
    password: "ThisIsMyPassword7",
  },
  {
    name: "Manuel",
    email: "manuel.ice@mail.com",
    password: "ThisIsMyPassword8",
  },
];

async function seedUsers() {

  for (let user of users) {
    user.password = bcrypt.hashSync(user.password, 10);
  }

  await User.insertMany(users);
  console.log("Usuarios cargados con éxito.");
}

seedUsers().catch((error) => console.log("Se ha producido un error al encriptar las contraseñas", error));

module.exports = users;