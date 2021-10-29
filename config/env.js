"use strict";
var ip = require('ip');
console.log('ip:' + ip.address());
if (ip.address() == '172.31.18.120') {
    module.exports = {
        PROJECT_NAME: 'HullService',
        APP_URL: 'http://52.14.255.158:6161/',
        ADMIN_APP_URL: 'http://52.14.255.158:6262/',
        LIVE_HOST_NAME: 'http://52.14.255.158:6262',
        LIVE_HOST_USER_APP: 'http://52.14.255.158:6262',
        HASH_APP_URL: 'http://52.14.255.158:6161/',
        LOCAL_HOST_NAME: '52.14.255.158:6262',
        LOCAL_HOST_USER_APP: '52.14.255.158:6161',
        LIVE_URL: 'https://52.14.255.158:6262',
        LOCAL_URL: 'https://52.14.255.158:6262',
        USER_LIVE_URL: 'http://52.14.255.158:6161/',
        USER_LOCAL_URL: 'http://52.14.255.158:6161/',
        ADMIN_LIVE_URL: 'http://52.14.255.158:6262/',
        ADMIN_LOCAL_URL: 'http://52.14.255.158:6262/',
        BLOG_PATH: '/uploads/blog/',
        BLOG_VIEW_PATH: '/blog/',
        ARTICAL_PATH: '/uploads/artical/',
        ARTICAL_VIEW_PATH: '/artical/',
        VIDEO_PATH: '/uploads/video/',
        VIDEO_VIEW_PATH: '/video/',
        ABOUT_PATH: '/uploads/about/',
        ABOUT_VIEW_PATH: '/about/',
        CLUB_BULK_CSV_UPLOAD_PATH: '/uploads/clubBulkUploadCsv/',          
        SECRET: '!yO8824AI$6u',
        MAIL_FROM: 'dipika@letsnurture.com',
        MAIL_FROM_MULTIPLE: 'dipika@letsnurture.com',
        ADMIN_MAIL_TO: 'dipika@letsnurture.com', // comma seperated multiple can be added
        IPSTACK_API_KEY: 'ab25d741defc297115d8c9115309a77d',
        PAYPAL_CLIENT_ID: 'AeZu7Ax_73ZZ88R6TSxfR9EjP76C3_hqDx4KrLSLJw6IUP3TpUc6epeNd442dLWOQL3YYXZccBp7M0aQ',
        PAYPAL_SECRET_KEY: 'EDLGO1lDqEQ3Oq_M9naIyWkH70MmTc5UVoxuz3Mo_4TucvgqM7w4q5hNnZowAq_O3_AHFW9vrdSp9w-b',
        PAYPAL_URL: 'https://api-m.sandbox.paypal.com',
        DEBUG: true,
    }
} else {
    module.exports = {
        PROJECT_NAME: 'HullService',
        APP_URL: 'http://localhost:6161/',
        ADMIN_APP_URL: 'http://localhost:6262/',
        HASH_APP_URL: 'http://localhost:6161/',
        USER_LIVE_URL: 'http://localhost:6161',
        USER_LOCAL_URL: 'http://localhost:6161',
        ADMIN_LIVE_URL: 'http://localhost:6262',
        ADMIN_LOCAL_URL: 'http://localhost:6262',        
        BLOG_PATH: '/uploads/blog/',
        BLOG_VIEW_PATH: '/blog/',
        ARTICAL_PATH: '/uploads/artical/',
        ARTICAL_VIEW_PATH: '/artical/',
        VIDEO_PATH: '/uploads/video/',
        VIDEO_VIEW_PATH: '/video/',
        ABOUT_PATH: '/uploads/about/',
        ABOUT_VIEW_PATH: '/about/',
        SECRET: '!yO8824AI$6u',
        MAIL_FROM: 'dipika@letsnurture.com',
        MAIL_FROM_MULTIPLE: 'dipika@letsnurture.com',
        ADMIN_MAIL_TO: 'dipika@letsnurture.com', // comma seperated multiple can be added
        IPSTACK_API_KEY: 'ab25d741defc297115d8c9115309a77d',
        PAYPAL_CLIENT_ID: 'AeZu7Ax_73ZZ88R6TSxfR9EjP76C3_hqDx4KrLSLJw6IUP3TpUc6epeNd442dLWOQL3YYXZccBp7M0aQ',
        PAYPAL_SECRET_KEY: 'EDLGO1lDqEQ3Oq_M9naIyWkH70MmTc5UVoxuz3Mo_4TucvgqM7w4q5hNnZowAq_O3_AHFW9vrdSp9w-b',
        PAYPAL_URL: 'https://api-m.sandbox.paypal.com',
        DEBUG: true,
    }
}
