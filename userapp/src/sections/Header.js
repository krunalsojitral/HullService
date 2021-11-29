import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InlineButton from './../components/InlineButton';
import { useHistory } from 'react-router-dom';
// import useLogout from './../hooks/useLogout';
// import api_url from './../components/Apiurl';
// import axios from 'axios';
// import Swal from "sweetalert2";
// import $ from 'jquery';

export default function Header() {
    let history = useHistory();
    const [userData, setUserData] = useState(0);
    const [token, setToken] = React.useState(0);

    React.useEffect(() => {
        const userString = localStorage.getItem('userdata');
        var userdata = JSON.parse(userString);
        setUserData(userdata);      

        const tokenString = localStorage.getItem('token');
        var tokens = JSON.parse(tokenString);
        setToken(tokens);

        window.scrollTo(0, 0)
    }, [])

    const handleOpenDirection = () => {
        if (userData) {
            // if (userData.user_role === 2) {
            //     history.push('/jobs');
            // } else {
            //     history.push('/find-talent');
            // }

            history.push('/');
        }
        else {
            history.push('/');
        }
    }
 

    return(

        <div>
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="top-header-icon">
                                <div className="social-icon">
                                    <ul>                                        
                                        <li><a href="https://twitter.com"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="https://www.facebook.com"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="https://www.linkedin.com"><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="https://www.youtube.com"><i className="fa fa-youtube-play"></i></a></li>
                                    </ul>
                                </div>
                                <div className="Member-login">
                                    <Link to='/login'>
                                        Member Sign In
                                    </Link>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <header>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="header-card">
                            <div className="logo" onClick={(e) => handleOpenDirection()}>
                                <img alt="logo" src="images/logo.png"/>
							</div>

                                {/* {!token && <div className="hull-links">
                                    <div className="Sign-header">
                                    <Link to='/login'>
                                            Sign in
                                    </Link>
                                    <Link to='/userSelection'>
                                            Sign up
                                    </Link>                                    
                                </div>
                                    <a href="javascript:void(0);" className="mob-btn">
                                        <i className="fa fa-bars"></i>
                                    </a>
                                    <div className="cta-header">
                                    <Link to='/membership-benefit'>
                                            BECOME A MEMBER
                                    </Link>
                                    </div>
                            </div> } */}


                            {/* {token &&  
                            <div className="hull-links">
                                <a href="javascript:void(0);" className="mob-btn">
                                    <i className="fa fa-bars"></i>
                                </a>
                                <div className="hull-menu">
                                    <ul>
                                        <li>
                                            <NavLink activeClassName="active" to="/">
                                                <InlineButton name={"HOME"} />
                                            </NavLink>                                            
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/">
                                                <InlineButton name={"ABOUT"} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/">
                                                <InlineButton name={"MEMBERS"} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/">
                                                <InlineButton name={"PARTNERS"} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/">
                                                <InlineButton name={"EVENTS"} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/">
                                                <InlineButton name={"BLOG"} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/">
                                                <InlineButton name={"CONTACT US"} />
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>                                
                            </div>}  */}

                                <div className="hull-links">
                                    <a href="javascript:void(0);" className="mob-btn">
                                        <i className="fa fa-bars"></i>
                                    </a>
                                    <div className="hull-menu">
                                        <ul>
                                            <li>
                                                <NavLink activeClassName="active" to="/">
                                                    <InlineButton name={"HOME"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/">
                                                    <InlineButton name={"ABOUT"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/">
                                                    <InlineButton name={"MEMBERS"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/">
                                                    <InlineButton name={"PARTNERS"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/">
                                                    <InlineButton name={"EVENTS"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/">
                                                    <InlineButton name={"RESOURCES"} />
                                                </NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink activeClassName="active" to="/">
                                                            <InlineButton name={"Articles"} />
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink activeClassName="active" to="/">
                                                            <InlineButton name={"Blog"} />
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink activeClassName="active" to="/">
                                                            <InlineButton name={"Informational Videos"} />
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>                                           
                                            <li>
                                                <NavLink activeClassName="active" to="/">
                                                    <InlineButton name={"CONTACT"} />
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cta-header">
                                        <Link to='/membership-benefit'>
                                            BECOME A MEMBER
                                        </Link>
                                    </div>
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
		</header>
        </div>
    )
}
