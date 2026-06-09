import { useState, useEffect } from 'react';

// Custom hook que centraliza la lógica de filtrado del catálogo.
// Recibe el array completo de libros y devuelve los libros ya filtrados junto con
// los setters, de modo que las vistas que lo consumen no contengan esa lógica.
export function useBookFilter(allBooks) {
  // Cadena vacía y categoría vacía representan "sin filtro aplicado".
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  // El efecto recalcula la lista filtrada cuando cambia cualquiera de los tres
  // valores de los que depende el resultado: término, categoría o array original.
  useEffect(() => {
    let result = allBooks;

    if (searchTerm.trim() !== '') {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== '') {
      result = result.filter((book) => book.category === selectedCategory);
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, allBooks]);

  // Se exponen los setters para que la UI controle los criterios desde fuera del hook.
  return {
    filteredBooks,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
}
