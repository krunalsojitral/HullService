"use strict";

var ip = require('ip');
if (ip.address() == '159.89.167.87') {
    module.exports = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'letsnurture90@gmail.com', // generated ethereal user
            pass: 'Letsdoit@123'  // generated ethereal password
        },
        /*tls: {
            rejectUnauthorized: false
        }*/
    }
} else {
    module.exports = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLC: true,
        auth: {
            user: 'letsnurture90@gmail.com', // generated ethereal user
            pass: 'Letsdoit@123'  //  generated ethereal password
        }
    }
}

