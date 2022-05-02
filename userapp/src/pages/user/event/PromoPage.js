import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../../components/Apiurl';
import { useModal } from 'react-hooks-use-modal';
import { useHistory } from "react-router-dom";
import Zoom from "./Zoom";

export default function PromoPage() {


    let history = useHistory();

    const [joinMeeting, setJoinMeeting] = useState(false);

    const [eventId, setEventId] = React.useState(0)
    const [eventDetail, seteventDetail] = React.useState({})


    React.useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let event_id = params.get('id')
        setEventId(event_id);

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token) { 
            axios.post(api_url + '/event/getEventDataByIdWithLogin', { event_id: event_id }, config).then((result) => {
                if (result.data.status) {
                    var eventdata = result.data.response.data;
                    seteventDetail(eventdata);
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
        }else{
            axios.post(api_url + '/event/getEventDataById', { event_id: event_id }).then((result) => {
                if (result.data.status) {
                    var eventdata = result.data.response.data;
                    seteventDetail(eventdata);
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
        }

   

        

    }, [])


    const cartEvent = (id, cost) => {
        var data = {
            event_id: id,
            cost: cost
        }
        
        localStorage.setItem('eventPurchaseData', JSON.stringify(data));
        history.push("/event-cart");
    }

    const zoomJoin = (id) => { 
        // axios.post("http://localhost:6161/api/event/newmeeting", { userName, userEmail, passWord }).then((res) => {
        //     setData(res.data.response.data);
        //     console.log("res", res.data.response.data);
        //     var datas = res.data.response.data.join_url;
            

        // }).catch((err) => console.log("error", err));
    }

    return (
        <div>
            <Header />


            <section class="second-banner-sec" style={{ background: `url('images/event-banner.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="text-box">
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Our Events</h2>
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

            <div class="event-main">
                <div class="container">
                    <ul class="nav nav-tabs eventTabs wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" id="myTab" role="tablist">
                        <li role="presentation">
                            <a href="#" class="active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Event</a>
                        </li>
                        <li role="presentation">
                            <a href="#" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Reflective Practice Sessions</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="row">
                                <div class="back-btn-right clearfix" style={{"text-align":"right"}}>
                                    <div class="rate-btn mt-5 "><a href="#" class="btn btn-default white sm-btn"><span>Back</span></a></div>
                                </div>
                            </div>
                            <div class="eventDetail">
                                <div class="row">
                                    <div class="col-lg-5 text-lg-end">
                                        <div class="img-holder ringLeft ">
                                            {/* <img src="images/event.png" alt="" class="wow animate__fadeInLeft" data-wow-duration="1000ms" data-wow-delay="1000ms" /> */}
                                            {!eventDetail.image && <img alt="event-page" class="event-detail-image wow animate__fadeInLeft" data-wow-duration="1000ms" data-wow-delay="1000ms" src="images/event.png" />}
                                            {eventDetail.image && <img alt="event-page" class="event-detail-image wow animate__fadeInLeft" data-wow-duration="1000ms" data-wow-delay="1000ms" src={eventDetail.image} />}
                                            <img src="images/Ellipse2.png" alt="" class="ellipse wow animate__fadeIn" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                        </div>
                                    </div>
                                    <div class="col-lg-7">
                                        <div class="content event-card no-shadow">
                                            <div class="event-card-left1">
                                                <div class="event-name-title">
                                                    {!eventDetail.speaker_image && <img src="images/user-icon.svg" alt="" class="img-fluid speaker-image" />}
                                                    {eventDetail.speaker_image && <img src={eventDetail.speaker_image} alt="" class="img-fluid speaker-image" />}
                                                    {eventDetail.speaker_name} 
                                                </div>
                                                <div class="desc event-list-line">{eventDetail.title} </div>
                                                <ul class="mt-50">
                                                    <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>{eventDetail.start_date}</span></li>
                                                    <li><i><img src="images/bxs_time.svg" alt="" /></i><span>{eventDetail.start_time} - {eventDetail.end_time}</span></li>
                                                    {eventDetail.location && <li><i><img src="images/loc.svg" alt="" /></i><span>{eventDetail.location}</span></li>}
                                                </ul>

                                                <div class="rate-btn mt-3"><a href="#" class="btn btn-default w-100">
                                                    {eventDetail.cost && <span>${eventDetail.cost}</span>}
                                                    <span>Register for events only</span></a></div>
                                                <div class="rate-btn mt-3"><a href="#" class="btn btn-default white w-100">{eventDetail.cost && <span>${eventDetail.cost}</span>} <span>Register for Event and Reflection <br />Pracice Session</span></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="detail">
                                    <p class="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms" dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                </div>
                                <hr />
                                <div class="about-event">
                                    <div class="row">
                                        <div class="col-lg-5">
                                            <div class="img-holder">
                                                {!eventDetail.speaker_image && <img class="wow animate__fadeInLeft" data-wow-duration="800ms" data-wow-delay="1000ms" alt="event-page" src="images/about.png" />}
                                                {eventDetail.speaker_image && <img class="wow animate__fadeInLeft" data-wow-duration="800ms" data-wow-delay="1000ms" alt="event-page" src={eventDetail.speaker_image} />}
                                            </div>
                                        </div>
                                        <div class="col-lg-7">
                                            <div class="content">
                                                <h4 class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">About {eventDetail.speaker_name}</h4>
                                                <p class="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="1000ms" dangerouslySetInnerHTML={{ __html: eventDetail.about_speaker }}>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="reflective-card">
                                <h4>{eventDetail.session_title}</h4>
                                <p dangerouslySetInnerHTML={{ __html: eventDetail.session_about }}></p>
                                <div class="card-warning">
                                    <i><img src="images/waring.svg" alt="" /></i>
                                    <div class="media-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non.</div>
                                </div>
                                <div class="reflective-duration">
                                    <h5><img src="images/bxs_time.svg" alt="" />Duration : 4 Months(21 APRIL to 21 July)</h5>
                                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a href="#" class="nav-link" id="pills-Mon-tab" data-bs-toggle="pill" data-bs-target="#pills-Mon" role="tab" aria-controls="pills-Mon" aria-selected="true">Mon</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a href="#" class="nav-link" id="pills-Tue-tab" data-bs-toggle="pill" data-bs-target="#pills-Tue" role="tab" aria-controls="pills-Tue" aria-selected="false">Tue</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a href="#" class="nav-link  active" id="pills-Wed-tab" data-bs-toggle="pill" data-bs-target="#pills-Wed" role="tab" aria-controls="pills-Wed" aria-selected="false">Wed</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a href="#" class="nav-link" id="pills-Thu-tab" data-bs-toggle="pill" data-bs-target="#pills-Thu" role="tab" aria-controls="pills-Thu" aria-selected="false">Thu</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a href="#" class="nav-link" id="pills-Fri-tab" data-bs-toggle="pill" data-bs-target="#pills-Fri" role="tab" aria-controls="pills-Fri" aria-selected="false">Fri</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade" id="pills-Mon" role="tabpanel" aria-labelledby="pills-Mon-tab">...</div>
                                        <div class="tab-pane fade" id="pills-Tue" role="tabpanel" aria-labelledby="pills-Tue-tab">...</div>
                                        <div class="tab-pane fade  show active" id="pills-Wed" role="tabpanel" aria-labelledby="pills-Wed-tab">
                                            <div class="duration-inner">
                                                <ul>
                                                    <li>
                                                        <label class="check ">10AM to 12PM
                                                            <input type="checkbox" checked="checked" name="is_name" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="check ">2pm to 5PM
                                                            <input type="checkbox" checked="checked" name="is_name" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="check ">2pm to 5PM
                                                            <input type="checkbox" checked="checked" name="is_name" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <div class="text-center">
                                                    <a class="btn btn-default" href="#">Submit</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="pills-Thu" role="tabpanel" aria-labelledby="pills-Thu-tab">...</div>
                                        <div class="tab-pane fade" id="pills-Fri" role="tabpanel" aria-labelledby="pills-Fri-tab">...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            
            

            
            {/* <section className="hero-banner-inner">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-7">
                            <div className="banner-text">
                                <h1>{eventDetail.title}</h1>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <div className="img-right">
                                <img src="images/brain.png" alt="brain"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="event-main event-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Event</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Reflective Practice Sessions</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="media">
                                                {!eventDetail.image && <img alt="event-page" src="images/event-page.png" />}
                                                {eventDetail.image && <img alt="event-page" src={eventDetail.image} />}
                                                    <div className="media-body">
                                                        <div className="media-left">
                                                            <div className="avatar">
                                                                <img src="images/avatar.png" alt="avatar"/>
                                                                <h2>{eventDetail.speaker_name}</h2>
                                                            </div>
                                                            <h3>{eventDetail.title}</h3>

                                                            <div className="event-icons">
                                                                <label><img src="images/date.png" alt="date"/>{eventDetail.start_date}</label>
                                                                <label><img src="images/time.png" alt="time"/>{eventDetail.start_time} - {eventDetail.end_time}</label>
                                                            {eventDetail.location && <label><img src="images/location.png" alt="location" />{eventDetail.location.substring(0, 40)}</label>}
                                                            </div>
                                                        </div>
                                                        <div className="media-right">
                                                            {eventDetail.cost && <h4>${eventDetail.cost}</h4>}                                                         
                                                            {eventDetail.purchase_type == 'unpaid' && <h4>Free</h4>}                                                         
                                                            {eventDetail.event_purchase_id && <div className="media-button">
                                                            
                                                             onClick={(e) => zoomJoin(eventDetail.event_id)}  
                                                            
                                                            <a target="_blank" href='javascript:;' className="thm-btn">Join Meeting</a>
                                                            </div>}
                                                            {!eventDetail.event_purchase_id && <div className="media-button">
                                                                <a onClick={(e) => cartEvent(eventDetail.event_id, eventDetail.cost)} className="thm-btn">Register for <br />events only</a>
                                                               
                                                                <a href="javascript:;" onClick={(e) => cartEvent(eventDetail.event_id, (eventDetail.cost + eventDetail.session_cost))} className="thm-btn-outline">Register for Event and <br />
                                                                    Reflection Pracice Session</a>
                                                            </div>}
                                                        </div>

                                                         <div>
                                                            {joinMeeting ? (
                                                                <div> 
                                                                    <Zoom />
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <button style={{ border: '1px solid #fff' }} onClick={() => setJoinMeeting(true)}>Join Meeting</button>
                                                                </div>
                                                            )}
                                                        </div>  
                                                        
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="event-texyt">
                                                <p dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="event-media">
                                                <div className="media">

                                                    
                                                    {!eventDetail.speaker_image && <img alt="event-page" src="images/event-detail.png" />}
                                                    {eventDetail.speaker_image && <img alt="event-page" src={eventDetail.speaker_image} />}
                                                    
                                                        <div className="media-body">
                                                            <h5>About {eventDetail.speaker_name}</h5>
                                                            <p dangerouslySetInnerHTML={{ __html: eventDetail.session_about }}></p>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row justify-content-center">
                                        <div className="col-sm-10">
                                            <div className="reflectiv-cntnt">
                                                <h3>{eventDetail.title}</h3>
                                                <p dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                                <div className="alert">
                                                    <img src="images/alert.png" alt="alert"/>
                                                        <label>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non.</label>
                                                </div>
                                                <div className="duration">
                                                    <img src="images/time.png" alt="time" className="mr-2"/>
                                                        Duration : 4 Months(21 APRIL to 21 July)
                                                </div>
                                                <div className="day-tabs">
                                                    <ul className="nav nav-tabs" id="myTab1" role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" id="mon-tab" data-toggle="tab" href="#mon" role="tab" aria-controls="mon" aria-selected="true">Mon</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="tue-tab" data-toggle="tab" href="#tue" role="tab" aria-controls="tue" aria-selected="false">Tue</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="wed-tab" data-toggle="tab" href="#wed" role="tab" aria-controls="wed" aria-selected="false">Wed</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="thu-tab" data-toggle="tab" href="#thu" role="tab" aria-controls="thu" aria-selected="false">Thu</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="fri-tab" data-toggle="tab" href="#fri" role="tab" aria-controls="fri" aria-selected="false">Fri</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane fade show active" id="mon" role="tabpanel" aria-labelledby="mon-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-1" type="checkbox" value="ch-1" name="ch-1" />
                                                                <label for="ch-1">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-2" type="checkbox" value="ch-2" name="ch-2" />
                                                                <label for="ch-2">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-3" type="checkbox" value="ch-3" name="ch-3" />
                                                                <label for="ch-3">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="tue" role="tabpanel" aria-labelledby="tue-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="get-up-1" type="checkbox" value="get-up-1" name="get-up-1" />
                                                                <label for="get-up-1">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="make-bed-1" type="checkbox" value="make-bed-1" name="make-bed-1" />
                                                                <label for="make-bed-1">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="clean-teeth-1" type="checkbox" value="clean-teeth-1" name="clean-teeth-1" />
                                                                <label for="clean-teeth-1">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="wed" role="tabpanel" aria-labelledby="wed-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-4" type="checkbox" value="ch-4" name="ch-4" />
                                                                <label for="ch-4">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-5" type="checkbox" value="ch-5" name="ch-5" />
                                                                <label for="ch-5">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-6" type="checkbox" value="ch-6" name="ch-6" />
                                                                <label for="ch-6">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="thu" role="tabpanel" aria-labelledby="thu-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-7" type="checkbox" value="ch-7" name="ch-7" />
                                                                <label for="ch-7">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-8" type="checkbox" value="ch-8" name="ch-8" />
                                                                <label for="ch-8">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-9" type="checkbox" value="ch-9" name="ch-9" />
                                                                <label for="ch-9">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="fri" role="tabpanel" aria-labelledby="fri-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-11" type="checkbox" value="ch-11" name="ch-11" />
                                                                <label for="ch-11">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-22" type="checkbox" value="ch-22" name="ch-22" />
                                                                <label for="ch-22">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-33" type="checkbox" value="ch-33" name="ch-33" />
                                                                <label for="ch-33">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-block text-center">
                                                    <a href="javascript:;" onClick={(e) => cartEvent(eventDetail.event_id, (eventDetail.session_cost))} className="thm-btn">Submit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>                            
                            </div>


                        </div>
                    </div>
                </div>
            </section> */}
           
            <Footer />
        </div>
    )
}