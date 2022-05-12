import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
//import { useForm } from "react-hook-form";
import Sidebar from './../Sidebar';

export default function Events() {
   

//     const { loginUser } = useAuth();

//    // const [isFirstRadioLoaded, setIsFirstRadioLoaded] = useState(false);  

//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = async (data) => {
//         var obj = {
//             email: data.email,
//             password: data.password
//         }

//        // setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
//         await loginUser(obj);

//     }

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
                            <div className="Event-List">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="Event-Search">
                                            <div className="row">
                                                <div className="col-md-6 border-right">
                                                    <input type="text" className="form-control" placeholder="Search for Events" name="" />
                                                    <img className="search-icon" src="images/search-icon.png" />

                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control" placeholder="Search for Events" name="" />
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
                                            <div className="page-change-label">
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
                                            <div className="event-month">
                                                <span>April 2022</span>
                                            </div>
                                            <div className="event-card">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="event-message">
                                                            <div className="event-date">
                                                                <small>FRI</small>
                                                                <span>18</span>
                                                            </div>
                                                            <div className="event-text">
                                                                <span>April 14, 2022 @ 8:00 am - June 8, 2022 @ 5:00 pm</span>
                                                                <h3>16th Annual Society of Consulting Psychology Winter Conference</h3>
                                                                <small>NYC PsyClinic 1051 Riverside DrNew York,</small>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="event-img">
                                                            <img src="images/Rectangle.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="event-card">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="event-message">
                                                            <div className="event-date">
                                                                <small>FRI</small>
                                                                <span>18</span>
                                                            </div>
                                                            <div className="event-text">
                                                                <span>April 14, 2022 @ 8:00 am - June 8, 2022 @ 5:00 pm</span>
                                                                <h3>16th Annual Society of Consulting Psychology Winter Conference</h3>
                                                                <small>NYC PsyClinic 1051 Riverside DrNew York,</small>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="event-img">
                                                            <img src="images/Rectangle.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="event-month">
                                                <span>April 2022</span>
                                            </div>
                                            <div className="event-card">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="event-message">
                                                            <div className="event-date">
                                                                <small>FRI</small>
                                                                <span>18</span>
                                                            </div>
                                                            <div className="event-text">
                                                                <span>April 14, 2022 @ 8:00 am - June 8, 2022 @ 5:00 pm</span>
                                                                <h3>16th Annual Society of Consulting Psychology Winter Conference</h3>
                                                                <small>NYC PsyClinic 1051 Riverside DrNew York,</small>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="event-img">
                                                            <img src="images/Rectangle.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="event-card">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="event-message">
                                                            <div className="event-date">
                                                                <small>FRI</small>
                                                                <span>18</span>
                                                            </div>
                                                            <div className="event-text">
                                                                <span>April 14, 2022 @ 8:00 am - June 8, 2022 @ 5:00 pm</span>
                                                                <h3>16th Annual Society of Consulting Psychology Winter Conference</h3>
                                                                <small>NYC PsyClinic 1051 Riverside DrNew York,</small>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel hac vel et faucibus turpis. Eu sit egestas molestie platea nunc risus, lacus. Congue vestibulum mauris nunc id. Ac sit dis pellentesque egestas urna nisl.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="event-img">
                                                            <img src="images/Rectangle.png" />
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
                </div>
            </section>           

            <Footer/>
        </div>
    )
}