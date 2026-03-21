document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------
    ABRIR Y CERRAR PANEL
    -------------------------- */

    const signupButton = document.querySelector(".signup-btn")
    const loginButton = document.querySelector(".login-btn")

    const backButton = document.getElementById("back-btn")
    const loginBack = document.getElementById("login-back")

    const signup = document.getElementById("signup-modal")
    const login = document.getElementById("login-modal")


    signupButton.addEventListener("click", () => {
        signup.classList.add("active")
    })
    backButton.addEventListener("click", () => {
        signup.classList.remove("active")
    })

    loginButton.addEventListener("click", () =>{
        login.classList.add("active")
    })
    loginBack.addEventListener("click", () =>{
        login.classList.remove("active")
    })


    /* --------------------------
    CAMPOS DEL FORMULARIO
    -------------------------- */

    const form = document.getElementById("signup-form")
    const loginForm = document.getElementById("login-form")

    const nombre = document.getElementById("nombre")
    const apellido = document.getElementById("apellido")
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    const loginPassword = document.getElementById("login-password")
    const loginEmail = document.getElementById("login-email")

    const nombreMsg = document.getElementById("nombre-msg")
    const apellidoMsg = document.getElementById("apellido-msg")
    const emailMsg = document.getElementById("email-msg")
    const passwordMsg = document.getElementById("password-msg")

    const loginPasswordMsg = document.getElementById("login-password-msg")
    const loginEmailMsg = document.getElementById("login-email-msg")

    /* --------------------------
    FUNCIONES DE VALIDACIÓN
    -------------------------- */

    function validarNombre(){

        if(nombre.value.trim().length >= 3){
            nombreMsg.textContent = "Nombre válido"
            nombreMsg.style.color = "#36E077"
            return true
        }else{
            nombreMsg.textContent = "Debe tener al menos 3 caracteres"
            nombreMsg.style.color = "#E03E36"
            return false
        }

    }

    function validarApellido(){

        if(apellido.value.trim().length >= 3){
            apellidoMsg.textContent = "Apellido válido"
            apellidoMsg.style.color = "#36E077"
            return true
        }else{
            apellidoMsg.textContent = "Debe tener al menos 3 caracteres"
            apellidoMsg.style.color = "#E03E36"
            return false
        }

    }

    function validarEmail(){

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(regex.test(email.value)){
            emailMsg.textContent = "Email válido"
            emailMsg.style.color = "#36E077"
            return true
        }else{
            emailMsg.textContent = "Email inválido"
            emailMsg.style.color = "#E03E36"
            return false
        }

    }

    function validarPassword(){

        if(password.value.length >= 6){
            passwordMsg.textContent = "Contraseña válida"
            passwordMsg.style.color = "#36E077"
            return true
        }else{
            passwordMsg.textContent = "Debe tener al menos 6 caracteres"
            passwordMsg.style.color = "#E03E36"
            return false
        }

    }

    const validarLoginEmail = ()=>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(regex.test(loginEmail.value)){
            loginEmailMsg.textContent = "Email válido"
            loginEmailMsg.style.color = "#36E077"
            return true
        }else{
            loginEmailMsg.textContent = "Email inválido"
            loginEmailMsg.style.color = "#E03E36"
            return false
        }
    }

    const validarLoginPassword = ()=>{
        if(loginPassword.value.length >= 6){
            loginPasswordMsg.textContent = "Contraseña válida"
            loginPasswordMsg.style.color = "#36E077"
            return true
        }else{
            loginPasswordMsg.textContent = "Debe tener mínimo 6 caracteres"
            loginPasswordMsg.style.color = "#E03E36"
            return false
        }
    }

    /* --------------------------
    VALIDACIÓN EN TIEMPO REAL
    -------------------------- */

    nombre.addEventListener("input", validarNombre)
    apellido.addEventListener("input", validarApellido)
    email.addEventListener("input", validarEmail)
    password.addEventListener("input", validarPassword)

    loginEmail.addEventListener("input", validarLoginEmail)
    loginPassword.addEventListener("input", validarLoginPassword)

    /* --------------------------
    VALIDACIÓN AL REGISTRAR
    -------------------------- */

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const nombreValido = validarNombre()
        const apellidoValido = validarApellido()
        const emailValido = validarEmail()
        const passwordValido = validarPassword()

        if(nombreValido && apellidoValido && emailValido && passwordValido){
            alert("Registro exitoso")
            signup.classList.remove("active")
        }else{
            alert("Por favor corrige los campos")
        }
    })

    loginForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        
        const emailValido = validarLoginEmail()
        const passwordValido = validarLoginPassword()

        if(emailValido && passwordValido){
            alert("Login correcto")
            modal.classList.remove("active")
        }else{
            alert("Corrige los campos")

        }
    })

})