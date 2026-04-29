import { useState } from "react";
import Button from "../components/Button/Button.tsx";

const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

// Helper para determinar las clases del input dependiendo de si hay error
const getInputClass = (hasError: boolean) =>
    `h-8 px-2 bg-neutral-900 border ${hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-800 focus:border-neutral-500'} transition-all outline-none rounded-sm w-full text-white`;

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        nombre: '', apellido: '', email: '', password: '', confirm: '', estatura: '', peso: '', fecha: '',
        terminos: false, politica: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        // Remove error message for a field when user modifies it
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        // 1. No empty fields
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === 'string' && value.trim() === '') {
                newErrors[key] = 'Este campo es obligatorio';
            }
        });
        if (!formData.terminos) newErrors.terminos = 'Debes aceptar los términos y condiciones';
        if (!formData.politica) newErrors.politica = 'Debes aceptar la política de privacidad';

        // 2. Password validation rules (8 chars, 1 uppercase, 1 special char)
        if (formData.password && !passwordRegex.test(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, 1 letra mayúscula y 1 carácter especial.';
        }

        // Passwords match
        if (formData.password && formData.confirm && formData.password !== formData.confirm) {
            newErrors.confirm = 'Las contraseñas no coinciden.';
        }

        // Peso y Estatura positivos
        if (formData.estatura) {
            const estaturaNum = Number(formData.estatura);
            if (estaturaNum <= 0) newErrors.estatura = 'La estatura no puede ser negativa ni cero.';
        }
        if (formData.peso) {
            const pesoNum = Number(formData.peso);
            if (pesoNum <= 0) newErrors.peso = 'El peso no puede ser negativo ni cero.';
        }

        // Fecha de nacimiento (al menos 15 años)
        if (formData.fecha) {
            const birthDate = new Date(formData.fecha);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 15) {
                newErrors.fecha = 'Debes tener al menos 15 años para registrarte.';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Lógica de registro o llamada a la API
        console.log("Registrando con los siguientes datos", formData);
        alert("¡Registro validado exitosamente!");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <div className="flex flex-col">
                <label className="opacity-70 text-sm mb-1 text-neutral-300">Nombres</label>
                <div className="md:flex md:justify-between md:gap-2">
                    <div className="w-full mb-2 md:mb-0">
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={getInputClass(!!errors.nombre)} placeholder="Primer nombre" />
                        {errors.nombre && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombre}</p>}
                    </div>
                    <div className="w-full">
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className={getInputClass(!!errors.apellido)} placeholder="Primer apellido" />
                        {errors.apellido && <p className="text-red-500 text-xs mt-1 font-medium">{errors.apellido}</p>}
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <label className="opacity-70 text-sm mb-1 text-neutral-300">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass(!!errors.email)} placeholder="@ejemplo.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
                <label className="opacity-70 text-sm mb-1 text-neutral-300">Contraseña</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={getInputClass(!!errors.password)} />
                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
            </div>

            <div className="flex flex-col">
                <label className="opacity-70 text-sm mb-1 text-neutral-300">Confirmar contraseña</label>
                <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} className={getInputClass(!!errors.confirm)} />
                {errors.confirm && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirm}</p>}
            </div>

            <div className="flex gap-2">
                <div className="flex flex-col w-full">
                    <label className="opacity-70 text-sm mb-1 text-neutral-300">Estatura (cm)</label>
                    <input type="number" name="estatura" value={formData.estatura} onChange={handleChange} className={getInputClass(!!errors.estatura)} />
                    {errors.estatura && <p className="text-red-500 text-xs mt-1 font-medium">{errors.estatura}</p>}
                </div>
                <div className="flex flex-col w-full">
                    <label className="opacity-70 text-sm mb-1 text-neutral-300">Peso (kg)</label>
                    <input type="number" name="peso" value={formData.peso} onChange={handleChange} className={getInputClass(!!errors.peso)} />
                    {errors.peso && <p className="text-red-500 text-xs mt-1 font-medium">{errors.peso}</p>}
                </div>
            </div>

            <div className="flex flex-col w-full">
                <label className="opacity-70 text-sm mb-1 text-neutral-300">Fecha de nacimiento</label>
                <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className={getInputClass(!!errors.fecha)} />
                {errors.fecha && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fecha}</p>}
            </div>

            <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center">
                    <input type="checkbox" name="politica" checked={formData.politica} onChange={handleChange} className="mr-2" />
                    <label className="font-medium text-neutral-400 text-sm">Acepto la Política de privacidad</label>
                </div>
                {errors.politica && <p className="text-red-500 text-xs font-medium">{errors.politica}</p>}

                <div className="flex items-center">
                    <input type="checkbox" name="terminos" checked={formData.terminos} onChange={handleChange} className="mr-2" />
                    <label className="font-medium text-neutral-400 text-sm">Acepto los Términos y condiciones</label>
                </div>
                {errors.terminos && <p className="text-red-500 text-xs font-medium">{errors.terminos}</p>}
            </div>

            <div className="flex w-full mt-4 justify-end">
                <Button accion="Registrarse" tipo="submit" />
            </div>
        </form>
    );
}

export function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) newErrors.email = 'Debe ingresar su email';
        if (!formData.password.trim()) {
            newErrors.password = 'La contraseña es obligatoria';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'La contraseña debe cumplir los requisitos de seguridad.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Iniciando sesión", formData);
        alert("Validación de login correcta");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full mt-4">
            <div className="flex flex-col">
                <label className="opacity-70 text-sm mb-1 text-neutral-300">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass(!!errors.email)} placeholder="@ejemplo.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
                <label className="opacity-70 text-sm mb-1 text-neutral-300">Contraseña</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={getInputClass(!!errors.password)} />
                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
            </div>

            <div className="flex w-full mt-4 justify-end">
                <Button accion="Iniciar Sesion" tipo="submit" />
            </div>
        </form>
    );
}