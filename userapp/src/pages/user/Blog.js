import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import Paginator from 'react-hooks-paginator';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';

export default function Blog() {

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);


    React.useEffect(() => {

        axios.get(api_url + '/blog/getUserBlogList').then((result) => {
            if (result.data.status) {
                var blogdata = result.data.response.data;
                if (blogdata.length > 0) {
                    setData(blogdata);
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
            //Swal.fire('Oops...', err, 'error')
        })
    }, [])

    React.useEffect(() => {
        if (offset > 0) {
            // $('html, body').animate({
            //     scrollTop: $("#scrolltop").offset().top
            // }, 2);
        }
        setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);

    return (
        <div>
            <Header />
            <section class="inner-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Blog</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section class="dashboard-card">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2 side-col">
                            <Sidebar />
                        </div>

                        <div class="col-md-8 articlebox">
                            <div class="row">
                                {currentData.map(data => (<div class="col-md-4">
                                    <div class="blog-box">
                                        <div class="blog-image">
                                            {data.image && <img src={data.image} alt="blog" />}
                                            {!data.image && <img src="images/blog.jpg" alt="blog" />}
                                        </div>
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>{data.title.slice(0, 46)}</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    {data.avatar && <img src={data.avatar} alt="author" />}
                                                    {!data.avatar && <img src="images/hull-icon.png" alt="author" />}
                                                    <p>{data.name}</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">{data.created_at}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                ))}
                                {
                                    currentData.length == 0 && 
                                    <div class="blog-box">
                                        <div className="no-data">No blog available.
                                        </div>
                                    </div>
                                }                               

                            </div>
                            <div class="row">
                                {
                                    currentData.length > 0 && <Paginator
                                        totalRecords={data.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}

                                    />}
                            </div>
                            
                        </div>

                       </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}