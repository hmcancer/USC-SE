const mongoose = require('mongoose');
const shortid = require('shortid');

const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String
    },
    daysToShow: {
      type: Number,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    level: {
      type: String
    },
    group: {
      type: String
    },
    emails: {
      type: String
    },
    numbers: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
