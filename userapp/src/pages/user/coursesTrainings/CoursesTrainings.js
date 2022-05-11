import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from '../../../sections/Header';
import Footer from '../../../sections/Footer';
//import { useForm } from "react-hook-form";

export default function CoursesTrainings() {


    return (
        <div>
            <Header />


            <section className="second-banner-sec" style={{ background: `url('images/banner-training.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="container">
                    <div className="second-banner-inner">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="text-box">
                                    <h2 className="wow animate__fadeIn" data-wow-duration="300ms" data-wow-delay="10ms" data-wow-offset="1">Training & Courses </h2>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="image-holder">
                                    <img src="images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1" />
                                </div>
                            </div>
                        </div>
                        <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1">
                            <img src="images/second-banner-shape.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="training-course-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content  wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1">
                                <p>Pathways to Prevention’s work with the Neurosequential Model (NM) has given us a strong presence as leaders in trauma-informed care in the community and worldwide. Our clinical team has worked with Dr. Bruce Perry and the Neurosequential Model (NM) for over ten years. This partnership included certification in the NMT, and a designation as a Flagship Site from 2012 to 2020, thus giving us a strong presence as leaders in trauma-informed care in the community and worldwide. </p>
                                <p>We gather influencers and experts from many disciplines — education, health care, the legal community, social services, and early childhood development — and arm them with the most current information about developmental trauma, its impact on children, and how to respond, thus equipping service providers with the skills to deliver best possible practice. Our continued growth of knowledge through targeted research will continue to position Pathways to Prevention as having the expertise and capacity to prevent and support those impacted by developmental trauma. </p>
                                <p>Our team has built a reputation for training and education and has been invited to provide this training for thousands of individuals, and we are now offering our training to the public.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="courses-description" style={{ "max-width": "860px", "margin": "auto" }}>
                <div className="container">
                    <div className="researcher-heading">
                        <h3 className="wow animate__fadeInUp" data-wow-duration="300ms" data-wow-delay="0ms" data-wow-offset="1">Training and Courses</h3>
                        <p className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="1">Training and courses are available for...
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div className="icon"><img src="images/nm-core-icon.svg" alt="" /></div>
                                <h2 >NM Core <br /> Concepts</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course light-yellow wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                <div className="icon"><img src="images/school-cap-icon.svg" alt="" /></div>
                                <h2>Trauma Informed Schools</h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course light-green wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                <div className="icon"><img src="images/reflective-icon.svg" alt="" /></div>
                                <h2>Reflective <br /> Practice</h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course red wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal4">
                                <div className="icon"><img src="images/trauma-icon.svg" alt="" /></div>
                                <h2>Trauma</h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course blue wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal5">
                                <div className="icon"><img src="images/focused-icon.svg" alt="" /></div>
                                <h2>NM Focused  <br /> Trauma 	 </h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course orange wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal6">
                                <div className="icon"><img src="images/trauma-icon.svg" alt="" /></div>
                                <h2>Trauma</h2>
                            </div>
                        </div >
                    </div >
                </div >
            </section >

            <section className="trainingCourses">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="researcher-heading caption">
                                <h3 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="10ms">Upcoming Training and Courses
                                </h3>
                                <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">
                                    Training and courses are available for... 
                                </p>
                            </div>
                            <div className="event-card wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms">
                                <div className="event-card-left">
                                    <div className="desc">16th Annual Society of Consulting Psychology Winter Conference</div>
                                    <ul>
                                        <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>12-7-2022</span></li>
                                        <li><i><img src="images/bxs_time.svg" alt="" /></i><span>9:00pm - 10:30pm</span></li>
                                        <li><i><img src="images/loc.svg" alt="" /></i><span>United States</span></li>
                                    </ul>
                                </div>
                                <div className="event-card-right">
                                    <div className="price">$99.00</div>
                                    <a href="#" className="btn btn-default w-100 mt-0">Register</a>
                                </div>
                            </div>
                            <div className="event-card wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms">
                                <div className="event-card-left">
                                    <div className="desc">16th Annual Society of Consulting Psychology Winter Conference</div>
                                    <ul>
                                        <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>12-7-2022</span></li>
                                        <li><i><img src="images/bxs_time.svg" alt="" /></i><span>9:00pm - 10:30pm</span></li>
                                        <li><i><img src="images/loc.svg" alt="" /></i><span>United States</span></li>
                                    </ul>
                                </div>
                                <div className="event-card-right">
                                    <div className="price">$99.00</div>
                                    <a href="#" className="btn btn-default w-100 mt-0">Register</a>
                                </div>
                            </div>
                            <div className="event-card wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" >
                                <div className="event-card-left">
                                    <div className="desc">16th Annual Society of Consulting Psychology Winter Conference</div>
                                    <ul>
                                        <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>12-7-2022</span></li>
                                        <li><i><img src="images/bxs_time.svg" alt="" /></i><span>9:00pm - 10:30pm</span></li>
                                        <li><i><img src="images/loc.svg" alt="" /></i><span>United States</span></li>
                                    </ul>
                                </div>
                                <div className="event-card-right">
                                    <div className="price">$99.00</div>
                                    <a href="#" className="btn btn-default w-100 mt-0">Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 


            <section className="researcher-sec researchContact">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="researcher-heading">
                                <h3 className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">Organizational training and speaker request </h3>
                                <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">
                                    Are you interested in receiving personalized training for your organization? Or are you looking to book one of our clinicians for a speaking engagement? Please fill out the form below, and a member of our team will be in contact with you:
                                </p>
                            </div>
                            <div className="contact mt-0">
                                <form className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Phone" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Organisation" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="No of People" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Select Training" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <textarea className="form-control" placeholder="Do you want to share more info with us?"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <button className="btn btn-default">SUBMIT</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </section >




            <Footer />

            <div className="team-modal ">
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body mobile-train">
                                <div className="popup-courses">
                                    <a href="#/" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#007089' }}>
                                            <img src="images/concepts-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >NM Core Concepts</h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac nec cras bibendum sed blandit amet et consectetur felis. Turpis massa enim, facilisis eu ultrices. Tellus tellus quam ornare integer sit adipiscing a venenatis. Ornare tellus dictum pharetra felis amet augue commodo. Sit sed mauris duis ut at.</p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$99.00</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : 12-7-2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Start time : 9:00AM  MDT</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 5 Hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Calgary, Alberta</span></li>
                                        </ul>
                                        <a href="#" className="btn btn-default">Register</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="team-modal ">
                <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body mobile-train">
                                <div className="popup-courses">
                                    <a href="#/" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#f9cc8a' }}>
                                            <img src="images/school-cap-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Trauma informed Schools</h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac nec cras bibendum sed blandit amet et consectetur felis. Turpis massa enim, facilisis eu ultrices. Tellus tellus quam ornare integer sit adipiscing a venenatis. Ornare tellus dictum pharetra felis amet augue commodo. Sit sed mauris duis ut at.</p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$99.00</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : 12-7-2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Start time : 9:00AM  MDT</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 5 Hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Calgary, Alberta</span></li>
                                        </ul>
                                        <a href="#" className="btn btn-default">Register</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="team-modal ">
                <div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body mobile-train">
                                <div className="popup-courses">
                                    <a href="#/" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#69c7b8' }}>
                                            <img src="images/reflective-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Reflective Practice</h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac nec cras bibendum sed blandit amet et consectetur felis. Turpis massa enim, facilisis eu ultrices. Tellus tellus quam ornare integer sit adipiscing a venenatis. Ornare tellus dictum pharetra felis amet augue commodo. Sit sed mauris duis ut at.</p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$99.00</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : 12-7-2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Start time : 9:00AM  MDT</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 5 Hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Calgary, Alberta</span></li>
                                        </ul>
                                        <a href="#" className="btn btn-default">Register</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="team-modal ">
                <div className="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body mobile-train">
                                <div className="popup-courses">
                                    <a href="#/" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#f15d4f' }}>
                                            <img src="images/trauma-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Trauma</h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac nec cras bibendum sed blandit amet et consectetur felis. Turpis massa enim, facilisis eu ultrices. Tellus tellus quam ornare integer sit adipiscing a venenatis. Ornare tellus dictum pharetra felis amet augue commodo. Sit sed mauris duis ut at.</p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$99.00</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : 12-7-2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Start time : 9:00AM  MDT</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 5 Hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Calgary, Alberta</span></li>
                                        </ul>
                                        <a href="#" className="btn btn-default">Register</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="team-modal ">
                <div className="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body mobile-train">
                                <div className="popup-courses">
                                    <a href="#/" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#339f94' }}>
                                            <img src="images/focused-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >NM Focused Trauma</h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac nec cras bibendum sed blandit amet et consectetur felis. Turpis massa enim, facilisis eu ultrices. Tellus tellus quam ornare integer sit adipiscing a venenatis. Ornare tellus dictum pharetra felis amet augue commodo. Sit sed mauris duis ut at.</p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$99.00</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : 12-7-2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Start time : 9:00AM  MDT</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 5 Hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Calgary, Alberta</span></li>
                                        </ul>
                                        <a href="#" className="btn btn-default">Register</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="team-modal ">
                <div className="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body mobile-train">
                                <div className="popup-courses">
                                    <a href="#/" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#f89b5e' }}>
                                            <img src="images/trauma-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Trauma</h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac nec cras bibendum sed blandit amet et consectetur felis. Turpis massa enim, facilisis eu ultrices. Tellus tellus quam ornare integer sit adipiscing a venenatis. Ornare tellus dictum pharetra felis amet augue commodo. Sit sed mauris duis ut at.</p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$99.00</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : 12-7-2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Start time : 9:00AM  MDT</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 5 Hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Calgary, Alberta</span></li>
                                        </ul>
                                        <a href="#" className="btn btn-default">Register</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>






        </div>
    )
}