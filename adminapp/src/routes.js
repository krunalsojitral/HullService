import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Blog = React.lazy(() => import('./views/pages/blog/Blog'))
const BlogAddEditForm = React.lazy(() => import('./views/pages/blog/AddEditForm'))
const Media = React.lazy(() => import('./views/pages/media/Media'))
const Artical = React.lazy(() => import('./views/pages/artical/Artical'))
const ArticalAddEditForm = React.lazy(() => import('./views/pages/artical/AddEditForm'))
const Video = React.lazy(() => import('./views/pages/video/Video'))
const VideoAddEditForm = React.lazy(() => import('./views/pages/video/AddEditForm'))
const Tag = React.lazy(() => import('./views/pages/tag/Tag'))
const TagAddEditForm = React.lazy(() => import('./views/pages/tag/AddEditForm'))
const Category = React.lazy(() => import('./views/pages/category/Category'))
const CategoryAddEditForm = React.lazy(() => import('./views/pages/category/AddEditForm'))
const Course = React.lazy(() => import('./views/pages/course/Course'))
const CourseAddEditForm = React.lazy(() => import('./views/pages/course/AddEditForm'))
const Forum = React.lazy(() => import('./views/pages/forum/Forum'))
const ForumComment = React.lazy(() => import('./views/pages/forum/ForumComment'))
const ForumAddEditForm = React.lazy(() => import('./views/pages/forum/AddEditForm'))
const Forumheading = React.lazy(() => import('./views/pages/forumheading/Forumheading'))
const ForumheadingAddEditForm = React.lazy(() => import('./views/pages/forumheading/AddEditForm'))


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/blogadd', name: 'Blog Add', component: BlogAddEditForm },
  { path: '/blogedit/:id', name: 'Blog Edit', component: BlogAddEditForm },
  { path: '/article', name: 'Article', component: Artical },
  { path: '/articleadd', name: 'Article Add', component: ArticalAddEditForm },
  { path: '/articleedit/:id', name: 'Article Edit', component: ArticalAddEditForm },
  { path: '/video', name: 'Video', component: Video },
  { path: '/videoadd', name: 'Video Add', component: VideoAddEditForm },
  { path: '/videoedit/:id', name: 'Video Edit', component: VideoAddEditForm },
  { path: '/tag', name: 'Tag', component: Tag },
  { path: '/tagadd', name: 'Tag Add', component: TagAddEditForm },
  { path: '/tagedit/:id', name: 'Tag Edit', component: TagAddEditForm },
  { path: '/course', name: 'Course', component: Course },
  { path: '/courseadd', name: 'Course Add', component: CourseAddEditForm },
  { path: '/courseedit/:id', name: 'Course Edit', component: CourseAddEditForm },
  { path: '/media', name: 'Media', component: Media },
  { path: '/category', name: 'Category', component: Category },
  { path: '/categoryadd', name: 'Category Add', component: CategoryAddEditForm },
  { path: '/categoryedit/:id', name: 'Category Edit', component: CategoryAddEditForm },
  { path: '/forumheading', name: 'Forum Heading', component: Forumheading },  
  { path: '/forumheadingadd', name: 'Forum Heading Add', component: ForumheadingAddEditForm },
  { path: '/forumheadingedit/:id', name: 'Forum Heading Edit', component: ForumheadingAddEditForm },
  { path: '/forum', name: 'Forum', component: Forum },
  { path: '/forumcomment/:id', name: 'Forum', component: ForumComment },
  { path: '/forumadd', name: 'Forum Add', component: ForumAddEditForm },
  { path: '/forumedit/:id', name: 'Forum Edit', component: ForumAddEditForm },
]

export default routes
