import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, Link, useLocation } from 'react-router-dom';
import InlineButton from './../components/InlineButton';
import useLogout from './../hooks/useLogout';
import api_url from './../components/Apiurl';
import axios from 'axios';
import Swal from "sweetalert2";
import react from 'react';
//import $ from 'jquery';

export default function Header() {
    let history = useHistory();
    const [userData, setUserData] = useState(0);   
    const [token, setToken] = React.useState(0);
    //const [menuList, setMenuList] = React.useState([]);
    const { pathname } = useLocation();
    const { logoutUser } = useLogout();
    const [userTypeList, setUserTypeList] = React.useState('');

    const location = useLocation();

    React.useEffect(() => {
        const userString = localStorage.getItem('userdata');
        var userdata = JSON.parse(userString);
        setUserData(userdata);      

        const tokenString = localStorage.getItem('token');
        var tokens = JSON.parse(tokenString);
        setToken(tokens);
        if (tokens){
            localStorage.removeItem('last_visit_url');
        }
        
        const typeString = localStorage.getItem('selection');
        //var userdata = JSON.parse(typeString);
        if (userdata){
            if (userdata.role == 2){
                setUserTypeList('Professional')
            } else if (userdata.role == 3) {
                setUserTypeList('Researcher')
            } else{
                setUserTypeList('General Public')
            }
        }
        
        window.scrollTo(0, 0)

        // axios.get(api_url + '/common/getDynamicMenu', {}).then((result) => {
        //     if (result.data.status) {
        //         var menudata = result.data.response.data;
        //         if (menudata.length > 0) {
        //             setMenuList(menudata);
        //         } 
        //     } else {
        //         Swal.fire('Oops...', result.data.response.msg, 'error')
        //     }
        // }).catch((err) => {
        //     console.log(err);
        //     //Swal.fire('Oops...', err, 'error')
        // })

    }, [])

    const handleOpenDirection = () => {
        history.push('/');
    }

    const logoutClick = () => {
        localStorage.clear();       
        window.location.href = "/";
        
        // history.push('/');
       //  window.location.reload(false);
    }
 

    return(

            <header id="myHeader">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="navigation">
                                <nav class="navbar navbar-expand-lg">
                                <a class="navbar-brand" onClick={(e) => handleOpenDirection()}><img src="images/logo.png" alt="" class="img-fluid" onClick={(e) => handleOpenDirection()} /></a>
                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                        <span class="navbar-toggler-icon"></span>
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav ms-auto" id="menu">
                                        {(!token || pathname=='/') &&  <React.Fragment>
                                        <li class="nav-item"><a class="nav-link" href="about">About Us <i class="fa-solid fa-caret-down"></i></a>
                                                <ul class="menus">
                                                    <li>
                                                        <NavLink activeClassName="active" to="/about-hull">
                                                            <InlineButton name={"About Hull Services"} />
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink activeClassName="active" to="/ourteam">
                                                            <InlineButton name={"Our Team"} />
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="nav-item">
                                                <NavLink class="nav-link" activeClassName="active" to="/research-request-form">
                                                    <InlineButton name={"Research"} />
                                                </NavLink>
                                            </li>
                                            <li class="nav-item">
                                                <NavLink class="nav-link" activeClassName="active" to="/courses-training">
                                                    <InlineButton name={"Trainings & Courses"} />
                                                </NavLink>
                                            </li>
                                            <li class="nav-item">
                                                <NavLink class="nav-link" activeClassName="active" to="/events">
                                                    <InlineButton name={"Events"} />
                                                </NavLink>
                                            </li>
                                            <li class="nav-item">
                                                <NavLink class="nav-link" activeClassName="active" to="/partner">
                                                    <InlineButton name={"Our Partners"} />
                                                </NavLink>
                                            </li>
                                            <li class="nav-item">
                                                <NavLink class="nav-link" activeClassName="active" to="/contact">
                                                    <InlineButton name={"Contact Us"} />
                                                </NavLink>
                                            </li>
                                            </React.Fragment>}
                                            {(!token) &&  <li class="nav-item">
                                                <NavLink class="login-btn" activeClassName="active" to="/login">
                                                    <InlineButton name={"Login"} />
                                                </NavLink>
                                            </li>}
                                            
                                                


                                        {(token) && <div className="user-dropdown">
                                            <div class="dropdown">
                                                <a class="dropdown-toggle loged-user-link" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <div className="loged-user-details">
                                                        <div className="loged-user-icon">
                                                            {!userData.avatar && <img src="images/user.png" />}
                                                            {userData.avatar && <img src={userData.avatar} />}
                                                        </div>
                                                        <div className="loged-user-name">
                                                            <h3 title={userData.first_name + ' ' + userData.last_name}> {(userData.first_name + ' ' + userData.last_name).substring(0, 15)}</h3>
                                                            <small>({userTypeList})</small>
                                                        </div>
                                                    </div>
                                                </a>

                                                <ul class="dropdown-menu loged-user-menu" aria-labelledby="dropdownMenuLink">
                                                    <li><Link className="btn-edit" to={{ pathname: "/dashboard" }}>My Dashboard</Link></li>
                                                    <li><Link className="btn-edit" onClick={() => { window.location.href = "/view-profile?id=" + userData.id }} >View Profile</Link></li>
                                                    <li onClick={(e) => logoutClick()}><a className="logout">
                                                        <InlineButton name={"Logout"} />
                                                    </a></li>
                                                </ul>
                                            </div>
                                        </div>   }

                                            
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
    )

    
}
