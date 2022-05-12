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
                                <p>Pathways to Prevention’s work with the Neurosequential Model (NM) has been pivotal in the community and worldwide. Our clinical team has worked with Dr. Bruce Perry and the Neurosequential Model (NM) for over ten years. This partnership included certification in the NMT, and a designation as a Flagship Site from 2012 to 2020, thus giving us a strong presence as leaders in trauma-informed care in the community and worldwide.</p>
                                <p>We gather influencers and experts from many disciplines — education, health care, the legal community, social services, and early childhood development — and arm them with the most current information about developmental trauma, its impact on children, and how to respond, thus equipping service providers with the skills to deliver best possible practice.Our continued growth of knowledge through targeted research will continue to position Pathways to Prevention as having the expertise and capacity to prevent and support those impacted by developmental trauma. </p>
                                <p>Our team has built a reputation for training and education and has provided this training for thousands of individuals. We are excited to now offer our training to the public. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="courses-description" style={{ "max-width": "860px", "margin": "auto" }}>
                <div className="container">
                    <div className="researcher-heading">
                        <h3 className="wow animate__fadeInUp" data-wow-duration="300ms" data-wow-delay="0ms" data-wow-offset="1">Training and Courses</h3>
                        {/* <p className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="1">Training and courses are available for...
                        </p> */}
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div className="icon"><img src="images/nm-core-icon.svg" alt="" /></div>
                                <h2 >Understanding the Neurosequential Model </h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course light-yellow wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                <div className="icon"><img src="images/school-cap-icon.svg" alt="" /></div>
                                <h2>Reflective Practice</h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course light-green wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                <div className="icon"><img src="images/reflective-icon.svg" alt="" /></div>
                                <h2>Frontline Implementation Workshop </h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course red wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal4">
                                <div className="icon"><img src="images/trauma-icon.svg" alt="" /></div>
                                <h2>Compassion Fatigue Workshop </h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course blue wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal5">
                                <div className="icon"><img src="images/focused-icon.svg" alt="" /></div>
                                <h2>Board Brains </h2>
                            </div>
                        </div >
                        <div className="col-lg-4 col-md-6">
                            <div className="card-course orange wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-bs-toggle="modal" data-bs-target="#exampleModal6">
                                <div className="icon"><img src="images/trauma-icon.svg" alt="" /></div>
                                <h2>Lunch n’ Learn Series</h2>
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
                                {/* <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">
                                    Training and courses are available for... 
                                </p> */}
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
                            {/* <div className="event-card wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms">
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
                            </div> */}
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
                                    <a href="javascript:;" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#007089' }}>
                                            <img src="images/concepts-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3>Understanding the Neurosequential Model </h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>This training provides attendees with exposure to Dr. Bruce Perry’s Neurosequential Model (NM) as a foundation for understanding maltreated children and youth. Participants will develop an understanding of the impact of trauma on brain development, state dependent functioning, and the importance of relationships.</p>
                                        <p>In surveys conducted in 2016, 94% of participants who have attended this session reported a better understanding of children and families. 93% of program participants reported they had gained knowledge on how to work more effectively with children and families.  </p>
                                        <p>Furthermore, a study that involved 10 agencies certified in the Neurosequential Model of Therapeutics demonstrated a reduction in the number of restraints over the course of NM exposure and subsequent certification (Hambrick et al, 2018). This study included the data provided by Hull Services. </p>
                                        <p>This training can serve as a good refresher about the NM. Alternatively, it is a perfect way to gain some exposure and knowledge that will shift the participant’s lens in understanding maltreated children and youth and will allow the participant to determine the best “next steps” for further education and certification with the Neurosequential Network.</p>
                                        <p>Training is open to individuals from a variety of disciplines, including clinicians, social workers, front line staff, students, parents, foster & adoptive parents, teachers, nurses, and those in the justice system.</p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$120</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : September 19, 2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Time : 9:00AM – 4:00PM MST</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 6 hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Online</span></li>
                                        </ul>
                                        {/* <a href="#" className="btn btn-default">Register</a> */}
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
                                    <a href="javascript:;" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#f9cc8a' }}>
                                            <img src="images/school-cap-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Reflective Practice </h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>In our fast-paced world, dedicating time to slow down and reflect can be a challenge. Reflective practice is the process of thinking about our actions and can enable us to enhance our work in meaningful ways. We are offering a 6-month process with a facilitator trained in the Neurosequential Model in Reflection and Supervision. These monthly one-hour sessions will provide an opportunity for dedicated reflection.</p>
                                        <p>The group meets once per month for 6 months for one hour. Groups are closed and for the benefit of group cohesion and consistency group members are strongly encouraged to attend each session. This is <b>not therapy;</b> it is a psychoeducational and reflective group to support wellness. </p>
                                        <p>The reflective practice group process will include a confidential pre and post measure of Resilience and Stress to address reflective group practice as a method of supporting professionals.</p>
                                        <p>Please note that as with most reflective processes some discomfort may occur. If individuals become increasingly distressed during the group sessions, our therapists can support individuals to access community support such as an EAP, community resources, or the Distress Centre. A recommendation or discussion of additional support will not be disclosed to their supervisor and will be kept confidential. </p>
                                        <p>To register for group Reflective Practice please fill out our “Organizational Request” form at the bottom of the page and one of the team will contact you. </p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">Cost: $200</li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 6 sessions, one per month, for one hour</span></li>                                            
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Online or in person</span></li>
                                        </ul>
                                        {/* <a href="#" className="btn btn-default">Register</a> */}
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
                                    <a href="javascript:;" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#69c7b8' }}>
                                            <img src="images/reflective-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Frontline Implementation Workshop</h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>This full day workshop is geared specifically for front line workers who do not meet the current criteria to register for Neurosequential Model of Therapeutics, or the Neurosequential Model in Education.  This workshop will assist in a deeper understanding about what implementation can look like in their work with children and youth. The learner will leave this training with more practical skills about how the NM can be translated into their daily work with children and youth.  </p>
                                        <p>All training is provided by NMT Phase II certified clinicians with years of experience working with children, youth, and families both in congregate care settings (therapeutic campus-based care) and in the community. The training includes direct teaching, reflective practice elements, along with individual and group-based work and participation.    </p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">Cost: $120</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : October 21, 2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Time : 9:00AM – 4:00PM MST</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 6 hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Online</span></li>
                                        </ul>
                                        {/* <a href="#" className="btn btn-default">Register</a> */}
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
                                    <a href="javascript:;" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#f15d4f' }}>
                                            <img src="images/trauma-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Compassion Fatigue Workshop </h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>At a time when those in the helping profession are working harder than ever with more demands resulting from the covid pandemic, it is easy to forget to care for oneself. Join our clinicians in reflecting on the cost of a lack of balance and consider strategies to promote wellness. We will consider concepts such as compassion fatigue, individual and organizational wellness, and reflective practice.  </p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$120</li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : October 17, 2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Time : 11:00AM – 1:00PM MST</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 2 hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Online</span></li>
                                        </ul>
                                        {/* <a href="#" className="btn btn-default">Register</a> */}
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
                                    <a href="javascript:;" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#339f94' }}>
                                            <img src="images/focused-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Board Brains </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p><strong>Board Brains for Caregiver and Child/Youth</strong></p><br/>
                                        <p>Skateboarding has the potential to reduce psychological distress and improve mental health by engaging people in physical activity and healthy risk-taking, building confidence, regulating emotions, and healthy interpersonal connections.   </p>
                                        <p>Board Brains is a 6-session group which combines learning to skateboard with an understanding of how your brain works. Participants’ exposure to understanding how the brain works is centred on the Neurosequential Model (NM), an evidence-based practice developed by Bruce D. Perry, M.D., Ph.D. This model helps caregivers, educators, and professionals better understand children in general, especially children who have suffered from developmental trauma and children who are struggling with behavioural, emotional, developmental, and identified mental health challenges.</p>
                                        <p>This group provides the youth and parent/caregiver an opportunity to engage in recreational activities together to build their relationship and better understand how the brain works. Youth aged 7-12 can attend with their parents/caregivers. Each parent/caregiver can register a maximum of 3 youth. All parents/caregivers are expected to participate in all components of Board Brains (unless physically unable to do so). Both to learn alongside the children and support them under the guidance of the facilitators. </p>
                                        <p><b>*All introductory NM content about the brain will be delivered by an NMT Phase II Certified Trainer.</b></p>
                                        <p>Space is limited </p>
                                    </div>

                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$120, plus addition rates if equipment rentals are required.</li>
                                        </ul>
                                        <ul>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date :  July 18, 19, 29, 25, 26, 27, 2022</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Start time : 1:30PM – 3:30PM MST</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 2 hours</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>In person </span></li>
                                        </ul>
                                        {/* <a href="#" className="btn btn-default">Register</a> */}
                                    </div>
                                    <div className="cardBody">
                                        <p>Missed sessions due to illness cannot be made up, but we will review the course content at the beginning of each session as a reminder and to catch up anyone who has missed a session. </p>
                                        <p>Participants will be given one optional time/date for missed sessions due to weather, and if unable to attend, we will review the course content at the beginning of each session as a reminder to catch up anyone who has missed a session. </p>
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
                                    <a href="javascript:;" data-bs-dismiss="modal" className="close-icon"><img src="images/crose-icon.svg" alt="" /></a>
                                    <div className="title-course">
                                        <div className="card-title card-title-courses" style={{ background: '#f89b5e' }}>
                                            <img src="images/trauma-icon.svg" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <div className="researcher-heading">
                                                <h3 >Lunch n’ Learn Series </h3></div>
                                        </div>
                                    </div>
                                    <div className="cardBody">
                                        <p>The Importance of Early Relationships</p>
                                        <p>This workshop will provide attendees with the opportunity to learn about the value of early relationships.   </p>
                                        <p>Human beings are social creatures who thrive on positive social interaction.   These interactions provide a lens through which the child sees all other relationships and impacts the way that the child develops.  This lunch and learn provides opportunities for the participants to understand their role as caregiver, by better understanding positive ways to engage in relationships with children from 0-5, when the brain is developing the most rapidly.    </p>
                                        <p>This workshop is intended for caregivers with young children between the ages of 0-5, individuals who are expecting, or anyone who is interested in learning more about this topic.   </p>
                                    </div>
                                    <div className="popupFooter">
                                        <ul>
                                            <li className="price">$10 </li>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i> <span>Upcoming Date : September 12, 2022 </span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Time : 12:00PM – 1:00PM MST</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i> <span>Duration : 1 hour </span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i> <span>Online</span></li>
                                        </ul>
                                        {/* <a href="#" className="btn btn-default">Register</a> */}
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