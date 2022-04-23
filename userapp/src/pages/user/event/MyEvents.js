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

    const [city, setCity] = React.useState('');
    const [cityError, setCityError] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [searchtext, setSearchtext] = React.useState('')

    
    React.useEffect(() => {
        getEventData();
    }, [])

    const getEventData = () => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = { headers: { Authorization: `${token}` } };
        axios.get(api_url + '/event/getMyEventList', config).then((result) => {
            if (result.data.status) {
                var eventdatas = result.data.response.data;
                setEventData(eventdatas);
                if (eventdatas.length > 0) {
                    setEventData(eventdatas);
                    setNoresult(false);
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
            <section class="event-main">
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
                                                    {/* {!data.speaker_image && <img alt="avatar" src="images/avatar.png" />}
                                                    {data.speaker_image && <img alt="avatar" src={data.speaker_image} />} */}
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
            </section>                        
                  

            <Footer/>
        </div>
    )
}