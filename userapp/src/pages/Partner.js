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

            <section class="second-banner-sec" style={{ background: `url('./images/second-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="text-box">
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Our Partners</h2>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="image-holder">
                                    <img src="images/second-banner-img.png" alt="" class="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                        <div class="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="1000ms">
                            <img src="images/second-banner-shape.png" alt="" class="img-fluid" />
                        </div>
                    </div>
                </div >
            </section >
            <section class="our-team-sec">
                <div class="our-team-box">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="heading-second">
                                    <h3 class="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Research Partners</h3>
                                </div>
                                <div class="image-holder">
                                    <img src="images/partner-img.png" alt="" class="img-fluid wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="our-team-box educational-box">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="heading-second">
                                    <h3 class="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Educational Partners</h3>
                                </div>
                                <div class="image-holder">
                                    <img src="images/partner-img.png" alt="" class="img-fluid wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div class="our-team-box">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="heading-second">
                                    <h3 class="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Community Partners
                                    </h3>
                                </div>
                                <div class="image-holder">
                                    <img src="images/partner-img.png" alt="" class="img-fluid" />
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