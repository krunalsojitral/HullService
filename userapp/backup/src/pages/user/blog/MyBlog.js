import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import Paginator from 'react-hooks-paginator';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../../components/Apiurl';
import './../../dev.css';
//import { UserContext } from './../../hooks/UserContext';
import $ from 'jquery';

export default function MyBlog() {

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [noresult, setNoresult] = React.useState(false);
   // const { user, isLoading } = useContext(UserContext);
   
    React.useEffect(() => {
        getBlogData();        
    }, [])

    const getBlogData = () => { 
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/blog/getBookMarkBlog', {}, config).then((result) => {
            if (result.data.status) {
                var coursedata = result.data.response.data;
                if (coursedata.length > 0) {
                    setData(coursedata);
                    setNoresult(false);
                } else {
                    setNoresult(true);
                }
            } else {
                setNoresult(true);
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
            //Swal.fire('Oops...', err, 'error')
        })
    }

    React.useEffect(() => {
        if (offset > 0) {
            $('html, body').animate({
                scrollTop: $("#scrolltop").offset().top
            }, 2);
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
                var blogdata = result.data.response.data.type;
                if (blogdata == 'remove') {
                    Swal.fire("Success!", 'Blog removed from your bookmark list', "success");
                } else {
                    Swal.fire("Success!", 'Blog added to your bookmark list', "success");
                }
                getBlogDataWrap();
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    const getBlogDataWrap = () => {
        getBlogData(setData);
    };
   

    return (
        <div>
            <Header />



            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>My Blogs</h2>
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

                        <div className="col-md-8 articlebox" id="scrolltop">
                            <div className="row">
                                {!noresult && currentData.map((data, index) => (<div key={data.blog_id} className="col-md-4">

                                    <div className="blog-box">
                                        <div className="blog-image">
                                            <Link to={{ pathname: "/blog-detail", search: "?id=" + data.blog_id }}>
                                                {data.image && <img src={data.image} alt="blog" />}
                                                {!data.image && <img src="images/blog.jpg" alt="blog" />}
                                            </Link>
                                        </div>
                                        <div className="blog-text">

                                            <div className="blog-tags" onClick={(e) => bookmarkClick(data.blog_id)}>
                                                {data.bookmark_blog_id && <img className="bookmark-fill" src="images/bookmark-fill.png" alt="bookmark-fill" />}
                                                {!data.bookmark_blog_id && <img className="bookmark-outline" src="images/bookmark-outline.png" alt="bookmark-fill" />}                                                
                                            </div>
                                                                                        
                                            <h3 className="tooltip-box">
                                                <Link to={{ pathname: "/blog-detail", search: "?id=" + data.blog_id }}>
                                                    {data.title.slice(0, 30)}
                                                    <span className="tooltip-title">{data.title}</span>
                                                </Link>
                                            </h3>
                                            <div className="blog-post">
                                                <div className="blog-author">
                                                    <img src="images/favicon.png" alt="author" />
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
                                {noresult &&
                                    <div>
                                        <center>
                                            <img height="250px" width="350px" src="images/hull-no-results.png" alt="author" />
                                            <div className="no-data">No results found.</div>
                                        </center>
                                    </div>
                                }

                            </div>
                            <div className="row">
                                {!noresult && currentData.length > 0 && <Paginator
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