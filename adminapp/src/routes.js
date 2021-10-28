import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Blog = React.lazy(() => import('./views/pages/blog/Blog'))
const BlogDetail = React.lazy(() => import('./views/pages/blog/BlogDetail'))
const BlogAddEditForm = React.lazy(() => import('./views/pages/blog/AddEditForm'))
const Artical = React.lazy(() => import('./views/pages/artical/Artical'))
const Video = React.lazy(() => import('./views/pages/video/Video'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/blogdetail/:id', name: 'Blog', component: BlogDetail },
  { path: '/blogadd', name: 'Blog Add', component: BlogAddEditForm },
  { path: '/blogedit/:id', name: 'Blog Edit', component: BlogAddEditForm },
  { path: '/artical', name: 'Artical', component: Artical },
  { path: '/video', name: 'Video', component: Video },
]

export default routes
