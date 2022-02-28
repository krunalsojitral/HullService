import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import LoadSpinner from './LoadSpinner/LoadSpinner';
import Swal from "sweetalert2";
import api_url from './../components/Apiurl';
import axios from "axios";


export default function MemberPayment() {
    
    const { registerUser } = useAuth();
    const [price, setPrice] = React.useState(0);
   
    let payPalRef = useRef()

    const product = {
        description: 'Hull Service Registration'
    }

    useEffect(() => {

        axios.get(api_url + "/common/getMembershipFees", {})
            .then((result) => {
                if (result.data.status) {
                    var usersdata = result.data.response.data;
                    setPrice(usersdata[0].membership_fees);
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            })
            .catch((err) => { console.log(err); });

        setTimeout(() => { 
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
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
                            const registerData = localStorage.getItem('registerdata');
                            var data = JSON.parse(registerData);
                            data.payment_id = details.id
                            registerUser(data);
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

        },50);

       

    }, [price, product.description])

    


    return (
        <div>
            <Header />

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Payment</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dashboard-card">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-md-8">
                            <div class="dashboard-content">
                                <div className="membership-card">
                                    <h3>Paypal/Credit Card</h3>
                                    <br/>
                                    <br />
                                    {/* {!loaded && <div><center><LoadSpinner /></center></div>} */}
                                    <div ref={v => (payPalRef = v)} />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="order-summery">
                                <h3>&nbsp;</h3>
                                <table>
                                    <tr>
                                        <td>Membership fees</td>
                                        <td>${price}.00</td>
                                    </tr>
                                    <tr>
                                        <td class="footer-td">Total</td>
                                        <td class="footer-td">${price}.00</td>
                                    </tr>
                                </table>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>        

            {/* <div className="login-section">
                <div className="container">
                    <div className="row">                       
                      
                    </div>
                </div>
            </div>       */}
            <Footer />
        </div>
    )
}