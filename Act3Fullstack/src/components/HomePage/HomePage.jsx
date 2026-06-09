import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { booksMock } from '../../hooks/booksMock';
import { useBookFilter } from '../../hooks/useBookFilter';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import BookGrid from '../BookGrid/BookGrid';
import './HomePage.css';

// La lista de categorías se deriva del mock para no hardcodearla.
// Se calcula una sola vez al cargar el módulo, no en cada render.
const CATEGORIES = [...new Set(booksMock.map((b) => b.category))].sort();

// Vista principal del catálogo. Compone el filtro de categorías y el grid de libros.
// El término de búsqueda procede del Navbar a través del query param `q`.
function HomePage() {
  // Lectura del query param `q` que el buscador del Navbar añade a la URL.
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  // El custom hook aísla la lógica de filtrado para que esta vista solo pinte la UI.
  const {
    filteredBooks,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useBookFilter(booksMock);

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
              : `Descubre tu próximo libro entre ${booksMock.length} ejemplares.`}
          </p>
        </header>

        <div className="home-page-controls">
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <BookGrid books={filteredBooks} />
      </div>
    </section>
  );
}

export default HomePage;
