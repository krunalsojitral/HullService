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
const PublicUserRegister = lazy(() => import("./pages/PublicUserRegister"));
const ResearchRequestForm = lazy(() => import("./pages/ResearchRequestForm"));
const ActivationAccount = lazy(() => import("./pages/ActivationAccount"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Login = lazy(() => import("./pages/Login"));
const Forgotpassword = lazy(() => import("./pages/Forgotpassword"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Partner = lazy(() => import("./pages/Partner"));
const Ourteam = lazy(() => import("./pages/Ourteam"));


const ParticipateInResearch = lazy(() => import("./pages/ParticipateInResearch"));
const Preview = lazy(() => import("./pages/Preview"));
const AddResearch = lazy(() => import("./pages/user/research/AddResearch"));

//user page

const Events = lazy(() => import("./pages/user/event/Events"));
const MyEvents = lazy(() => import("./pages/user/event/MyEvents"));
const EventDetail = lazy(() => import("./pages/user/event/EventDetail"));
const EventsCart = lazy(() => import("./pages/user/event/EventsCart"));
const EventTicket = lazy(() => import("./pages/user/event/EventTicket"));
const EventPayment = lazy(() => import("./pages/user/event/EventPayment"));
const PromoPage = lazy(() => import("./pages/user/event/PromoPage"));


const CoursesTrainings = lazy(() => import("./pages/user/coursesTrainings/CoursesTrainings"));
const AddForum = lazy(() => import("./pages/user/forum/AddForum"));
const Forum = lazy(() => import("./pages/user/forum/Forum"));
const MyForum = lazy(() => import("./pages/user/forum/MyForum"));
const ForumDetail = lazy(() => import("./pages/user/forum/ForumDetail"));
const ForumSub = lazy(() => import("./pages/user/forum/ForumSub"));



const ParticipantsInMyStudies = lazy(() => import("./pages/user/research/ParticipantsInMyStudies"));
const MyStudies = lazy(() => import("./pages/user/research/MyStudies"));

const ViewProfile = lazy(() => import("./pages/user/ViewProfile"));
const EditProfile = lazy(() => import("./pages/user/EditProfile"));
const TermsCondition = lazy(() => import("./pages/TermsCondition"));
const AboutHull = lazy(() => import("./pages/AboutHull"));



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
          <Route path="/research-request-form" component={ResearchRequestForm} />
          <Route path="/register" component={Register} />
          <Route path="/public-user-register" component={PublicUserRegister} />
          <Route path="/activation-account" component={ActivationAccount} />
          <Route path="/login" component={Login} />          
          <Route path="/forgotpassword" component={Forgotpassword} />          
          <Route path="/reset-password" component={ChangePassword} />
          <Route path="/about" component={About} />
          <Route path="/events" component={Events} />   
          <Route path="/my-events" component={MyEvents} />   
          <Route path="/event-detail" component={EventDetail} />
          <Route path="/event-promo" component={PromoPage} />
          <Route path="/event-cart" component={EventsCart} />
          <Route path="/event-ticket" component={EventTicket} />
          <Route path="/event-payment" component={EventPayment} />          
          <Route path="/courses-training" component={CoursesTrainings} />
          <Route path="/add-forum" component={AddForum} />
          <PrivateRoute path="/forum" component={Forum} />
          <PrivateRoute path="/my-forum" component={MyForum} />          
          <Route path="/forum-sub" component={ForumSub} />
          <Route path="/forum-detail" component={ForumDetail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Route path="/contact" component={Contact} />          
          <Route path="/faq" component={Faq} />
          <Route path="/partner" component={Partner} />
          <Route path="/ourteam" component={Ourteam} />
          <Route path="/participants-in-my-studies" component={ParticipantsInMyStudies} />
          <Route path="/participate-in-research" component={ParticipateInResearch} />
          <Route path="/my-studies" component={MyStudies} />
          <Route path="/preview-module" component={Preview} />
          <Route path="/add-research" component={AddResearch} />
          <Route path="/view-profile" component={ViewProfile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/terms-condition" component={TermsCondition} />
            <Route path="/about-hull" component={AboutHull} />
          
        </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
