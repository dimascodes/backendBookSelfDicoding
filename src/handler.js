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
};

const getAllBookHandler = () => {
  const response = h.response({
    status: 'success',
    data: {
      bookId: bookId.map(({id, name, publisher}) => ({id, name, publisher})),
    }
  });
  response.code(200),
  return response;
};

const getIdBookHandler = () => {
  const {id} = request.param;

  const book = book.filter((n)=> n.id === id)[0];
  console.log(book);
  if(book !== undifined) {
    return h.response ({
      status: 'success',
      data: {
        book,
      
    }).code(200);
  }

  return h.response ({
    status: 'fail',
    message: 'buku tidak ditemukan',
  })
};

const editIdBookHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = bookId.findIndex((book) => book.id === id);
    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }
    
  bookId[index] = {
        ...bookId[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
    };

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
};

const deleteIdBookHandler = (request, h) => {
    const { id } = request.params;
    const index = bookId.findIndex((book) => book.id === id);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    bookId.splice(index, 1);
    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};

module.exports = {addBookHandler, getAllBookHandler, getIdBookHandler, editIdBookHandler, deleteIdBookHandler};
