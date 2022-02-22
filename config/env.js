"use strict";
var ip = require("ip");
console.log("ip:" + ip.address());
if (ip.address() == "172.31.15.131") {
  module.exports = {
    PROJECT_NAME: "HullService",
    APP_URL: "http://3.99.13.94:6161/",
    ADMIN_APP_URL: "http://3.99.13.94:6262/",
    LIVE_HOST_NAME: "http://3.99.13.94:6262",
    LIVE_HOST_USER_APP: "http://3.99.13.94:6262",
    HASH_APP_URL: "http://3.99.13.94:6161/",
    LOCAL_HOST_NAME: "http://3.99.13.94:6262",
    LOCAL_HOST_USER_APP: "http://3.99.13.94:6161",
    LIVE_URL: "https://http://3.99.13.94:6262",
    LOCAL_URL: "https://http://3.99.13.94:6262",
    USER_LIVE_URL: "http://3.99.13.94:6161/",
    USER_LOCAL_URL: "http://3.99.13.94:6161/",
    ADMIN_LIVE_URL: "http://3.99.13.94:6262/",
    ADMIN_LOCAL_URL: "http://3.99.13.94:6262/",
    USER_PATH: "/uploads/user/",
    USER_VIEW_PATH: "/user/",
    USER_PATH_THUMB: "/uploads/user/thumbnails/",
    USER_VIEW_PATH_THUMB: "/user/thumbnails/",
    PREVIEW_PATH: "/uploads/preview/",
    PREVIEW_VIEW_PATH: "/preview/",
    BLOG_PATH: "/uploads/blog/",
    BLOG_VIEW_PATH: "/blog/",
    BLOG_VIEW_PATH_THUMB: "/blog/thumbnails/",
    BLOG_PATH_THUMB: "/uploads/blog/thumbnails/",
    ARTICLE_PATH: "/uploads/article/",
    ARTICLE_VIEW_PATH: "/article/",
    ARTICLE_VIEW_PATH_THUMB: "/article/thumbnails/",
    ARTICLE_PATH_THUMB: "/uploads/article/thumbnails/",
    VIDEO_PATH: "/uploads/video/",
    VIDEO_VIEW_PATH: "/video/",
    COURSE_PATH: "/uploads/course/",
    COURSE_VIEW_PATH: "/course/",
    COURSE_VIEW_PATH_THUMB: "/course/thumbnails/",
    COURSE_PATH_THUMB: "/uploads/course/thumbnails/",
    BANNER_PATH: "/uploads/banner/",
    BANNER_VIEW_PATH: "/banner/",
    BANNER_VIEW_PATH_THUMB: "/banner/thumbnails/",
    BANNER_PATH_THUMB: "/uploads/banner/thumbnails/",
    ABOUT_PATH: "/uploads/about/",
    ABOUT_VIEW_PATH: "/about/",
    MEDIA_PATH: "/uploads/media/",
    MEDIA_VIEW_PATH: "/media/",
    PARTNER_PATH: "/uploads/partner/",
    PARTNER_VIEW_PATH: "/partner/",
    RESEARCHES_PATH: "/uploads/researches/",
    RESEARCHES_VIEW_PATH: "/researches/",
    MEMBER_PATH: "/uploads/member/",
    MEMBER_VIEW_PATH: "/member/",
    EVENT_PATH: "/uploads/event/",
    EVENT_VIEW_PATH: "/event/",
    EVENT_VIEW_PATH_THUMB: "/event/thumbnails/",
    EVENT_PATH_THUMB: "/uploads/event/thumbnails/",
    NYLAS_CALENDAR_ID: "19aizjrce6jlqpd0dczz9auai",
    NYLAS_CLIENT_ID: "ao1gbhq01v7gpjhx9iitfe3xu",
    NYLAS_CLIENT_SECRET: "d00qlziqad0wcjzb3yjs0tz0e",
    NYLAS_TOKEN: "EnBNoDzXIWgo1EJYGlCPyxtZEJBEUo",
    NYLAS_PARTICIPANTS: [
      {
        email: "adil4appslogin@gmail.com",
        name: "adil",
        email: "adil4codding@gmail.com",
        name: "ahmad",
      },
    ],
    CLUB_BULK_CSV_UPLOAD_PATH: "/uploads/clubBulkUploadCsv/",
    SECRET: "!yO8824AI$6u",
    MAIL_FROM: "dipika@letsnurture.com",
    MAIL_FROM_MULTIPLE: "dipika@letsnurture.com",
    ADMIN_MAIL_TO: "dipika@letsnurture.com", // comma seperated multiple can be added
    IPSTACK_API_KEY: "ab25d741defc297115d8c9115309a77d",
    PAYPAL_CLIENT_ID:
      "AeZu7Ax_73ZZ88R6TSxfR9EjP76C3_hqDx4KrLSLJw6IUP3TpUc6epeNd442dLWOQL3YYXZccBp7M0aQ",
    PAYPAL_SECRET_KEY:
      "EDLGO1lDqEQ3Oq_M9naIyWkH70MmTc5UVoxuz3Mo_4TucvgqM7w4q5hNnZowAq_O3_AHFW9vrdSp9w-b",
    PAYPAL_URL: "https://api-m.sandbox.paypal.com",
    DEBUG: true,
  };
} else {
  module.exports = {
    PROJECT_NAME: "HullService",
    APP_URL: "http://localhost:6161/",
    ADMIN_APP_URL: "http://localhost:6262/",
    HASH_APP_URL: "http://localhost:6161/",
    USER_LIVE_URL: "http://localhost:6161",
    USER_LOCAL_URL: "http://localhost:6161",
    ADMIN_LIVE_URL: "http://localhost:6262",
    ADMIN_LOCAL_URL: "http://localhost:6262",
    PREVIEW_PATH: "/uploads/preview/",
    PREVIEW_VIEW_PATH: "/preview/",
    BLOG_PATH: "/uploads/blog/",
    BLOG_VIEW_PATH: "/blog/",
    BLOG_VIEW_PATH_THUMB: "/blog/thumbnails/",
    BLOG_PATH_THUMB: "/uploads/blog/thumbnails/",
    ARTICLE_PATH: "/uploads/article/",
    ARTICLE_VIEW_PATH: "/article/",
    ARTICLE_VIEW_PATH_THUMB: "/article/thumbnails/",
    ARTICLE_PATH_THUMB: "/uploads/article/thumbnails/",
    VIDEO_PATH: "/uploads/video/",
    VIDEO_VIEW_PATH: "/video/",
    COURSE_PATH: "/uploads/course/",
    COURSE_VIEW_PATH: "/course/",
    COURSE_VIEW_PATH_THUMB: "/course/thumbnails/",
    COURSE_PATH_THUMB: "/uploads/course/thumbnails/",
    BANNER_PATH: "/uploads/banner/",
    BANNER_VIEW_PATH: "/banner/",
    BANNER_VIEW_PATH_THUMB: "/banner/thumbnails/",
    BANNER_PATH_THUMB: "/uploads/banner/thumbnails/",
    ABOUT_PATH: "/uploads/about/",
    ABOUT_VIEW_PATH: "/about/",
    MEDIA_PATH: "/uploads/media/",
    MEDIA_VIEW_PATH: "/media/",
    PARTNER_PATH: "/uploads/partner/",
    PARTNER_VIEW_PATH: "/partner/",
    RESEARCHES_PATH: "/uploads/researches/",
    RESEARCHES_VIEW_PATH: "/researches/",
    MEMBER_PATH: "/uploads/member/",
    MEMBER_VIEW_PATH: "/member/",
    USER_PATH: "/uploads/user/",
    USER_VIEW_PATH: "/user/",
    USER_PATH_THUMB: "/uploads/user/thumbnails/",
    USER_VIEW_PATH_THUMB: "/user/thumbnails/",
    EVENT_PATH: "/uploads/event/",
    EVENT_VIEW_PATH: "/event/",
    EVENT_VIEW_PATH_THUMB: "/event/thumbnails/",
    EVENT_PATH_THUMB: "/uploads/event/thumbnails/",
    NYLAS_CALENDAR_ID: "19aizjrce6jlqpd0dczz9auai",
    NYLAS_CLIENT_ID: "ao1gbhq01v7gpjhx9iitfe3xu",
    NYLAS_CLIENT_SECRET: "d00qlziqad0wcjzb3yjs0tz0e",
    NYLAS_TOKEN: "EnBNoDzXIWgo1EJYGlCPyxtZEJBEUo",
    NYLAS_PARTICIPANTS: [
      {
        email: "adil4appslogin@gmail.com",
        name: "adil",
        email: "adil4codding@gmail.com",
        name: "ahmad",
      },
    ],
    SECRET: "!yO8824AI$6u",
    MAIL_FROM: "dipika@letsnurture.com",
    MAIL_FROM_MULTIPLE: "dipika@letsnurture.com",
    ADMIN_MAIL_TO: "dipika@letsnurture.com", // comma seperated multiple can be added
    IPSTACK_API_KEY: "ab25d741defc297115d8c9115309a77d",
    PAYPAL_CLIENT_ID:
      "AeZu7Ax_73ZZ88R6TSxfR9EjP76C3_hqDx4KrLSLJw6IUP3TpUc6epeNd442dLWOQL3YYXZccBp7M0aQ",
    PAYPAL_SECRET_KEY:
      "EDLGO1lDqEQ3Oq_M9naIyWkH70MmTc5UVoxuz3Mo_4TucvgqM7w4q5hNnZowAq_O3_AHFW9vrdSp9w-b",
    PAYPAL_URL: "https://api-m.sandbox.paypal.com",
    DEBUG: true,
  };
}
