const Agenda = require('agenda');

const { jobsDBURI } = require('./keys');

const connectionOpts = { db: { address: jobsDBURI, collection: 'agendaJobs' } };

const agenda = new Agenda(connectionOpts);

require('../jobs/note.job')(agenda);

agenda.start();

module.exports = agenda;
