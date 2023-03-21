/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const finished = (pageCount === readPage) || false;

    // handler tidak ada name
    if (name.length <= 0) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
        return response;
    }

    // handler readPage tidak valid
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
        return response;
    }

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

    // append books
    books.push(newBook);

    // cek if success
    const isSuccess = books.filter((books) => books.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        }).code(400);
        return response;
    }
};

const getAllBookHandler = () => ({
    status: 'success',
    data: {
        books,
    },
});

const getBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const book = books.filter((books) => books.id == bookId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
        return response;
    }
};

const editBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const updatedAt = new Date().toISOString();

    // handler finished
    const finished = (pageCount === readPage) || false;

    // handler tidak ada name
    if (name.length <= 0) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
        return response;
    }

    // handler readPage tidak valid
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
        return response;
    }

    const index = books.findIndex((books) => books.id === bookId);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, finished,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
        return response;
    }
};

const deleteBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
    return response;
};

module.exports = {addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};
