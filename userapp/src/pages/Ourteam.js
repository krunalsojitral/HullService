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
                                    <img src="./images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="50ms" />
                                </div>
                            </div>
                        </div>
                        <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="50ms">
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
                                        <div className="clinical-team-box wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img1.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Bailey Lawson  </h4>
                                                    <p>PSYCHOLOGIST</p>
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
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img2.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Bailey Lawson  </h4>
                                                    <p>PSYCHOLOGIST</p>
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
                                            <div className="text-box">
                                                <h4>Bailey Lawson  </h4>
                                                <p>PSYCHOLOGIST</p>
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
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img3.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Bailey Lawson  </h4>
                                                    <p>PSYCHOLOGIST</p>
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
                            </div>
                        </div>
                    </div>
            </section>
            <section className="operations-team-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="heading-second">
                                <img src="./images/title-img.png" alt="" className="img-fluid wow animate__fadeIn" data-wow-duration="1500ms" data-wow-delay="50ms" />
                                <h3 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="50ms">Operations Team</h3>
                                <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="50ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur porttitor consequat, diam nunc <br></br> adipiscing urna semper. Malesuada eu fringilla faucibus scelerisque phasellus tortor. Bibendum.</p>
                            </div>
                            <div className="clinical-team-inner">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal" data-wow-duration="800ms" data-wow-delay="50ms" data-wow-offset="1">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img1.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Bailey Lawson  </h4>
                                                    <p>PSYCHOLOGIST</p>
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
                                    <div className="col-md-4"> <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal" data-wow-duration="800ms" data-wow-delay="50ms" data-wow-offset="1">
                                        <div className="clinical-team-list">
                                            <div className="image-holder">
                                                <img src="./images/clinical-team-img2.png" alt="" className="img-fluid" />
                                            </div>
                                            <div className="text-box">
                                                <h4>Bailey Lawson  </h4>
                                                <p>PSYCHOLOGIST</p>
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
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal" data-wow-duration="800ms" data-wow-delay="50ms" data-wow-offset="1">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/clinical-team-img3.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Bailey Lawson  </h4>
                                                    <p>PSYCHOLOGIST</p>
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
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal" data-wow-duration="800ms" data-wow-delay="50ms" data-wow-offset="1">
                                            <div className="clinical-team-list">
                                                <div className="image-holder wow animate__fadeIn" data-wow-duration="1500ms" data-wow-delay="50ms">
                                                    <img src="./images/operation-team-img1.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4 className="wow animate__fadeIn" data-wow-duration="500ms" data-wow-delay="50ms">Bailey Lawson  </h4>
                                                    <p className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="50ms">PSYCHOLOGIST</p>
                                                    <ul>
                                                        <li className="wow animate__fadeIn" data-wow-duration="1100ms" data-wow-delay="50ms">
                                                            <a href="#">
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
                                        <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal" data-wow-duration="800ms" data-wow-delay="50ms" data-wow-offset="1">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/operation-team-img2.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Bailey Lawson  </h4>
                                                    <p>PSYCHOLOGIST</p>
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
                                    <div className="col-md-4">
                                        <div className="clinical-team-box wow animate__fadeInUp" data-bs-toggle="modal" data-bs-target="#exampleModal" data-wow-duration="800ms" data-wow-delay="50ms" data-wow-offset="1">
                                            <div className="clinical-team-list">
                                                <div className="image-holder">
                                                    <img src="./images/operation-team-img2.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>Bailey Lawson  </h4>
                                                    <p>PSYCHOLOGIST</p>
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
                                <div className="image-holder  wow animate__fadeInLeft" data-wow-duration="800ms" data-wow-delay="50ms">
                                    <svg width="157" height="158" viewBox="0 0 157 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M130.833 13.3262H26.1666C18.9053 13.3262 13.0833 19.1483 13.0833 26.4095V98.3678C13.0833 105.629 18.9053 111.451 26.1666 111.451H52.3333V144.16L78.4999 131.076L104.667 144.16V111.451H130.833C138.095 111.451 143.917 105.629 143.917 98.3678V26.4095C143.917 19.1483 138.095 13.3262 130.833 13.3262ZM130.833 98.3678H26.1666V85.2845H130.833V98.3678ZM130.833 65.6595H26.1666V26.4095H130.833V65.6595Z" fill="white" />
                                    </svg></div>
                                <div className="text-box">
                                    <h4 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="50ms">Board of Governors</h4>
                                    <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="50ms"> Pathways to Prevention: Centre for Childhood Trauma operates in adherence to Hull’s core values and leadership philosophy and reports through to <a href="#">Hull Services’ Executive Director and Board of Governors</a>.</p>
                                    <span className="wow animate__fadeInUp" data-wow-duration="1100ms" data-wow-delay="50ms">LEARN MORE ABOUT HULL’S BOARD OF GOVERNORS</span>
                                    <strong className="wow animate__fadeInUp" data-wow-duration="1400ms" data-wow-delay="50ms">The Board’s focus for the Pathways to Prevention is advocacy, community relations and fundraising. </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
            <div className="team-modal">
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content"> 
                            <div className="modal-body" style={{background: '#daf6f9'}}>
                                <a data-bs-dismiss="modal"  className="close-icon" href="#!"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder" style={{width: '200px'}}>
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Bailey Lawson  </h4>
                                        <span>PSYCHOLOGIST</span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus velit cursus odio ultricies. Consectetur in vitae a viverra vestibulum. Felis dictumst pulvinar aliquet scelerisque viverra justo, sed vel. Eget eu, non neque, lorem sed. A ut ut tristique venenatis. Habitant enim quam facilisi et quis lorem et duis. Volutpat et mauris vitae sit. Turpis vel bibendum nunc aliquam pellentesque amet, fusce purus. Faucibus in ullamcorper ultrices tristique bibendum vitae posuere fringilla feugiat. Pulvinar ut euismod nunc ut pellentesque. Mi id quisque aliquam libero aliquet at natoque nisl.</p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                                            <li><a href="https://www.linkedin.com/in/williamhgates/">
                                                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.429 7.05298H11.143V8.90298C11.678 7.83898 13.05 6.88298 15.111 6.88298C19.062 6.88298 20 9.00099 20 12.887V20.084H16V13.772C16 11.559 15.465 10.311 14.103 10.311C12.214 10.311 11.429 11.656 11.429 13.771V20.084H7.429V7.05298ZM0.57 19.914H4.57V6.88298H0.57V19.914ZM5.143 2.63398C5.14315 2.96926 5.07666 3.30122 4.94739 3.61057C4.81812 3.91992 4.62865 4.2005 4.39 4.43599C3.9064 4.91661 3.25181 5.18564 2.57 5.18398C1.88939 5.18353 1.23631 4.91518 0.752 4.43699C0.514211 4.2007 0.325386 3.91981 0.196344 3.61042C0.0673015 3.30102 0.000579132 2.96921 0 2.63398C0 1.95698 0.27 1.30898 0.753 0.830985C1.23689 0.352143 1.89024 0.0836852 2.571 0.0839846C3.253 0.0839846 3.907 0.352985 4.39 0.830985C4.872 1.30898 5.143 1.95698 5.143 2.63398Z" fill="#9B9A9A"/>
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