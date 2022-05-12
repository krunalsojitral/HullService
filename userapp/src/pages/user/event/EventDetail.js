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
    const [token, setToken] = useState('');

    React.useEffect(() => {

        
        

        const params = new URLSearchParams(window.location.search) // id=123
        let event_id = params.get('id')
        setEventId(event_id);

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);
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
        localStorage.setItem('eventPurchaseData', JSON.stringify(data));
        history.push("/event-cart");
    }

    return(
        <div>
            <Header/>


            {!token && <section className="second-banner-sec" style={{ background: `url('images/event-banner.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="container">
                    <div className="second-banner-inner">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="text-box">
                                    <h2 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Our Events</h2>
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
                </div>
            </section>}
            <div className="event-main">
                <div className="container">
                    <ul className="nav nav-tabs eventTabs wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" id="myTab" role="tablist">
                        <li role="presentation">
                            <a href="javascript:;" className="active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Event</a>
                        </li>
                        <li role="presentation">
                            <a href="javascript:;" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Reflective Practice Sessions</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="back-btn-right clearfix" style="text-align:right;">
                                    <div className="rate-btn mt-5 "><a href="javascript:;" className="btn btn-default white sm-btn"><span>Back</span></a></div>
                                </div>
                            </div>
                            <div className="eventDetail">
                                <div className="row">
                                    <div className="col-lg-5 text-lg-end">
                                        <div className="img-holder ringLeft ">
                                            <img src="images/event.png" alt="" className="wow animate__fadeInLeft" data-wow-duration="1000ms" data-wow-delay="1000ms"/>
                                            <img src="images/Ellipse2.png" alt="" className="ellipse wow animate__fadeIn" data-wow-duration="1500ms" data-wow-delay="1000ms"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">                               
                                        <div className="content event-card no-shadow">
                                            <div className="event-card-left1">
                                                <div className="event-name-title"><img src="images/user-icon.svg" alt="" className="img-fluid"/> John Smith</div>
                                                <div className="desc event-list-line">The Effects of this Behaviour in Parents </div>
                                                <ul className="mt-50">
                                                    <li><i><img src="images/clarity_date-solid.svg" alt=""/></i><span>12-7-2022</span></li>
                                                    <li><i><img src="images/bxs_time.svg" alt=""/></i><span>9:00pm - 10:30pm</span></li>
                                                    <li><i><img src="images/loc.svg" alt=""/></i><span>United States</span></li>
                                                </ul>

                                                <div className="rate-btn mt-5"><a href="javascript:;" className="btn btn-default w-100">$99.00 <span>Register for events only</span></a></div>
                                                <div className="rate-btn mt-3"><a href="javascript:;" className="btn btn-default white w-100">$99.00 <span>Register for Event and Reflection <br/>Pracice Session</span></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail">
                                    <p className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt placerat felis ullamcorper et. Et nunc dui quis nunc amet mattis. Cursus facilisis nullam erat eu dolor porttitor sed netus. Non vitae quis neque et ut pretium, non sit mattis. Leo, tincidunt nulla venenatis, egestas sed eget. Volutpat facilisi et vel placerat ac placerat varius elit et. Faucibus aliquam nunc tortor odio non sagittis, lectus fusce.
                                        <br/>  Duis in purus nibh sagittis malesuada nisl velit eget. Nisi, morbi cras senectus nec proin non velit. Nec eget aliquam ipsum interdum ullamcorper. Proin nunc etiam vitae enim aliquet euismod vitae tempor. Lobortis commodo, arcu, amet ipsum eu eget feugiat. Diam lectus dictumst sit tempor, tellus proin morbi augue.
                                        Vulputate eleifend pellentesque ipsum vitae nibh leo volutpat condimentum. Non arcu sapien rhoncus amet vulputate nunc integer. Eget hac massa, lectus mollis bibendum rutrum. Quis pulvinar aliquam libero leo posuere. Nunc quam neque ullamcorper fermentum, est libero. Diam aliquet vitae gravida aliquet diam condimentum aliquam. Tortor faucibus pellentesque posuere eleifend in hendrerit cursus. Enim, velit quam donec eu, ultricies. Diam eu senectus pretium commodo ut quis nunc. Non id neque, nulla at ornare nisi. Lorem nisl id in ante in sed et. Dignissim nam cras velit lacinia fames. Viverra at urna amet iaculis dignissim mi orci ut. Egestas id massa amet 
                                    </p>
                                </div>
                                <hr/>
                                <div className="about-event">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="img-holder">
                                                <img src="images/about.png" alt="" className="wow animate__fadeInLeft" data-wow-duration="800ms" data-wow-delay="1000ms"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="content">
                                                <h4 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">About John Charlie</h4>
                                                <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="1000ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt placerat felis ullamcorper et. Et nunc dui quis nunc amet mattis. Cursus facilisis nullam erat eu dolor porttitor sed netus. Non vitae quis neque et ut pretium, non sit mattis. Leo, tincidunt nulla venenatis, egestas sed eget. Volutpat facilisi et vel placerat ac placerat varius elit et. Faucibus aliquam nunc tortor odio non sagittis, lectus fusce.
                                                    <br/>  Duis in purus nibh sagittis malesuada nisl velit eget. Nisi, morbi cras senectus nec proin non velit. Nec eget aliquam ipsum interdum ullamcorper. Proin nunc etiam vitae enim aliquet euismod vitae tempor. Lobortis commodo, arcu, amet ipsum eu eget feugiat. Diam lectus dictumst sit tempor, tellus proin morbi augue.
                                                    Vulputate eleifend pellentesque ipsum vitae nibh leo volutpat condimentum. Non arcu sapien rhoncus amet vulputate nunc integer. Eget hac massa, lectus mollis bibendum rutrum. Quis pulvinar aliquam libero leo posuere. Nunc quam neque ullamcorper fermentum, est libero. Diam aliquet vitae gravida aliquet diam condimentum aliquam. Tortor faucibus pellentesque posuere eleifend in hendrerit cursus. Enim, velit quam donec eu, ultricies. Diam eu senectus pretium commodo ut quis nunc. Non id neque, nulla at ornare nisi. Lorem nisl id in ante in sed et. Dignissim nam cras velit lacinia fames. Viverra at urna amet iaculis dignissim mi orci ut. Egestas id massa amet 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="reflective-card">
                                <h4 >16th Annual Society of Consulting Psychology Winter Conference</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non. Aliquet aliquam sapien non Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non. Aliquet aliquam sapien non</p>
                                <div className="card-warning">
                                    <i><img src="images/waring.svg" alt=""/></i>
                                    <div className="media-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non.</div>
                                </div>
                                <div className="reflective-duration">
                                    <h5><img src="images/bxs_time.svg" alt=""/>Duration : 4 Months(21 APRIL to 21 July)</h5>
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a href="javascript:;" className="nav-link" id="pills-Mon-tab" data-bs-toggle="pill" data-bs-target="#pills-Mon" role="tab" aria-controls="pills-Mon" aria-selected="true">Mon</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a href="javascript:;" className="nav-link" id="pills-Tue-tab" data-bs-toggle="pill" data-bs-target="#pills-Tue" role="tab" aria-controls="pills-Tue" aria-selected="false">Tue</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a href="javascript:;" className="nav-link  active" id="pills-Wed-tab" data-bs-toggle="pill" data-bs-target="#pills-Wed" role="tab" aria-controls="pills-Wed" aria-selected="false">Wed</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a href="javascript:;" className="nav-link" id="pills-Thu-tab" data-bs-toggle="pill" data-bs-target="#pills-Thu" role="tab" aria-controls="pills-Thu" aria-selected="false">Thu</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a href="javascript:;" className="nav-link" id="pills-Fri-tab" data-bs-toggle="pill" data-bs-target="#pills-Fri" role="tab" aria-controls="pills-Fri" aria-selected="false">Fri</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade" id="pills-Mon" role="tabpanel" aria-labelledby="pills-Mon-tab">...</div>
                                        <div className="tab-pane fade" id="pills-Tue" role="tabpanel" aria-labelledby="pills-Tue-tab">...</div>
                                        <div className="tab-pane fade  show active" id="pills-Wed" role="tabpanel" aria-labelledby="pills-Wed-tab">
                                            <div className="duration-inner">
                                                <ul>
                                                    <li>
                                                        <label className="check ">10AM to 12PM
                                                            <input type="checkbox" checked="checked" name="is_name"/>
                                                                <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="check ">2pm to 5PM
                                                            <input type="checkbox" checked="checked" name="is_name"/>
                                                                <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="check ">2pm to 5PM
                                                            <input type="checkbox" checked="checked" name="is_name"/>
                                                                <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                </ul>
                                                <div className="text-center">
                                                    <a className="btn btn-default" href="javascript:;">Submit</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-Thu" role="tabpanel" aria-labelledby="pills-Thu-tab">...</div>
                                        <div className="tab-pane fade" id="pills-Fri" role="tabpanel" aria-labelledby="pills-Fri-tab">...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            


            {/* <section className="inner-header">
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
                                                <li className="active"><a data-toggle="tab" href="javascript:;home">Events</a></li>
                                                <li><a data-toggle="tab" href="javascript:;menu1">Follow up meetings</a></li>
                                                <li><a data-toggle="tab" href="javascript:;menu2">Resources</a></li>
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
                                                                
                                                                <div className="event-listing-text">
                                                                    <button type="button" className="btn-save">Join</button>
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
            </section>            */}

            <Footer/>
        </div>
    )
}