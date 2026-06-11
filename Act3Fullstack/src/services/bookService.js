
//CLASE PARA PEDIR AL BACKEND EL LISTADO DE LIBROS
const BOOKS_URL =
  import.meta.env.VITE_CATALOGUE_BOOKS_URL ||
  'http://localhost:8762/catalogue-service/api/books';

const REQUEST_BODY = {
  targetMethod: 'GET',
  queryParams: null,
  body: null,
};

function normalizeBook(book) {
  return {
    id: book.id ?? book.bookId,
    title: book.title ?? book.name,
    author: book.author ?? book.writer ?? '',
    price: Number(book.price ?? 0),
    category: book.category ?? book.genre ?? '',
    isbn: book.isbn ?? '',
    description: book.description ?? '',
    image: book.image ?? book.imageUrl ?? book.coverUrl ?? '',
  };
}

function extractBooks(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.body)) {
    return data.body;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.content)) {
    return data.content;
  }

  return [];
}

export async function getBooks() {
  const response = await fetch(BOOKS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(REQUEST_BODY),
  });

  if (!response.ok) {
    throw new Error(`Error al obtener libros: ${response.status}`);
  }

  const data = await response.json();
  return extractBooks(data).map(normalizeBook);
}

export async function getBookById(id) {
  const books = await getBooks();
  return books.find((book) => String(book.id) === String(id));
}