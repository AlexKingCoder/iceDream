const mongoose = require("mongoose");

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Conectado con éxito a la BBDD");
        console.log("Servidor en línea. Dirección: http://localhost:3000");
    } catch (error) {
        console.error("Error en la conexión a la BBDD", error);
    }
}

module.exports = { connectDB }