import {books} from "./model";
import {nanoid} from "nanoid";
import {server} from "@hapi/hapi";

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
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    })
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    })
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
  }
  books.push(newBooks);
  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: newBookId
    }
  })
  response.code(201);
  return response;
}

function getBookHandler(request, h) {
  return h.response({
    status: "success",
    data: {
      books: books
    }
  })
}

function getBookByIdHandler(request, h) {
  const {id} = request.params;
  const searchedBook = books.filter((book) => book.id === id)[0];
  if (searchedBook === undefined) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan"
    })
    response.code(404)
    return response;
  } else {
    return h.response({
      status: "success",
      data: {
        book: searchedBook
      }
    })
  }
}

export {addBookHandler, getBookHandler, getBookByIdHandler};