import React, { useState } from 'react';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import Sidebar from './user/Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from './../components/Apiurl';
import { useHistory } from "react-router-dom";

export default function Preview() {
    let history = useHistory();
    
    const [detail, setDetail] = React.useState({})    

    React.useEffect(() => {                

        axios.get(api_url + '/common/getPreview').then((result) => {
            if (result.data.status) {
                var previewdata = result.data.response.data;
                setDetail(previewdata)


                
            } else {
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
                            <h2>Preview</h2>
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
                                    <h2>{detail.title}</h2>
                                </div>
                                <div className="research-box">
                                    <div className="research-profile">
                                        <img src="images/hull-icon.png" alt="author" />
                                        <p>Hull Service</p>
                                    </div>
                                    <div className="research-date">
                                        <label>{detail.created_at}</label>
                                    </div>
                                </div>
                                {(detail.image && (detail.module_type == 'article' || detail.module_type == 'blog')) && <div className="video-image"><img src={detail.image} alt="author" /></div>}
                                {(detail.videoid && detail.module_type == 'video') && <iframe width="100%" height="555px" src={`https://www.youtube.com/embed/${detail.videoid}?rel=0&modestbranding=1&showinfo=0`} title="YouTube video player" allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>}

                                <div className="video-text" dangerouslySetInnerHTML={{ __html: detail.description }}></div>
                            </div>
                        </div>
                        <div className="col-md-3 article-tags">
                            {detail.tag && detail.tag.length > 0 &&
                                <div className="video-tag">
                                    <h3>Tags</h3>
                                    <ul>
                                        {detail.tag.map(data => (<li><a href="javascript:;">{data.label}</a></li>))}
                                    </ul>
                                </div>}                           
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}