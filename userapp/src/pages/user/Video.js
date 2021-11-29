import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
//import { useForm } from "react-hook-form";

export default function Video() {

    return(
        <div>
            <Header/>
            <section class="inner-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Video</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section class="dashboard-card">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2 side-col">
                            <Sidebar />
                        </div>

                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="dashboard-content">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group search-input video-flex">
                                                    <input type="text" class="form-control" name=""/>
                                                        <button class="btn-video" type="button">Videos Only &nbsp; ↓</button>
                                                </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="page-title search">
                                                        <div class="your-result">
                                                            <h3 class="page-name">Your results</h3>
                                                            <a href="#">
                                                                <img src="images/filter.png"/>
                                                            </a>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-lg-4">
                                                        <div class="video-card">
                                                            <div class="video-img">
                                                                <img src="images/image-placeholder.png"/>
                                                            </div>
                                                                <h3>Preventing PTSD and Trauma for children of alcoholics</h3>
                                                                <div class="video-bottom">
                                                                    <p><img src=""/>Jacob Sianturi</p>
                                                                        <a href="#"><img src="images/video.png" alt="video"/></a>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                <div class="col-md-6 col-lg-4">
                                                                    <div class="video-card">
                                                                        <div class="video-img">
                                                                            <img src="images/image-placeholder.png"/>
                                                                        </div>
                                                                        <h3>Preventing PTSD and Trauma for children of alcoholics</h3>
                                                                        <div class="video-bottom">
                                                                            <p><img src=""/>Jacob Sianturi</p>
                                                                                <a href="#"><img src="images/video.png" alt="video"/></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 col-lg-4">
                                                                    <div class="video-card">
                                                                        <div class="video-img">
                                                                            <img src="images/image-placeholder.png"/>
                                                                        </div>
                                                                        <h3>Preventing PTSD and Trauma for children of alcoholics</h3>
                                                                        <div class="video-bottom">
                                                                            <p><img src=""/>Jacob Sianturi</p>
                                                                            <a href="#"><img src="images/video.png" alt="video"/></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 col-lg-4">
                                                                    <div class="video-card">
                                                                        <div class="video-img">
                                                                            <img src="images/image-placeholder.png"/>
                                                                        </div>
                                                                        <h3>Preventing PTSD and Trauma for children of alcoholics</h3>
                                                                        <div class="video-bottom">
                                                                            <p><img src=""/>Jacob Sianturi</p>
                                                                                <a href="#"><img src="images/video.png" alt="video"/></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 col-lg-4">
                                                                    <div class="video-card">
                                                                        <div class="video-img">
                                                                            <img src="images/image-placeholder.png"/>
                                                                        </div>
                                                                        <h3>Preventing PTSD and Trauma for children of alcoholics</h3>
                                                                        <div class="video-bottom">
                                                                            <p>
                                                                                <img src=""/>Jacob Sianturi
                                                                            </p>
                                                                            <a href="#">
                                                                                <img src="images/video.png" alt="video"/>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 col-lg-4">
                                                                    <div class="video-card">
                                                                        <div class="video-img">
                                                                            <img src="images/image-placeholder.png"/>
                                                                        </div>
                                                                        <h3>Preventing PTSD and Trauma for children of alcoholics</h3>
                                                                        <div class="video-bottom">
                                                                            <p><img src=""/>Jacob Sianturi</p>
                                                                                <a href="#"><img src="images/video.png" alt="video"/></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="pagination">
                                                            <ul>
                                                                <li><a href=""></a></li> 
                                                                <li><a href=""></a></li> 
                                                                <li><a href="">1</a></li>
                                                                <li><a href="">2</a></li>
                                                                <li><a href="">3</a></li>
                                                                <li><a href="">4</a></li>
                                                                <li><a href="">5</a></li>
                                                                <li><a href=""></a></li>
                                                                <li><a href=""></a></li>
                                                                </ul>
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