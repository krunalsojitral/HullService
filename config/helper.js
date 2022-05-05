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
const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
];

module.exports.timeSince = function (date) {    
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    if (interval){
        const count = Math.floor(seconds / interval.seconds);
        return `A few ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }else{

        return ``;
    }
}


module.exports.timeCountSince = function (date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);    
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}



