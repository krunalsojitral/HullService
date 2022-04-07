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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="event-details-content">
                                        <div className="promo-event-details-title">
                                            <h4>{eventDetail.title}</h4>
                                        </div>
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
                                                            {/* {eventDetail.start_date} */}
                                                            <span>November 17, 2020 12:00 pm</span>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="event-listing-text">
                                                        <div className="event-text-icon">
                                                            <img src="images/cal.png" />
                                                        </div>
                                                        <div className="event-text-word">
                                                            <h3>END DATE</h3>
                                                            {/* {eventDetail.end_date} */}
                                                            <span>November 17, 2020 12:00 pm</span>
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
                                                        <button type="button" onClick={(e) => cartEvent(eventDetail.event_id)} class="btn-save">Purchase</button>
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
            </section>

            <Footer />
        </div>
    )
}