const { nanoid } = require('nanoid');
const book = require('./books')

//kriteria 3 api dapat menyimpan buku
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = { 
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt, 
  };
  

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  book.push(newBook);
  const isSuccess = book.filter((book) => book.id === id).length > 0;
  if (isSuccess){
      return h.response({
   	 status: 'success',
   	 message: 'Buku berhasil ditambahkan',
   	  data: {
     	   bookId: id
 	 }
      }).code(201);
    }
};
//kriteria 4 ,api dapat menampilkan semua buku
const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = book; 
  if (name) {
    filteredBooks = filteredBooks.filter((b) =>
      b.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading !== undefined) {
    const isReading = reading === '1'; 
    filteredBooks = filteredBooks.filter((b) => b.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinished = finished === '1'; 
    filteredBooks = filteredBooks.filter((b) => b.finished === isFinished);
  }

  const booksData = filteredBooks.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));

  return h.response({
    status: 'success',
    data: {
      books: booksData,
    },
  }).code(200);
};
//kriteria 5, api dapat menampilkan detail buku
const getIdBookHandler = (request, h) => {
  const { bookId } = request.params;

  const dataBook = book.filter((n) => n.id === bookId)[0];
  if(dataBook) {
    return h.response ({
      status: 'success',
      data: {
        dataBook,
      },
    }).code(200);
  }
``
  return h.response ({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};
//api menampilkan buku yang sudah seleai dibaca
const finisHandler = (request, h) => {
  const finishedBooks= book.filter((book) => book.finished === true);
  if(finishedBooks.length > 0) {
    return h.response ({
      status: 'success',
      message: 'buku yang telah selesai dibaca',
      data: {
        finishedBooks,
      },
    }).code(200);
  }
``
  return h.response ({
    status: 'fail',
    message: 'tidak ada buku yang selesai dibaca ditemukan',
  }).code(404);
};
//kriteria 6, api dapat mengubah data buku
const editIdBookHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = book.findIndex((book) => book.id === bookId);  
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

    book[index] = { 
        ...book[index],
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

// kriteria 7, api dapat menghapus buku
const deleteIdBookHandler = (request, h) => {
    const { bookId } = request.params;
    const index = book.findIndex((book) => book.id === bookId);  

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    book.splice(index, 1);  
    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};

module.exports = {addBookHandler, getAllBookHandler, getIdBookHandler, finisHandler,editIdBookHandler, deleteIdBookHandler};
