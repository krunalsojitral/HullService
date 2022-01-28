import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../../components/Apiurl';
import './../../dev.css';
import { useForm } from "react-hook-form";
import Paginator from 'react-hooks-paginator';
import $ from 'jquery';

export default function ProfessionalDevelopment() {

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [searchtext, setSearchtext] = React.useState('')
    const { handleSubmit, formState } = useForm();
    const [selectedFilter, setSelectedFilter] = useState("");
    const [noresult, setNoresult] = React.useState(false)
    const [token, setToken] = useState('');

    React.useEffect(() => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token)
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token) {
            axios.post(api_url + '/course/getPaidcourseList', {}, config).then((result) => {
                if (result.data.status) {
                    var coursedata = result.data.response.data;
                    if (coursedata.length > 0) {
                        setData(coursedata);
                        setNoresult(false);
                    }else{
                        setNoresult(true);
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
                //Swal.fire('Oops...', err, 'error')
            })
        } else {

            axios.post(api_url + '/course/getUnpaidcourseList', {}).then((result) => {
                if (result.data.status) {
                    var coursedata = result.data.response.data;
                    if (coursedata.length > 0) {
                        setData(coursedata);
                        setNoresult(false);
                    }else{
                        setNoresult(true);
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [])

    React.useEffect(() => {
        if (offset > 0) {
            $('html, body').animate({
                scrollTop: $("#scrolltop").offset().top
            }, 2);
        }
        setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);

    const filterClick = (value) => {
        setSelectedFilter(value);
        search_api(searchtext, value)
    }

    const onChangeSearch = (e) => { setSearchtext(e.currentTarget.value); }

    const search = (value) => {       
        search_api(searchtext, selectedFilter)
    }

    const search_api = (search, sortby) => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = { headers: { Authorization: `${token}` } };
        var obj = {
            "search": search,
            "sortby": sortby,
        }
        if (token) {
            axios.post(api_url + '/course/getPaidcourseList', obj, config).then((result) => {
                if (result.data.status) {
                    var coursedata = result.data.response.data;
                    if (coursedata.length > 0){
                        setData(coursedata);
                        setNoresult(false);
                    }else{
                        setNoresult(true);
                    }                    
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {                
                //Swal.fire('Oops...', err, 'error')
            })
        } else {
            axios.post(api_url + '/course/getUnpaidcourseList', obj, config).then((result) => {
                if (result.data.status) {
                    var coursedata = result.data.response.data;
                    if (coursedata.length > 0) {
                        setData(coursedata);
                        setNoresult(false);
                    } else {
                        setNoresult(true);
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {                
                //Swal.fire('Oops...', err, 'error')
            })
        }
    }


    return (
        <div>
            <Header />
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Professional Development</h2>
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
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="personal-courses" id="scrolltop">


                                        <div className="row">
                                            <div className="col-md-12">   
                                            
                                                <form onSubmit={handleSubmit(search)}>
                                                    <div className="search-box">
                                                        <div className="form-group">
                                                            <button type="button"><img src="images/search.png" alt="search" /></button>
                                                            <input type="text" onChange={onChangeSearch} className="form-control" name="search_name" placeholder="Search…" />
                                                        </div>
                                                    </div>
                                                </form>
                                                
                                                {!noresult && currentData.length > 0 && <div className="page-title search">
                                                    <div className="your-result">
                                                        <div className="col-md-9"><h3 className="page-name">Your results</h3></div>
                                                        <div className="col-md-3">
                                                            <select style={{ height: `48px` }} className="form-control" name="filter" onChange={e => filterClick(e.target.value)} value={selectedFilter}>
                                                                <option key="0" value="">Filter</option>
                                                                <option key="1" value="low">Low Price</option>
                                                                <option key="2" value="high">High Price</option>
                                                                <option key="3" value="paid">Paid</option>
                                                                <option key="4" value="unpaid">UnPaid</option>                                                               
                                                            </select>
                                                        </div>                                                        
                                                    </div>

                                                </div>}
                                            </div>
                                        </div>

                                        <div className="row">

                                            {!noresult && currentData.length > 0 && currentData.map((data, index) => (
                                                <div key={index} className="col-md-6 col-lg-4">
                                                    <div className="blog-box">
                                                        <div className="blog-image">
                                                            <Link to={{ pathname: "/professional-development-detail", search: "?id=" + data.course_id }}>
                                                                {data.image_thumb && <img src={data.image_thumb} alt="course" />}
                                                                {!data.image && <img src="images/blog.jpg" alt="course" />}
                                                            </Link>                                                                                                                       
                                                        </div>
                                                        <div className="blog-text">                                                           
                                                            <br/>
                                                            <h3 className="tooltip-box">
                                                                <Link to={{ pathname: "/professional-development-detail", search: "?id=" + data.course_id }}>
                                                                    {data.title.slice(0, 30)}
                                                                    <span className="tooltip-title">{data.title}</span>
                                                                </Link>
                                                            </h3>
                                                            <div className="blog-post">
                                                                <div className="blog-author">
                                                                    <img src="images/favicon.png" alt="author" />
                                                                    <p>Hull Service</p>
                                                                </div>                                                                
                                                                <div className="date">{data.created_at}</div>
                                                            </div>
                                                            <div className="video-card">
                                                                <div className="add-to-cart">
                                                                    <div className="price">
                                                                        <p>${data.sale_cost}</p><label>${data.main_cost}</label>
                                                                    </div>
                                                                    <div className="cart-btn">
                                                                        {/* <div className="blog-icon">
                                                                            {token && data.course_order_id && <div><img src="images/buy.png" alt="buy" /></div>}
                                                                        </div> */}
                                                                        {token && data.course_order_id && <img style={{"marginRight":"5px"}} src="images/buy.png" alt="buy" />}
                                                                        <Link to={{ pathname: "/professional-development-detail", search: "?id=" + data.course_id }}>View Detail</Link>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div> 
                                                       
                                                    </div>
                                                </div>
                                            ))}
                                            {noresult &&
                                                // <div className="blog-box">
                                                //     <div className="no-data">No course available.</div>
                                                // </div>
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
                            <div className="row">
                                <div className="col-md-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}