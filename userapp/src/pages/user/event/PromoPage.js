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

            {/* <Sidebar /> */}
            <section className="hero-banner-inner">
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
                                                <img src="images/event-page.png" alt="event-page"/>
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
                                                                {eventDetail.location && <label><img src="images/location.png" alt="location"/>{eventDetail.location}</label>}
                                                            </div>
                                                        </div>
                                                        <div className="media-right">
                                                            <h4>${eventDetail.cost}</h4>                                                         
                                                            {eventDetail.event_purchase_id && <div className="media-button">
                                                            
                                                            {/* onClick={(e) => zoomJoin(eventDetail.event_id)}  */}
                                                            <a target="_blank" href='https://us05web.zoom.us/j/83577607247?pwd=Zy9hYlpKa2RUV0l2OGxCZlBOUXhWQT09' className="thm-btn">Join Meeting</a>
                                                            </div>}
                                                            {!eventDetail.event_purchase_id && <div className="media-button">
                                                                <a onClick={(e) => cartEvent(eventDetail.event_id, eventDetail.cost)} className="thm-btn">Register for <br />events only</a>
                                                                <a href="javascript:;" onClick={() => history.goBack()} className="thm-btn-outline">Back</a>
                                                                <a href="javascript:;" onClick={(e) => cartEvent(eventDetail.event_id, (eventDetail.cost + eventDetail.session_cost))} className="thm-btn-outline">Register for Event and <br />
                                                                    Reflection Pracice Session</a>
                                                            </div>}
                                                        </div>

                                                        <div>
                                                            {joinMeeting ? (
                                                                <div> dfsdfsdfsdf
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
                                                    <img src="images/event-detail.png" alt=""/>
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
                                                {/* <div className="alert">
                                                    <img src="images/alert.png" alt="alert"/>
                                                        <label>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non.</label>
                                                </div> */}
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
                                                                {/* <!--checkbox 1--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-1" type="checkbox" value="ch-1" name="ch-1" />
                                                                <label for="ch-1">10AM to 12PM</label>
                                                                {/* <!--checkbox 2--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-2" type="checkbox" value="ch-2" name="ch-2" />
                                                                <label for="ch-2">2pm to 5PM</label>
                                                                {/* <!--checkbox 3--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-3" type="checkbox" value="ch-3" name="ch-3" />
                                                                <label for="ch-3">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="tue" role="tabpanel" aria-labelledby="tue-tab">
                                                            <div className="checkbox-block">
                                                                {/* <!--checkbox 1--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="get-up-1" type="checkbox" value="get-up-1" name="get-up-1" />
                                                                <label for="get-up-1">10AM to 12PM</label>
                                                                {/* <!--checkbox 2--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="make-bed-1" type="checkbox" value="make-bed-1" name="make-bed-1" />
                                                                <label for="make-bed-1">2pm to 5PM</label>
                                                                {/* <!--checkbox 3--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="clean-teeth-1" type="checkbox" value="clean-teeth-1" name="clean-teeth-1" />
                                                                <label for="clean-teeth-1">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="wed" role="tabpanel" aria-labelledby="wed-tab">
                                                            <div className="checkbox-block">
                                                                {/* checkbox 1 */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-4" type="checkbox" value="ch-4" name="ch-4" />
                                                                <label for="ch-4">10AM to 12PM</label>
                                                                {/* <!--checkbox 2--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-5" type="checkbox" value="ch-5" name="ch-5" />
                                                                <label for="ch-5">2pm to 5PM</label>
                                                                {/* <!--checkbox 3--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-6" type="checkbox" value="ch-6" name="ch-6" />
                                                                <label for="ch-6">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="thu" role="tabpanel" aria-labelledby="thu-tab">
                                                            <div className="checkbox-block">
                                                                {/* <!--checkbox 1--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-7" type="checkbox" value="ch-7" name="ch-7" />
                                                                <label for="ch-7">10AM to 12PM</label>
                                                                {/* <!--checkbox 2--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-8" type="checkbox" value="ch-8" name="ch-8" />
                                                                <label for="ch-8">2pm to 5PM</label>
                                                                {/* <!--checkbox 3--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-9" type="checkbox" value="ch-9" name="ch-9" />
                                                                <label for="ch-9">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="fri" role="tabpanel" aria-labelledby="fri-tab">
                                                            <div className="checkbox-block">
                                                                {/* <!--checkbox 1--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-11" type="checkbox" value="ch-11" name="ch-11" />
                                                                <label for="ch-11">10AM to 12PM</label>
                                                                {/* <!--checkbox 2--> */}
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-22" type="checkbox" value="ch-22" name="ch-22" />
                                                                <label for="ch-22">2pm to 5PM</label>
                                                                {/* <!--checkbox 3--> */}
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
                                    {/* <div className="col-sm-12">
                                        <div className="event-media event-session">
                                            <h5 className="media-body-session-title">{eventDetail.title}</h5>
                                            <br/>
                                            <img src="images/event-detail.png" alt="" />
                                            <div className="media-body-desc">                                                
                                                <p dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                            </div>

                                            <div>
                                                <div>
                                                    <h4 className="media-body-session-title">Duration : 4 Months(21 APRIL to 21 July)</h4>
                                                </div>

                                                <div className="session-week">
                                                    <div>Mon</div>
                                                    <div>Tue</div>
                                                    <div>Wed</div>
                                                    <div>Thu</div>
                                                    <div>Fri</div>
                                                </div>
                                                <hr/>

                                                <div className="session-checkbox">
                                                    <div><input type="checkbox" name="" /> 10am to 12pm</div>
                                                    <div><input type="checkbox" name="" /> 2am to 5pm</div>
                                                    <div><input type="checkbox" name="" /> 2am to 5pm</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  */}
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