import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import InlineButton from './../../components/InlineButton';

import $ from 'jquery';


export default function Sidebar() {

    const [users, setUsers] = useState({});
    const { pathname } = useLocation();

    React.useEffect(() => {
        const userString = localStorage.getItem('userdata');
        var user = JSON.parse(userString);
        setUsers(user);
    }, [])

    const history = useHistory()

    // React.useEffect(() => {
    //     return history.listen((location) => {
    //         if (location.pathname == "/my-studies"){                
    //             submenu();
    //         }
    //         if (location.pathname == "/participants-in-my-studies") {                
    //             submenu();
    //         }
    //     })
    // }, [history])

    const submenu = () => {
        $(".sub-menu").toggleClass('open');
    }

    return(
        <div className="side-bar">

          
            <ul>
                {users && (users.role == 4 || users.role == 3 || users.role == 2) && <li>
                    <NavLink activeClassName="active" to="/dashboard" isActive={() => ['/dashboard','/my-blog', '/my-professional-development', '/my-forum', '/my-article','/my-video'].includes(pathname)}>
                       <InlineButton name={"Dashboard"} />
                    </NavLink>
                </li>}
                
                <li>
                    <NavLink activeClassName="active" to="/events" isActive={() => ['/events'].includes(pathname)}>
                        <InlineButton name={"Events"} />
                    </NavLink>
                </li>
                {/* {users && (users.role == 3 || users.role == 2) && <li>
                    <NavLink activeClassName="active" isActive={() => ['/forum', '/forum-sub', '/forum-detail', '/add-forum'].includes(pathname)} to="/forum">
                        
                        <InlineButton name={"Forums"} />
                    </NavLink>                    
                </li>}                 */}
                {users && (users.role == 3 || users.role == 4) &&                 
                    <li className="dropdown sub-menu">
                        <a activeClassName="active" id="sub-click" onClick={(e) => submenu()} href="javascript:;" >
                           <span>Courses & Trainings</span>
                        </a>
                        <ul className="dropdown-menu">
                        <li><NavLink activeClassName="active" isActive={() => ['/forum', '/forum-sub', '/forum-detail', '/add-forum'].includes(pathname)} to="/forum"><span>Forum</span></NavLink></li>
                        </ul>
                    </li>
                   }
                {/* <li>
                    <NavLink activeClassName="active" to="/professional-development" isActive={() => ['/professional-development', '/professional-development-detail', '/course-payment'].includes(pathname)}>
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-book"></use>
                        </svg>
                        <InlineButton name={"Professional Development"} />
                    </NavLink>
                </li> */}


                {users && users.role == 3 && <li>
                    <NavLink activeClassName="active" to="/my-studies" isActive={() => ['/my-studies', '/add-research'].includes(pathname)}>
                        <InlineButton name={"My Studies"} />
                    </NavLink>
                </li>}
                           
                             
                {/* {users && users.role == 3 &&                
                    <li className="dropdown sub-menu">
                        <a activeClassName="active" id="sub-click" onClick={(e) => submenu()}  href="javascript:;" >
                        <svg className="icon icon-tag">
                                <use xlinkHref="#icon-research"></use>
                            </svg>
                            <span>Studies/Research</span>
                        </a>
                        <ul>
                            <li>
                            <NavLink activeClassName="active" isActive={() => ['/My Studies', '/add-research' ].includes(pathname)} to="/my-studies"><span>My Studies</span></NavLink></li>
                            <li>
                            <NavLink activeClassName="active" isActive={() => ['/participants-in-my-studies'].includes(pathname)} to="/participants-in-my-studies"><span>Participants</span></NavLink>
                            </li>
                        </ul>
                    </li>
                }                */}

            </ul>

            
        </div>
    )
}