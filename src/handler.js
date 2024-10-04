const books = require('./model');
const nanoid = require('nanoid');

function addBookHandler(request, h) {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;
  if (name === null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  const newBookId = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const isFinished = readPage === pageCount;
  const newBooks = {
    id: newBookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: isFinished,
    reading,
    insertedAt,
    updatedAt
  };
  books.push(newBooks);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: newBookId
    }
  });
  response.code(201);
  return response;
}

function getBookHandler(request, h) {
  return h.response({
    status: 'success',
    data: {
      books: books
    }
  });
}

function getBookByIdHandler(request, h) {
  const { bookId } = request.params;
  const searchedBook = books.filter((book) => book.id === bookId)[0];
  if (searchedBook === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
  } else {
    return h.response({
      status: 'success',
      data: {
        book: searchedBook
      }
    });
  }
}

function updateBookHandler(request, h) {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  const indexOfSearchedBook = books.findIndex((book) => book.id === bookId);
  if (indexOfSearchedBook === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }
  const updatedAt = new Date().toISOString();
  const isFinished = readPage === pageCount;
  books[indexOfSearchedBook] = {
    ...books[indexOfSearchedBook],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: isFinished,
    reading,
    updatedAt
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
}

function deleteBookHandler(request, h) {
  const { bookId } = request.params;
  const searchedBookId = books.findIndex((book) => book.id === bookId);
  if (searchedBookId === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  } else {
    books.splice(searchedBookId, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }
}

module.exports = { addBookHandler, getBookHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler };