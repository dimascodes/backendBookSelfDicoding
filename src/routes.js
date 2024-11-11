const {addBook, getAllbook, getIdBook, editIdBook, deleteIdBook} = require ("./book.js");

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllbook,
  },
  {
    method: 'GET',
    path: '/books/{bookId}'
    handler: getAllbook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editIdBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteIdBook,
  },
];

module.exports = routes;
