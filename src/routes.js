const {addBookHandler, getAllBookHandler, getIdBookHandler, editIdBookHandler, deleteIdBookHandler} = require ("./book.js");

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}'
    handler: getIdBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editIdBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteIdBookHandler,
  },
];

module.exports = routes;
