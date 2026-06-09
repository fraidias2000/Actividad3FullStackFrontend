import BookCard from '../BookCard/BookCard';
import './BookGrid.css';

// Renderiza una rejilla responsive de tarjetas a partir de un array de libros.
// Recibe la prop `books`, que puede estar vacía cuando los filtros no devuelven resultados.
function BookGrid({ books }) {
  // Cuando no hay resultados se muestra un mensaje en lugar de una rejilla vacía.
  if (books.length === 0) {
    return (
      <p className="book-grid-empty">
        No se han encontrado libros con esos criterios.
      </p>
    );
  }

  // Contenedor con grid CSS auto-fill que asigna una BookCard por libro.
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
