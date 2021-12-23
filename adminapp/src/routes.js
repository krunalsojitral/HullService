import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Blog = React.lazy(() => import('./views/pages/blog/Blog'))
const DraftBlogDemoTable = React.lazy(() => import('./views/pages/blog/DraftBlogDemoTable'))
const BlogAddEditForm = React.lazy(() => import('./views/pages/blog/AddEditForm'))
const Media = React.lazy(() => import('./views/pages/media/Media'))
const Article = React.lazy(() => import('./views/pages/article/Article'))
const DraftArticleDemoTable = React.lazy(() => import('./views/pages/article/DraftArticleDemoTable'))
const ArticleAddEditForm = React.lazy(() => import('./views/pages/article/AddEditForm'))
const Video = React.lazy(() => import('./views/pages/video/Video'))
const DraftVideoDemoTable = React.lazy(() => import('./views/pages/video/DraftVideoDemoTable'))
const VideoAddEditForm = React.lazy(() => import('./views/pages/video/AddEditForm'))
const Tag = React.lazy(() => import('./views/pages/tag/Tag'))
const TagAddEditForm = React.lazy(() => import('./views/pages/tag/AddEditForm'))
const Category = React.lazy(() => import('./views/pages/category/Category'))
const CategoryAddEditForm = React.lazy(() => import('./views/pages/category/AddEditForm'))
const Course = React.lazy(() => import('./views/pages/course/Course'))
const CourseAddEditForm = React.lazy(() => import('./views/pages/course/AddEditForm'))
const DraftCourseDemoTable = React.lazy(() => import('./views/pages/course/DraftCourseDemoTable'))
const Forum = React.lazy(() => import('./views/pages/forum/Forum'))
const ForumView = React.lazy(() => import('./views/pages/forum/ForumView'))
const ForumComment = React.lazy(() => import('./views/pages/forum/ForumComment'))
const ForumAddEditForm = React.lazy(() => import('./views/pages/forum/AddEditForm'))
const Forumheading = React.lazy(() => import('./views/pages/forumheading/Forumheading'))
const ForumRequestDemoTable = React.lazy(() => import('./views/pages/forum/ForumRequestDemoTable'))
const ForumheadingAddEditForm = React.lazy(() => import('./views/pages/forumheading/AddEditForm'))
const Generalpublic = React.lazy(() => import('./views/pages/users/generalpublic/Generalpublic'))
const GeneralpublicAddEditForm = React.lazy(() => import('./views/pages/users/generalpublic/AddEditForm'))
const Researchers = React.lazy(() => import('./views/pages/users/researchers/Researchers'))
const ResearchersAddEditForm = React.lazy(() => import('./views/pages/users/researchers/AddEditForm'))
const Serviceprovider = React.lazy(() => import('./views/pages/users/serviceprovider/Serviceprovider'))
const ServiceproviderAddEditForm = React.lazy(() => import('./views/pages/users/serviceprovider/AddEditForm'))
const HomeContentAddEditForm = React.lazy(() => import('./views/pages/homecontent/AddEditForm'))
const Partner = React.lazy(() => import('./views/pages/partner/Partner'))
const Academicdiscipline = React.lazy(() => import('./views/pages/academicdiscipline/Academicdiscipline'))
const AcademicdisciplineAddEditForm = React.lazy(() => import('./views/pages/academicdiscipline/AddEditForm'))
const Sector = React.lazy(() => import('./views/pages/sector/Sector'))
const SectorAddEditForm = React.lazy(() => import('./views/pages/sector/AddEditForm'))
const Occupation = React.lazy(() => import('./views/pages/occupation/Occupation'))
const OccupationAddEditForm = React.lazy(() => import('./views/pages/occupation/AddEditForm'))
const Professionalinterestarea = React.lazy(() => import('./views/pages/professionalinterestarea/Professionalinterestarea'))
const ProfessionalinterestareaAddEditForm = React.lazy(() => import('./views/pages/professionalinterestarea/AddEditForm'))
const Researcherinterestarea = React.lazy(() => import('./views/pages/researcherinterestarea/Researcherinterestarea'))
const ResearcherinterestareaAddEditForm = React.lazy(() => import('./views/pages/researcherinterestarea/AddEditForm'))



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/draft-blog', name: 'Blog', component: DraftBlogDemoTable },
  { path: '/blogadd', name: 'Blog Add', component: BlogAddEditForm },
  { path: '/blogedit/:id', name: 'Blog Edit', component: BlogAddEditForm },
  { path: '/article', name: 'Article', component: Article },
  { path: '/draft-articles', name: 'Article', component: DraftArticleDemoTable },
  { path: '/articleadd', name: 'Article Add', component: ArticleAddEditForm },
  { path: '/articleedit/:id', name: 'Article Edit', component: ArticleAddEditForm },
  { path: '/video', name: 'Video', component: Video },
  { path: '/draft-video', name: 'Video', component: DraftVideoDemoTable },
  { path: '/videoadd', name: 'Video Add', component: VideoAddEditForm },
  { path: '/videoedit/:id', name: 'Video Edit', component: VideoAddEditForm },
  { path: '/tag', name: 'Tag', component: Tag },
  { path: '/tagadd', name: 'Tag Add', component: TagAddEditForm },
  { path: '/tagedit/:id', name: 'Tag Edit', component: TagAddEditForm },
  { path: '/course', name: 'Course', component: Course },
  { path: '/draft-courses', name: 'Course', component: DraftCourseDemoTable },
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
  { path: '/forum-view/:id', name: 'Forum View', component: ForumView },
  { path: '/forum-request', name: 'Forum Request', component: ForumRequestDemoTable },
  { path: '/forumcomment/:id', name: 'Forum', component: ForumComment },
  { path: '/forumadd', name: 'Forum Add', component: ForumAddEditForm },
  { path: '/forumedit/:id', name: 'Forum Edit', component: ForumAddEditForm },
  { path: '/generalpublic', name: 'General Public', component: Generalpublic },
  { path: '/generalpublicadd', name: 'General Public Add', component: GeneralpublicAddEditForm },
  { path: '/generalpublicedit/:id', name: 'General Public Edit', component: GeneralpublicAddEditForm },
  { path: '/researchers', name: 'Researchers', component: Researchers },
  { path: '/researchersadd', name: 'Researchers Add', component: ResearchersAddEditForm },
  { path: '/researchersedit/:id', name: 'Researchers Edit', component: ResearchersAddEditForm },
  { path: '/serviceprovider', name: 'Service Provider', component: Serviceprovider },
  { path: '/serviceprovideradd', name: 'Service Provider Add', component: ServiceproviderAddEditForm },
  { path: '/serviceprovideredit/:id', name: 'Service Provider Edit', component: ServiceproviderAddEditForm },
  { path: '/homecontenteditform', name: 'Home Content Edit', component: HomeContentAddEditForm },
  { path: '/partner', name: 'Partners & Sponsors', component: Partner },
  { path: '/academic-discipline', name: 'Academic Discipline', component: Academicdiscipline },
  { path: '/academicdisciplineadd', name: 'Academic Discipline Add', component: AcademicdisciplineAddEditForm },
  { path: '/academicdisciplineedit/:id', name: 'Academic Discipline Edit', component: AcademicdisciplineAddEditForm },
  { path: '/sector', name: 'Sector', component: Sector },
  { path: '/sectoradd', name: 'Sector Add', component: SectorAddEditForm },
  { path: '/sectoredit/:id', name: 'Sector Edit', component: SectorAddEditForm },
  { path: '/occupation', name: 'Occupation', component: Occupation },
  { path: '/occupationadd', name: 'Occupation Add', component: OccupationAddEditForm },
  { path: '/occupationedit/:id', name: 'Occupation Edit', component: OccupationAddEditForm },

  { path: '/researcher-interest-area', name: 'Researcher Interest Area', component: Researcherinterestarea },
  { path: '/researcherinterestareaadd', name: 'Researcher Interest Area Add', component: ResearcherinterestareaAddEditForm },
  { path: '/researcherinterestareaedit/:id', name: 'Researcher Interest Area Edit', component: ResearcherinterestareaAddEditForm },

  { path: '/professional-interest-area', name: 'Professional Interest Area', component: Professionalinterestarea },
  { path: '/professionalinterestareaadd', name: 'Professional Interest Area Add', component: ProfessionalinterestareaAddEditForm },
  { path: '/professionalinterestareaedit/:id', name: 'Professional Interest Area Edit', component: ProfessionalinterestareaAddEditForm },

]

export default routes
