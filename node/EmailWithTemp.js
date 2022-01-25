var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;
var sender = '';
var password = '';
var ip = require('ip');
if (ip.address() == '159.89.167.87') {
    var sender = 'smtps://medcheck@oursmartfuture.com';
    var password = 'Letsdoit@3214';
} else {
    var sender = 'smtps://medcheck@oursmartfuture.com';
    var password = 'Letsdoit@3214';
}

var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
var sendResetPasswordLink = transporter.templateSender(
    new EmailTemplate('./templates/resetPassword'), {
    from: 'medcheck@oursmartfuture.com',
});

exports.sendPasswordReset = function (email, name, tokenUrl) {
    // transporter.template
    sendResetPasswordLink({
        to: email,
        subject: 'User Information'
    }, {
        name: name,
        resetLink: tokenUrl
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};

var addPost = transporter.templateSender(
    new EmailTemplate('./templates/addPost'), {
    from: 'ajarudin.letsnurture@gmail.com',
});

exports.addPost = function (email, name, refURL) {
    // transporter.template
    addPost({
        to: email,
        subject: 'User Information'
    }, {
        name: name,
        refURL: refURL
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};