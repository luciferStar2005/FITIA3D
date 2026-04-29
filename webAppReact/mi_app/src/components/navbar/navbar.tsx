
import './navbar.css';

export const Navbar = () => {
    return(
        <div>
            <nav className="navPrincipal">
            <div className="NombrePagina">PERSONAL<span className="Parte2">GYM</span></div>
            <ul className="nav-links">
                <li><a href="#funcionalidades">Funciones</a></li>
                <li><a href="#proceso">Proceso</a></li>
            </ul>
                <button className="btn-nav">Acceso Anticipado</button>
        </nav>
        </div>
    )

}