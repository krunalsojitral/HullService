import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
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
                            <div class="side-bar">
                                <ul>
                                    <li><a class="active" href="#">Dashboard</a></li>
                                    <li>
                                        <Link to='/dashboard'>
                                            Article & Videos
                                        </Link>                                       
                                    </li>
                                    <li>
                                        <Link to='/dashboard'>
                                            Groups
                                        </Link> 
                                    </li>
                                    <li>
                                        <Link to='/dashboard'>
                                            Forums
                                        </Link> 
                                    </li>
                                    <li>
                                        <Link to='/dashboard'>
                                            Development
                                        </Link> 
                                    </li>
                                    <li>
                                        <Link to='/dashboard'>
                                            Research
                                        </Link> 
                                    </li>
                                    <li><Link to='/dashboard'>
                                        Webinars
                                        </Link> 
                                    </li>
                                    <li><Link to='/dashboard'>
                                        Settings
                                        </Link> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="dashboard-content">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="Support-card">
                                                    <h3>Support Groups & Resources</h3>
                                                    <div class="support-img">
                                                        <img alt="support" src="images/support01.png"/>
												</div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="Support-card">
                                                        <h3>Informational Videos</h3>
                                                        <div class="support-img">
                                                        <img alt="support" src="images/support02.png"/>
												    </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="Support-card">
                                                            <h3>Personal Development</h3>
                                                            <div class="support-img">
                                                                    <img alt="support" src="images/support03.png"/>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="Support-card">
                                                                <h3>Virtual Events</h3>
                                                                <div class="support-img">
                                                                        <img alt="support" src="images/support04.png"/>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="Support-card">
                                                                    <h3>Forums</h3>
                                                                    <div class="support-img">
                                                                            <img alt="support" src="images/support05.png"/>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="Support-card">
                                                                        <h3>Blogs & Articles</h3>
                                                                        <div class="support-img">
                                                                                <img alt="support" src="images/support06.png"/>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
		                            </section>
                                    <section class="innovation dashboard-innovation">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-3 col-sm-3 col-xl-3 col-lg-3">
                                                    <div class="Health-img">
                                                            <img alt="support" src="images/doctor.png"/>
                                                    </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-6 col-xl-6 col-lg-6">
                                                        <div class="Health-Text">
                                                            <span>Mental Health</span>
                                                            <h2>Exercises</h2>
                                                            <a href="#" class="Power-btn">Power Up</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
		                             </section>
                                        <section class="partner dashabord-partner">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="partner-tilte">
                                                            <h3>News & Articles</h3>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="arrow-btn">
                                                            <button class="customNextBtn"><i class="fa fa-angle-left"></i></button>
                                                            <button class="customPrevBtn"><i class="fa fa-angle-right"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="partner-card">
                                                            <div class="owl-carousel owl-theme">
                                                                <div class="item news-card">
                                                                    <div class="news-img">
                                                                            <img alt="support" src="images/news01.png"/>
                                                                    </div>
                                                                        <h3>Lorem ipsum dolor sit amet, consectetur…</h3>
                                                                    </div>
                                                                    <div class="item news-card">
                                                                        <div class="news-img">
                                                                                <img alt="support" src="images/news02.png"/>
                                                                        </div>
                                                                            <h3>Lorem ipsum dolor sit amet, consectetur…</h3>
                                                                        </div>
                                                                        <div class="item news-card">
                                                                            <div class="news-img">
                                                                                    <img alt="support" src="images/news03.png"/>
                                                                            </div>
                                                                                <h3>Lorem ipsum dolor sit amet, consectetur…</h3>
                                                                            </div>
                                                                            <div class="item news-card">
                                                                                <div class="news-img">
                                                                                        <img alt="support" src="images/news04.png"/>
                                                                                </div>
                                                                                    <h3>Lorem ipsum dolor sit amet, consectetur…</h3>
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