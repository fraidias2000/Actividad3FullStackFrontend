import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBooks } from '../../services/bookService';
import { useBookFilter } from '../../hooks/useBookFilter';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import BookGrid from '../../components/BookGrid/BookGrid';
import './HomePage.css';

// Vista principal del catálogo. Compone el filtro de categorías y el grid de libros.
// El término de búsqueda procede del Navbar a través del query param `q`.
function HomePage() {
  // Lectura del query param `q` que el buscador del Navbar añade a la URL.
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

 //Variables para obtener los libros del backend
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const categories = useMemo(() => {
  return [...new Set(books.map((book) => book.category).filter(Boolean))].sort();
  }, [books]);

  useEffect(() => {
  async function loadBooks() {
    try {
      setLoading(true);
      setError('');

      const booksFromApi = await getBooks();
      setBooks(booksFromApi);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el catálogo.');
    } finally {
      setLoading(false);
    }
  }

  loadBooks();
}, []);

  // El custom hook aísla la lógica de filtrado para que esta vista solo pinte la UI.
  const {
    filteredBooks,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useBookFilter(books);

  // Cada cambio del query param propaga el nuevo término al estado interno del hook.
  // setSearchTerm es estable (proviene de useState) y por eso es seguro como dependencia.
  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl, setSearchTerm]);

  // Cabecera con el resumen del catálogo, controles de filtrado y el grid de libros.
  // .home-page da el fondo a toda la página y .home-page-container limita el ancho del contenido.
  return (
    <section className="home-page">
      <div className="home-page-container">
        <header className="home-page-header">
          <h1>Catálogo</h1>
          <p>
            {queryFromUrl
              ? `Resultados para "${queryFromUrl}" — ${filteredBooks.length} ${
                  filteredBooks.length === 1 ? 'libro encontrado' : 'libros encontrados'
                }`
              : `Descubre tu próximo libro entre ${books.length} ejemplares.`}
          </p>
        </header>

        <div className="home-page-controls">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {loading && <p>Cargando libros...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <BookGrid books={filteredBooks} />}
      </div>
    </section>
  );
}

export default HomePage;
