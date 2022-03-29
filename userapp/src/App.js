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
const ResearchRequestForm = lazy(() => import("./pages/ResearchRequestForm"));
const ActivationAccount = lazy(() => import("./pages/ActivationAccount"));
const Login = lazy(() => import("./pages/Login"));
const Forgotpassword = lazy(() => import("./pages/Forgotpassword"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Contact = lazy(() => import("./pages/Contact"));
const ParticipateInResearch = lazy(() => import("./pages/ParticipateInResearch"));
const Preview = lazy(() => import("./pages/Preview"));
const AddResearch = lazy(() => import("./pages/user/research/AddResearch"));

//user page

const Events = lazy(() => import("./pages/user/event/Events"));

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
          <Route path="/activation-account" component={ActivationAccount} />
          <Route path="/login" component={Login} />          
          <Route path="/forgotpassword" component={Forgotpassword} />          
          <Route path="/about" component={About} />
          <Route path="/events" component={Events} />          
          <Route path="/add-forum" component={AddForum} />
          <PrivateRoute path="/forum" component={Forum} />
          <PrivateRoute path="/my-forum" component={MyForum} />          
          <Route path="/forum-sub" component={ForumSub} />
          <Route path="/forum-detail" component={ForumDetail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Route path="/contact" component={Contact} />          
          <Route path="/participants-in-my-studies" component={ParticipantsInMyStudies} />
          <Route path="/participate-in-research" component={ParticipateInResearch} />
          <Route path="/my-studies" component={MyStudies} />
          <Route path="/preview-module" component={Preview} />
          <Route path="/add-research" component={AddResearch} />
          <Route path="/view-profile" component={ViewProfile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/terms-condition" component={TermsCondition} />
          
        </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
