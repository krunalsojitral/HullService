import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Swal from "sweetalert2";
import axios from 'axios';
import api_url from '../../../components/Apiurl';
import { useHistory } from "react-router-dom";

export default function ArticlePayment() {

    let history = useHistory();

    const [articleId, setArticleId] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const [description, setDescription] = React.useState('')
    let payPalRef = useRef()

    useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let article_id = params.get('id')
        setArticleId(article_id);

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        axios.post(api_url + '/article/getarticleDataById', { article_id },  config).then((result) => {
            if (result.data.status) {
                var articledata = result.data.response.data;
                setPrice(articledata.cost);
                setDescription(articledata.title);
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
                                articlePayment(details);
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

    const articlePayment = (paymentDetail) => {
        const registerData = localStorage.getItem('userdata');
        var data = JSON.parse(registerData);
        console.log(paymentDetail);
        var obj = {
            user_id: data.id,
            order_id: paymentDetail.id,
            article_id: articleId
        }
        axios.post(api_url + '/article/purchase_article', obj).then(async (result) => {
            if (result.data.status) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    html:
                        'Please visit the ' +
                        '<a href="/article-detail?id=' + articleId + '">link</a> ' +
                        'to read the article',
                    confirmButtonText: `ok`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push("/my-article");
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