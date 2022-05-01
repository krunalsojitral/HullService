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

export default function Events() {
   

    
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
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);
        getEventData();
    }, [])


    const getEventData = () => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token) {
            axios.post(api_url + '/event/getUnpaidEventList', {}, config).then((result) => {
                if (result.data.status) {
                    var eventdatas = result.data.response.data;
                    setEventData(eventdatas);
                    if (eventdatas.length > 0) {
                        
                        setEventData(eventdatas);
                        setNoresult(false);
                    } else {
                       // setNoresult(true);
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            getEventDataQuery({})
        }

    }

    const todayEvent = () => {
        var data = {
            today : true
        }
        getEventDataQuery(data)
    }

    const getEventDataQuery = (obj) => {
        axios.post(api_url + '/event/getUnpaidEventList', obj).then((result) => {
            if (result.data.status) {
                var eventdatas = result.data.response.data;
                if (eventdatas.length > 0) {
                    setEventData(eventdatas);
                    setNoresult(false);
                } else {
                    // setNoresult(true);
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const {
        ready,
        value: cityValue,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const handleSelect =
        ({ description }) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                setCity(description);
                clearSuggestions();

                var obj = {
                    "location": description
                }
                getEventDataQuery(obj)

                // Get latitude and longitude via utility functions
                getGeocode({ address: description })
                    .then((results) => {

                        const address_components = results[0].address_components;
                        var filtered_array = address_components.filter(function (address_component) {
                            return address_component.types.includes("country");
                        });
                        var country = filtered_array.length ? filtered_array[0].long_name : "";
                        if (country) { setCountry(country); }
                        return getLatLng(results[0])

                    })
                    .then(({ lat, lng }) => {
                        setLatitude(lat)
                        setLongitude(lng)
                    })
                    .catch((error) => {
                        setLatitude('');
                        setLongitude('');
                        setCountry('');
                        console.log("Error: ", error);
                    });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li className="city_suggestion" key={place_id} onClick={handleSelect(suggestion)}>
                    <p> <strong>{main_text}</strong>  {secondary_text}</p>
                </li>
            );
        });

    const handleInput = (e) => {
        if (!e.target.value) {
            setValue(e.target.value);
            setCity(e.target.value);
            setCityError('City is required.');
        } else {
            setValue(e.target.value);
            setCity(e.target.value);
            setCityError('');
        }
    };

    const onChangeSearch = (e) => { 
        setSearchtext(e.currentTarget.value); 
    }

    const { handleSubmit, formState } = useForm();
    const search = (value) => {
        var obj = {
            "search": searchtext
        }
        getEventDataQuery(obj)
    }

    return(
        <div>
            <Header/>           

            <section class="hero-banner-inner">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-sm-12 col-md-7">
                            <div class="banner-text">
                                <h1>Our Events</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non. Aliquet aliquam sapien non fermentum ut.</p>
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

            <section class="event-main">
                <div class="container">
                    <div class="row">
                        {/* <div className="col-md-2 side-col">
                            <Sidebar />
                        </div> */}
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
                                                    {data.location && <label><img src="images/location.png" alt="location" />{data.location.substring(0, 10)}</label>}
                                                </div>
                                                {data.title && <h3>{data.title.substring(0, 120)} </h3>}
                                                <Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                    Read more...
                                                </Link>                                                
                                            </div>
                                            <div class="media-right">
                                                {data.cost && <h4>${data.cost}</h4>}
                                                {(data.purchase_type == 'unpaid') && <h4>Free</h4>}
                                                {data.event_purchase_id && <Link class="thm-btn" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                    View
                                                </Link>}
                                                {!data.event_purchase_id && <Link class="thm-btn" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                    Buy
                                                </Link>}
                                            </div>
                                        </div>
                                    </div>
                                ))}                            
                        </div>
                    </div>
                </div>
            </section>     
            
             {/* <section className="dashboard-card">
                <div className="container-fluid">
                    <div className="row"> 
                        <div className="col-md-2 side-col">
                            <Sidebar />
                        </div>
                        
                        <div className="col-md-10">
                                <div className="Event-List">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="Event-Search">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <form onSubmit={handleSubmit(search)}>
                                                            <input type="text" onChange={onChangeSearch} className="form-control" name="search_name" placeholder="Search for Events" />
                                                            <img className="search-icon" src="images/search-icon.png" />
                                                        </form>
                                                    </div>
                                                    {/* <div className="col-md-6">
                                                    <div className="filter-address" ref={ref}>
                                                            <input
                                                                value={cityValue}
                                                                disabled={!ready}
                                                                onChange={handleInput}
                                                                placeholder="Search for Events"
                                                                className="form-control"
                                                            />
                                                            {status === "OK" && <ul className="address-suggestion">{renderSuggestions()}</ul>}
                                                        </div>                                                        
                                                        <img src="images/Mask.png" />
                                                        <div className="select-listing">
                                                            <select className="form-control">
                                                                <option>List</option>
                                                            </select>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="filer-option">
                                                <div className="page-change-btn">
                                                    <a href="#" className="left-arrow">
                                                        <i className="fa fa-angle-left"></i>
                                                    </a>
                                                    <a href="#" className="right-arrow">
                                                        <i className="fa fa-angle-right"></i>
                                                    </a>
                                                </div>
                                                <div className="page-change-label" onClick={(e) => todayEvent()}>
                                                    <label>Today</label>
                                                </div>
                                                <div className="page-change-select">
                                                    <select className="form-control">
                                                        <option>Upcoming</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">  

                                        {eventdata && <div className="event-back">
                                              {!noresult && 
                                                Object.entries(eventdata).map(([key, value], i) =>
                                                    <div key={i}>
                                                    <div className="event-month">
                                                        <span>{key}</span>
                                                    </div>
                                                        {value.map((data, index) => (
                                                            <div className="event-card">
                                                                <div className="row">
                                                                    <div className="col-md-8">
                                                                        <div className="event-message">
                                                                            <div className="event-date">
                                                                                <small>{data.day}</small>
                                                                                <span>{data.date}</span>
                                                                            </div>
                                                                            <div className="event-text">
                                                                                <span>{data.start_date} @ {data.start_time} - {data.end_date} @ {data.end_time}</span>
                                                                                <h3>
                                                                                    <Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                                                        {data.title}
                                                                                    </Link>
                                                                                </h3>
                                                                                {data.description && <p dangerouslySetInnerHTML={{ __html: data.description.substring(0, 350) }}></p>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="event-img">
                                                                            {!data.image && <img width="200px" src="images/Rectangle.png" />}
                                                                            {data.image && <img width="200px" src={data.image} />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    <br/>   
                                                </div>
                                              )}                                                  
                                            </div>}                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        {noresult &&
                            <div>
                                <center>
                                    <img height="250px" width="350px" src="images/hull-no-results.png" alt="author" />
                                    <div className="no-data">No results found.</div>
                                </center>
                            </div>
                        }
                    </div>
                </div>
            </section>            */}

            <Footer/>
        </div>
    )
}