import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
//import { useForm } from "react-hook-form";

export default function Ourteam() {


    return (
        <div className="wrapper">
            <Header />


            <section className="second-banner-sec" style={{ background: `url('./images/second-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="container">
                    <div className="second-banner-inner">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="text-box">
                                    <h2 className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="50ms">Our Team</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="image-holder">
                                    <img src="./images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="800ms" data-wow-delay="50ms" />
                                </div>
                            </div>
                        </div>
                        <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="800ms" data-wow-delay="50ms">
                            <img src="./images/second-banner-shape.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="clinical-team-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="heading-second">
                                <h3 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="50ms">Clinical Team</h3>
                                <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="50ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur porttitor consequat, diam nunc <br></br> adipiscing urna semper. Malesuada eu fringilla faucibus scelerisque phasellus tortor. Bibendum.</p>
                            </div>
                            <div className="clinical-team-inner">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-wow-duration="800ms" data-wow-delay="0ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img1.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Emily Wang, Ph.D., R.Psych</h4>
                                                    <p>Senior Director</p>
                                                    <ul>
                                                        <li><a target="_blank" href="https://www.linkedin.com/in/emily-wang-ph-d-2a453b14/">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-wow-duration="800ms" data-wow-delay="0ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img2.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Nicole Berggren, M.C., R.Psych</h4>
                                                    <p>Assistant Director</p>
                                                    <ul>
                                                        <li><a href="javascript:;">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-wow-duration="800ms" data-wow-delay="0ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img3.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Jamie Pope, M.Sc., R.Psych</h4>
                                                    <p>Clinical Supervisor</p>
                                                    <ul>
                                                        <li><a href="#">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-bs-toggle="modal" data-bs-target="#exampleModal3" data-wow-duration="800ms" data-wow-delay="0ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img1.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Maria Malouf, M.C., Registered Provisional Psychologist</h4>
                                                    <p>Clinician</p>
                                                    <ul>
                                                        <li><a target="_blank" href="https://www.linkedin.com/in/maria-malouf-4585664b/">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-bs-toggle="modal" data-bs-target="#exampleModal4" data-wow-duration="800ms" data-wow-delay="0ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img2.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Phil Herman MSW, RSW  </h4>
                                                    <p>Clinician </p>
                                                    <ul>
                                                        <li><a href="javascript:;">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-bs-toggle="modal" data-bs-target="#exampleModal5" data-wow-duration="800ms" data-wow-delay="0ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img3.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Tiffany Beks, M.Sc., PhD Candidate, R. Psych </h4>
                                                    <p>Research Intern </p>
                                                    <ul>
                                                        <li><a target="_blank" href="http://www.linkedin.com/in/tiffany-beks-52093087">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
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
            <section className="operations-team-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="heading-second">
                                <img src="./images/title-img.png" alt="" className="img-fluid wow animate__fadeIn" data-wow-duration="1500ms" data-wow-delay="0ms" data-wow-offset="1"/>
                                <h3 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="0ms">Operations Team</h3>
                                {/* <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="0ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur porttitor consequat, diam nunc <br></br> adipiscing urna semper. Malesuada eu fringilla faucibus scelerisque phasellus tortor. Bibendum.</p> */}
                            </div>
                            <div className="clinical-team-inner">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal6" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="1">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img1.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Marilyn Boston, RSW</h4>
                                                    <p>Director of Operations</p>
                                                    <ul>
                                                        <li><a target="_blank" href="http://www.linkedin.com/in/marilyn-boston">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4"> <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal7" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="1">
                                        <div className="clinical-team-list">
                                            <div className="image-holder">
                                                <img src="./images/clinical-team-img2.png" alt="" className="img-fluid" />
                                            </div>
                                            <div className="text-box">
                                                <h4>Katie Davies  </h4>
                                                <p>Communications Specialist </p>
                                                <ul>
                                                    <li><a target="_blank" href="https://www.linkedin.com/in/katiedavies-/">
                                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                        </svg>
                                                    </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal8" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="1">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img3.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Natalia Zaharia  </h4>
                                                    <p>Data Analyst</p>
                                                    <ul>
                                                        <li><a href="javascript:;">
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                                            </svg>
                                                        </a>
                                                        </li>
                                                    </ul>
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
            <div className="governors-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="governors-inner">
                                <div className="image-holder  wow animate__fadeInLeft" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1">
                                    <svg width="157" height="158" viewBox="0 0 157 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M130.833 13.3262H26.1666C18.9053 13.3262 13.0833 19.1483 13.0833 26.4095V98.3678C13.0833 105.629 18.9053 111.451 26.1666 111.451H52.3333V144.16L78.4999 131.076L104.667 144.16V111.451H130.833C138.095 111.451 143.917 105.629 143.917 98.3678V26.4095C143.917 19.1483 138.095 13.3262 130.833 13.3262ZM130.833 98.3678H26.1666V85.2845H130.833V98.3678ZM130.833 65.6595H26.1666V26.4095H130.833V65.6595Z" fill="white" />
                                    </svg></div>
                                <div className="text-box">
                                    <h4 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="10ms">Board of Governors</h4>
                                    <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms"> Pathways to Prevention: Centre for Childhood Trauma operates in adherence to Hull’s core values and leadership philosophy and reports through to <a href="#">Hull Services’ Executive Director and Board of Governors</a>. The Board’s focus for the Pathways to Prevention is advocacy, community relations and fundraising.</p>
                                    <span className="wow animate__fadeInUp" data-wow-duration="1100ms" data-wow-delay="10ms">LEARN MORE ABOUT HULL’S BOARD OF GOVERNORS </span>
                                    {/* <strong className="wow animate__fadeInUp" data-wow-duration="1400ms" data-wow-delay="10ms">The Board’s focus for the Pathways to Prevention is advocacy, community relations and fundraising. </strong> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            {/* Emily Wang, Ph.D., R. Psych  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Emily Wang, Ph.D., R.Psych</h4>
                                        <span>Senior Director</span>
                                        <p>Dr. Wang has worked in mental health for over 30 years, starting as a front-line worker at the Sonia Shankman Orthogenic School in Chicago, Illinois. Dr. Wang holds a Master’s of Science in Educational Psychology, a Master’s of Art, and a Doctorate of Philosophy in Clinical Psychology. She is trained in Reflective Practice and Supervision and has had a passion for leadership development for several years. Dr. Wang has been an invited speaker both internationally and nationally, speaking most frequently about the impact of trauma on development to professional groups like educators, clinicians, Indigenous populations, ministries in Alberta and British Columbia, and caregivers. She was responsible for the provincial training of the Neurosequential Model (NM)concepts and implementation in Alberta from April 2017-October 2018. She currently works as a Senior Director of Clinical Advancement and trauma-informed practice at Hull Services. Dr. Wang is an appointed Fellow of the Neurosequential Model Network and a specialist in Infant-Parent Mental Health. She is an Adjunct Lecturer at Cumming School of Medicine, Department of Psychiatry, and an Associate Member at Hotchkiss Brain Institute and the Mathison Centre for Mental Health Research and Education at the University of Calgary. As such am involved in several research projects related to child maltreatment and mental health. Dr. Wang is the 2020 recipient of the University of California, Davis Continuing and Professional Education- Parent-Infant and Child Institute “Bruce D. Perry, Spirit of the Child Award”. Her training in the Neurosequential Model of Therapeutics and the Infant-Parent Mental Health Fellowship has significantly impacted both her professional life and her personal life as a mother of two. </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="https://www.linkedin.com/in/emily-wang-ph-d-2a453b14/">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nicole Berggren, M.C., R. Psych  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Nicole Berggren, M.C., R. Psych</h4>
                                        <span>Assistant Director</span>
                                        <p>Nicole Berggren is the Assistant Director of the Trauma-Informed Services Department at Hull Services. She holds a Masters of Counselling and is a registered psychologist. Nicole is a Mentor (Phase III) in the Neurosequential Model of Therapeutics network and is trained in specialized clinical models, including Eye Movement Desensitization Reprocessing, Unified Protocol, and Collaborative Problem Solving. Nicole is currently in the Infant-Parent Mental Health Fellowship (University of California Davis, Continuing Professional Education). Nicole has been at Hull for 11 years. She has a variety of experiences in community-based programs, intensive intervention, and as a family therapist prior to her current role with Trauma-Informed Services. Nicole works with the 27 programs at Hull Services, supporting the implementation of the Neurosequential Model and providing clinical support. She is directly responsible for the Trauma-Informed Services team at Hull and supervises both the service delivery and administrative aspects of the Recreation Program and the Mentors Matter program. She has provided internal and external training and has been responsible for program development, clinical consultation, and reflective supervision. Nicole is privileged to learn from her two children on a daily basis. </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="javascript:;">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jamie Pope, M.Sc., R. Psych  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Jamie Pope, M.Sc., R. Psych</h4>
                                        <span>Clinical Supervisor</span>
                                        <p>Jamie Pope is the Clinical Supervisor of the Trauma-Informed Services Department at Hull Services. She holds a Master’s of Science degree in Applied Psychology and is a registered psychologist. Jamie is a trainer with the Neurosequential Model of Therapeutics and is trained in clinical models of therapeutic intervention, including Eye Movement Desensitization Reprocessing, Multidimensional Family Therapy, Trauma-Focused Cognitive Behavioural Therapy, and Unified Protocol. Jamie has been at Hull for 12 years working in intensive intervention and family therapy prior to her current role as a Clinician and Trainer in Trauma-Informed Services. Jamie works throughout the agency providing consultation, assessment, therapy, program development, and training. In addition, she offers clinical supervision to Trauma-Informed mental health clinicians and students and registers psychologists pursuing training at Hull Services. In 2019, Jamie was awarded the Excellence in Practicum Supervision Award from the University of Calgary’s Werklund School of Education. Jamie is responsible for supporting Hull’s research partners and contributing to the design and delivery of research projects. She serves in a leadership role in the Family Community of Support committee at Hull, supervising and supporting the growth of family work and community connection in Hull Services programs. Jamie is most engaged when seeking to find more compassionate, dignified, and effective ways of understanding and responding to the concerns of people who have experienced trauma. </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="https://www.linkedin.com/in/emily-wang-ph-d-2a453b14/">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           

            {/* Maria Malouf, M.C., Registered Provisional Psychologist  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Maria Malouf, M.C., Registered Provisional Psychologist</h4>
                                        <span>Clinician</span>
                                        <p>Maria Malouf is a Clinician with the Trauma-Informed Services Department at Hull Services. She holds a Masters of Counselling and is a registered provisional psychologist. Maria is trained as a phase II trainer in the Neurosequential Model of Therapeutics and SFBT, TCI, and ASIST. She has been at Hull for fourteen years and has worked in TCBC and special education settings and as an agency trainer prior to her clinical role. She has also been part of NMT implementation and certification at Hull Services since 2011. She has taken on several initiatives further to implement trauma-informed practices within Hull Services and external agencies. Maria co-presented at the 2016 and 2018 Neurosequential Model Symposium on engaging youth through arts-based learning. In addition, she has supported research initiatives that explore the therapeutic value of alternative interventions such as art, music, and skateboarding. </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="https://www.linkedin.com/in/maria-malouf-4585664b/">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Phil Herman MSW, RSW  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Phil Herman MSW, RSW</h4>
                                        <span>Clinician</span>
                                        <p>Phil has worked in the helping field for over 20 years. Phil currently works at Hull Services with Trauma-Informed Services using the Neurosequential Model of Therapeutics (NMT). Phil is a level II trainer in the NMT. Phil is responsible for assisting Hull’s various programs that serve traumatized youth and families, both community and therapeutic campus-based programs, in better understanding and integrating an understanding around a trauma-informed approach. Phil has also worked in Children’s Services as both a Caseworker and an Investigator. Phil holds his Masters in Social Work from Dalhousie University, where an anti-oppressive focus has had a significant impact on his work and life. Phil is also trained as a Family Therapist, where he gets the pleasure of hearing people’s stories and learns as equally from the people he works with as they hopefully do from him. Phil is a father of two young boys and a partner to his common-law partner for over 20 years. Phil enjoys teaching his kids how to be males with emotions and recognizing their privileges in this world. Phil derives his energy from being with people and being in nature. </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a href="javascript:;">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tiffany Beks, M.Sc., PhD Candidate, R. Psych  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Tiffany Beks, M.Sc., PhD Candidate, R. Psych</h4>
                                        <span>Research Intern</span>
                                        <p>Tiffany Beks is a doctoral psychology intern of the Trauma-Informed Services Department at Hull Services. She holds a Master of Science degree in Counselling Psychology and is a registered psychologist. Tiffany is trained in specialized clinical models of therapeutic intervention, including Eye Movement Desensitization Reprocessing, Accelerated Resolution Therapy, Trauma-Focused Cognitive Behavioural Therapy, Narrative Therapy, Solution-Focused Therapy, and Unified Protocol. Tiffany also has completed advanced training in perinatal mental health and reproductive loss. Previously, Tiffany was a practicum student of the Trauma-Informed Services Department and later provided individual therapy and consultation as a provisional psychologist at Bridging the Gap. Tiffany works throughout the agency in her current role, providing therapy, assessment, consultation, program development and evaluation, and research services. She is also an avid researcher and advocates for post-traumatic stress, betrayal trauma, and the prevention of institutional forms of abuse and violence. Tiffany’s research has been recognized with several awards and fellowships, including the Social Sciences and Humanities Research Council Doctoral Award and the Werklund Doctoral Fellowship. Most recently, she was named a Killam Scholar. Tiffany enjoys spending time outdoors with her partner and two young children in her life outside of work. </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="http://www.linkedin.com/in/tiffany-beks-52093087">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marilyn Boston, RSW  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Marilyn Boston, RSW</h4>
                                        <span>Director of Operations </span>
                                        <p>As the Director of Operations, Marilyn Boston manages all aspects of the development and operation of the Pathways to Prevention program. Marilyn has been with Hull Services for over 22 years, starting as a volunteer in 1998 and then with experience ranging from front-line work with children, youth and families to fundraising and program management. Marilyn is a Registered Social Worker with the Alberta College of Social Workers and is a fully certified member of the Alberta Child & Youth Care Association.   </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="http://www.linkedin.com/in/marilyn-boston">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Katie Davies  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal7" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Katie Davies </h4>
                                        <span>Communications Specialist  </span>
                                        <p>Dr. Wang has worked in mental health for over 30 years, starting as a front-line worker at the Sonia Shankman Orthogenic School in Chicago, Illinois. Dr. Wang holds a Master’s of Science in Educational Psychology, a Master’s of Art, and a Doctorate of Philosophy in Clinical Psychology. She is trained in Reflective Practice and Supervision and has had a passion for leadership development for several years. Dr. Wang has been an invited speaker both internationally and nationally, speaking most frequently about the impact of trauma on development to professional groups like educators, clinicians, Indigenous populations, ministries in Alberta and British Columbia, and caregivers. She was responsible for the provincial training of the Neurosequential Model (NM)concepts and implementation in Alberta from April 2017-October 2018. She currently works as a Senior Director of Clinical Advancement and trauma-informed practice at Hull Services. Dr. Wang is an appointed Fellow of the Neurosequential Model Network and a specialist in Infant-Parent Mental Health. She is an Adjunct Lecturer at Cumming School of Medicine, Department of Psychiatry, and an Associate Member at Hotchkiss Brain Institute and the Mathison Centre for Mental Health Research and Education at the University of Calgary. As such am involved in several research projects related to child maltreatment and mental health. Dr. Wang is the 2020 recipient of the University of California, Davis Continuing and Professional Education- Parent-Infant and Child Institute “Bruce D. Perry, Spirit of the Child Award .” Her training in the Neurosequential Model of Therapeutics and the Infant-Parent Mental Health Fellowship has significantly impacted both her professional life and her personal life as a mother of two.</p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="https://www.linkedin.com/in/katiedavies-/">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Natalia Zaharia  */}
            <div className="team-modal">
                <div className="modal fade" id="exampleModal8" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" style={{ background: '#daf6f9' }}>
                                <a data-bs-dismiss="modal" className="close-icon" href="javascript:;"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{ width: '200px' }}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Natalia Zaharia</h4>
                                        <span>Data Analyst </span>
                                        <p>Natalia Zaharia is the Data Analyst of the Trauma-Informed Services Department at Hull Services. She holds a University Degree in Accounting and is trained in Microsoft Access. She has spent her eight years at Hull maintaining, developing, and expanding data systems and enjoys using her Microsoft Excel skills to develop new spreadsheets. Natalia has been providing her expertise across several Hull Programs. She has been contributing to efforts related to data gathering, assessment, analysis, form creation, and implementation, expanding her knowledge and experience and allowing her to build on her passion for processing data. Outside of work, she enjoys photography and capturing family memories.</p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a target="_blank" href="http://www.linkedin.com/in/marilyn-boston">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A" />
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )


}