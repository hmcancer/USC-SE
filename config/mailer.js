const sgMail = require('@sendgrid/mail');

const { sendgridKey } = require('./keys');

sgMail.setApiKey(sendgridKey);

module.exports = sgMail;
