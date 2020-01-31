const mailer = require('../config/mailer');
const sms = require('../config/sms');

module.exports = agenda => {
  agenda.define('sendNote', async job => {
    const note = job.attrs.data;

    if (note.emails) {
      const to = [];

      note.emails.split(',').forEach(email => {
        email = email.trim();

        if (email) {
          to.push({ email });
        }
      });

      const msg = {
        to,
        from: 'note@university.com',
        subject: note.title,
        html: `<strong>${note.body}</strong>`
      };

      mailer.send(msg).catch(r => console.log(r.response.body.errors));
    }

    if (note.numbers) {
      sms.Send(
        {
          message: note.title,
          receptor: note.numbers
        },
        (response, status) => {
          console.log(response);
          console.log(status);
        }
      );
    }
  });
};
