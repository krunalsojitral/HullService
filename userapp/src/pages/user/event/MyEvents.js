import React, { useState, useRef, ref } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import Paginator from 'react-hooks-paginator';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../../components/Apiurl';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";

export default function MyEvents() {

    const [eventdata, setEventData] = useState([]);
    const [token, setToken] = useState('');
    const [noresult, setNoresult] = React.useState(false)

    
    React.useEffect(() => {
        getEventData();
    }, [])

    const getEventData = () => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = { headers: { Authorization: `${token}` } };
        axios.post(api_url + '/event/getMyEventList',{}, config).then((result) => {
            if (result.data.status) {
                var eventdatas = result.data.response.data;
                setEventData(eventdatas);
                if (eventdatas.length > 0) {
                    setEventData(eventdatas);
                    setNoresult(false);
                } else{
                    setNoresult(true);
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <div>
            <Header/>

            <section class="second-banner-sec" style={{ background: `url('images/event-banner.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="text-box">
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">My Events </h2>
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
                </div >
            </section >


            <div class="event-main">
                <div class="container">
                    {/* <div class="researcher-heading">
                        <h3 class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">Our Events</h3>
                        <p class="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="1000ms">Training and courses are available for...
                        </p>
                    </div> */}
                    <div class="row" style={{ "margin-top": "60px" }}>
                        <div class="col-12">

                            {eventdata && eventdata.map((data, index) => (

                                <div class="event-card wow animate__fadeIn  " data-wow-duration="1000ms" data-wow-delay="1000ms" >
                                    <div class="event-card-left1">
                                        {!data.image && <img class="img-fluid img-event-fluid img-radius" alt="event-page" src="images/event-img.png" />}
                                        {data.image && <img class="img-fluid img-event-fluid img-radius" alt="event-page" src={data.image} />}
                                    </div>
                                    <div class="event-card-left1">
                                        <div class="event-name-title"><img src="images/user-icon.svg" alt="" class="img-fluid" /> {data.speaker_name} </div>
                                        <ul>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>{data.start_date}</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i><span>{data.start_time} - {data.end_time}</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i><span>{data.location.substring(0, 15)}</span></li>
                                        </ul>
                                        <div class="desc event-list-line">
                                            <Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                {data.title && data.title.substring(0, 120)}
                                            </Link>
                                        </div>
                                        <div class="event-readmore-btn"><Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}> readmore...</Link></div>
                                    </div>
                                    <div class="event-card-right1">
                                        <div class="price">
                                            {data.cost && <h4>${data.cost}</h4>}
                                            {(data.purchase_type == 'unpaid') && <h4>Free</h4>}
                                        </div>
                                        {data.event_purchase_id && <Link class="btn btn-default w-100" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                            View
                                        </Link>}                                        
                                    </div>
                                </div>
                            ))}

                            {noresult &&
                                <div>
                                    <center>
                                        <img height="250px" width="350px" src="images/hull-no-results.png" alt="author" />
                                        <div className="no-data">No results found.</div>
                                    </center>
                                </div>
                            }


                        </div >
                    </div >
                </div >
            </div>


            {/* <section>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            {eventdata &&
                                eventdata.map((data, index) => (
                                    <div class="media">
                                        {!data.image && <img alt="event-page" src="images/event-page.png" />}
                                        {data.image && <img alt="event-page" src={data.image} />}
                                        <div class="media-body">
                                            <div class="media-left">
                                                <div class="avatar">
                                                    <img alt="avatar" src="images/avatar.png" />                                                    
                                                    <h2>{data.speaker_name}</h2>
                                                </div>
                                                <div class="event-icons">
                                                    <label><img src="images/date.png" alt="date" />{data.start_date}</label>
                                                    <label><img src="images/time.png" alt="time" />{data.start_time} - {data.end_time}</label>
                                                    {data.location && <label><img src="images/location.png" alt="location" />{data.location}</label>}
                                                </div>
                                                <h3> {data.title}</h3>
                                                <Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                    Read more...
                                                </Link>
                                            </div>
                                            <div class="media-right">
                                                {data.cost && <h4>${data.cost}</h4>}
                                                <Link class="thm-btn" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                    View    
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))} 

                            
                        </div>
                    </div>
                </div>
            </section>                         */}
                  

            <Footer/>
        </div>
    )
}