import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
//import { useForm } from "react-hook-form";

export default function Partner() {
   



    return (
        <div className="wrapper">
            <Header />

            <section className="second-banner-sec" style={{ background: `url('./images/second-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="container">
                    <div className="second-banner-inner">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="text-box">
                                    <h2 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Our Partners</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
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
            </section >
            <section className="our-team-sec">
                <div className="our-team-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="heading-second">
                                    <h3 className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Research Partners</h3>
                                </div>
                                <div className="image-holder">
                                    <img src="images/partner-img.png" alt="" className="img-fluid wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="our-team-box educational-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="heading-second">
                                    <h3 className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Educational Partners</h3>
                                </div>
                                <div className="image-holder">
                                    <img src="images/partner-img.png" alt="" className="img-fluid wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="our-team-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="heading-second">
                                    <h3 className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Community Partners
                                    </h3>
                                </div>
                                <div className="image-holder">
                                    <img src="images/partner-img.png" alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >

            


            <Footer />
        </div>
    )
}