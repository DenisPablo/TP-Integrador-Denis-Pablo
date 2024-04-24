const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.rutas = {
      productos: "/",
    };

    //Middlewares
    this.middlewares();
    //Rutas APP
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.set("view engine", "pug");
    //Lectura y parceo del body
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.rutas.productos, require("../routes/productos.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
