var moment = require('moment-timezone');


module.exports.getVideoId = function (url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);    
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return '';
    }
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