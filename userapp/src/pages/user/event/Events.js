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
   

    const pageLimit = 9;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventdata, setEventData] = useState([]);
    const [currentData, setCurrentData] = useState([]);    
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
            axios.post(api_url + '/event/getPaidEventList', {}, config).then((result) => {
                if (result.data.status) {
                    var eventdata = result.data.response.data;
                    if (eventdata.length > 0) {
                        setEventData(eventdata);
                        setNoresult(false);
                    } else {
                        setNoresult(true);
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.post(api_url + '/event/getUnpaidEventList', {}).then((result) => {
                if (result.data.status) {
                    var eventdata = result.data.response.data;
                    if (eventdata.length > 0) {
                        setEventData(eventdata);
                        setNoresult(false);
                    } else {
                        setNoresult(true);
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    const todayEvent = () => {
        var data = {
            today : true
        }
        axios.post(api_url + '/event/getUnpaidEventList', data).then((result) => {
            if (result.data.status) {
                var eventdata = result.data.response.data;
                if (eventdata.length > 0) {
                    setEventData(eventdata);
                    setNoresult(false);
                } else {
                    setNoresult(true);
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        if (offset > 0) {
            $('html, body').animate({
                scrollTop: $("#scrolltop").offset().top
            }, 2);
        }
        setCurrentData(eventdata.slice(offset, offset + pageLimit));
    }, [offset, eventdata]);

    const bookmarkClick = (id) => {

        
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
                axios.post(api_url + '/event/getUnpaidEventList', obj).then((result) => {
                    if (result.data.status) {
                        var eventdata = result.data.response.data;
                        if (eventdata.length > 0) {
                            setEventData(eventdata);
                            setNoresult(false);
                        } else {
                            setNoresult(true);
                        }
                    } else {
                        setNoresult(true);
                        Swal.fire('Oops...', result.data.response.msg, 'error')
                    }
                }).catch((err) => {
                    console.log(err);
                    //Swal.fire('Oops...', err, 'error')
                })

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
        axios.post(api_url + '/event/getUnpaidEventList', obj).then((result) => {
            if (result.data.status) {
                var eventdata = result.data.response.data;
                if (eventdata.length > 0) {
                    setEventData(eventdata);
                    setNoresult(false);
                } else {
                    setNoresult(true);
                }
            } else {
                setNoresult(true);
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
            //Swal.fire('Oops...', err, 'error')
        })
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
                        <div className="col-md-1"></div>                     
                            <div className="col-md-10">
                                <div className="Event-List">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="Event-Search">
                                                <div className="row">
                                                    <div className="col-md-6 border-right google-serach">
                                                        <form onSubmit={handleSubmit(search)}>
                                                            <input type="text" onChange={onChangeSearch} className="form-control" name="search_name" placeholder="Search for Events" />
                                                            <img className="search-icon" src="images/search-icon.png" />
                                                        </form>

                                                        {/* <input type="text" className="form-control" placeholder="Search for Events" name="" /> */}
                                                        

                                                    </div>
                                                    <div className="col-md-6">
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
                                            <div className="event-back">

                                            {!noresult && currentData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="event-month">
                                                        <span>April 2022</span>
                                                    </div>
                                                    <div className="event-card">
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                <div className="event-message">
                                                                    <div className="event-date">
                                                                        <small>{data.day}</small>
                                                                        <span>{data.date}</span>
                                                                    </div>
                                                                    <div className="event-text">
                                                                        <span>{data.start_date} @ 8:00 am - {data.end_date} @ 5:00 pm</span>
                                                                        <h3>{data.title}</h3>
                                                                        <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
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
                                                    <br/>   
                                                </div>
                                                
                                            ))}
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </section>           

            <Footer/>
        </div>
    )
}