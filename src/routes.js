const { addBookHandler, getAllBookHandler, getIdBookHandler, finisHandler, editIdBookHandler, deleteIdBookHandler} = require ("./handler");

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
    path: '/books/{bookId}',
    handler: getIdBookHandler,
  },
  {
    method: 'GET',
    path: '/books/finished',
    handler: finisHandler,
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
