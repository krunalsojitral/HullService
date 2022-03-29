import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
//import { useForm } from "react-hook-form";
import Sidebar from './../Sidebar';

export default function Events() {
   

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
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Events</h2>
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
                        <div className="col-md-10">
                            <div className="event-details">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="event-details-title">
                                            <h3>Child Therapy</h3>
                                        </div>
                                        <div className="event-details-links">
                                            <ul>
                                                <li className="active"><a data-toggle="tab" href="#home">Events</a></li>
                                                <li><a data-toggle="tab" href="#menu1">Follow up meetings</a></li>
                                                <li><a data-toggle="tab" href="#menu2">Resources</a></li>
                                            </ul>
                                        </div>
                                        <div className="tab-content">
                                            <div id="home" className="tab-pane fade in active">
                                                <div className="event-details-content">
                                                    <div className="row">
                                                        <div className="col-md-9">
                                                            <div className="event-content-img">
                                                                <img src="images/Events-Img.png" />
                                                            </div>
                                                            <div className="event-content-list">
                                                                <p>Luptatum volutpat delicatissimi has. Sed ad dicam platonem, mea eros illum elitr id, ei has similique constituto. Ea movet saperet rationibus sit, pri autem aliquip invidunt an. Consetetur omittantur consequuntur eos et. Eleifend praesent iudicabit no mea, tollit persequeris ex pri, tota splendide voluptaria in pri. Ad per tale aliquip, ei sit viris commune albucius. Eos aliquip scaevola ut, eum alii mentitum prodesset no, his ne suas atomorum. Et numquam deleniti ponderum vis, quod error at mei. Novum blandit adolescens sea te. Ea eum cetero scaevola.</p>

                                                                <p>Lorem ipsum dolor sit amet, voluptua iracundia disputationi an pri, his utinam principes dignissim ad. Ne nec dolore oblique nusquam, cu luptatum volutpat delicatissimi has. Sed ad dicam platonem, mea eros illum elitr id, ei has similique constituto. Ea movet saperet rationibus sit, pri autem aliquip invidunt an. Consetetur omittantur consequuntur eos et. Eleifend praesent iudicabit no mea, tollit persequeris ex pri, tota splendide voluptaria in pri. Ad per tale aliquip, ei sit viris commune albucius. Eos aliquip scaevola ut, eum alii mentitum prodesset no, his ne suas atomorum. Et numquam deleniti ponderum vis, quod error at mei. Novum blandit adolescens sea te. Ea eum cetero scaevola.</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="event-listing-box">
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/cal.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>START DATE</h3>
                                                                        <span>November 17, 2020 12:00 pm</span>
                                                                    </div>
                                                                </div>
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/cal.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>END DATE</h3>
                                                                        <span>November 17, 2020 12:00 pm</span>
                                                                    </div>
                                                                </div>
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/checking.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>STATUS</h3>
                                                                        <span>Showing</span>
                                                                    </div>
                                                                </div>
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/marker-event.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>LOCATION</h3>
                                                                        <span>Milan</span>
                                                                    </div>
                                                                </div>
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/box.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>CATEGORY</h3>
                                                                        <span>Business</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div id="menu1" className="tab-pane fade">
                                                <div className="event-details-content">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="event-content-list">
                                                                <div className="event-joining">
                                                                    <div className="row">
                                                                        <div className="col-md-10">
                                                                            <div className="joining-card">
                                                                                <h3>Title One Goes Here</h3>
                                                                                <p>Lorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an priLorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an </p>
                                                                                <span>November 17, 2020 12:00 pm</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-2">
                                                                            <div className="joining-btn-card">
                                                                                <a href="" className="join-btn">
                                                                                    JOIN
                                                                       </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="event-joining">
                                                                    <div className="row">
                                                                        <div className="col-md-10">
                                                                            <div className="joining-card">
                                                                                <h3>Title One Goes Here</h3>
                                                                                <p>Lorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an priLorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an </p>
                                                                                <span>November 17, 2020 12:00 pm</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-2">
                                                                            <div className="joining-btn-card">
                                                                                <a href="" className="join-btn">
                                                                                    JOIN
                                                                       </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="menu2" className="tab-pane fade">
                                                <div className="event-details-content">
                                                    <div className="row">
                                                        <div className="col-md-15">
                                                            <div className="resources-box">
                                                                <div className="resources-icon">
                                                                    <img src="images/pdf.png" />
                                                                </div>
                                                                <h3>File Name</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-15">
                                                            <div className="resources-box">
                                                                <div className="resources-icon">
                                                                    <img src="images/word.png" />
                                                                </div>
                                                                <h3>File Name</h3>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <h3>Video title goes here</h3>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="resources-video">
                                                                <img src="images/Events-Img.png" />
                                                                <div className="video-icon">
                                                                    <img src="images/video-icon.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="resources-video">
                                                                <img src="images/Events-Img.png" />
                                                                <div className="video-icon">
                                                                    <img src="images/video-icon.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="resources-video">
                                                                <img src="images/Events-Img.png" />
                                                                <div className="video-icon">
                                                                    <img src="images/video-icon.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h3>Arctiles Link Heading</h3>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="Arctiles-Card">
                                                                <div className="Arctiles-Icon">
                                                                    <i className="fa fa-link"></i>
                                                                </div>
                                                                <div className="Arctiles-Text">
                                                                    <h3><a href="http://3.99.13.94:6161/members">http://3.99.13.94:6161/members</a></h3>
                                                                </div>
                                                            </div>
                                                            <div className="Arctiles-Card">
                                                                <div className="Arctiles-Icon">
                                                                    <i className="fa fa-link"></i>
                                                                </div>
                                                                <div className="Arctiles-Text">
                                                                    <h3><a href="http://3.99.13.94:6161/members">http://3.99.13.94:6161/members</a></h3>
                                                                </div>
                                                            </div>
                                                            <div className="Arctiles-Card">
                                                                <div className="Arctiles-Icon">
                                                                    <i className="fa fa-link"></i>
                                                                </div>
                                                                <div className="Arctiles-Text">
                                                                    <h3><a href="http://3.99.13.94:6161/members">http://3.99.13.94:6161/members</a></h3>
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
                        </div>
                    </div>
                </div>
            </section>           

            <Footer/>
        </div>
    )
}