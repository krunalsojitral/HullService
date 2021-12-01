import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import Paginator from 'react-hooks-paginator';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import { UserContext } from './../../hooks/UserContext';


export default function Blog() {

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);

    const { user, isLoading } = useContext(UserContext);
    


    React.useEffect(() => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token){
            axios.post(api_url + '/blog/getPaidBlogList', {}, config).then((result) => {
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
        }else{

            axios.post(api_url + '/blog/getUnpaidBlogList', {}).then((result) => {
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

        }
       



    }, [])

    React.useEffect(() => {
        if (offset > 0) {
            // $('html, body').animate({
            //     scrollTop: $("#scrolltop").offset().top
            // }, 2);
        }
        setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);

    const bookmarkClick = (id) => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/blog/blogBookmark', { "blog_id": id }, config).then((result) => {
            if (result.data.status) {
                var blogdata = result.data.response.data;
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <Header />
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Blogs</h2>
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

                        <div className="col-md-8 articlebox">
                            <div className="row">
                                {currentData.map((data, index) => (<div key={index} className="col-md-4">

                                    <div className="blog-box">
                                        <div className="blog-image">
                                            <Link to={{ pathname: "/blog-detail", search: "?id=" + data.blog_id }}>
                                                {data.image && <img src={data.image} alt="blog" />}
                                                {!data.image && <img src="images/blog.jpg" alt="blog" />}
                                            </Link>
                                        </div>
                                        <div className="blog-text">
                                            <div className="blog-tags" onClick={(e) => bookmarkClick(data.blog_id)}>
                                                {/* <p>Telemedicine</p> */}                                                
                                                <img className="bookmark-fill" src="images/bookmark-fill.png" alt="bookmark-fill" />
                                                {/* <img className="bookmark-outline" src="images/bookmark-outline.png" alt="bookmark-fill" /> */}

                                                
                                            </div>
                                            <h3><Link to={{ pathname: "/blog-detail", search: "?id=" + data.blog_id }}> {data.title.slice(0, 46)}</Link></h3>
                                            <div className="blog-post">
                                                <div className="blog-author">
                                                    <img src="images/hull-icon.png" alt="author" />
                                                    <p>Hull Service</p>
                                                </div>
                                                {/* <div className="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div> */}
                                                <div className="date">{data.created_at}</div>
                                            </div>
                                        </div>
                                    </div>

                                </div> 
                                ))}
                                {
                                    currentData.length == 0 && 
                                    <div className="blog-box">
                                        <div className="no-data">No blog available.
                                        </div>
                                    </div>
                                }                               

                            </div>
                            <div className="row">
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