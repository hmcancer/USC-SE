const router = require('express').Router();

const controller = require('../controllers/note.controller');

// @route  GET /api/notes/create
// @desc   Create sample notes
// @access Public
router.get('/sample', controller.sample);

// @route  GET /api/notes
// @desc   Get all notes
// @access Public
router.get('/', controller.list);

// @route  GET /api/notes/:id
// @desc   Get note by id
// @access Public
router.get('/:id', controller.getById);

// @route  POST /api/notes
// @desc   Create a new note
// @access Public
router.post('/', controller.upsert);

// @route  DELETE /api/notes/:id
// @desc   Delete a note by id
// @access Public
router.delete('/:id', controller.delete);

// @route  PUT /api/notes/publish/:id
// @desc   Publish a note
// @access Public
router.put('/publish/:id', controller.publish);

module.exports = router;
