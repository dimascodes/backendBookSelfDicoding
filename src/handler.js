const { nanoid } = require('nanoid');
const book = require('./book')

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = { 
    name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt, 
  };
  book.push(newBook);
  
  const isSuccess = book.filter((note) => book.id === id).length > 0;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'gagal menambahkan buku, readPage tidak boleh lebih besar dari page count',
    }).code(400);
  }
 
  return h.response({
    status: 'success',
    message: 'buku berhasil ditambahkan',
    data: {
      bookId: id
  }
  }).code(201);


}

module.exports = {addBookHandler};
