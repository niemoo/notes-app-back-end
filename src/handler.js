const { nanoid } = require('nanoid');
const notes = require('./notes');

// FUNC ADD NOTES WITH METHOD POST
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

// FUNC FOR SHOW ALL NOTES IN HOME WITH METHOD GET
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// FUNC SHOW NOTES IN NOTES OWN PAGE WITH METHOD GET
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

// FUNC EDIT NOTES
const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  // SEARCH NOTES INDEX BY ID
  const index = notes.findIndex((note) => note.id === id);

  // IF INDEX NOT FOUND THEN RETURN -1
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    // IF EDIT SUCCESS
    const response = h.response({
      status: 'success',
      message: 'Note updated successfully',
    });

    response.code(200);
    return response;
  }

  // IF ID NOT FOUND
  const response = h.response({
    status: 'fail',
    message: 'Failed to update record. ID not found',
  });

  response.code(404);
  return response;
};

// FUNC FOR DELETE NOTE BY ID
const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Note deleted successfully',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note failed to delete. ID not found',
  });

  response.code(404);
  return response;
};

module.exports = {
  addNotesHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
