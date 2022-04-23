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

export default function PromoPage() {


    let history = useHistory();

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


    const cartEvent = (id) => {
        var data = {
            event_id: id
        }
        console.log('in');
        console.log(data);
        localStorage.setItem('eventPurchaseData', JSON.stringify(data));
        history.push("/event-cart");
    }

    return (
        <div>
            <Header />

            {/* <Sidebar /> */}
            <section class="hero-banner-inner">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-sm-12 col-md-7">
                            <div class="banner-text">
                                <h1>{eventDetail.title}</h1>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-5">
                            <div class="img-right">
                                <img src="images/brain.png" alt="brain"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="event-main event-detail">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Event</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Reflective Practice Sessions</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="media">
                                                <img src="images/event-page.png" alt="event-page"/>
                                                    <div class="media-body">
                                                        <div class="media-left">
                                                            <div class="avatar">
                                                                <img src="images/avatar.png" alt="avatar"/>
                                                                <h2>{eventDetail.speaker_name}</h2>
                                                            </div>
                                                            <h3>{eventDetail.title}</h3>

                                                            <div class="event-icons">
                                                                <label><img src="images/date.png" alt="date"/>{eventDetail.start_date}</label>
                                                                <label><img src="images/time.png" alt="time"/>{eventDetail.start_time} - {eventDetail.end_time}</label>
                                                                {eventDetail.location && <label><img src="images/location.png" alt="location"/>{eventDetail.location}</label>}
                                                            </div>
                                                        </div>
                                                        <div class="media-right">
                                                            <h4>${eventDetail.cost}</h4>
                                                            <div class="media-button">
                                                                <a onClick={(e) => cartEvent(eventDetail.event_id)}  class="thm-btn">Register for <br/>events only</a>
                                                                <a href="javascript:;" class="thm-btn-outline">Back</a>
                                                                <a href="javascript:;" class="thm-btn-outline">Register for Event and <br/>
                                                                    Reflection Pracice Session</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="event-texyt">
                                                <p dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="event-media">
                                                <div class="media">
                                                    <img src="images/event-detail.png" alt=""/>
                                                        <div class="media-body">
                                                            <h5>About {eventDetail.speaker_name}</h5>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt placerat felis ullamcorper et. Et nunc dui quis nunc amet mattis. Cursus facilisis nullam erat eu dolor porttitor sed netus. Non vitae quis neque et ut pretium, non sit mattis. Leo, tincidunt nulla venenatis, egestas sed eget. Volutpat facilisi et vel placerat ac placerat varius elit et. Faucibus aliquam nunc tortor odio non sagittis, lectus fusce.</p>
                                                            <p>
                                                                Duis in purus nibh sagittis malesuada nisl velit eget. Nisi, morbi cras senectus nec proin non velit. Nec eget aliquam ipsum interdum ullamcorper. Proin nunc etiam vitae enim aliquet euismod vitae tempor. Lobortis commodo, arcu, amet ipsum eu eget feugiat. Diam lectus dictumst sit tempor, tellus proin morbi augue.</p>
                                                            <p>
                                                                Vulputate eleifend pellentesque ipsum vitae nibh leo volutpat condimentum. Non arcu sapien rhoncus amet vulputate nunc integer. Eget hac massa, lectus mollis bibendum rutrum. Quis pulvinar aliquam libero leo posuere. Nunc quam neque ullamcorper fermentum, est libero. Diam aliquet vitae gravida aliquet diam condimentum aliquam. Tortor faucibus pellentesque posuere eleifend in hendrerit cursus. Enim, velit quam donec eu, ultricies. Diam eu senectus pretium commodo ut quis nunc. Non id neque, nulla at ornare nisi. Lorem nisl id in ante in sed et. Dignissim nam cras velit lacinia fames. Viverra at urna amet iaculis dignissim mi orci ut. Egestas id massa amet
                                                            </p>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div class="col-sm-12">
                                        <div class="event-media event-session">
                                            <h5 class="media-body-session-title">16th Annual Society of Consulting Psychology Winter Conference</h5>
                                            <br/>
                                            <img src="images/event-detail.png" alt="" />
                                            <div class="media-body-desc">                                                
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non. Aliquet aliquam sapien non</p>
                                            </div>

                                            <div>
                                                <div>
                                                    <h4 class="media-body-session-title">Duration : 4 Months(21 APRIL to 21 July)</h4>
                                                </div>

                                                <div class="session-week">
                                                    <div>Mon</div>
                                                    <div>Tue</div>
                                                    <div>Wed</div>
                                                    <div>Thu</div>
                                                    <div>Fri</div>
                                                </div>
                                                <hr/>

                                                <div class="session-checkbox">
                                                    <div><input type="checkbox" name="" /> 10am to 12pm</div>
                                                    <div><input type="checkbox" name="" /> 2am to 5pm</div>
                                                    <div><input type="checkbox" name="" /> 2am to 5pm</div>
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
           
            <Footer />
        </div>
    )
}