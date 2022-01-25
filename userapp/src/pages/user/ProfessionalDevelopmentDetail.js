import React from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import { useModal } from 'react-hooks-use-modal';
// import DirectionModel from "./../DirectionModel";
// import { useHistory } from "react-router-dom";



export default function ProfessionalDevelopmentDetail() {


    //let history = useHistory();

    const [courseDetail, setcourseDetail] = React.useState({})
    const [token, setToken] = React.useState('');
    //const [relatedcourseDetail, setRelatedcourseDetail] = React.useState([])

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search) // id=123
        let course_id = params.get('id')

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);
        // const config = {
        //     headers: { Authorization: `${token}` }
        // };

        axios.post(api_url + '/course/getcourseDataById', { course_id }).then((result) => {
            if (result.data.status) {
                var coursedata = result.data.response.data;
                if (coursedata.purchase_type == "unpaid") {
                    setcourseDetail(coursedata);
                } else {
                    setcourseDetail(coursedata);
                    // if (!token) {
                    //     open()
                    // } else {
                    //     setcourseDetail(coursedata);
                    // }
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
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="personal-courses">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="breadcrumbs-items">
                                                    <ul>
                                                        <li><img src="images/notification-bell.png" alt="" /><span>Personal Development Courses</span></li>
                                                        {courseDetail.purchase_type == 'paid' && <li><img src="images/notification-bell.png" alt="" /><span>Paid Course</span></li>}
                                                    </ul>
                                                </div>
                                                <div className="course-cover">                                                    

                                                    {courseDetail.image && <img src={courseDetail.image} alt="author" />}

                                                    <div className="course-inner">
                                                        <div className="course-title">
                                                            <h2>{courseDetail.title}</h2>
                                                            <ul>
                                                                <li>
                                                                    <p>1250 students</p>
                                                                </li>
                                                                {courseDetail.trainer && <li>
                                                                    <p>Created by </p><span>{courseDetail.trainer}</span>
                                                                </li>}
                                                                {courseDetail.update_at && <li>
                                                                    <img src="images/update.png" alt="update"/>
                                                                    <p>Last update {courseDetail.update_at}</p>
                                                                </li>}
                                                            </ul>
                                                        </div>
                                                        <div className="course-share">
                                                            <a href="javascript:;"><img src="images/share.png" alt="share" /></a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="what-learn">
                                                    {courseDetail.learn_description && 
                                                        <div>
                                                            <h3>What you’ll learn</h3>
                                                            <div dangerouslySetInnerHTML={{ __html: courseDetail.learn_description }} ></div>
                                                        </div>                                                   
                                                    }
                                                    
                                                    {courseDetail.prerequisites_description &&
                                                        <div>
                                                            <h3>Requirement</h3>
                                                            <div dangerouslySetInnerHTML={{ __html: courseDetail.prerequisites_description }} ></div>                                                   
                                                        </div>
                                                    }

                                                    {courseDetail.description &&
                                                        <div>
                                                            <h3>Description</h3>
                                                            <div dangerouslySetInnerHTML={{ __html: courseDetail.description }} ></div>
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
                                                                            {courseDetail.video_content_title}
                                                                        </a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="panel-body">                                                                        

                                                                        {courseDetail.video_title_first && <div className="content-grid">
                                                                            <div className="course-play">                                                                                
                                                                               <a target="_blank" href={(courseDetail.purchase_type == 'unpaid')?courseDetail.video_url_first:'javascript:;'}>
                                                                                   <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_first}</span>
                                                                                </a>
                                                                            </div>
                                                                                <a href="javascript:;">Preview</a>
                                                                                <a href="javascript:;">{courseDetail.video_time_first}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_second &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid')?courseDetail.video_url_second:'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_second}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                            <a href="javascript:;">{courseDetail.video_time_second}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_third &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid')?courseDetail.video_url_third:'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_third}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                        <a href="javascript:;">{courseDetail.video_time_third}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_fourth &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid')?courseDetail.video_url_fourth:'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_fourth}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                        <a href="javascript:;">{courseDetail.video_time_fourth}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_five &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid') ? courseDetail.video_url_five : 'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_five}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                        <a href="javascript:;">{courseDetail.video_time_five}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_six &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid') ? courseDetail.video_url_six : 'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_six}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                        <a href="javascript:;">{courseDetail.video_time_six}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_seven &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid') ? courseDetail.video_url_seven : 'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_seven}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                        <a href="javascript:;">{courseDetail.video_time_seven}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_eight &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid') ? courseDetail.video_url_eight : 'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_eight}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                        <a href="javascript:;">{courseDetail.video_time_eight}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_nine &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid') ? courseDetail.video_url_nine : 'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_nine}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                        <a href="javascript:;">{courseDetail.video_time_nine}</a>
                                                                        </div>}

                                                                    {courseDetail.video_title_ten &&  <div className="content-grid">
                                                                            <div className="course-play">
                                                                            <a target="_blank" href={(courseDetail.purchase_type == 'unpaid') ? courseDetail.video_url_ten : 'javascript:;'}>
                                                                                <img src="images/play.png" alt="play" /><span>{courseDetail.video_title_ten}</span>
                                                                                </a>
                                                                            </div>
                                                                            <a href="javascript:;">Preview</a>
                                                                           <a href="javascript:;">{courseDetail.video_time_ten}</a>
                                                                        </div>}
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            {courseDetail.content_title_one && <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingTwo">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                            {courseDetail.content_title_one}
                                                                        </a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                    <div className="panel-body">
                                                                        <div dangerouslySetInnerHTML={{ __html: courseDetail.content_description_one }}></div> 
                                                                    </div>
                                                                </div>
                                                            </div>}


                                                            {courseDetail.content_title_two && <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingThree">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        {courseDetail.content_title_two}</a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="panel-body">                                                                       
                                                                        <div dangerouslySetInnerHTML={{ __html: courseDetail.content_description_two }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>}

                                                            {courseDetail.content_title_third && <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingFour">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                        {courseDetail.content_title_third}</a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                                                                    <div className="panel-body">                                                                    
                                                                       <div dangerouslySetInnerHTML={{ __html: courseDetail.content_description_third }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>}

                                                            {courseDetail.content_title_four && <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingFive">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                        {courseDetail.content_title_four}</a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseFive" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
                                                                    <div className="panel-body">                                                                    
                                                                        <div dangerouslySetInnerHTML={{ __html: courseDetail.content_description_four }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>}

                                                            {courseDetail.content_title_five && <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingsix">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                                        {courseDetail.content_title_five}</a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseSix" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingsix">
                                                                    <div className="panel-body">
                                                                        <div dangerouslySetInnerHTML={{ __html: courseDetail.content_description_five }}></div>                                                                    
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
                            </div>

                        {courseDetail.purchase_type == 'paid' && <div className="col-md-3">
                                <div className="course-prices">
                                    <div className="price-detail">
                                    <p>${courseDetail.sale_cost} <label>${courseDetail.main_cost}</label></p>
                                    </div>
                                    <div className="course-text">
                                        {/* <p>This course includes:</p>
                                        <ul>
                                            <li><img src="images/check.png" alt="check" /> 5 hours on demand video</li>
                                            <li><img src="images/check.png" alt="check" /> 15 articles</li>
                                            <li><img src="images/check.png" alt="check" /> 4 downloadalbe resources</li>
                                            <li><img src="images/check.png" alt="check" /> Full lifetime access</li>
                                            <li><img src="images/check.png" alt="check" /> Access on mobile and tv</li>
                                        </ul>
                                        <label>30 days money back guarantee</label> */}      
                                    {token && <Link to={{ pathname: "/course-payment", search: "?id=" + courseDetail.course_id }}>
                                        Purchase Course
                                        </Link>}
                                    {!token && <Link to={{ pathname: "/login" }}>
                                        Purchase Course
                                        </Link>}
                                        
                                        {/* <a href="javascript:;" className="outline-btn">Buy Now</a> */}
                                    </div>
                                </div>
                            </div> }
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}