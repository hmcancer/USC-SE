module.exports = {
  port: process.env.PORT || 8000,
  dbURI: process.env.DB_URI,
  jobsDBURI: process.env.JOBS_DB_URI,
  sendgridKey: process.env.SENDGRID_KEY,
  smsKey: process.env.SMS_KEY
};
