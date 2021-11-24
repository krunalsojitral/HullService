import './App.css';
import { Suspense, lazy  } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import useFindUser from './hooks/useFindUser';
import { WebsiteLoader } from "./components";
import useAutoLogout from "./useAutoLogout";
const Register = lazy(() => import("./pages/Register"));
const UserSelection = lazy(() => import("./pages/UserSelection"));
const Login = lazy(() => import("./pages/Login"));
const ActivationAccount = lazy(() => import("./pages/ActivationAccount"));
const Forgotpassword = lazy(() => import("./pages/Forgotpassword"));
const Changepassword = lazy(() => import("./pages/ChangePassword"));
const MembershipBenefit = lazy(() => import("./pages/MembershipBenefit"));



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
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={Changepassword} />
          <Route path="/forgotpassword" component={Forgotpassword} />
          <Route path="/activation-account" component={ActivationAccount} />
          <Route path="/membership-benefit" component={MembershipBenefit} />
          <Route exact path="/" component={Landing} />
        </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
