import React, { useEffect } from 'react';

import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { Link } from 'react-router-dom';


export default function ActivationAccount() {

  const [flag, setFlag] = React.useState('')
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search) // id=123
    console.log(params);
    let token = params.get('activationcode')
    let email = params.get('email')
    var obj = {
      email: email,
      email_verify_token: token
    }
    verifyEmail(obj).then(function (result) {
      setFlag(result)
    });
  }, []);


  return (
    <div>

      <Header />

      <div className="login-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="login-box">
                <div className="login-img">
                  <img alt="logo" src="images/logo.png" />
                </div>
                {
                  (flag === 1 && <div className="accout-section">
                    <img style={{ height: "132px", width: "232px", marginBottom: "54px" }} alt="average" src="images/right.png" />
                    <h4>Your account has been activated.</h4>
                    <div>&nbsp;</div>
                    <Link className="btn-submit" to="/login">
                      Login
                      </Link>
                  </div>)
                }
                {
                  (flag === 0 &&
                    <div className="accout-section">
                      <img style={{ height: "212px", width: "312px" }} alt="average" src="images/error.webp" />
                      <h4>Link is Expired.</h4>
                      <div>Please go back and try again.</div>
                    </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )


}

