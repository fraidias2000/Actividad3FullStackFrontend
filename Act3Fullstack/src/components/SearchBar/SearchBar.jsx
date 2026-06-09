import './SearchBar.css';

// Input de búsqueda controlado por el componente padre. No mantiene estado propio.
// Recibe `value` con el texto actual y `onChange` con el callback que se dispara
// en cada cambio del input.
function SearchBar({ value, onChange }) {
  // Único <input> de texto envuelto en un contenedor con placeholder de búsqueda.
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar-input"
        placeholder="Buscar por título..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar libros por título"
      />
    </div>
  );
}

export default SearchBar;
