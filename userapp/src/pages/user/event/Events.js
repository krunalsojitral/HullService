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


export default function Events() {

    const [eventdata, setEventData] = useState([]);
    const [token, setToken] = useState('');
    const [noresult, setNoresult] = React.useState(false)

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

    const getEventDataQuery = (obj) => {
        axios.post(api_url + '/event/getUnpaidEventList', obj).then((result) => {
            if (result.data.status) {
                var eventdatas = result.data.response.data;
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

    return (
        <div>
            <Header />

            {!token ?
                <section className="second-banner-sec" style={{ background: `url('images/event-banner.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                    <div className="container">
                        <div className="second-banner-inner">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="text-box">
                                        <h2 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Our Events </h2>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="image-holder">
                                        <img src="images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                    </div>
                                </div>
                            </div>
                            <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="1000ms">
                                <img src="images/second-banner-shape.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div >
                </section > : null}

            <section className="training-course-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                <p>Pathways to Prevention’s work with the Neurosequential Model (NM) has given us a strong presence as leaders in trauma-informed care in the community and worldwide.  We train and educate service providers and experts from many disciplines — education, health care, the legal community, social services, early childhood development — and arm them with the most current information about developmental trauma, its impact on children and how to respond, thus equipping them with the skills to deliver best possible practice.  </p>
                                <p>Our commitment to the continued growth of knowledge through targeted research and training will continue to position Pathways to Prevention as having the expertise to train and build the capacity of other organizations and systems to more effectively identify and respond to developmental trauma in the populations they serve.  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="event-main">
                <div className="container">
                    <div className="researcher-heading">
                        <h3 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">Our Events</h3>
                        <p className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="1000ms">Training and courses are available for...
                        </p>
                    </div>
                    <div className="row" style={{ "marginTop": "60px" }}>
                        <div className="col-12">

                            {eventdata && eventdata.map((data, index) => (

                                <div className="event-card wow animate__fadeIn  " data-wow-duration="1000ms" data-wow-delay="1000ms" >
                                    <div className="event-card-left1">
                                        {!data.image && <img className="img-fluid img-event-fluid img-radius" alt="event-page" src="images/event-img.png" />}
                                        {data.image && <img className="img-fluid img-event-fluid img-radius" alt="event-page" src={data.image} />}
                                    </div>
                                    <div className="event-card-left1">
                                        <div className="event-name-title"><img src="images/user-icon.svg" alt="" className="img-fluid" /> {data.speaker_name} </div>
                                        <ul>
                                            <li><i><img src="images/clarity_date-solid.svg" alt="" /></i><span>{data.start_date}</span></li>
                                            <li><i><img src="images/bxs_time.svg" alt="" /></i><span>{data.start_time} - {data.end_time}</span></li>
                                            <li><i><img src="images/loc.svg" alt="" /></i><span>{data.location.substring(0, 15)}</span></li>
                                        </ul>
                                        <div className="desc event-list-line">
                                            <Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                                {data.title && data.title.substring(0, 120)}
                                            </Link>
                                        </div>
                                        <div className="event-readmore-btn"><Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}> readmore...</Link></div>
                                    </div>
                                    <div className="event-card-right1">
                                        <div className="price">
                                            {data.cost && <h4>${data.cost}</h4>}
                                            {(data.purchase_type == 'unpaid') && <h4>Free</h4>}
                                        </div>
                                        {data.event_purchase_id && <Link className="btn btn-default w-100" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                            View
                                        </Link>}
                                        {!data.event_purchase_id && <Link className="btn btn-default w-100" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
                                            Buy
                                        </Link>}
                                    </div>
                                </div>
                            ))}


                        </div >
                    </div >
                </div >
            </div>


            {!token ?
            <Footer /> : null}

        </div>

    )
}




// <section className="event-main">
//     <div className="container">
//         <div className="row">
//             {/* <div className="col-md-2 side-col">
//                 <Sidebar />
//             </div> */}
//             <div className="col-sm-12">
//                 {eventdata &&
//                     eventdata.map((data, index) => ( 
//                         <div className="media">
//                             {!data.image && <img alt="event-page" src="images/event-page.png" />}
//                             {data.image && <img alt="event-page" src={data.image} />}
//                             <div className="media-body">
//                                 <div className="media-left">
//                                     <div className="avatar">
//                                         <img alt="avatar" src="images/avatar.png" />
//                                         {/* {!data.speaker_image && <img alt="avatar" src="images/avatar.png" />}
//                                         {data.speaker_image && <img alt="avatar" src={data.speaker_image} />} */}
//                                         <h2>{data.speaker_name}</h2>
//                                     </div>
//                                     <div className="event-icons">
//                                         <label><img src="images/date.png" alt="date" />{data.start_date}</label>
//                                         <label><img src="images/time.png" alt="time" />{data.start_time} - {data.end_time}</label>
//                                         {data.location && <label><img src="images/location.png" alt="location" />{data.location.substring(0, 10)}</label>}
//                                     </div>
//                                     {data.title && <h3>{data.title.substring(0, 120)} </h3>}
//                                     <Link to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
//                                         Read more...
//                                     </Link>                                                
//                                 </div>
//                                 <div className="media-right">
//                                     {data.cost && <h4>${data.cost}</h4>}
//                                     {(data.purchase_type == 'unpaid') && <h4>Free</h4>}
//                                     {data.event_purchase_id && <Link className="thm-btn" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
//                                         View
//                                     </Link>}
//                                     {!data.event_purchase_id && <Link className="thm-btn" to={{ pathname: "/event-promo", search: "?id=" + data.event_id }}>
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






