import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import api_url from '../../../components/Apiurl';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';

export default function EventPayment(props) {

    const [eventdata, setEventdata] = useState();

    let history = useHistory();
    let payPalRef = useRef();
    

    useEffect(() => {
        setEventdata(props.location.data)
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: props.location.event_title,
                                amount: {
                                    currency_code: 'USD',
                                    value: props.location.price
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    return actions.order.capture().then(function (details) {
                        console.log('details',details);
                        
                        if (details.status === 'COMPLETED') {
                            console.log(details.id);
                            console.log(details.status);
                            eventPayment(details.id);
                        } else {
                            Swal.fire('Oops...', 'Payment cancelled, please try again.', 'error');
                        }

                    });
                },
                onError: (err) => {
                    console.log('err',err);
                    Swal.fire('Oops...', 'Payment cancelled, please try again.', 'error');
                },
            })
            .render(payPalRef)
    }, [props.location.event_title, props.location.price]);

    const eventPayment = (paymentDetail) => {
        
        //console.log(props.location.data);

        // const registerData = props.location.data;
        // var data = JSON.parse(registerData);

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = { headers: { Authorization: `${token}` } };
        
        var data = eventdata;
        data.payment_id = paymentDetail

        console.log(data);
        console.log(config);
        
        if (token) {
            axios.post(api_url + '/event/eventRegisterWithUser', data, config).then(async (result) => {
                if (result.data.status) {
                    Swal.fire('Success!', 'Please check your email for event link.', 'success');
                    history.push("/");                   
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

    return (
        <>
            <Header />
            <div className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="login-box">
                                {/* {!loaded && <div><center><LoadSpinner /></center></div>} */}
                                <div ref={v => (payPalRef = v)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}