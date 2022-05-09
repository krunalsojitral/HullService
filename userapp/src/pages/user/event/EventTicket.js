import React, { useState, useRef, ref } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../../components/Apiurl';
import $ from 'jquery';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';


export default function EventTicket() {
   

    let history = useHistory();
    const [eventdata, setEventData] = useState([]);
    const [token, setToken] = useState('');
    const [noresult, setNoresult] = React.useState(false)

    const {
        handleSubmit,
        control,
        watch,
        setValue: setFormValue,
        formState: { errors },
    } = useForm();

    const email = useRef({});
    email.current = watch("email", "");

    React.useEffect(() => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);
        getEventData();
    }, [])


    const getEventData = () => {
        
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token) {
            axios.post(api_url + '/event/getUnpaidEventList', {}, config).then((result) => {
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
                    console.log(eventdata);
                    if (eventdata.length > 0) {
                        console.log('tetse');
                        console.log(eventdata);
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

    const onSubmit = (data) => { 
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token){
            
            axios.post(api_url + '/event/eventRegisterWithUser', data, config).then(async (result) => {
                if (result.data.status) {
                    Swal.fire('Success!', 'We will verify your detail and send you confirmation mail after approval.', 'success');
                    history.push("/");
                    // Swal.fire({
                    //     title: 'Success!',
                    //     icon: 'success',
                    //     text: result.data.response.msg,
                    //     confirmButtonText: `ok`,
                    // }).then((result) => {
                    //     /* Read more about isConfirmed, isDenied below */
                    //     if (result.isConfirmed) {
                    //         history.push("/login");
                    //     } else {
                    //         Swal.fire('Changes are not saved', '', 'info')
                    //     }
                    // })
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            })
                .catch((err) => {
                    return ''
                })
        }else{
            axios.post(api_url + '/event/eventRegisterWithoutUser', data, config).then(async (result) => {
                if (result.data.status) {
                    Swal.fire('Success!', 'We will verify your detail and send you confirmation mail after approval.', 'success');
                    history.push("/");
                    // Swal.fire({
                    //     title: 'Success!',
                    //     icon: 'success',
                    //     text: result.data.response.msg,
                    //     confirmButtonText: `ok`,
                    // }).then((result) => {
                    //     /* Read more about isConfirmed, isDenied below */
                    //     if (result.isConfirmed) {
                    //         history.push("/login");
                    //     } else {
                    //         Swal.fire('Changes are not saved', '', 'info')
                    //     }
                    // })
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            })
                .catch((err) => {
                    return '';
                })
        }
        
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
                            <div className="Event-List">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="event-cart">
                                            
                                            
                                            
                                            

                                            <div className="row">
                                               
                                                <div className="col-md-4">
                                                    <h4>Print Ticket</h4>
                                                    <h4>Print Ticket</h4>
                                                    <h4>Print Ticket</h4>
                                                </div>
                                                <div className="col-md-8"></div>
                                                
                                            </div>
                                            
                                        </div>

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
            </section>           

            <Footer/>
        </div>
    )
}