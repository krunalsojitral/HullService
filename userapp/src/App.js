import './App.css';
import { Suspense, lazy  } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import useFindUser from './hooks/useFindUser';
import { WebsiteLoader } from "./components";
import useAutoLogout from "./useAutoLogout";
const Register = lazy(() => import("./pages/Register"));
const Payment = lazy(() => import("./pages/Payment"));
const UserSelection = lazy(() => import("./pages/UserSelection"));
const Login = lazy(() => import("./pages/Login"));
const ActivationAccount = lazy(() => import("./pages/ActivationAccount"));
const Forgotpassword = lazy(() => import("./pages/Forgotpassword"));
const Changepassword = lazy(() => import("./pages/ChangePassword"));
const MembershipBenefit = lazy(() => import("./pages/MembershipBenefit"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/user/Events"));
const Members = lazy(() => import("./pages/user/Members"));
const Partners = lazy(() => import("./pages/user/Partners"));
// const Video = lazy(() => import("./pages/user/Video"));
const VideoDetail = lazy(() => import("./pages/user/VideoDetail"));
const Blog = lazy(() => import("./pages/user/Blog"));
const BlogDetail = lazy(() => import("./pages/user/BlogDetail"));
const ArticlesDetail = lazy(() => import("./pages/user/ArticlesDetail"));
const AddForum = lazy(() => import("./pages/user/AddForum"));
const Forum = lazy(() => import("./pages/user/Forum"));
const ForumDetail = lazy(() => import("./pages/user/ForumDetail"));
const ForumSub = lazy(() => import("./pages/user/ForumSub"));
const Articles = lazy(() => import("./pages/user/Articles"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Contact = lazy(() => import("./pages/Contact"));
const ParticipateInResearch = lazy(() => import("./pages/ParticipateInResearch"));
const InformationalVideo = lazy(() => import("./pages/user/InformationalVideo"));
const GroupSession = lazy(() => import("./pages/user/GroupSession"));
const ProfessionalDevelopment = lazy(() => import("./pages/user/ProfessionalDevelopment"));
const ProfessionalDevelopmentDetail = lazy(() => import("./pages/user/ProfessionalDevelopmentDetail"));
const ParticipantsInMyStudies = lazy(() => import("./pages/user/ParticipantsInMyStudies"));
const MyStudies = lazy(() => import("./pages/user/MyStudies"));
const CoursePayment = lazy(() => import("./pages/user/CoursePayment"));

function App() {

  const timer = useAutoLogout(18000);
  

  if (timer == 0) {
    localStorage.clear();
  }

  const {
    user,
    setUser } = useFindUser();

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
          <Route path="/forum" component={Forum} />          
          <Route path="/forum-sub" component={ForumSub} />
          <Route path="/forum-detail" component={ForumDetail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/group-session" component={GroupSession} />
          <Route exact path="/informational-video" component={InformationalVideo} />
          <Route exact path="/professional-development" component={ProfessionalDevelopment} />
          <Route exact path="/professional-development-detail" component={ProfessionalDevelopmentDetail} />
          <Route exact path="/participants-in-my-studies" component={ParticipantsInMyStudies} />
          <Route exact path="/participate-in-research" component={ParticipateInResearch} />
          <Route exact path="/my-studies" component={MyStudies} />
          <Route exact path="/course-payment" component={CoursePayment} />         
        </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
