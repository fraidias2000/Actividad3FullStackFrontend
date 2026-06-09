import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-brand">
          <h2>Relatos de Papel</h2>
          <p>
            Tu tienda online para descubrir libros, autores e historias que inspiran.
          </p>
        </section>

        <nav className="footer-links" aria-label="Enlaces del footer">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Relatos de Papel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;