import './App.css';
import { Suspense, lazy  } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import useFindUser from './hooks/useFindUser';
import { WebsiteLoader } from "./components";
import useAutoLogout from "./useAutoLogout";
import { browserHistory } from 'react-router';


const Register = lazy(() => import("./pages/Register"));
const Payment = lazy(() => import("./pages/MemberPayment"));
const UserSelection = lazy(() => import("./pages/UserSelection"));
const Login = lazy(() => import("./pages/Login"));
const ActivationAccount = lazy(() => import("./pages/ActivationAccount"));
const Forgotpassword = lazy(() => import("./pages/Forgotpassword"));
const Changepassword = lazy(() => import("./pages/ChangePassword"));
const MembershipBenefit = lazy(() => import("./pages/MembershipBenefit"));
const About = lazy(() => import("./pages/About"));
const Members = lazy(() => import("./pages/user/Members"));
const Partners = lazy(() => import("./pages/user/Partners"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Contact = lazy(() => import("./pages/Contact"));
const ParticipateInResearch = lazy(() => import("./pages/ParticipateInResearch"));
const Preview = lazy(() => import("./pages/Preview"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));
const AddResearch = lazy(() => import("./pages/user/research/AddResearch"));

//user page

const Events = lazy(() => import("./pages/user/event/Events"));

const GroupSession = lazy(() => import("./pages/user/groupsession/GroupSession"));

const Blog = lazy(() => import("./pages/user/blog/Blog"));
const BlogDetail = lazy(() => import("./pages/user/blog/BlogDetail"));
const MyBlog = lazy(() => import("./pages/user/blog/MyBlog"));
const BlogPayment = lazy(() => import("./pages/user/blog/BlogPayment"));

const ArticlesDetail = lazy(() => import("./pages/user/article/ArticlesDetail"));
const MyArticle = lazy(() => import("./pages/user/article/MyArticle"));
const ArticlePayment = lazy(() => import("./pages/user/article/ArticlePayment"));
const Articles = lazy(() => import("./pages/user/article/Articles"));

const AddForum = lazy(() => import("./pages/user/forum/AddForum"));
const Forum = lazy(() => import("./pages/user/forum/Forum"));
const MyForum = lazy(() => import("./pages/user/forum/MyForum"));
const ForumDetail = lazy(() => import("./pages/user/forum/ForumDetail"));
const ForumSub = lazy(() => import("./pages/user/forum/ForumSub"));

const InformationalVideo = lazy(() => import("./pages/user/video/InformationalVideo"));
const VideoDetail = lazy(() => import("./pages/user/video/VideoDetail"));
const VideoPayment = lazy(() => import("./pages/user/video/VideoPayment"));
const MyVideo = lazy(() => import("./pages/user/video/MyVideo"));

const ProfessionalDevelopment = lazy(() => import("./pages/user/course/ProfessionalDevelopment"));
const MyProfessionalDevelopment = lazy(() => import("./pages/user/course/MyProfessionalDevelopment"));
const ProfessionalDevelopmentDetail = lazy(() => import("./pages/user/course/ProfessionalDevelopmentDetail"));
const CoursePayment = lazy(() => import("./pages/user/course/CoursePayment"));

const ParticipantsInMyStudies = lazy(() => import("./pages/user/research/ParticipantsInMyStudies"));
const MyStudies = lazy(() => import("./pages/user/research/MyStudies"));

const ViewProfile = lazy(() => import("./pages/user/ViewProfile"));
const EditProfile = lazy(() => import("./pages/user/EditProfile"));


function App() {

  const timer = useAutoLogout(18000);
  let history = useHistory(); 

  const {
    user,
    setUser } = useFindUser();

  if (timer == 0) {
    localStorage.clear();
    window.location.replace('/');
  }

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Suspense
          fallback={
            <WebsiteLoader isHomePage={true} isLoggedIn={true}></WebsiteLoader>
          }
        >
        <Switch>                           
          <Route path="/userSelection" component={UserSelection} />
          <Route path="/register" component={Register} />
          <Route path="/payment" component={Payment} />          
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={Changepassword} />
          <Route path="/forgotpassword" component={Forgotpassword} />
          <Route path="/activation-account" component={ActivationAccount} />
          <Route path="/membership-benefit" component={MembershipBenefit} />
          <Route path="/about" component={About} />
          <Route path="/events" component={Events} />
          <Route path="/members" component={Members} />
          <Route path="/partners" component={Partners} />
          {/* <Route path="/video" component={Video} /> */}
          <Route path="/video-detail" component={VideoDetail} forceRefresh={true}/>
          <Route path="/blog" component={Blog} />
          <Route path="/blog-detail" component={BlogDetail} />
          <Route path="/articles" component={Articles} />
          <Route path="/article-detail" component={ArticlesDetail} />
          <Route path="/add-forum" component={AddForum} />
          <PrivateRoute path="/forum" component={Forum} />
          <PrivateRoute path="/my-forum" component={MyForum} />          
          <Route path="/forum-sub" component={ForumSub} />
          <Route path="/forum-detail" component={ForumDetail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Route path="/contact" component={Contact} />
          <Route path="/group-session" component={GroupSession} />
          <Route path="/informational-video" component={InformationalVideo} />
          <Route path="/professional-development" component={ProfessionalDevelopment} />
          <PrivateRoute path="/my-professional-development" component={MyProfessionalDevelopment} />          
          <Route path="/professional-development-detail" component={ProfessionalDevelopmentDetail} />
          <Route path="/participants-in-my-studies" component={ParticipantsInMyStudies} />
          <Route path="/participate-in-research" component={ParticipateInResearch} />
          <Route path="/my-studies" component={MyStudies} />
          <Route path="/course-payment" component={CoursePayment} />   
          <Route path="/article-payment" component={ArticlePayment} />
          <Route path="/blog-payment" component={BlogPayment} />
          <Route path="/video-payment" component={VideoPayment} />          
          <Route path="/my-blog" component={MyBlog} />
          <Route path="/my-article" component={MyArticle} />
          <Route path="/my-video" component={MyVideo} />
          <Route path="/preview-module" component={Preview} />
          <Route path="/dynamic-page" component={DynamicPage} />
          <Route path="/add-research" component={AddResearch} />
          <Route path="/view-profile" component={ViewProfile} />
          <Route path="/edit-profile" component={EditProfile} />
        </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
