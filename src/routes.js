/* eslint-disable max-len */
const {addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler} = require('./handler');

const routes = [
    {
        // add new books
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        // get all books on home screen
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        // get new books by id
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        // edit books by id
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdHandler,
    },
    {
        // delete books by id
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
    {
        // wrong page
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'URL tidak ditemukan';
        },
    },
];

module.exports = routes;
