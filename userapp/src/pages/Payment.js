import React, { useState, useRef, useEffect } from 'react'
import useAuth from './../hooks/useAuth';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import LoadSpinner from './LoadSpinner/LoadSpinner';
import Swal from "sweetalert2";

export default function Payment() {
    
    const { registerUser } = useAuth();
   
    let payPalRef = useRef()

    const product = {
        price: '3.00',
        description: 'Hull Service Registration'
    }

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    currency_code: 'USD',
                                    value: product.price
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
                            registerUser(data);     
                        }else{
                            Swal.fire('Oops...', 'Payment cancelled, please try again.', 'error');
                        }
                        
                    });
                },
                onError: (err) => {                    
                    Swal.fire('Oops...', 'Payment cancelled, please try again.', 'error');
                },
            })
            .render(payPalRef)
    }, [product.price, product.description])

    


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