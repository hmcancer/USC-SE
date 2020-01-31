const Kavenegar = require('kavenegar');

const { smsKey } = require('./keys');

const sms = Kavenegar.KavenegarApi({ apikey: smsKey });

module.exports = sms;
