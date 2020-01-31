const shortid = require('shortid');

const Note = require('../models/note.model');
const HTTPError = require('../utils/HTTPError');
const agenda = require('../config/agenda');

class NoteController {
  async list(req, res) {
    const notes = await Note.find();

    res.json({ success: true, notes });
  }

  async getById(req, res) {
    const { id } = req.params;

    const note = await Note.findById(id);

    res.json({ success: true, note });
  }

  async upsert(req, res) {
    const note = req.body;

    if (!note._id) {
      note._id = shortid.generate();
    }

    if (!note.date) {
      note.date = new Date().toISOString().substring(0, 16);
    }

    if (!note.level) {
      note.level = 'uni';
    }

    const upsertedNote = await Note.findByIdAndUpdate(note._id, note, {
      new: true,
      upsert: true
    });

    res.json({ success: true, note: upsertedNote });

    await agenda.cancel({ 'data._id': upsertedNote._id });
    if (upsertedNote.emails || upsertedNote.numbers) {
      await agenda.schedule(
        new Date(upsertedNote.date),
        'sendNote',
        upsertedNote
      );
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const note = await Note.findByIdAndRemove(id);

    res.json({ success: true, note });

    await agenda.cancel({ 'data._id': id });
  }

  async publish(req, res) {
    const { id } = req.params;

    const note = await Note.findById(id);

    note.date = new Date().toISOString().substring(0, 16);

    const publishedNote = await note.save();

    res.json({ success: true, note: publishedNote });

    await agenda.cancel({ 'data._id': publishedNote._id });
    if (publishedNote.emails || publishedNote.numbers) {
      await agenda.schedule(
        new Date(publishedNote.date),
        'sendNote',
        publishedNote
      );
    }
  }

  async sample(req, res) {
    const notes = await Note.create([
      {
        title: 'Building Applications',
        date: '2020-01-28T19:55',
        daysToShow: 1,
        body: 'Becoming an Outlier',
        level: 'uni',
        group: 'JavaScript',
        emails: 'miladabbasi99@yahoo.com',
        numbers: '09351996866'
      },
      {
        title: 'Clean Code',
        date: '2020-01-30T19:55',
        daysToShow: 2,
        body: 'Writing Code for Humans',
        level: 'faculty',
        group: 'JavaScript',
        emails: '',
        numbers: ''
      },
      {
        title: 'Architecting',
        date: '2020-01-27T19:55',
        daysToShow: 3,
        body: 'Applications for the Real World',
        level: 'dorm',
        group: 'JavaScript',
        emails: '',
        numbers: ''
      },
      {
        title: 'Reprogramming',
        date: '2020-01-30T19:55',
        daysToShow: 4,
        body: 'Reprogramming the Developer Mind',
        level: 'uni',
        group: 'JavaScript',
        emails: '',
        numbers: ''
      },
      {
        title: 'Web',
        date: '2020-01-30T19:55',
        daysToShow: 5,
        body: 'Web Component Fundamentals',
        level: 'faculty',
        group: 'JavaScript',
        emails: '',
        numbers: ''
      }
    ]);

    res.json({ success: true, notes });
  }
}

module.exports = new NoteController();
