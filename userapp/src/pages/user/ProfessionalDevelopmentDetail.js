import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import { useModal } from 'react-hooks-use-modal';
import DirectionModel from "./../DirectionModel";
import { useHistory } from "react-router-dom";

export default function ProfessionalDevelopmentDetail() {


    let history = useHistory();

    const [courseDetail, setcourseDetail] = React.useState({})
    const [relatedcourseDetail, setRelatedcourseDetail] = React.useState([])

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search) // id=123
        let course_id = params.get('id')

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        axios.post(api_url + '/course/getcourseDataById', { course_id }).then((result) => {
            if (result.data.status) {
                var coursedata = result.data.response.data;
                if (coursedata.purchase_type == "unpaid") {
                    setcourseDetail(coursedata);
                } else {
                    if (!token) {
                        open()
                    } else {
                        setcourseDetail(coursedata);
                    }
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })

        // if (token) {
        //     axios.post(api_url + '/course/getRelatedPaidcourseList', { "course_id": course_id }, config).then((result) => {
        //         if (result.data.status) {
        //             var coursedata = result.data.response.data;
        //             setRelatedcourseDetail(coursedata);
        //         }
        //     }).catch((err) => { console.log(err); })
        // } else {
        //     axios.post(api_url + '/course/getRelatedUnpaidcourseList', { "course_id": course_id }).then((result) => {
        //         if (result.data.status) {
        //             var coursedata = result.data.response.data;
        //             setRelatedcourseDetail(coursedata);
        //         }
        //     }).catch((err) => { console.log(err); })
        // }


    }, [])

    const [Modal, open, close] = useModal('root', {});

    const linkTarget = (id) => {
        history.replace("/course-detail?id=" + id);
        window.location.reload();
    };

    return (
        <div>
            <Header />
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Professional Development</h2>
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
                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="personal-courses">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="breadcrumbs-items">
                                                    <ul>
                                                        <li><a href="javascript:;"><img src="images/notification-bell.png" alt="" /><span>Personal Development Courses</span></a></li>
                                                        <li><a href="javascript:;"><img src="images/notification-bell.png" alt="" /><span>Paid Course</span></a></li>
                                                    </ul>
                                                </div>
                                                <div class="course-cover">
                                                    <img src="images/course-placeholder.png" alt="course-placeholder" />
                                                    <div class="course-inner">
                                                        <div class="course-title">
                                                            <h2>{courseDetail.title}</h2>
                                                            <ul>
                                                                <li>
                                                                    <p>1250 students</p>
                                                                </li>
                                                                <li>
                                                                    <p>Created by </p><a href="javascript:;">>{courseDetail.trainer}</a>
                                                                </li>
                                                                <li><img src="images/update.png" alt="update"/>
                                                                    <p>Last update 11/2021</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                            <div class="course-share">
                                                                <a href="javascript:;"><img src="images/share.png" alt="share" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="what-learn">
                                                        <h3>What you’ll learn</h3>
                                                        <ul>
                                                            <li><img src="images/check.png" alt="check" /><span>First thing that you’ll learn</span></li>
                                                            <li><img src="images/check.png" alt="check" /><span>Second thing</span></li>
                                                            <li><img src="images/check.png" alt="check" /><span>Strategies for managing the third thing in this paid program </span></li>
                                                            <li><img src="images/check.png" alt="check" /><span>Fourth thing you’ll learn</span></li>
                                                            <li><img src="images/check.png" alt="check" /><span>Fifth thing that you can learn</span></li>
                                                        </ul>
                                                        <h3>Requirement</h3>
                                                        <ul class="full-grid" >
                                                            <li><label></label> <span>No pre-knowledge required - we'll teach you everything you need to know</span></li>
                                                            <li><label></label><span>A PC or Mac is required</span></li>
                                                            <li><label></label><span>No software is required in advance of the course (all software used in the course is free or has a demo version)</span></li>
                                                        </ul>
                                                        <h3>Description</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis elit malesuada pretium quisque. Nunc malesuada molestie nascetur ac amet scelerisque ac, at. Aliquam dictumst sed egestas scelerisque volutpat mauris leo diam. Id in curabitur odio id felis, tincidunt commodo eu. Euismod a feugiat arcu mauris egestas. At viverra euismod etiam diam imperdiet at vel. Enim orci diam amet, consectetur ipsum lectus sollicitudin ut et. Feugiat sed nibh arcu ultricies. Diam, cras blandit dignissim risus pellentesque vivamus. Ac sodales vitae porta neque commodo nibh tellus nam. Eget ac fringilla ut sed molestie nulla purus sagittis nim. Diam congue sit metus sed. Egestas adipiscing erat id nisi.</p>
                                                        <p>Elementum, id proin faucibus amet tortor turpis. Tortor, elementum proin in morbi nunc orci amet, elit. Ultricies nec aliquam imperdiet amet. Pretium elementum maecenas non urna quis erat lacinia suspendisse. Commodo vulputate hac bibendum odio mauris orci. Purus sapien sit urna, amet nunc a ac eget. </p>
                                                        <p>Commodo ultricies cursus laoreet vulputate quam et, non. Ac urna mattis euismod ornare.</p>
                                                        <a href="javascript:;">See more</a>
                                                    </div>
                                                    <div class="course-content">
                                                        <h3>Content Course</h3>
                                                        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                            <div class="panel panel-default">
                                                                <div class="panel-heading" role="tab" id="headingOne">
                                                                    <h4 class="panel-title">
                                                                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                            Introduction
                                                            </a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div class="panel-body">
                                                                        <div class="content-grid">
                                                                            <div class="course-play">
                                                                                <a href="javascript:;"><img src="images/play.png" alt="play"/><span>Understanding the Mood of your Colour Palette</span></a>
                                                                </div>
                                                                                <a href="javascript:;">Preview</a>
                                                                                <a href="javascript:;">06:02</a>
                                                                            </div>
                                                                            <div class="content-grid">
                                                                                <div class="course-play">
                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play"/><span>How to Combine Colours to Create Colour Palettes</span></a>
                                                                </div>
                                                                                    <a href="javascript:;"></a>
                                                                                    <a href="javascript:;">06:02</a>
                                                                                </div>
                                                                                <div class="content-grid">
                                                                                    <div class="course-play">
                                                                                        <a href="javascript:;"><img src="images/play.png" alt="play"/><span>Tools for Designing with Colour</span></a>
                                                                </div>
                                                                                        <a href="javascript:;">Preview</a>
                                                                                        <a href="javascript:;">06:02</a>
                                                                                    </div>
                                                                                    <div class="content-grid">
                                                                                        <div class="course-play">
                                                                                            <a href="javascript:;"><img src="images/play.png" alt="play"/><span>Tools for Designing with Colour Resources</span></a>
                                                                </div>
                                                                                            <a href="javascript:;">Preview</a>
                                                                                            <a href="javascript:;">06:02</a>
                                                                                        </div>
                                                                                        <div class="content-grid">
                                                                                            <div class="course-play">
                                                                                                <a href="javascript:;"><img src="images/play.png" alt="play"/><span>Further Reading on Designing with Colout</span></a>
                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="panel panel-default">
                                                                                    <div class="panel-heading" role="tab" id="headingTwo">
                                                                                        <h4 class="panel-title">
                                                                                            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                                                Color Theory
                                                            </a>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                                        <div class="panel-body">
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Understanding the Mood of your Colour Palette</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>How to Combine Colours to Create Colour Palettes</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;"></a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Tools for Designing with Colour</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Tools for Designing with Colour Resources</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Further Reading on Designing with Colout</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="panel panel-default">
                                                                                    <div class="panel-heading" role="tab" id="headingThree">
                                                                                        <h4 class="panel-title">
                                                                                            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                                                Typography
                                                            </a>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                                        <div class="panel-body">
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Understanding the Mood of your Colour Palette</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>How to Combine Colours to Create Colour Palettes</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;"></a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Tools for Designing with Colour</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Tools for Designing with Colour Resources</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
                                                                                            </div>
                                                                                            <div class="content-grid">
                                                                                                <div class="course-play">
                                                                                                    <a href="javascript:;"><img src="images/play.png" alt="play" /><span>Further Reading on Designing with Colout</span></a>
                                                                                                </div>
                                                                                                <a href="javascript:;">Preview</a>
                                                                                                <a href="javascript:;">06:02</a>
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
                                                <div class="col-md-3">
                                                    <div class="course-prices">
                                                        <div class="price-detail">
                                                            <p>$20 <label>$30</label></p>
                                                        </div>
                                                        <div class="course-text">
                                                            {/* <p>This course includes:</p>
                                                            <ul>
                                                                <li><img src="images/check.png" alt="check" /> 5 hours on demand video</li>
                                                                <li><img src="images/check.png" alt="check" /> 15 articles</li>
                                                                <li><img src="images/check.png" alt="check" /> 4 downloadalbe resources</li>
                                                                <li><img src="images/check.png" alt="check" /> Full lifetime access</li>
                                                                <li><img src="images/check.png" alt="check" /> Access on mobile and tv</li>
                                                            </ul>
                                                            <label>30 days money back guarantee</label> */}
                                                            <a href="javascript:;">Purchase Course</a>
                                                            {/* <a href="javascript:;" class="outline-btn">Buy Now</a> */}
                                                        </div>
                                                    </div>
                                                </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}