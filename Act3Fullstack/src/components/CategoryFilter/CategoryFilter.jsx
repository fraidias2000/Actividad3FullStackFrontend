import './CategoryFilter.css';

// Botones tipo chip para filtrar por categoría.
// Recibe `categories` con la lista de categorías disponibles, `selected` con la
// categoría activa (cadena vacía si no hay filtro) y `onSelect` con el callback que
// se ejecuta al elegir una categoría.
function CategoryFilter({ categories, selected, onSelect }) {
  // Grupo de botones en el que el primero ("Todas") sirve para resetear el filtro.
  return (
    <div className="category-filter" role="group" aria-label="Filtrar por categoría">
      <button
        type="button"
        className={`category-filter-btn ${selected === '' ? 'is-active' : ''}`}
        onClick={() => onSelect('')}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`category-filter-btn ${selected === cat ? 'is-active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
