import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 p-4'>
      <h1 className="text-xl font-bold text-neutral-400 mb-4">Navegación de Desarrollo</h1>
      <Link to="/formFill" className="w-48 text-center p-3 border border-neutral-700 bg-neutral-800 text-white rounded hover:bg-neutral-700">Registro</Link>
      <Link to="/login" className="w-48 text-center p-3 border border-neutral-700 bg-neutral-800 text-white rounded hover:bg-neutral-700">Login</Link>
      <Link to="/perfil" className="w-48 text-center p-3 border border-neutral-700 bg-neutral-800 text-white rounded hover:bg-neutral-700">Perfil</Link>
      <Link to="/home" className="w-48 text-center p-3 border border-neutral-700 bg-neutral-800 text-white rounded hover:bg-neutral-700">Rutina (Home)</Link>
    </div>
  )
}

export default LandingPage