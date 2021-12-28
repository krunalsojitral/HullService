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


export default function MyArticle() {
   
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

        axios.post(api_url + '/article/getBookMarkArticle', {}, config).then((result) => {
            if (result.data.status) {
                var coursedata = result.data.response.data;
                if (coursedata.length > 0) {
                    setData(coursedata);
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
    

    return(
        <div>
            <Header />
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Article</h2>
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
                                            <Link to={{ pathname: "/article-detail", search: "?id=" + data.article_id }}>
                                                {data.image && <img src={data.image} alt="blog" />}
                                                {!data.image && <img src="images/blog.jpg" alt="blog" />}
                                            </Link>
                                        </div>
                                        <div className="blog-text">
                                            <br />
                                            <h3 className="tooltip-box">
                                                <Link to={{ pathname: "/article-detail", search: "?id=" + data.article_id }}>
                                                    {data.title.slice(0, 30)}
                                                    <span className="tooltip-title">{data.title}</span>
                                                </Link>
                                            </h3>
                                            <div className="blog-post">
                                                <div className="blog-author">
                                                    <img src="images/hull-icon.png" alt="author" />
                                                    <p>Hull Service</p>
                                                </div>                                                
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