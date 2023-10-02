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
      message: 'Note added successfully',
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
    message: 'Note failed to add',
  });
  response.code(500);
  return response;
};

// FOR SHOW ALL NOTES IN HOME WITH METHOD GET
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Notes not found',
  });

  response.code(404);
  return response;
};

module.exports = { addNotesHandler, getAllNotesHandler, getNoteByIdHandler };
