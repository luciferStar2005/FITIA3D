import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal, { useModal } from "../components/Modal/Modal";

const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

// Helper para determinar las clases del input dependiendo de si hay error
const getInputClass = (hasError: boolean) =>
    `h-11 px-4 bg-neutral-900 border ${hasError ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'} transition-all outline-none rounded-xl w-full text-white placeholder-gray-500 text-sm`;

export default function RegisterForm() {
    const { modal, showModal, closeModal } = useModal();
    const [formData, setFormData] = useState({
        nombre: '', apellido: '', email: '', password: '', confirm: '', estatura: '', peso: '', fecha: '', tipoCuerpo: 'mesomorfo',
        terminos: false, politica: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        // Remove error message for a field when user modifies it
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
        const dataParaBackend = {
            firtsName: formData.nombre,    // nombre -> firtsName
            lastName: formData.apellido,   // apellido -> lastName
            email: formData.email,
            password: formData.password,
            stature: parseFloat(formData.estatura), // texto -> número
            weight: parseFloat(formData.peso),      // texto -> número
            gender: 'M',                          // valor por defecto 
            birthDate: formData.fecha,             // fecha -> birthDate
            bodyType: formData.tipoCuerpo         // nuevo campo
        };
        try {
            const response = await fetch('http://localhost:8080/api/v2/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataParaBackend),
            });

            if (response.ok) {
                showModal("¡Bienvenido!", "¡Tu cuenta fue creada exitosamente! Ya puedes iniciar sesión.", "success");
            } else {
                showModal("Error al registrar", `No fue posible crear la cuenta. Código: ${response.status}`, "error");
            }
        } catch (error) {
            showModal("Error de conexión", "No se pudo conectar con el servidor. Intenta de nuevo más tarde.", "error");
        }

    };

    return (
        <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Nombres</label>
                <div className="md:flex md:justify-between md:gap-3">
                    <div className="w-full mb-4 md:mb-0">
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={getInputClass(!!errors.nombre)} placeholder="Primer nombre" />
                        {errors.nombre && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.nombre}</p>}
                    </div>
                    <div className="w-full">
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className={getInputClass(!!errors.apellido)} placeholder="Primer apellido" />
                        {errors.apellido && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.apellido}</p>}
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass(!!errors.email)} placeholder="correo@ejemplo.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Contraseña</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={getInputClass(!!errors.password)} placeholder="••••••••" />
                {errors.password && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Confirmar contraseña</label>
                <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} className={getInputClass(!!errors.confirm)} placeholder="••••••••" />
                {errors.confirm && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.confirm}</p>}
            </div>

            <div className="flex gap-3">
                <div className="flex flex-col w-full">
                    <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Estatura (cm)</label>
                    <input type="number" name="estatura" value={formData.estatura} onChange={handleChange} className={getInputClass(!!errors.estatura)} placeholder="Ej: 175" />
                    {errors.estatura && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.estatura}</p>}
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Peso (kg)</label>
                    <input type="number" name="peso" value={formData.peso} onChange={handleChange} className={getInputClass(!!errors.peso)} placeholder="Ej: 70" />
                    {errors.peso && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.peso}</p>}
                </div>
            </div>

            <div className="flex flex-col w-full">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Fecha de nacimiento</label>
                <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className={getInputClass(!!errors.fecha)} />
                {errors.fecha && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.fecha}</p>}
            </div>

            <div className="flex flex-col w-full mt-2">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Tipo de Cuerpo</label>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: 'ectomorfo', label: 'Flaco', img: '/ectomorfo.png' },
                        { id: 'mesomorfo', label: 'Intermedio', img: '/mesomorfo.png' },
                        { id: 'endomorfo', label: 'Robusto', img: '/endomorfo.png' },
                    ].map((type) => (
                        <label 
                            key={type.id} 
                            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 cursor-pointer transition-all ${formData.tipoCuerpo === type.id ? 'border-red-500 bg-red-500/10' : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900'}`}
                        >
                            <input
                                type="radio"
                                name="tipoCuerpo"
                                value={type.id}
                                checked={formData.tipoCuerpo === type.id}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <img src={type.img} alt={type.label} className="w-full h-24 object-cover rounded-lg" />
                            <span className="text-gray-300 text-[10px] font-bold uppercase tracking-wider text-center">{type.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center">
                    <input type="checkbox" name="politica" checked={formData.politica} onChange={handleChange} className="mr-3 w-4 h-4 accent-red-500 rounded border-white/[0.1] bg-white/[0.04]" />
                    <label className="font-medium text-gray-400 text-sm">Acepto la Política de privacidad</label>
                </div>
                {errors.politica && <p className="text-red-400 text-xs ml-7 font-medium">{errors.politica}</p>}

                <div className="flex items-center">
                    <input type="checkbox" name="terminos" checked={formData.terminos} onChange={handleChange} className="mr-3 w-4 h-4 accent-red-500 rounded border-white/[0.1] bg-white/[0.04]" />
                    <label className="font-medium text-gray-400 text-sm">Acepto los Términos y condiciones</label>
                </div>
                {errors.terminos && <p className="text-red-400 text-xs ml-7 font-medium">{errors.terminos}</p>}
            </div>

            <div className="flex w-full mt-6">
                <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-['Bebas_Neue'] text-xl tracking-[0.15em] py-3.5 rounded-xl transition-colors">
                    CREAR CUENTA
                </button>
            </div>
        </form>
        <Modal {...modal} onClose={closeModal} />
        </>
    );
}

export function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitData, setSubmitData] = useState<{ email: string, password: string } | null>(null);
    const navigate = useNavigate();

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
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitData(formData);
    };

    useEffect(() => {
        if (!submitData) return;

        const performLogin = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submitData),
                });

                if (response.ok) {
                    const token = await response.text();
                    localStorage.setItem('token', token);
                    navigate('/home');
                } else {
                    setErrors({ general: 'Credenciales incorrectas o error en el servidor.' });
                }
            } catch (error) {
                setErrors({ general: 'No se pudo conectar con el backend.' });
            } finally {
                setSubmitData(null);
            }
        };

        performLogin();
    }, [submitData, navigate]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-2">
            {errors.general && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {errors.general}
                </div>
            )}
            <div className="flex flex-col">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass(!!errors.email)} placeholder="correo@ejemplo.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
                <label className="text-[10px] mb-1.5 text-gray-400 font-bold uppercase tracking-widest pl-1">Contraseña</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={getInputClass(!!errors.password)} placeholder="••••••••" />
                {errors.password && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
            </div>

            <div className="flex w-full mt-6">
                <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-['Bebas_Neue'] text-xl tracking-[0.15em] py-3.5 rounded-xl transition-colors">
                    INICIAR SESIÓN
                </button>
            </div>
        </form>
    );
}