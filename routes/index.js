const router = require('express').Router();

const notesRouter = require('./note.router');

router.use('/notes', notesRouter);

module.exports = router;
