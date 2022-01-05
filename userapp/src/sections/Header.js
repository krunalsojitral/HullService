import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import InlineButton from './../components/InlineButton';
import { useHistory } from 'react-router-dom';
import useLogout from './../hooks/useLogout';
import api_url from './../components/Apiurl';
import axios from 'axios';
import Swal from "sweetalert2";
import $ from 'jquery';

export default function Header() {
    let history = useHistory();
    const [userData, setUserData] = useState(0);
    const [token, setToken] = React.useState(0);
    const [menuList, setMenuList] = React.useState([]);
    const { pathname } = useLocation();
    const { logoutUser } = useLogout();

    React.useEffect(() => {
        const userString = localStorage.getItem('userdata');
        var userdata = JSON.parse(userString);
        setUserData(userdata);      

        const tokenString = localStorage.getItem('token');
        var tokens = JSON.parse(tokenString);
        setToken(tokens);

        window.scrollTo(0, 0)

        axios.get(api_url + '/common/getDynamicMenu', {}).then((result) => {
            if (result.data.status) {
                var menudata = result.data.response.data;
                if (menudata.length > 0) {
                    setMenuList(menudata);
                } 
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
            //Swal.fire('Oops...', err, 'error')
        })

    }, [])

    const handleOpenDirection = () => {
        if (userData) {
            history.push('/');
        }
        else {
            history.push('/');
        }
    }
 

    return(

        <div>
            {!token && <div className="top-header">
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

                                <div className="cta-header">
                                    <NavLink activeClassName="active" to='/participate-in-research'>
                                        PARTICIPATE IN RESEARCH
                                    </NavLink>
                                    <NavLink activeClassName="active" to='/membership-benefit'>
                                        BECOME A MEMBER
                                    </NavLink>                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            

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
                                                <NavLink exact={true} activeClassName="active" to="/">
                                                    <InlineButton name={"HOME"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/about">
                                                    <InlineButton name={"ABOUT"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/members">
                                                    <InlineButton name={"MEMBERS"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/partners">
                                                    <InlineButton name={"PARTNERS"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="active" to="/events">
                                                    <InlineButton name={"EVENTS"} />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <a href="javascript:;">
                                                    <InlineButton name={"RESOURCES"} />
                                                </a>
                                                <ul>
                                                    <li>
                                                        <NavLink activeClassName="active" to="/articles" isActive={() => ['/articles', '/article-detail', '/article-payment'].includes(pathname)}>
                                                            <InlineButton name={"Articles"} />
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink isActive={() => ['/blog', '/blog-detail', '/blog-payment', '/my-blog'].includes(pathname)} to="/blog">
                                                            <InlineButton name={"Blogs"} />
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink activeClassName="active" to="/informational-video" isActive={() => ['/informational-video', '/video-detail', '/video-payment'].includes(pathname)}>
                                                            <InlineButton name={"Informational Videos"} />
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>                                           
                                            <li>
                                                <NavLink activeClassName="active" to="/contact">
                                                    <InlineButton name={"CONTACT"} />
                                                </NavLink>
                                            </li>

                                            {menuList.length > 0 && menuList.map((data, index) => (
                                                <li>
                                                    <NavLink to={"/dynamic-page?menu=" + data.dynamic_menu_id}>
                                                        <InlineButton name={data.menu_name} />
                                                    </NavLink>
                                                </li>
                                            ))}


                                            {token && <li>
                                                <a className="logout">
                                                    <InlineButton handleClick={logoutUser} name={"LOGOUT"} />
                                                </a>
                                            </li>}
                                        </ul>
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
