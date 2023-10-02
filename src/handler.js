const { nanoid } = require('nanoid');
const notes = require('./notes');

// FOR ADD NOTES WITH METHOD POST
const addNotesHandler = (req, h) => {
  // GET BODY REQUEST
  const { title, tags, body } = req.payload;

  // GET VALUE FOR id, createdAt, updatedAt
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // IF SUCCESS ADD NOTES
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  // IF FAIL ADD NOTES
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// FOR SHOW NOTES WITH METHOD GET
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

module.exports = { addNotesHandler, getAllNotesHandler };
