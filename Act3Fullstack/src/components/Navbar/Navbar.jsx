import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
// MODIFICADO POR KARLA — coordinar antes del merge a main.
// Importo mi SearchBar para integrarlo como buscador global de la cabecera.
import SearchBar from "../SearchBar/SearchBar";
// AÑADIDO POR ANA — Widget del carrito para mostrar contador de productos.
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  // MODIFICADO POR KARLA — bloque para el buscador integrado.
  // El estado del input vive aquí (local). Al hacer submit navegamos al
  // catálogo con el término en el query param `q`. La HomePage lo lee desde
  // la URL y filtra con useBookFilter.
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryFromUrl);


  // Si el usuario llega a /catalogo?q=algo desde un enlace externo o pulsando
  // atrás, sincronizamos el input con la URL para que muestre lo correcto.
  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  // Filtrado al escribir con debounce de 200ms.
  // Cada keystroke programa un timer; si el usuario sigue escribiendo, el cleanup
  // del efecto cancela el timer anterior. Solo navegamos cuando para de teclear
  // durante 200ms. Usamos `replace: true` para no llenar el historial con una
  // entrada por cada letra escrita.
  useEffect(() => {
    if (query === queryFromUrl) return;
    const timeoutId = setTimeout(() => {
      const term = query.trim();
      const target = term ? `/catalogo?q=${encodeURIComponent(term)}` : "/catalogo";
      navigate(target, { replace: true });
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [query, queryFromUrl, navigate]);

  // El submit del form ya no es necesario para que filtre (lo hace el debounce),
  // pero lo mantenemos por accesibilidad: pulsar Enter dispara la navegación
  // inmediata sin esperar los 200ms.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = query.trim();
    navigate(
      term ? `/catalogo?q=${encodeURIComponent(term)}` : "/catalogo",
      { replace: true }
    );
  };
  // — fin del bloque añadido por Karla —

  const [mostrarUserProfile, setMostrarUserProfile] = useState(false);

  return (
    <header className="navbar">
      <nav className="navbar-container" aria-label="Navegación principal">
        <Link to="/" className="navbar-logo">
          <BookOpen className="navbar-logo-icon" />
          <span>Relatos de Papel</span>
        </Link>

        {/* MODIFICADO POR KARLA — buscador en la cabecera (estilo Figma).
            Reutiliza el componente SearchBar y dispara la navegación al catálogo. */}
        <form
          className="navbar-search-form"
          onSubmit={handleSearchSubmit}
          role="search"
          aria-label="Buscar libros"
        >
          <SearchBar value={query} onChange={setQuery} />
        </form>
        {/* — fin sección Karla — */}

        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          {/* MODIFICADO POR KARLA — el catálogo es público en mi rama:
              elimino el redirect condicional al login. */}
          <Link to="/catalogo">Catálogo</Link>
        </div>
        <div className="navbar-actions">
          {/* AÑADIDO POR ANA — Integración del carrito en la barra de acciones */}
          <CartWidget />

          {isAuthenticated ? (
            <div className="navbar-user">

              <Link to="/profile" className="navbar-user-profile">
                <img
                    src={user.avatar}
                    alt={`Imagen avatar`}
                    className="navbar-avatar"
                />

                <span className="navbar-username">
                  {user.name}
                </span>
              </Link>


              <button onClick={logout} className="navbar-logout">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-button">
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;