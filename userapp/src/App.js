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
const Video = lazy(() => import("./pages/user/Video"));
const Blog = lazy(() => import("./pages/user/Blog"));
const Forum = lazy(() => import("./pages/user/Forum"));
const Articles = lazy(() => import("./pages/user/Articles"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));

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
          <Route path="/video" component={Video} />
          <Route path="/blog" component={Blog} />
          <Route path="/articles" component={Articles} />
          <Route path="/forum" component={Forum} />          
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Landing} />
        </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
