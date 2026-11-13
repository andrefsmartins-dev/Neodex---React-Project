import React, { useContext, useState } from 'react';
import Button from "../UI/Button/Button";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase";
import { AuthContext } from "../Contextos/AuthContext";
import './Navbar.css';

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const redirecionar = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setMenuAberto(false);
            redirecionar('/');
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    const classeNome = (isActive, paginaAberta) => {
        let className = "nav-item " + paginaAberta;
        if (isActive) className += " active";
        return className;
    };

    const fecharMenu = () => setMenuAberto(false);

    return (
        <nav className="navbar">
            <div className="navbar-top">
                <Link to="/" className="logo-link" onClick={fecharMenu}>
                    <img src="/Assets/Navbar/logo_neodex_completo.png" alt="Logo" className="logo" />
                </Link>

                <button
                    type="button"
                    className={`menu-toggle ${menuAberto ? 'open' : ''}`}
                    onClick={() => setMenuAberto((prev) => !prev)}
                    aria-label="Abrir ou fechar menu"
                    aria-expanded={menuAberto}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`navbar-collapse ${menuAberto ? 'open' : ''}`}>
                <div className="nav-links">
                    <NavLink to="/" onClick={fecharMenu} className={({ isActive }) => classeNome(isActive, "pagina-inicial")}>
                        <img src="/Assets/Navbar/pagina_inicial.png" alt="Página Inicial" />
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="/pokedex" onClick={fecharMenu} className={({ isActive }) => classeNome(isActive, "pokedex")}>
                        <img src="/Assets/Navbar/pokedex.png" alt="Pokédex" />
                        <span>Pokédex</span>
                    </NavLink>

                    <NavLink to="/ace" onClick={fecharMenu} className={({ isActive }) => classeNome(isActive, "favoritos")}>
                        <img src="/Assets/Navbar/favoritos.png" alt="Ace's" />
                        <span>Ace's</span>
                    </NavLink>

                    <NavLink to="/equipa" onClick={fecharMenu} className={({ isActive }) => classeNome(isActive, "equipa")}>
                        <img src="/Assets/Navbar/equipa.png" alt="Team" />
                        <span>Team</span>
                    </NavLink>

                    <NavLink to="/tcg" onClick={fecharMenu} className={({ isActive }) => classeNome(isActive, "tcg")}>
                        <img src="/Assets/Navbar/tcg.png" alt="TCG" />
                        <span>TCG</span>
                    </NavLink>

                    <NavLink to="/go" onClick={fecharMenu} className={({ isActive }) => classeNome(isActive, "go")}>
                        <img src="/Assets/Navbar/go.png" alt="GO!" />
                        <span>GO!</span>
                    </NavLink>
                </div>

                <div className="navbar-auth">
                    {user ? (
                        <Button className="log-out-button" onClick={handleLogout}>
                            Log Out
                        </Button>
                    ) : (
                        <Button
                            className="sign-in-button"
                            onClick={() => {
                                fecharMenu();
                                redirecionar('/login');
                            }}
                        >
                            Log In
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}