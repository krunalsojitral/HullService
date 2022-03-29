import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, Link, useLocation } from 'react-router-dom';
import InlineButton from './../components/InlineButton';
import useLogout from './../hooks/useLogout';
import api_url from './../components/Apiurl';
import axios from 'axios';
import Swal from "sweetalert2";
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
            <header>
                <div className="container">
                    <div className="row">

                    <div className="col-md-12">
                        <div className="header-card">
                            <div className="logo" onClick={(e) => handleOpenDirection()}>
                                <img alt="logo" src="images/logo.png" />
                            </div>
                            <div className="hull-links">
                                <a href="javascript:void(0);" className="mob-btn">
                                    <i className="fa fa-bars"></i>
                                </a>

                                {!token && <div className="hull-menu">
                                    <ul>
                                        <li>
                                            <NavLink exact={true} activeClassName="active" to="/">
                                                <InlineButton name={"HOME"} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/research-request-form">
                                                <InlineButton name={"RESEARCHER'S REGISTRATION"} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/events">
                                                <InlineButton name={"EVENTS"} />
                                            </NavLink>
                                        </li>                                        
                                        <li>
                                            <NavLink activeClassName="active" to="/course">
                                                <InlineButton name={"COURSE"} />
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>}

                             

                              
                                {(token) && <div className="user-dropdown">
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-toggle loged-user-link" data-toggle="dropdown">
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
                                        <ul className="dropdown-menu loged-user-menu">
                                            <li><Link className="btn-edit" to={{ pathname: "/dashboard" }}>My Dashboard</Link></li>
                                            <li><Link className="btn-edit" onClick={() => { window.location.href = "/view-profile?id=" + userData.id }} >View Profile</Link></li>
                                            <li onClick={(e) => logoutClick()}><a className="logout">
                                                <InlineButton name={"Logout"} />
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>


                      
                    </div>
                </div>
            </header>
    )
}
