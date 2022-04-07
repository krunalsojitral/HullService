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
export default function Events() {
   

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
                console.log(eventdata.group_session);
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
        localStorage.setItem('eventPurchaseData', JSON.stringify(data));
        history.push("/event-cart");
    }

    return(
        <div>
            <Header/>
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Events</h2>
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
                        <div className="col-md-10">
                            <div className="event-details">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="event-details-title">
                                            <h3>{eventDetail.title}</h3>
                                        </div>
                                        <div className="event-details-links">
                                            <ul>
                                                <li className="active"><a data-toggle="tab" href="#home">Events</a></li>
                                                <li><a data-toggle="tab" href="#menu1">Follow up meetings</a></li>
                                                <li><a data-toggle="tab" href="#menu2">Resources</a></li>
                                            </ul>
                                        </div>
                                        <div className="tab-content">
                                            <div id="home" className="tab-pane fade in active">
                                                <div className="event-details-content">
                                                    <div className="row">
                                                        <div className="col-md-9">
                                                            {eventDetail.image && <div className="event-content-img">
                                                                <img src={eventDetail.image} />
                                                            </div>}
                                                            <div className="event-content-list">
                                                                <p dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="event-listing-box">
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/cal.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>START DATE</h3>                                                                         
                                                                        <span>{eventDetail.user_start_date} </span>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/cal.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>END DATE</h3>                                                                        
                                                                        <span>{eventDetail.user_end_date} </span>
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/checking.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>STATUS</h3>
                                                                        <span>Showing</span>
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/checking.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>Speaker’s Name</h3>
                                                                        <span>{eventDetail.speaker_name}</span>
                                                                    </div>
                                                                </div>
                                                                {eventDetail.location && <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/marker-event.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>LOCATION</h3>
                                                                        <span>{eventDetail.location}</span>
                                                                    </div>
                                                                </div>}
                                                                <br />
                                                                {/* <div className="event-listing-text">
                                                                    <div className="event-text-icon">
                                                                        <img src="images/box.png" />
                                                                    </div>
                                                                    <div className="event-text-word">
                                                                        <h3>CATEGORY</h3>
                                                                        <span>Business</span>
                                                                    </div>
                                                                </div> */}
                                                                <div className="event-listing-text">
                                                                    <button type="button" class="btn-save">Join</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div id="menu1" className="tab-pane fade">
                                                <div className="event-details-content">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            {eventDetail.group_session && eventDetail.group_session.length > 0 &&
                                                                <div className="event-content-list">
                                                                    {eventDetail.group_session.map((data, index) => (
                                                                        <div className="event-joining">
                                                                            <div className="row">
                                                                                <div className="col-md-10">
                                                                                    <div className="joining-card">
                                                                                        <h3>{data.title}</h3>
                                                                                        <p>{data.description}</p>
                                                                                        {/* <span>November 17, 2020 12:00 pm</span> */}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <div className="joining-btn-card">
                                                                                        <a href="" className="join-btn">
                                                                                            JOIN
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))} 
                                                                </div>}
                                                            {eventDetail.group_session && eventDetail.group_session.length == 0 &&
                                                                <div>
                                                                    <center>
                                                                        <img height="250px" width="350px" src="images/hull-no-results.png" alt="author" />
                                                                        <div className="no-data">No results found.</div>
                                                                    </center>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="menu2" className="tab-pane fade">
                                                <div className="event-details-content">
                                                    <div className="row">
                                                        {eventDetail.resource && eventDetail.resource.length > 0 && eventDetail.resource.map((data, index) => (
                                                            <div className="col-md-15">
                                                                <div className="resources-box">
                                                                    <div className="resources-icon">
                                                                        <img src="images/pdf.png" />
                                                                    </div>
                                                                    <h3>
                                                                        <a download href={data.file}>{data.name.substring(0, 14)}</a>
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {eventDetail.videoURL && eventDetail.videoURL.length > 0 && 
                                                        <div>
                                                            <h3>Video title goes here</h3>
                                                            <div className="row">
                                                                {eventDetail.videoURL.map((data, index) => (
                                                                    <div className="col-md-4">
                                                                        <div className="resources-video">
                                                                            <iframe height="250" src="https://www.youtube.com/embed/D1JVg0q0nJg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                                            {/* <img src="images/Events-Img.png" />
                                                                        <div className="video-icon">
                                                                            <img src="images/video-icon.png" />
                                                                        </div> */}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>}

                                                    {eventDetail.webPageUrl && eventDetail.webPageUrl.length > 0 && 
                                                        <div>
                                                            <h3>Arctiles Link Heading</h3>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    {eventDetail.webPageUrl.map((data, index) => (
                                                                        <div className="Arctiles-Card">
                                                                            <div className="Arctiles-Icon">
                                                                                <i className="fa fa-link"></i>
                                                                            </div>
                                                                            <div className="Arctiles-Text">
                                                                                <h3><a target="_blank" href={data.path}>{data.path}</a></h3>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }

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

            <Footer/>
        </div>
    )
}