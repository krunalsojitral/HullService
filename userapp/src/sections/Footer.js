import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
   
    //const [token, setToken] = React.useState(0);
    React.useEffect(() => {

        // const tokenString = localStorage.getItem('token');
        // var tokens = JSON.parse(tokenString);
        // setToken(tokens);


    }, [])
    return(
        <div>
            <footer>
                <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <div className="footer-logo">
                        <div className="logo">
                            <img alt="logo" src="images/hull-logo.png"/>
                        </div>
                            <ul>
                                <li>
                                    <Link to='/'>About</Link>
                                </li>
                                <li>
                                    <Link to='/'>Blog</Link>
                                </li>
                                <li>
                                    <Link to='/'>Contact us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-3 col-sm-3 col-lg-3">
                                <div className="footer-card">
                                    <h3>Patients</h3>
                                    <ul>
                                        <li>
                                            <Link to='/'>Ask free health questions</Link>
                                        </li>
                                        <li>
                                            <Link to='/'>Search for doctors</Link>
                                        </li>
                                        <li>
                                            <Link to='/'>Search for clinics</Link>
                                        </li>
                                        <li>
                                            <Link to='/'>Read health articles</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-lg-3">
                                <div className="footer-card">
                                    <h3>For Clinics</h3>
                                    <ul>
                                        <li><Link to='/'>Consult</Link></li>
                                        <li><Link to='/'>Health Feed</Link></li>
                                        <li><Link to='/'>Profile</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-lg-3">
                                <div className="footer-card">
                                    <h3>For Doctors</h3>
                                    <ul>
                                        <li><Link to='/'>Consult</Link></li>
                                        <li><Link to='/'>Health Feed</Link></li>
                                        <li><Link to='/'>Profile</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-lg-3">
                                <div className="footer-card">
                                    <h3>More</h3>
                                    <ul>
                                        <li><Link to='/'>Privacy Policy</Link></li>
                                        <li><Link to='/'>Health & Support</Link></li>
                                        <li><Link to='/'>Terms & Conditions</Link></li>
                                        <li><Link to='/'>Help & Support</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="copy-section">
                            <p>© 2021 Hull Services Inc. All rights reserved.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="social-icon">
                            <ul>
                                <li><Link to='/'><i className="fa fa-instagram"></i></Link></li>
                                <li><Link to='/'><i className="fa fa-linkedin"></i></Link></li>
                                <li><Link to='/'><i className="fa fa-twitter"></i></Link></li>
                                <li><Link to='/'><i className="fa fa-facebook"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
			</div>
		</footer>
        </div>
        )
}


