const translate = require("node-google-translate-skidz");

const traducir = async (texto) => {
  const traduccion = await translate({
    text: texto,
    source: "en",
    target: "es",
  });

  return traduccion.translation;
};

module.exports = {
  traducir,
};
