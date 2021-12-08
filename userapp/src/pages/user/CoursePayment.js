import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import Swal from "sweetalert2";
import axios from 'axios';
import api_url from '../../components/Apiurl';

export default function CoursePayment() {

    const [courseId, setCourseId] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const [description, setDescription] = React.useState('')
    let payPalRef = useRef()

    useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let course_id = params.get('id')
        setCourseId(course_id);

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        axios.post(api_url + '/course/getCoursePaymentDataById', { course_id },  config).then((result) => {
            if (result.data.status) {
                var coursedata = result.data.response.data;
                console.log(coursedata);
                setPrice(coursedata.sale_cost);
                setDescription(coursedata.title);
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })

        setTimeout(() => {
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: description,
                                    amount: {
                                        currency_code: 'USD',
                                        value: price
                                    }
                                }
                            ]
                        })
                    },
                    onApprove: async (data, actions) => {
                        return actions.order.capture().then(function (details) {
                            if (details.status === 'COMPLETED') {                                
                                coursePayment(details);
                            } else {
                                Swal.fire('Oops...', 'Payment cancelled, please try again.', 'error');
                            }

                        });
                    },
                    onError: (err) => {
                        Swal.fire('Oops...', 'Payment cancelled, please try again.', 'error');
                    },
                })
                .render(payPalRef)
        }, 50);

    }, [ price, description])

    const coursePayment = (paymentDetail) => {
        const registerData = localStorage.getItem('userdata');
        var data = JSON.parse(registerData);
        var obj = {
            user_id: data.id,
            order_id: paymentDetail,
            course_id: courseId
        }
        axios.post(api_url + '/course/purchase_course', obj).then(async (result) => {
            if (result.data.status) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: result.data.response.msg,
                    confirmButtonText: `ok`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                       // history.push("/login");
                    } else {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }

            //history.push('/login');
        })
            .catch((err) => {
               
            })
    }

   


    return (
        <div>
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
        </div>
    )
}