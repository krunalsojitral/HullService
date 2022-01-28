import React, { useState } from 'react';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import Sidebar from './user/Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from './../components/Apiurl';
import { useHistory } from "react-router-dom";

export default function Preview() {
    let history = useHistory();
    
    const [detail, setDetail] = React.useState({})    

    React.useEffect(() => {                

        axios.get(api_url + '/common/getPreview').then((result) => {
            if (result.data.status) {
                var previewdata = result.data.response.data;
                setDetail(previewdata)


                
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    

    return (
        <div>
            <Header />

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Preview</h2>
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


                        {(detail.module_type == 'article' || detail.module_type == 'blog' || detail.module_type == 'video') && <div className="col-md-7 bg-white">
                            <div className="research-main">
                                <div className="research-title">
                                    <h2>{detail.title}</h2>
                                </div>
                                <div className="research-box">
                                    <div className="research-profile">
                                        <img src="images/hull-icon.png" alt="author" />
                                        <p>Hull Service</p>
                                    </div>
                                    <div className="research-date">
                                        <label>{detail.created_at}</label>
                                    </div>
                                </div>
                                {(detail.image && (detail.module_type == 'article' || detail.module_type == 'blog')) && <div className="video-image"><img src={detail.image} alt="author" /></div>}
                                {(detail.videoid && detail.module_type == 'video') && <iframe width="100%" height="555px" src={`https://www.youtube.com/embed/${detail.videoid}?rel=0&modestbranding=1&showinfo=0`} title="YouTube video player" allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>}

                                <div className="video-text" dangerouslySetInnerHTML={{ __html: detail.description }}></div>
                            </div>
                        </div>}



                        {(detail.module_type == 'course') && <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="personal-courses">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="breadcrumbs-items">
                                                    <ul>
                                                        <li><img src="images/notification-bell.png" alt="" /><span>Personal Development Courses</span></li>
                                                        {detail.purchase_type == 'paid' && <li><img src="images/notification-bell.png" alt="" /><span>Paid Course</span></li>}
                                                    </ul>
                                                </div>
                                                <div className="course-cover">

                                                    {detail.image && <img src={detail.image} alt="author" />}

                                                    <div className="course-inner">
                                                        <div className="course-title">
                                                            <h2>{detail.title}</h2>
                                                            <ul>
                                                                <li>
                                                                    <p>1250 students</p>
                                                                </li>
                                                                {detail.trainer && <li>
                                                                    <p>Created by </p><span>{detail.trainer}</span>
                                                                </li>}
                                                                {detail.update_at && <li>
                                                                    <img src="images/update.png" alt="update" />
                                                                    <p>Last update {detail.update_at}</p>
                                                                </li>}
                                                            </ul>
                                                        </div>
                                                        {/* <div className="course-share">
                                                            <a href="javascript:;"><img src="images/share.png" alt="share" /></a>
                                                        </div> */}
                                                    </div>
                                                </div>

                                                <div className="what-learn">
                                                    {detail.learn_description &&
                                                        <div>
                                                            <h3>What you’ll learn</h3>
                                                            <div dangerouslySetInnerHTML={{ __html: detail.learn_description }} ></div>
                                                        </div>
                                                    }

                                                    {detail.prerequisites_description &&
                                                        <div>
                                                            <h3>Requirement</h3>
                                                            <div dangerouslySetInnerHTML={{ __html: detail.prerequisites_description }} ></div>
                                                        </div>
                                                    }

                                                    {detail.description &&
                                                        <div>
                                                            <h3>Description</h3>
                                                            <div dangerouslySetInnerHTML={{ __html: detail.description }} ></div>
                                                        </div>
                                                    }

                                                    {/* <a href="javascript:;">See more</a> */}
                                                </div>

                                                <div className="course-content">
                                                    <h3>Content Course</h3>
                                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingOne">
                                                                <h4 className="panel-title">
                                                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        {detail.video_content_title}
                                                                    </a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                                <div className="panel-body">

                                                                    {detail.video_title_first && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_first, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_first}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_first}</span></span>}                                                                            
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_first}</span>
                                                                    </div>}

                                                                    {detail.video_title_second && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_second, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_second}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_second}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_second}</span>
                                                                    </div>}

                                                                    {detail.video_title_third && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_third, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_third}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_third}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_third}</span>
                                                                    </div>}

                                                                    {detail.video_title_fourth && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_fourth, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_fourth}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_fourth}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_fourth}</span>
                                                                    </div>}

                                                                    {detail.video_title_five && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_five, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_five}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_five}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_five}</span>
                                                                    </div>}

                                                                    {detail.video_title_six && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_six, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_six}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_six}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_six}</span>
                                                                    </div>}

                                                                    {detail.video_title_seven && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_seven, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_seven}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_seven}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_seven}</span>
                                                                    </div>}

                                                                    {detail.video_title_eight && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_eight, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_eight}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_eight}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_eight}</span>
                                                                    </div>}

                                                                    {detail.video_title_nine && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_nine, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_nine}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_nine}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_nine}</span>
                                                                    </div>}

                                                                    {detail.video_title_ten && <div className="content-grid">
                                                                        <div className="course-play">
                                                                            {(detail.purchase_type == 'unpaid') && <span className="course-title" onClick={() => window.open(detail.video_url_ten, "_blank")}><img src="images/play.png" alt="play" /><span>{detail.video_title_ten}</span></span>}
                                                                            {(detail.purchase_type == 'paid') && <span className="course-title"><img src="images/play.png" alt="play" /><span>{detail.video_title_ten}</span></span>}
                                                                        </div>
                                                                        <span className="course-title">Preview</span>
                                                                        <span className="course-title">{detail.video_time_ten}</span>
                                                                    </div>}

                                                                </div>
                                                            </div>
                                                        </div>


                                                        {detail.content_title_one && <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingTwo">
                                                                <h4 className="panel-title">
                                                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                        {detail.content_title_one}
                                                                    </a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                <div className="panel-body">
                                                                    <div dangerouslySetInnerHTML={{ __html: detail.content_description_one }}></div>
                                                                </div>
                                                            </div>
                                                        </div>}


                                                        {detail.content_title_two && <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingThree">
                                                                <h4 className="panel-title">
                                                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        {detail.content_title_two}</a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                <div className="panel-body">
                                                                    <div dangerouslySetInnerHTML={{ __html: detail.content_description_two }}></div>
                                                                </div>
                                                            </div>
                                                        </div>}

                                                        {detail.content_title_third && <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingFour">
                                                                <h4 className="panel-title">
                                                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                        {detail.content_title_third}</a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                                                                <div className="panel-body">
                                                                    <div dangerouslySetInnerHTML={{ __html: detail.content_description_third }}></div>
                                                                </div>
                                                            </div>
                                                        </div>}

                                                        {detail.content_title_four && <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingFive">
                                                                <h4 className="panel-title">
                                                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                        {detail.content_title_four}</a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseFive" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
                                                                <div className="panel-body">
                                                                    <div dangerouslySetInnerHTML={{ __html: detail.content_description_four }}></div>
                                                                </div>
                                                            </div>
                                                        </div>}

                                                        {detail.content_title_five && <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingsix">
                                                                <h4 className="panel-title">
                                                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                                        {detail.content_title_five}</a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseSix" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingsix">
                                                                <div className="panel-body">
                                                                    <div dangerouslySetInnerHTML={{ __html: detail.content_description_five }}></div>
                                                                </div>
                                                            </div>
                                                        </div>}


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}


                        {/* <div className="col-md-3 article-tags">
                            {detail.tag && detail.tag.length > 0 &&
                                <div className="video-tag">
                                    <h3>Tags</h3>
                                    <ul>
                                        {detail.tag.map(data => (<li><a href="javascript:;">{data.label}</a></li>))}
                                    </ul>
                                </div>}                           
                        </div> */}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}