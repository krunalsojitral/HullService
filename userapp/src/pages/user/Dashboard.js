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

            {/* <section className="second-banner-sec" style={{ background: `url('images/contact-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="container">
                    <div className="second-banner-inner">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="text-box">
                                    <h2 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Dashboard</h2>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="image-holder">
                                    <img src="images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                        <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="1000ms">
                            <img src="images/second-banner-shape.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div >
            </section>      */}

            <section className="researcher-sec researchContact dashboard-card">
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
                                                <Link to='/my-events' className="Support-card">
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
                                            {users && (users.role == 3 || users.role == 2) && <div className="col-md-4">
                                                <Link to='/my-forum' className="Support-card">
                                                    <h3>My Threads</h3>
                                                    <div className="support-img">
                                                            <img alt="support" src="images/support04.png"/>
                                                    </div>
                                                </Link>
                                            </div>}
                                            {users && (users.role == 3) && <div className="col-md-4 mt-4">
                                                <Link to='/my-studies' className="Support-card">
                                                    <h3>My Studies</h3>
                                                    <div className="support-img">
                                                        <img alt="support" src="images/support05.png"/>
                                                    </div>
                                                </Link>
                                            </div>}                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>    

            
        {/* <Footer/> */}
    </div>
    )
}