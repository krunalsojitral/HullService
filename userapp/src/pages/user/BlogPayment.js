import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import Swal from "sweetalert2";
import axios from 'axios';
import api_url from '../../components/Apiurl';
import { useHistory } from "react-router-dom";
import Sidebar from './Sidebar';
const gm = require('gm');

export default function BlogPayment() {

    let history = useHistory();

    const [blogId, setBlogId] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const [description, setDescription] = React.useState('')
    let payPalRef = useRef()

    useEffect(() => {
        

        const params = new URLSearchParams(window.location.search) // id=123
        let blog_id = params.get('id')
        setBlogId(blog_id);

        axios.post(api_url + '/blog/getBlogDataById', { blog_id }).then((result) => {
            if (result.data.status) {
                var blogdata = result.data.response.data;
                console.log(blogdata);
                setPrice(blogdata.cost);
                setDescription(blogdata.title);
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
                                blogPayment(details);
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

    const blogPayment = (paymentDetail) => {
        const registerData = localStorage.getItem('userdata');
        var data = JSON.parse(registerData);
        
        var obj = {
            user_id: data.id,
            order_id: paymentDetail.id,
            blog_id: blogId
        }
        axios.post(api_url + '/blog/purchase_blog', obj).then(async (result) => {
            if (result.data.status) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    html:
                        'Please visit the ' +
                        '<a href="/blog-detail?id=' + blogId +'">link</a> ' +
                        'to read the blog',
                    confirmButtonText: `ok`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push("/my-blog");
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

        // <div>
        //     <Header />
        //     <section className="inner-header">
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col-md-12">
        //                     <h2>Blog Payment</h2>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        //     <section className="dashboard-card">
        //         <div className="container-fluid">
        //             <div className="row">
        //                 <div className="col-md-2 side-col">
        //                     <Sidebar />
        //                 </div>
        //                 <div className="col-md-7 bg-white">
        //                     <div className="research-main">
        //                         <br /> 
        //                         <div ref={v => (payPalRef = v)} />
        //                     </div>                            
        //                 </div>                       
        //             </div>
        //         </div>
        //     </section>
        //     <Footer />
        // </div>



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