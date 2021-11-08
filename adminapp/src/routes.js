import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Blog = React.lazy(() => import('./views/pages/blog/Blog'))
const BlogAddEditForm = React.lazy(() => import('./views/pages/blog/AddEditForm'))
const Artical = React.lazy(() => import('./views/pages/artical/Artical'))
const ArticalAddEditForm = React.lazy(() => import('./views/pages/artical/AddEditForm'))
const Video = React.lazy(() => import('./views/pages/video/Video'))
const VideoAddEditForm = React.lazy(() => import('./views/pages/video/AddEditForm'))
const Tag = React.lazy(() => import('./views/pages/tag/Tag'))
const TagAddEditForm = React.lazy(() => import('./views/pages/tag/AddEditForm'))
const Course = React.lazy(() => import('./views/pages/course/Course'))
const CourseAddEditForm = React.lazy(() => import('./views/pages/course/AddEditForm'))

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
]

export default routes
