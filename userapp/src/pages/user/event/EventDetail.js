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
                            <div class="event-details">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="event-details-title">
                                            <h3>Child Therapy</h3>
                                        </div>
                                        <div class="event-details-links">
                                            <ul>
                                                <li class="active"><a data-toggle="tab" href="#home">Events</a></li>
                                                <li><a data-toggle="tab" href="#menu1">Follow up meetings</a></li>
                                                <li><a data-toggle="tab" href="#menu2">Resources</a></li>
                                            </ul>
                                        </div>
                                        <div class="tab-content">
                                            <div id="home" class="tab-pane fade in active">
                                                <div class="event-details-content">
                                                    <div class="row">
                                                        <div class="col-md-9">
                                                            <div class="event-content-img">
                                                                <img src="images/Events-Img.png" />
                                                            </div>
                                                            <div class="event-content-list">
                                                                <p>Luptatum volutpat delicatissimi has. Sed ad dicam platonem, mea eros illum elitr id, ei has similique constituto. Ea movet saperet rationibus sit, pri autem aliquip invidunt an. Consetetur omittantur consequuntur eos et. Eleifend praesent iudicabit no mea, tollit persequeris ex pri, tota splendide voluptaria in pri. Ad per tale aliquip, ei sit viris commune albucius. Eos aliquip scaevola ut, eum alii mentitum prodesset no, his ne suas atomorum. Et numquam deleniti ponderum vis, quod error at mei. Novum blandit adolescens sea te. Ea eum cetero scaevola.</p>

                                                                <p>Lorem ipsum dolor sit amet, voluptua iracundia disputationi an pri, his utinam principes dignissim ad. Ne nec dolore oblique nusquam, cu luptatum volutpat delicatissimi has. Sed ad dicam platonem, mea eros illum elitr id, ei has similique constituto. Ea movet saperet rationibus sit, pri autem aliquip invidunt an. Consetetur omittantur consequuntur eos et. Eleifend praesent iudicabit no mea, tollit persequeris ex pri, tota splendide voluptaria in pri. Ad per tale aliquip, ei sit viris commune albucius. Eos aliquip scaevola ut, eum alii mentitum prodesset no, his ne suas atomorum. Et numquam deleniti ponderum vis, quod error at mei. Novum blandit adolescens sea te. Ea eum cetero scaevola.</p>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="event-listing-box">
                                                                <div class="event-listing-text">
                                                                    <div class="event-text-icon">
                                                                        <img src="images/cal.png" />
                                                                    </div>
                                                                    <div class="event-text-word">
                                                                        <h3>START DATE</h3>
                                                                        <span>November 17, 2020 12:00 pm</span>
                                                                    </div>
                                                                </div>
                                                                <div class="event-listing-text">
                                                                    <div class="event-text-icon">
                                                                        <img src="images/cal.png" />
                                                                    </div>
                                                                    <div class="event-text-word">
                                                                        <h3>END DATE</h3>
                                                                        <span>November 17, 2020 12:00 pm</span>
                                                                    </div>
                                                                </div>
                                                                <div class="event-listing-text">
                                                                    <div class="event-text-icon">
                                                                        <img src="images/checking.png" />
                                                                    </div>
                                                                    <div class="event-text-word">
                                                                        <h3>STATUS</h3>
                                                                        <span>Showing</span>
                                                                    </div>
                                                                </div>
                                                                <div class="event-listing-text">
                                                                    <div class="event-text-icon">
                                                                        <img src="images/marker-event.png" />
                                                                    </div>
                                                                    <div class="event-text-word">
                                                                        <h3>LOCATION</h3>
                                                                        <span>Milan</span>
                                                                    </div>
                                                                </div>
                                                                <div class="event-listing-text">
                                                                    <div class="event-text-icon">
                                                                        <img src="images/box.png" />
                                                                    </div>
                                                                    <div class="event-text-word">
                                                                        <h3>CATEGORY</h3>
                                                                        <span>Business</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div id="menu1" class="tab-pane fade">
                                                <div class="event-details-content">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="event-content-list">
                                                                <div class="event-joining">
                                                                    <div class="row">
                                                                        <div class="col-md-10">
                                                                            <div class="joining-card">
                                                                                <h3>Title One Goes Here</h3>
                                                                                <p>Lorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an priLorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an </p>
                                                                                <span>November 17, 2020 12:00 pm</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <div class="joining-btn-card">
                                                                                <a href="" class="join-btn">
                                                                                    JOIN
                                                                       </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="event-joining">
                                                                    <div class="row">
                                                                        <div class="col-md-10">
                                                                            <div class="joining-card">
                                                                                <h3>Title One Goes Here</h3>
                                                                                <p>Lorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an priLorem ipsum dolor sit amet, voluptua iracundia disputationi an pri Lorem ipsum dolor sit amet, voluptua iracundia disputationi an </p>
                                                                                <span>November 17, 2020 12:00 pm</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <div class="joining-btn-card">
                                                                                <a href="" class="join-btn">
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
                                            <div id="menu2" class="tab-pane fade">
                                                <div class="event-details-content">
                                                    <div class="row">
                                                        <div class="col-md-15">
                                                            <div class="resources-box">
                                                                <div class="resources-icon">
                                                                    <img src="images/pdf.png" />
                                                                </div>
                                                                <h3>File Name</h3>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-15">
                                                            <div class="resources-box">
                                                                <div class="resources-icon">
                                                                    <img src="images/word.png" />
                                                                </div>
                                                                <h3>File Name</h3>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <h3>Video title goes here</h3>
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="resources-video">
                                                                <img src="images/Events-Img.png" />
                                                                <div class="video-icon">
                                                                    <img src="images/video-icon.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="resources-video">
                                                                <img src="images/Events-Img.png" />
                                                                <div class="video-icon">
                                                                    <img src="images/video-icon.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="resources-video">
                                                                <img src="images/Events-Img.png" />
                                                                <div class="video-icon">
                                                                    <img src="images/video-icon.png" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h3>Arctiles Link Heading</h3>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="Arctiles-Card">
                                                                <div class="Arctiles-Icon">
                                                                    <i class="fa fa-link"></i>
                                                                </div>
                                                                <div class="Arctiles-Text">
                                                                    <h3><a href="http://3.99.13.94:6161/members">http://3.99.13.94:6161/members</a></h3>
                                                                </div>
                                                            </div>
                                                            <div class="Arctiles-Card">
                                                                <div class="Arctiles-Icon">
                                                                    <i class="fa fa-link"></i>
                                                                </div>
                                                                <div class="Arctiles-Text">
                                                                    <h3><a href="http://3.99.13.94:6161/members">http://3.99.13.94:6161/members</a></h3>
                                                                </div>
                                                            </div>
                                                            <div class="Arctiles-Card">
                                                                <div class="Arctiles-Icon">
                                                                    <i class="fa fa-link"></i>
                                                                </div>
                                                                <div class="Arctiles-Text">
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