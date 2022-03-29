import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import Sidebar from './user/Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../components/Apiurl';
import './dev.css';

export default function DynamicPage() {    

    const [pageMenu, setPageMenu] = React.useState('')
    const [dynamicPageDetail, setDynamicPageDetail] = React.useState({})    

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search) // id=123
        let menu = params.get('menu')
        setPageMenu(menu);
        axios.post(api_url + '/common/getDynamicPageDataByMenu', { menu }).then((result) => {
            if (result.data.status) {
                var data = result.data.response.data;
                setDynamicPageDetail(data);
            } else {
                setDynamicPageDetail({})
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    

   
   
    return (
        <div>
            <Header />

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>{dynamicPageDetail.pageSlug}</h2>
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
                        <div className="col-md-7 bg-white">
                            <div className="research-main">
                                <div className="research-title">
                                    <h2>{dynamicPageDetail.title}</h2>
                                </div>                                
                                <div className="research-box">                                    
                                    <div className="research-profile">
                                        <img src="images/hull-icon.png" alt="author" />
                                        <p>Hull Service</p>
                                    </div>
                                        <div className="research-date">
                                        <label>{dynamicPageDetail.created_at}</label>
                                        </div>
                                    </div>
                                {dynamicPageDetail.image && <div className="video-image"><img src={dynamicPageDetail.image} alt="author" /></div>}
                                <div className="video-text" dangerouslySetInnerHTML={{ __html: dynamicPageDetail.description }}></div>
                                </div>
                            </div>                       
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}