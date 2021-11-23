"use strict";

var ip = require('ip');
if (ip.address() == '159.89.167.87') {
    module.exports = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'medcheck@oursmartfuture.com', // generated ethereal user
            pass: 'SmartFuture!23'  // generated ethereal password
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
        auth: {
            user: 'medcheck@oursmartfuture.com', // generated ethereal user
            pass: 'SmartFuture!23'  //  generated ethereal password
            // pass: 'qNTXhtaPyVF6m370'  // generated ethereal password
            // user: 'info@brand.com', // generated ethereal user
            // pass: 'Nurture2!'  // generated ethereal password
        },
        /*tls: {
            rejectUnauthorized: false
        }*/
    }
}

