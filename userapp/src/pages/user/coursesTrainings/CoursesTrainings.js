import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from '../../../sections/Header';
import Footer from '../../../sections/Footer';
//import { useForm } from "react-hook-form";

export default function CoursesTrainings() {
  

    return(
        <div>
            <Header/>

            
            <section class="second-banner-sec" style={{ background: `url('images/banner-training.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="text-box">
                                    <h2 class="wow animate__fadeIn" data-wow-duration="500ms" data-wow-delay="1000ms">Trainings & Courses </h2>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="image-holder">
                                    <img src="images/second-banner-img.png" alt="" class="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                        <div class="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="1000ms">
                            <img src="images/second-banner-shape.png" alt="" class="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
            <section class="training-course-sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="content  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                <p>Pathways to Prevention’s work with the Neurosequential Model (NM) has given us a strong presence as leaders in trauma-informed care in the community and worldwide.  We train and educate service providers and experts from many disciplines — education, health care, the legal community, social services, early childhood development — and arm them with the most current information about developmental trauma, its impact on children and how to respond, thus equipping them with the skills to deliver best possible practice.  </p>
                                <p>Our commitment to the continued growth of knowledge through targeted research and training will continue to position Pathways to Prevention as having the expertise to train and build the capacity of other organizations and systems to more effectively identify and respond to developmental trauma in the populations they serve.  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
			
            <section class="courses-description" style={{"max-width":"860px", "margin":"auto"}}>
                <div class="container">
                    <div class="researcher-heading">
                        <h3  class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">Training and Courses</h3>
                        <p  class="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="1000ms">Training and courses are available for... 
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <div class="card-course wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="icon"><img src="images/nm-core-icon.svg" alt=""/></div>
                                <h2 >NM Core <br/> Concepts</h2>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="card-course light-yellow wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="icon"><img src="images/school-cap-icon.svg" alt=""/></div>
                                <h2>Trauma Informed Schools</h2>
                            </div>
                        </div >
                        <div class="col-lg-4 col-md-6">
                            <div class="card-course light-green wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="icon"><img src="images/reflective-icon.svg" alt=""/></div>
                                <h2>Reflective <br/> Practice</h2>
                            </div>
                        </div >
                        <div class="col-lg-4 col-md-6">
                            <div class="card-course red wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="icon"><img src="images/trauma-icon.svg" alt=""/></div>
                                <h2>Trauma</h2>
                            </div>
                        </div >
                        <div class="col-lg-4 col-md-6">
                            <div class="card-course blue wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="icon"><img src="images/focused-icon.svg" alt=""/></div>
                                <h2>NM Focused  <br/> Trauma 	 </h2>
                            </div>
                        </div >
                        <div class="col-lg-4 col-md-6">
                            <div class="card-course orange wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="icon"><img src="images/trauma-icon.svg" alt=""/></div>
                                <h2>Trauma</h2>
                            </div>
                        </div >
                    </div >
                </div >
            </section >

            <section class="trainingCourses">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="researcher-heading caption">
                                <h3 class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">Upcoming Training and Courses
                                </h3>
                                <p class="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="1000ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sed eu varius ut. Faucibus suscipit ultrices pretium tincidunt turpis. Vulputate pharetra in lectus sit et.
                                </p>
                            </div>
                            <div class="event-card wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                <div class="event-card-left">
                                    <div class="desc">16th Annual Society of Consulting Psychology Winter Conference</div>
                                    <ul>
                                        <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>12-7-2022</span></li>
                                        <li><i><img src="images/bxs_time.svg" alt="" /></i><span>9:00pm - 10:30pm</span></li>
                                        <li><i><img src="images/loc.svg" alt="" /></i><span>United States</span></li>
                                    </ul>
                                </div>
                                <div class="event-card-right">
                                    <div class="price">$99.00</div>
                                    <a href="#" class="btn btn-default w-100 mt-0">Register</a>
                                </div>
                            </div>
                            <div class="event-card wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                <div class="event-card-left">
                                    <div class="desc">16th Annual Society of Consulting Psychology Winter Conference</div>
                                    <ul>
                                        <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>12-7-2022</span></li>
                                        <li><i><img src="images/bxs_time.svg" alt="" /></i><span>9:00pm - 10:30pm</span></li>
                                        <li><i><img src="images/loc.svg" alt="" /></i><span>United States</span></li>
                                    </ul>
                                </div>
                                <div class="event-card-right">
                                    <div class="price">$99.00</div>
                                    <a href="#" class="btn btn-default w-100 mt-0">Register</a>
                                </div>
                            </div>
                            <div class="event-card wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" >
                                <div class="event-card-left">
                                    <div class="desc">16th Annual Society of Consulting Psychology Winter Conference</div>
                                    <ul>
                                        <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>12-7-2022</span></li>
                                        <li><i><img src="images/bxs_time.svg" alt="" /></i><span>9:00pm - 10:30pm</span></li>
                                        <li><i><img src="images/loc.svg" alt="" /></i><span>United States</span></li>
                                    </ul>
                                </div>
                                <div class="event-card-right">
                                    <div class="price">$99.00</div>
                                    <a href="#" class="btn btn-default w-100 mt-0">Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 

            <section class="researcher-sec researchContact">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="researcher-heading">
                                <h3 class="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Organizational Training and Speaker Request </h3>
                                <p class="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Are you interested in receiving personalized training for your organization? Or are you looking to book one of our clinicians for a speaking engagement? Please fill out the form below, and a member of our team will be in contact with you:
                                </p>
                            </div>
                            <div class="contact mt-0">
                                <form class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Name" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Phone" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Organisation" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="No of People" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Select Training" />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea class="form-control" placeholder="Do you want to share more info with us?"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <button class="btn btn-default">SUBMIT</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </section >
            

          
       
           <Footer/>
        </div>
    )
}