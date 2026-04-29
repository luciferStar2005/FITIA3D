/**
 * loginValidation.js
 * Validación + fetch POST para inicio de sesión.
 */

(function () {
  "use strict";

  const API_URL = "http://localhost:8080/api/v1/auth/login"; // 👈 Cambia por tu endpoint real

  // ── Ruta a la que redirige tras login exitoso ────────────────────────────────
  const REDIRECT_URL = "../html/menu.html"; // 👈 Cambia por tu ruta real

  // ── Reglas de validación ─────────────────────────────────────────────────────
  const RULES = {
    correo: {
      validate(v) {
        if (!v) return "El correo es obligatorio.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
          return "Ingresa un correo válido (ej: usuario@dominio.com).";
        return null;
      },
    },
    contrasena: {
      validate(v) {
        if (!v) return "La contraseña es obligatoria.";
        if (v.length < 8) return "Mínimo 8 caracteres.";
        return null;
      },
    },
  };

  // ── Helpers UI ───────────────────────────────────────────────────────────────
  function setError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const span  = document.getElementById("error-" + fieldId);
    if (!input || !span) return;

    if (message) {
      span.textContent = message;
      span.style.display = "block";
      input.classList.add("input-error");
      input.classList.remove("input-ok");
    } else {
      span.textContent = "";
      span.style.display = "none";
      input.classList.remove("input-error");
      input.classList.add("input-ok");
    }
  }

  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return true;
    const error = RULES[fieldId].validate(input.value.trim());
    setError(fieldId, error);
    return error === null;
  }

  // ── Estilos en línea ─────────────────────────────────────────────────────────
  const style = document.createElement("style");
  style.textContent = `
    .error-msg {
      display: none;
      color: #ff3d3d;
      font-size: 0.72rem;
      letter-spacing: 0.05em;
      margin-top: 4px;
      font-family: 'Bebas Neue', sans-serif;
    }
    .input-error { border-color: #ff3d3d !important; outline-color: #ff3d3d !important; }
    .input-ok    { border-color: #00e676 !important; }
    .btn-ingresar:disabled { opacity: 0.6; cursor: not-allowed; }
  `;
  document.head.appendChild(style);

  // ── Fetch POST ───────────────────────────────────────────────────────────────
  async function enviarLogin(email, password) {
    const btn           = document.getElementById("btn-ingresar");
    const textoOriginal = btn.textContent;

    try {
      btn.disabled    = true;
      btn.textContent = "INGRESANDO...";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const token = await response.text();

     if (response.ok) {
        localStorage.setItem("token", token.trim()); 
        window.location.href = REDIRECT_URL;

    } else if (response.status === 401) {
        setError("correo",    "Correo o contraseña incorrectos.");
        setError("contrasena","Correo o contraseña incorrectos.");

    } else {
        alert(`Error ${response.status}: no se pudo iniciar sesión.`);
    }

    } catch (err) {
      console.error("Error de red:", err);
      alert("No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.");
    } finally {
      btn.disabled    = false;
      btn.textContent = textoOriginal;
    }
  }

  
  document.addEventListener("DOMContentLoaded", function () {
    const fieldIds = ["correo", "contrasena"];

    fieldIds.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener("blur",  function () { validateField(id); });
      input.addEventListener("input", function () {
        if (input.classList.contains("input-error")) validateField(id);
      });
    });

    fieldIds.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") handleLogin();
      });
    });

    document.getElementById("btn-ingresar").addEventListener("click", handleLogin);
  });

  function handleLogin() {
    const correoOk    = validateField("correo");
    const contrasenaOk = validateField("contrasena");

    if (!correoOk || !contrasenaOk) return;

    const email    = document.getElementById("correo").value.trim();
    const password = document.getElementById("contrasena").value.trim();

    enviarLogin(email, password);
  }

})();