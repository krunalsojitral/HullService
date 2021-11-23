var moment = require('moment-timezone');


// check for string value
module.exports.isStirng = function (value) {
    var str = value;
    var myRegEx = /^[a-zA-Z\s]*$/;
    var isValid = myRegEx.test(str);
    if (isValid) {
        return true;
    } else {
        return false;
    }
}

// check for Numaric value
module.exports.isNumber = function (value) {
    var number = value;
    var myRegEx = /^(\s*[0-9]+\s*)+$/;
    var isValid = myRegEx.test(number);
    if (isValid) {
        return true;
    } else {
        return false;
    }
}

// check for Email value
module.exports.isEmail = function (value) {
    var email = value;
    var myRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var isValid = myRegEx.test(email);
    if (isValid) {
        return true;
    } else {
        return false;
    }
}



// check for Numaric value
module.exports.isArrayNumber = function (myArray) {
    var status = false;
    myArray.every(function (value) {
        var number = value;
        var myRegEx = /^(\s*[0-9]+\s*)+$/;
        var isValid = myRegEx.test(number);
        if (!isValid) {
            status = true;
        }
    });
    return status;
}
//post date formate
module.exports.diffYMDHMS = function (postDate, timezone) {
    const postUpdatedDate = moment.utc(postDate).tz(timezone);
    const currentDate = moment.utc().tz(timezone);

    const diffTime = moment.duration(postUpdatedDate.diff(currentDate));
    // const diffTime = moment.duration(currentDate.diff(postUpdatedDate));
    // console.log('diffTime.days()', diffTime.abs().asDays(), diffTime.abs().asMonths(), diffTime.humanize(true), postUpdatedDateWithoutTZ.format(), currentDateWithoutTZ.format());

    if ((diffTime.abs().asDays() <= 6) && diffTime.abs().asMonths() <= 1) {
        if (diffTime.abs().asDays() < 1 && diffTime.abs().asDays() >= 0) {
            if (diffTime.abs().asMinutes() < 1) {
                return "Just now";
            } else {
                // return diffTime.humanize(true);
                return postUpdatedDate.fromNow();;
            }
        } else if (diffTime.abs().asDays() <= 1 && diffTime.abs().asDays() > 0 && diffTime.asMonths() <= 0) {
            return "Yesterday at " + moment(postUpdatedDate.toDate()).tz(timezone).format('hh:mm A');
        } else {
            return moment(postUpdatedDate.toDate()).tz(timezone).format('dddd') + " at " + moment(postUpdatedDate.toDate()).tz(timezone).format('hh:mm A');
        }
    } else {
        // after one year
        return moment(postUpdatedDate.toDate()).tz(timezone).format('MMMM D') + ", " + moment(postUpdatedDate.toDate()).tz(timezone).format('YYYY');
    }
}

module.exports.diffEventDates = function (postDate, timezone) {
    const postUpdatedDate = moment.utc(postDate).tz(timezone);
    const currentDate = moment.utc().tz(timezone);

    // const diffTime = moment.duration(postUpdatedDate.diff(currentDate));
    // const diffTime = moment.duration(currentDate.diff(postUpdatedDate));
    // console.log('diffTime.days()', diffTime.abs().asDays(), diffTime.abs().asMonths(), diffTime.humanize(true), postUpdatedDateWithoutTZ.format(), currentDateWithoutTZ.format());
    return moment(postUpdatedDate.toDate()).tz(timezone).format('MMMM D') + ", " + moment(postUpdatedDate.toDate()).tz(timezone).format('YYYY');
}