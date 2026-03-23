document.addEventListener('DOMContentLoaded', () => {
    const inputNombre = document.getElementById('inputNombre');
    const inputApellido = document.getElementById('inputApellido');
    const boton=document.getElementById('boton');
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

    const chequearFormulario = () => {
        const nombreValido = regexLetras.test(inputNombre.value) && inputNombre.value.trim().length > 0;
        const apellidoValido = regexLetras.test(inputApellido.value) && inputApellido.value.trim().length > 0;

        boton.disabled = !(nombreValido && apellidoValido);
    };
    const validarCampo = (input, errorSpan) => {
        const valor = input.value;
        if (!regexLetras.test(valor)) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            errorSpan.style.display = 'block';
        } else if (valor.length > 0) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            errorSpan.style.display = 'none';
        } else {
            input.classList.remove('is-invalid', 'is-valid');
            errorSpan.style.display = 'none';


        }

        chequearFormulario();
    };

    inputNombre.addEventListener('input', () => {
        validarCampo(inputNombre, document.getElementById('errorNombre'));
    });

    inputApellido.addEventListener('input', () => {
        validarCampo(inputApellido, document.getElementById('errorApellido'));
    });
});