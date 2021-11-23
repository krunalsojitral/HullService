"use strict";

var ip = require('ip');
if (ip.address() == '159.89.167.87') {
    module.exports = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'dipika.letsnurture@gmail.com', // generated ethereal user
            pass: 'Letsdoit@3214'  // generated ethereal password
        },
        /*tls: {
            rejectUnauthorized: false
        }*/
    }
} else {
    module.exports = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'dipika.letsnurture@gmail.com', // generated ethereal user
            pass: 'Letsdoit@3214'  //  generated ethereal password
            // pass: 'qNTXhtaPyVF6m370'  // generated ethereal password
            // user: 'info@brand.com', // generated ethereal user
            // pass: 'Nurture2!'  // generated ethereal password
        },
        /*tls: {
            rejectUnauthorized: false
        }*/
    }
}

