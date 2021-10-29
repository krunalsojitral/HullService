"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');

var env = require('../config/env');
var Common = require('../models/common');

function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}

router.get('/roleList', function (req, res) {
    loggerData(req);
    Common.getRoleList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            
            var roleList = result.map(data => {
                let retObj = {};
                retObj['role_id'] = data.role_id;
                retObj['name'] = data.role;
                return retObj;
            });

            
            return res.json({ status: 1, 'response': { data: roleList } });
        }
    });
});

module.exports = router;

