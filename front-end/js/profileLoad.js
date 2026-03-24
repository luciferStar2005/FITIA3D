

(function () {
  "use strict";

  const API_URL   = "http://localhost:8080/api/v2/user/me";
  const LOGIN_URL = "../html/login.html";

  document.addEventListener("DOMContentLoaded", async function () {

    const token = localStorage.getItem("token");
    console.log("Token en localStorage:", token); // quitar después de depurar

    if (!token) {
      window.location.href = LOGIN_URL;
      return;
    }

    await cargarPerfil(token);
  });

  async function cargarPerfil(token) {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = LOGIN_URL;
        return;
      }

      if (!response.ok) {
        console.error("Error al obtener el perfil:", response.status);
        return;
      }

      const usuario = await response.json();
      console.log("Datos del usuario:", usuario); // quitar después de depurar

      rellenarPerfil(usuario);

    } catch (err) {
      console.error("Error de red al cargar el perfil:", err);
    }
  }

  function rellenarPerfil(usuario) {
    // Keys exactos que devuelve tu back
    const firtsName = usuario.firtsName || "";
    const lastName  = usuario.lastName  || "";
    const email     = usuario.email     || "";

    // Nombre completo en el título grande
    const elNombre = document.getElementById("NameProfile");
    if (elNombre) {
      elNombre.textContent = (firtsName + " " + lastName).trim();
    }

    // Email debajo del nombre
    const elEmail = document.querySelector(".text-break");
    if (elEmail) {
      elEmail.textContent = email;
    }

    // Pre-cargar inputs del modal de edición
    const inputNombre   = document.getElementById("inputNombre");
    const inputApellido = document.getElementById("inputApellido");
    if (inputNombre)   inputNombre.value   = firtsName;
    if (inputApellido) inputApellido.value = lastName;
  }

})();