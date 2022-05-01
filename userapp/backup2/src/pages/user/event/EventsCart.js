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

export default function EventsCart() {

    let history = useHistory();

    const [eventdata, setEventData] = useState([]);
    const [eventId, setEventId] = useState('');
    const [eventCost, setEventCost] = useState(0);
    const [token, setToken] = useState('');
    const [eventDetail, seteventDetail] = React.useState({})

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

        const eventString = localStorage.getItem('eventPurchaseData');
        var eventID = JSON.parse(eventString);
        setEventId(eventID.event_id)
        setEventCost(eventID.cost)

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);
        getEventData(eventID.event_id);

        if (token) {
            const config = { headers: { Authorization: `${token}` } };
            axios.get(api_url + "/user/getEditUserById", config)
                .then((result) => {
                    if (result.data.status) {
                        var userdata = result.data.response.data;
                        setFormValue('first_name', userdata.first_name)
                        setFormValue('last_name', userdata.last_name)
                        setFormValue('email', userdata.email)
                        setFormValue('confirmemail', userdata.email)
                    }
                })
                .catch((err) => { console.log(err); });
        }
    }, [])


    const getEventData = (eventID) => {

        axios.post(api_url + '/event/getEventDataById', { event_id: eventID }).then((result) => {
            if (result.data.status) {
                var eventdata = result.data.response.data;
                console.log(eventdata.group_session);
                seteventDetail(eventdata);
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    const onSubmit = (data) => {
        data.event_id = eventId
        data.event_title = eventDetail.title
        data.payment_id = ''
        if (eventCost > 0){
            history.push({
                pathname: '/event-payment',
                price: eventCost,
                data: data
            });
        }else{
            const config = { headers: { Authorization: `${token}` } };
            if (token) {
                axios.post(api_url + '/event/eventRegisterWithUser', data, config).then(async (result) => {
                    if (result.data.status) {
                        Swal.fire('Success!', 'Please check your email for event link.', 'success');
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
                }).catch((err) => { return '' })
            } else {
                axios.post(api_url + '/event/eventRegisterWithoutUser', data, config).then(async (result) => {
                    if (result.data.status) {
                        Swal.fire('Success!', 'Please check your email for event link.', 'success');
                        history.push("/");                   
                    } else {
                        Swal.fire('Oops...', result.data.response.msg, 'error')
                    }
                }).catch((err) => { return ''; })
            }
        }
    }

    const loginClick = (event_id) => {
        localStorage.setItem('last_visit_url', '/event-cart');
        history.push("/login");
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
                <div className="container-fluid" style={{'background':'#fff'}}>
                    <div className="row">
                        {/* <div className="col-md-2 side-col">
                            <Sidebar />
                        </div> */}
                        <div className="col-md-1"></div>

                        <div className="col-md-10">
                            <br/>
                            <div className="Event-List">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="event-cart">
                                            <span>1 x {eventDetail.title}</span>
                                            <hr />

                                            {eventCost > 0 &&
                                                <div>
                                                    <div>Price : ${eventCost}.00</div>
                                                    <div>Total  ${eventCost}.00</div>
                                                </div>}

                                            {eventCost == 0 &&
                                                <div>
                                                    <div>Price : Free</div>
                                                    <div>Total  Free</div>
                                                </div>}

                                            <hr />

                                            <h4>Contact information</h4>

                                            {!token && <h5>Continue as guest or <a style={{'cursor':'pointer', 'color':'blue'}} onClick={(e) => loginClick(eventDetail.event_id)}>login</a> for a faster experience.</h5>}

                                            <hr />

                                            <div>
                                                <div className="login-box">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="login-details">

                                                            <div className="form-group">
                                                                <Controller
                                                                    name={"first_name"}
                                                                    control={control}
                                                                    rules={{ required: true }}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <input
                                                                            type="text"
                                                                            onChange={onChange}
                                                                            value={value}
                                                                            className="form-control"
                                                                            placeholder={`First Name *`}
                                                                        />
                                                                    )}
                                                                ></Controller>

                                                                {errors.first_name && errors.first_name.type === "required" && (
                                                                    <small className="error">First Name is required.</small>
                                                                )}
                                                            </div>
                                                            <div className="form-group">
                                                                <Controller
                                                                    name={"last_name"}
                                                                    control={control}
                                                                    rules={{ required: true }}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <input
                                                                            type="text"
                                                                            onChange={onChange}
                                                                            value={value}
                                                                            className="form-control"
                                                                            placeholder={`Last Name *`}
                                                                        />
                                                                    )}
                                                                ></Controller>
                                                                {errors.last_name && errors.last_name.type === "required" && (
                                                                    <small className="error">Last Name is required.</small>
                                                                )}
                                                            </div>

                                                            <div className="form-group">
                                                                <Controller
                                                                    name={"email"}
                                                                    control={control}
                                                                    rules={{
                                                                        required: true,
                                                                        pattern: {
                                                                            value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                                                        },
                                                                    }}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <input
                                                                            type="email"
                                                                            onChange={onChange}
                                                                            className="form-control"
                                                                            value={value}
                                                                            placeholder={`Email *`}
                                                                        />
                                                                    )}
                                                                ></Controller>
                                                                <div>
                                                                    {(errors.email?.type === "required" && <small className="error">email is required</small>)}
                                                                    {(errors.email?.type === "pattern" && <small className="error">Please enter valid email id.</small>)}
                                                                </div>

                                                            </div>
                                                            <div className="form-group">

                                                                <Controller
                                                                    name={"confirmemail"}
                                                                    control={control}
                                                                    rules={{
                                                                        validate: value => value === email.current || "Email do not match",
                                                                        required: true,
                                                                    }}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <input
                                                                            type="email"
                                                                            onChange={onChange}
                                                                            className="form-control"
                                                                            value={value}
                                                                            placeholder={`Confirm email *`}
                                                                        />
                                                                    )}
                                                                ></Controller>

                                                                <div id="confirm_password_error">
                                                                    {(errors.confirmemail?.type === "required" && <small className="error">Confirm email is required</small>)}
                                                                    {errors.confirmemail && <small className="error">{errors.confirmemail.message}</small>}
                                                                </div>
                                                            </div>



                                                            {/* <div className="form-group checkbox">
                                                                <Controller
                                                                    control={control}
                                                                    name="terms_condition"
                                                                    rules={{ required: true }}
                                                                    render={({
                                                                        field: { onChange, onBlur, value, name, ref },
                                                                        fieldState: { invalid, isTouched, isDirty, error },
                                                                        formState,
                                                                    }) => (
                                                                        <input
                                                                            type="checkbox"
                                                                            onBlur={onBlur} // notify when input is touched
                                                                            onChange={onChange} // send value to hook form
                                                                            checked={value}
                                                                            inputRef={ref}
                                                                        />
                                                                    )}
                                                                />
                                                                <span>&nbsp;Keep me updated on more events and news from this event organizer.</span><br />
                                                                {errors.terms_condition && errors.terms_condition.type === "required" && (
                                                                    <small className="error">This is required.</small>
                                                                )}
                                                            </div> */}

                                                            {/* <div className="form-group checkbox">
                                                                <Controller
                                                                    control={control}
                                                                    name="subscribe"
                                                                    render={({
                                                                        field: { onChange, onBlur, value, name, ref },
                                                                        fieldState: { invalid, isTouched, isDirty, error },
                                                                        formState,
                                                                    }) => (
                                                                        <input
                                                                            type="checkbox"
                                                                            onBlur={onBlur} // notify when input is touched
                                                                            onChange={onChange} // send value to hook form
                                                                            checked={value}
                                                                            inputRef={ref}
                                                                        />
                                                                    )}
                                                                />
                                                                <span>&nbsp;Send me emails about the best events happening nearby or online.</span><br />
                                                            </div> */}


                                                            <button type="submit" className="sign-btn">Register</button>

                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2"></div>


                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}