// Elementos principales.

const darkModeToggle = document.getElementById("dark-mode-toggle");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const form = document.getElementById("form-contacto");
const loader = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

// Modo oscuro.

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Cambiar ícono.
  
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️";
    localStorage.setItem("modo", "oscuro");
  } else {
    darkModeToggle.textContent = "🌙";
    localStorage.setItem("modo", "claro");
  }
});

// Mantener preferencia de modo oscuro al recargar.

window.addEventListener("DOMContentLoaded", () => {
  const modo = localStorage.getItem("modo");
  if (modo === "oscuro") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  }
});

// Menú hamburguesa.

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");

  // Cambiar ícono del botón.
  
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// Cerrar menú al hacer clic en un enlace.

document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// Formulario de contacto.

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loader.classList.remove("hidden");
  loader.setAttribute("aria-hidden", "false");

  const datos = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: datos,
      headers: {
        Accept: "application/json",
      },
    });

    loader.classList.add("hidden");
    loader.setAttribute("aria-hidden", "true");

    if (response.ok) {
      mostrarModal("Mensaje enviado con éxito. Te responderé pronto.", true);
      form.reset();
    } else {
      mostrarModal("Ocurrió un error al enviar el mensaje. Intenta de nuevo.", false);
    }
  } catch (error) {
    loader.classList.add("hidden");
    loader.setAttribute("aria-hidden", "true");
    mostrarModal("Error de conexión. Verifica tu red e inténtalo más tarde.", false);
  }
});

// Modal (mensajes).

function mostrarModal(mensaje, exito = true) {
  modalMessage.textContent = mensaje;
  modalMessage.className = exito ? "success" : "error";
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");

  // Cierre automático después de 5s.
  
  setTimeout(() => {
    cerrarModal();
  }, 5000);
}

modalClose.addEventListener("click", cerrarModal);

function cerrarModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

// Cerrar modal al hacer clic fuera del cuadro.

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    cerrarModal();
  }
});