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

    return(
        <div>
            <Header/>
            <section class="inner-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Your Dashboard</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section class="dashboard-card">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2 side-col">
                            <Sidebar />
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="dashboard-content">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <Link to='/dashboard' className="Support-card">
                                                    <h3>Support Groups & Resources</h3>
                                                    <div class="support-img">
                                                        <img alt="support" src="images/support01.png"/>
                                                    </div>
                                                </Link>
                                                </div>
                                            <div class="col-md-4">
                                                    <Link to='/video' className="Support-card">
                                                        <h3>Informational Videos</h3>
                                                        <div class="support-img">
                                                        <img alt="support" src="images/support02.png"/>
												        </div>
                                                    </Link>
                                                    </div>
                                            <div class="col-md-4">
                                                    <Link to='/dashboard' className="Support-card">
                                                        <h3>Personal Development</h3>
                                                        <div class="support-img">
                                                                <img alt="support" src="images/support03.png"/>
                                                        </div>
                                                    </Link>
                                                    </div>
                                            <div class="col-md-4">
                                                        <Link to='/events' className="Support-card">
                                                            <h3>Virtual Events</h3>
                                                            <div class="support-img">
                                                                    <img alt="support" src="images/support04.png"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                            <div class="col-md-4">
                                                <Link to='/forum' className="Support-card">
                                                    <h3>Forums</h3>
                                                    <div class="support-img">
                                                            <img alt="support" src="images/support05.png"/>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div class="col-md-4">
                                                <Link to='/blog' className="Support-card">                                                                    
                                                    <h3>Blogs & Articles</h3>
                                                    <div class="support-img">                                                                            
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