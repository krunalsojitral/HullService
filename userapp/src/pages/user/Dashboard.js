import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
//import { useForm } from "react-hook-form";

export default function Dashboard() {
   

//     const { loginUser } = useAuth();
//    // const [isFirstRadioLoaded, setIsFirstRadioLoaded] = useState(false);  
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = async (data) => {
//         var obj = {
//             email: data.email,
//             password: data.password
//         }
//        // setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
//         await loginUser(obj);
//     }

    const [users, setUsers] = useState({});

    React.useEffect(() => {
        const userString = localStorage.getItem('userdata');
        var user = JSON.parse(userString);
        setUsers(user);
    }, [])

    return(
        <div>
            <Header/>
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Your Dashboard</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="dashboard-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 side-col">
                            <Sidebar />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-content">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Link to='/events' className="Support-card">
                                                    <h3>My Events</h3>
                                                    <div className="support-img">
                                                        <img alt="support" src="images/support01.png"/>
                                                    </div>
                                                </Link>
                                            </div>
                                            {users && (users.role == 3 || users.role == 2) && <div className="col-md-4">
                                                <Link to='/group-session' className="Support-card">
                                                    <h3>My Meetings </h3>
                                                    <div className="support-img">
                                                        <img alt="support" src="images/support02.png"/>
                                                    </div>
                                                </Link>
                                            </div>}
                                            <div className="col-md-4">
                                                <Link to='/my-professional-development' className="Support-card">
                                                    <h3>My Professional Development Courses </h3>
                                                    <div className="support-img">
                                                         <img alt="support" src="images/support03.png"/>
                                                    </div>
                                                </Link>
                                            </div>
                                            {users && (users.role == 3 || users.role == 2) && <div className="col-md-4">
                                                <Link to='/my-forum' className="Support-card">
                                                    <h3>My Threads</h3>
                                                    <div className="support-img">
                                                            <img alt="support" src="images/support04.png"/>
                                                    </div>
                                                </Link>
                                            </div>}
                                            {users && (users.role == 3) && <div className="col-md-4">
                                                <Link to='/my-studies' className="Support-card">
                                                    <h3>My Studies</h3>
                                                    <div className="support-img">
                                                        <img alt="support" src="images/support05.png"/>
                                                    </div>
                                                </Link>
                                            </div>}
                                            <div className="col-md-4">
                                                <Link to='/my-blog' className="Support-card">                                                                    
                                                    <h3>My Blogs</h3>
                                                    <div className="support-img">                                                                            
                                                        <img alt="support" src="images/support06.png" />                                                                            
                                                    </div>                                                                    
                                                </Link>
                                            </div>
                                            <div className="col-md-4">
                                                <Link to='/my-article' className="Support-card">
                                                    <h3>My Articles</h3>
                                                    <div className="support-img">
                                                        <img alt="support" src="images/support06.png" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4">
                                                <Link to='/my-video' className="Support-card">
                                                    <h3>My Informational Videos</h3>
                                                    <div className="support-img">
                                                        <img alt="support" src="images/support06.png" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>    
        <Footer/>
    </div>
    )
}