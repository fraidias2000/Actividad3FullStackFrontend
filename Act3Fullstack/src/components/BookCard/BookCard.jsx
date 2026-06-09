import { useNavigate } from 'react-router-dom';
import './BookCard.css';

// SVG inline que se usa cuando la imagen del libro falla al cargar.
// Inline (data URI) para no depender de otra petición HTTP que también podría fallar.
const PLACEHOLDER_COVER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'><rect width='300' height='450' fill='%23e7e5e4'/><text x='150' y='225' text-anchor='middle' fill='%2378716c' font-family='sans-serif' font-size='18'>Sin portada</text></svg>";

// Tarjeta individual de un libro. Al hacer clic navega al detalle.
// Recibe la prop `book` con los campos id, title, author, price, image y category.
function BookCard({ book }) {
  // useNavigate permite cambiar de ruta de forma imperativa al hacer clic.
  // Se prefiere a <Link> para que toda la superficie de la tarjeta sea clicable.
  const navigate = useNavigate();

  // Imagen del libro arriba y bloque informativo debajo, dentro de un <article>.
  return (
    <article
      className="book-card"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <img
        src={book.image}
        alt={book.title}
        className="book-card-image"
        loading="lazy"
        onError={(e) => {
          // onerror=null evita bucle si el propio fallback fallara.
          e.currentTarget.onerror = null;
          e.currentTarget.src = PLACEHOLDER_COVER;
        }}
      />
      <div className="book-card-body">
        <span className="book-card-category">{book.category}</span>
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <span className="book-card-price">{book.price.toFixed(2)} €</span>
      </div>
    </article>
  );
}

export default BookCard;
