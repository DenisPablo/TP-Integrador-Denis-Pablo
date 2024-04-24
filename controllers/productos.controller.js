const { response, request } = require("express");
const { traducir } = require("../helpers/traducir");
const { cortarTexto } = require("../helpers/cortarTexto");
const fs = require("fs");

const cargarProductos = async (req, res) => {
  try {
    const data = await fetch("https://fakestoreapi.com/products");
    const response = await data.json();

    const productos = await Promise.all(
      response.map(async (producto) => {
        const tituloEspanol = await traducir(producto.title);
        const descriptionEspanol = await traducir(producto.description);
        return {
          ...producto,
          title: tituloEspanol,
          description: descriptionEspanol,
          descriptionCorta: cortarTexto(descriptionEspanol, 30),
        };
      })
    );

    const ruta = "./db/productosDescuento.json";
    const jsonData = fs.readFileSync(ruta, "utf-8");
    const productosDescuento = JSON.parse(jsonData);

    productos.forEach((producto) => {
      const productoConDescuento = productosDescuento.find(
        (p) => p.id === producto.id
      );

      if (productoConDescuento) {
        producto.porcentajeDescuento = productoConDescuento.descuento;
        producto.descuento = true;
        producto.priceRebajado = (
          producto.price -
          (producto.price * productoConDescuento.descuento) / 100
        ).toFixed(2);
      }
    });

    res.render("index", { productos: productos });
  } catch (err) {
    console.log(err);
  }
};

const anadirAlCarrito = (req, res) => {
  const { id } = req.body;
  const ruta = "./db/carrito.json";
  const jsonData = fs.readFileSync(ruta, "utf-8");
  const datos = JSON.parse(jsonData);
  const carrito = new Set(datos);
  carrito.add(id);

  const carritoFinal = Array.from(carrito);

  fs.writeFileSync(ruta, JSON.stringify(carritoFinal));
};

const carrito = async (req, res) => {
  const ruta = "./db/carrito.json";
  const jsonData = fs.readFileSync(ruta, "utf-8");
  const carrito = JSON.parse(jsonData);

  try {
    const data = await fetch("https://fakestoreapi.com/products");
    const response = await data.json();

    const productos = await Promise.all(
      response.map(async (producto) => {
        const tituloEspanol = await traducir(producto.title);
        const descriptionEspanol = await traducir(producto.description);
        return {
          ...producto,
          title: tituloEspanol,
          description: descriptionEspanol,
          descriptionCorta: cortarTexto(descriptionEspanol, 30),
        };
      })
    );

    const rutaDescuento = "./db/productosDescuento.json";
    const jsonData = fs.readFileSync(rutaDescuento, "utf-8");
    const productosDescuento = JSON.parse(jsonData);

    productos.forEach((producto) => {
      const productoConDescuento = productosDescuento.find(
        (p) => p.id === producto.id
      );

      if (productoConDescuento) {
        producto.porcentajeDescuento = productoConDescuento.descuento;
        producto.descuento = true;
        producto.priceRebajado = (
          producto.price -
          (producto.price * productoConDescuento.descuento) / 100
        ).toFixed(2);
      }
    });

    const productosEnCarrito = productos.filter((producto) => {
      return carrito.includes(producto.id.toString());
    });

    res.render("carrito", { productosEnCarrito: productosEnCarrito });
  } catch (err) {
    console.log(err);
  }
};

const quitarCarrito = (req, res) => {
  const { id } = req.body;

  const ruta = "./db/carrito.json";
  const jsonData = fs.readFileSync(ruta, "utf-8");
  const carrito = JSON.parse(jsonData);

  const carritoNuevo = carrito.filter((item) => item !== id);

  fs.writeFileSync(ruta, JSON.stringify(carritoNuevo));
};

module.exports = {
  cargarProductos,
  anadirAlCarrito,
  carrito,
  quitarCarrito,
};
