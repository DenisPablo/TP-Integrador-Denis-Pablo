const cortarTexto = (texto, longitud) => {
  if (texto.length > longitud) {
    return texto.substring(0, longitud) + "...";
  } else {
    return texto;
  }
};

module.exports = {
  cortarTexto,
};
