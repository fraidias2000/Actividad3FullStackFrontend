import { useParams, useNavigate } from 'react-router-dom';
import { booksMock } from '../../hooks/booksMock';
import { useCart } from '../../context/CartContext';
import './BookDetailPage.css';

// SVG inline que sustituye la portada si la URL del mock falla.
const PLACEHOLDER_COVER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'><rect width='300' height='450' fill='%23e7e5e4'/><text x='150' y='225' text-anchor='middle' fill='%2378716c' font-family='sans-serif' font-size='18'>Sin portada</text></svg>";

// Vista de detalle de un libro. Lee el identificador del libro desde la URL `/books/:id`.
function BookDetailPage() {
  // useParams extrae los parámetros dinámicos de la ruta. Aquí captura `:id`.
  const { id } = useParams();
  // useNavigate permite volver a la vista anterior cuando se pulsa el botón "Volver".
  const navigate = useNavigate();
  // useCart consume el CartContext mediante useContext y expone `addToCart` entre otros.
  const { addToCart } = useCart();

  // useParams devuelve siempre una cadena, pero el id del mock es numérico.
  // Number(id) garantiza que la comparación con === encuentre el libro correspondiente.
  const book = booksMock.find((b) => b.id === Number(id));

  // Si el id no existe en el mock se muestra un mensaje en lugar de fallar el render.
  if (!book) {
    return (
      <section className="book-detail">
        <button className="book-detail-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <p className="book-detail-empty">Libro no encontrado.</p>
      </section>
    );
  }

  // Botón para volver y, en una rejilla, la portada y los datos completos del libro.
  return (
    <section className="book-detail">
      <button className="book-detail-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="book-detail-grid">
        <img
          src={book.image}
          alt={book.title}
          className="book-detail-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER_COVER;
          }}
        />

        <div className="book-detail-info">
          <span className="book-detail-category">{book.category}</span>
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">{book.author}</p>
          <p className="book-detail-isbn">ISBN: {book.isbn}</p>
          <p className="book-detail-description">{book.description}</p>

          <div className="book-detail-footer">
            <span className="book-detail-price">{book.price.toFixed(2)} €</span>
            <button
              className="book-detail-add"
              onClick={() => addToCart(book)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetailPage;
