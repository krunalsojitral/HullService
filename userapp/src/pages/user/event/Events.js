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


            <section class="second-banner-sec" style={{ background: `url('images/event-banner.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-7">
                                    <div class="text-box">
                                        <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Our Events </h2>
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

            <section class="training-course-sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="content  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                <p>Pathways to Prevention’s work with the Neurosequential Model (NM) has given us a strong presence as leaders in trauma-informed care in the community and worldwide.  We train and educate service providers and experts from many disciplines — education, health care, the legal community, social services, early childhood development — and arm them with the most current information about developmental trauma, its impact on children and how to respond, thus equipping them with the skills to deliver best possible practice.  </p>
                                <p>Our commitment to the continued growth of knowledge through targeted research and training will continue to position Pathways to Prevention as having the expertise to train and build the capacity of other organizations and systems to more effectively identify and respond to developmental trauma in the populations they serve.  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
			
            <div class="event-main">
                <div class="container">
					<div class="researcher-heading">
                        <h3  class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">Our Events</h3>
                        <p  class="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="1000ms">Training and courses are available for... 
                        </p>
                    </div>
                    <div class="row" style={{"margin-top":"60px"}}>
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
                                        {!data.event_purchase_id && <Link class="btn btn-default w-100" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                            Buy
                                        </Link>}
                                    </div> 
                                </div>
                            ))}   
      
							
                        </div >
                    </div > 
                </div >
            </div>

           

            <Footer />
        
        </div>
            
    )
}




// <section class="event-main">
//     <div class="container">
//         <div class="row">
//             {/* <div className="col-md-2 side-col">
//                 <Sidebar />
//             </div> */}
//             <div class="col-sm-12">
//                 {eventdata &&
//                     eventdata.map((data, index) => ( 
//                         <div class="media">
//                             {!data.image && <img alt="event-page" src="images/event-page.png" />}
//                             {data.image && <img alt="event-page" src={data.image} />}
//                             <div class="media-body">
//                                 <div class="media-left">
//                                     <div class="avatar">
//                                         <img alt="avatar" src="images/avatar.png" />
//                                         {/* {!data.speaker_image && <img alt="avatar" src="images/avatar.png" />}
//                                         {data.speaker_image && <img alt="avatar" src={data.speaker_image} />} */}
//                                         <h2>{data.speaker_name}</h2>
//                                     </div>
//                                     <div class="event-icons">
//                                         <label><img src="images/date.png" alt="date" />{data.start_date}</label>
//                                         <label><img src="images/time.png" alt="time" />{data.start_time} - {data.end_time}</label>
//                                         {data.location && <label><img src="images/location.png" alt="location" />{data.location.substring(0, 10)}</label>}
//                                     </div>
//                                     {data.title && <h3>{data.title.substring(0, 120)} </h3>}
//                                     <Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
//                                         Read more...
//                                     </Link>                                                
//                                 </div>
//                                 <div class="media-right">
//                                     {data.cost && <h4>${data.cost}</h4>}
//                                     {(data.purchase_type == 'unpaid') && <h4>Free</h4>}
//                                     {data.event_purchase_id && <Link class="thm-btn" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
//                                         View
//                                     </Link>}
//                                     {!data.event_purchase_id && <Link class="thm-btn" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
//                                         Buy
//                                     </Link>}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}                            
//             </div>
//         </div>
//     </div>
// </section> 






