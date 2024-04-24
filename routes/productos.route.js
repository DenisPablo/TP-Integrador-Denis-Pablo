const { Router } = require("express");
const {
  cargarProductos,
  anadirAlCarrito,
  carrito,
  quitarCarrito,
} = require("../controllers/productos.controller");

const router = Router();

router.get("/", cargarProductos);
router.post("/anadirAlCarrito", anadirAlCarrito);
router.get("/carrito", carrito);
router.post("/eliminar", quitarCarrito);

module.exports = router;
