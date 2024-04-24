const url = window.location.origin;

const mostrarAlerta = (id) => {
  const boton = document.querySelector(`#p-${id} .alerta`);
  boton.classList.add("visible");
};

const ocultarAlerta = (id) => {
  const boton = document.querySelector(`#p-${id} .alerta`);
  boton.classList.remove("visible");
};

const cargarProductos = () => {
  const descripcionesLargas = document.querySelectorAll(".descripcionLarga");
  const descripcionesCortas = document.querySelectorAll(".descripcionCorta");

  descripcionesLargas.forEach((descripcionLarga) => {
    descripcionLarga.addEventListener("mouseover", (event) => {
      event.target.style.display = "block";
      const index = Array.from(descripcionesLargas).indexOf(event.target);
      descripcionesCortas[index].style.display = "none";
    });
    descripcionLarga.addEventListener("mouseout", (event) => {
      event.target.style.display = "none";
      const index = Array.from(descripcionesLargas).indexOf(event.target);
      descripcionesCortas[index].style.display = "block";
    });
  });

  descripcionesCortas.forEach((descripcionCorta, index) => {
    descripcionCorta.addEventListener("mouseover", (event) => {
      descripcionesLargas[index].style.display = "block";
      event.target.style.display = "none";
    });
    descripcionCorta.addEventListener("mouseout", (event) => {
      descripcionesLargas[index].style.display = "none";
      event.target.style.display = "block";
    });
  });
};

const anadirAlCarrito = (id) => {
  try {
    fetch(`${url}/anadirAlCarrito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    mostrarAlerta(id);
    setTimeout(() => {
      ocultarAlerta(id);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

const quitarCarrito = (id) => {
  try {
    fetch(`${url}/eliminar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

window.onload = () => {
  cargarProductos();
};
