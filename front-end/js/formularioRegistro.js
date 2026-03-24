

(function () {
  "use strict";

  const API_URL = "http://localhost:8080/api/v2/user/register";

  const RULES = {
    nombre: {
      validate(v) {
        if (!v) return "El nombre es obligatorio.";
        if (v.length < 2) return "Mínimo 2 caracteres.";
        if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]+$/u.test(v))
          return "Solo se permiten letras.";
        return null;
      },
    },
    apellido: {
      validate(v) {
        if (!v) return "El apellido es obligatorio.";
        if (v.length < 2) return "Mínimo 2 caracteres.";
        if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]+$/u.test(v))
          return "Solo se permiten letras.";
        return null;
      },
    },
    edad: {
      validate(v) {
        if (v === "" || v === null) return "La edad es obligatoria.";
        const n = Number(v);
        if (!Number.isInteger(n)) return "Ingresa un número entero.";
        if (n < 10 || n > 100) return "La edad debe estar entre 10 y 100 años.";
        return null;
      },
    },
    peso: {
      validate(v) {
        if (v === "" || v === null) return "El peso es obligatorio.";
        const n = Number(v);
        if (n <= 0) return "El peso debe ser mayor a 0.";
        if (n < 20 || n > 300) return "Ingresa un peso válido (20–300 kg).";
        return null;
      },
    },
    estatura: {
      validate(v) {
        if (v === "" || v === null) return "La estatura es obligatoria.";
        const n = Number(v);
        if (n <= 0) return "La estatura debe ser mayor a 0.";
        if (n < 50 || n > 250) return "Ingresa una estatura válida (50–250 cm).";
        return null;
      },
    },
    correo: {
      validate(v) {
        if (!v) return "El correo electrónico es obligatorio.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
          return "Ingresa un correo válido (ej: usuario@dominio.com).";
        return null;
      },
    },
    contrasena: {
      validate(v) {
        if (!v) return "La contraseña es obligatoria.";
        if (v.length < 8) return "Mínimo 8 caracteres.";
        if (!/[A-Z]/.test(v)) return "Debe contener al menos una mayúscula.";
        if (!/[0-9]/.test(v)) return "Debe contener al menos un número.";
        return null;
      },
    },
  };

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
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  `;
  document.head.appendChild(style);

  // ── Fetch POST ───────────────────────────────────────────────────────────────
  async function enviarRegistro(datos) {
    const btn          = document.querySelector(".btn-submit");
    const textoOriginal = btn.textContent;

    try {
      btn.disabled    = true;
      btn.textContent = "ENVIANDO...";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          firtsName: datos.nombre,
          lastName: datos.apellido,
          email:    datos.correo,      
          password: datos.contrasena,
        }),
      });

      const resultado = await response.json().catch(() => null);

      if (response.ok) {
        
        document.getElementById("registroForm").reset();
        window.location.href = "../html/login.html";
        Object.keys(RULES).forEach(function (id) {
          const el = document.getElementById(id);
          if (el) el.classList.remove("input-ok", "input-error");
        });
      } else {
        // 4xx / 5xx — error del servidor
        const msg =
          resultado?.message ||
          resultado?.error   ||
          `Error ${response.status}: no se pudo completar el registro.`;
        alert("Error: " + msg);
      }

    } catch (err) {
      // Sin conexión, CORS, URL incorrecta, etc.
      console.error("Error de red:", err);
      alert("No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.");
    } finally {
      btn.disabled    = false;
      btn.textContent = textoOriginal;
    }
  }

  // ── Inicialización ───────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registroForm");
    if (!form) return;

    const fieldIds = Object.keys(RULES);

    // Validación en tiempo real
    fieldIds.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener("blur",  function () { validateField(id); });
      input.addEventListener("input", function () {
        if (input.classList.contains("input-error")) validateField(id);
      });
    });

    // Submit
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      fieldIds.forEach(function (id) {
        if (!validateField(id)) isValid = false;
      });

      if (!isValid) {
        const firstError = form.querySelector(".input-error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          firstError.focus();
        }
        return;
      }

      const datos = {};
      fieldIds.forEach(function (id) {
        datos[id] = document.getElementById(id).value.trim();
      });

      enviarRegistro(datos);
    });
  });
})();