
export function Navbar() {
    return(
        <nav className="fixed top-0 left-0 right-0 bg-neutral-800 p-4">
            <ul className="flex space-x-4">
                <li><a href="#" className="text-red-300 hover:text-red-500">Gym</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">Perfil</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">Rutina</a></li>
            </ul>
        </nav>
    )
}