import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import Paginator from 'react-hooks-paginator';
import axios from 'axios';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import api_url from '../../../components/Apiurl';
import './../../dev.css';
import $ from 'jquery';

export default function Video() {

    const pageLimit = 9;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [searchtext, setSearchtext] = React.useState('')
    const { handleSubmit, formState } = useForm();
    const [selectedFilter, setSelectedFilter] = useState("desending");
    const [noresult, setNoresult] = React.useState(false)
    const [token, setToken] = useState('');

    React.useEffect(() => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);
        getVideoData();
        getVideoDataWrap();
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
            axios.post(api_url + '/video/getPaidVideoList', obj, config).then((result) => {
                if (result.data.status) {
                    var videodata = result.data.response.data;
                    if (videodata.length > 0){
                        setData(videodata);
                        setNoresult(false);
                    }else{
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
        } else {
            axios.post(api_url + '/video/getUnpaidVideoList', obj, config).then((result) => {
                if (result.data.status) {
                    var videodata = result.data.response.data;
                    if (videodata.length > 0) {
                        setData(videodata);
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
    }

    const bookmarkClick = (id) => {        
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/video/videoBookmark', { "video_id": id }, config).then((result) => {
            if (result.data.status) {
                //var blogdata = result.data.response.data;
                var videodata = result.data.response.data.type;
                if (videodata == 'remove') {
                    Swal.fire("Success!", 'Video removed from your dashboard', "success");
                } else {
                    Swal.fire("Success!", 'Video added to your dashboard', "success");
                }
                getVideoDataWrap();
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const getVideoData = () => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token) {
            axios.post(api_url + '/video/getPaidVideoList', {}, config).then((result) => {
                if (result.data.status) {
                    var videodata = result.data.response.data;
                    if (videodata.length > 0) {
                        setData(videodata);
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

            axios.post(api_url + '/video/getUnpaidVideoList', {}).then((result) => {
                if (result.data.status) {
                    var videodata = result.data.response.data;
                    if (videodata.length > 0) {
                        setData(videodata);
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
        }

    }

    const getVideoDataWrap = () => {
        getVideoData(setData);
    };

    return (
        <div>
            <Header />
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Informational Videos</h2>
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
                                    <div className="dashboard-content" id="scrolltop">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <form onSubmit={handleSubmit(search)}>
                                                    <div className="form-group search-input video-flex">
                                                        <input type="text" onChange={onChangeSearch} className="form-control" name="search_name" placeholder="Search…" />
                                                        <button className="btn-submit-video" type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                            {!noresult && currentData.length > 0 &&<div className="col-md-12">
                                                <div className="page-title search">
                                                    <div className="your-result">
                                                        <div className="col-md-9"><h3 className="page-name">Your results</h3></div>
                                                        <div className="col-md-3">
                                                            <select style={{ height: `48px` }} className="form-control" name="filter" onChange={e => filterClick(e.target.value)} value={selectedFilter}>
                                                                <option key="0" value="descending">Newest First</option>
                                                                <option key="1" value="ascending">Older First </option>
                                                            </select>
                                                        </div>
                                                        {/* <a href="#">
                                                            <img alt="filter" src="images/filter.png" />
                                                        </a> */}
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                        <div className="row">
                                            {!noresult && currentData.length > 0 && currentData.map((data, index) => (
                                                <div key={index} className="col-md-6 col-lg-4">
                                                    <div className="video-card">
                                                        {data.purchase_type == 'paid' && 
                                                            <div className="video-img tooltip-video">  
                                                            <iframe className="ytplayer" id="ytplayer" width="100%" height="195px" title="YouTube video player" src={`https://www.youtube.com/embed/${data.video_embeded_id}?rel=0&modestbranding=1&showinfo=0`} autoplay="false"></iframe>
                                                            <span className="tooltip-title">Paid Video.</span>
                                                            </div>
                                                        }

                                                        {data.purchase_type == 'unpaid' &&
                                                            <div className="video-img"> 
                                                                <iframe width="100%" height="195px" title="YouTube video player" src={`https://www.youtube.com/embed/${data.video_embeded_id}?rel=0&modestbranding=1&showinfo=0`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                                            </div>
                                                        }

                                                        <div className="blog-text">
                                                            <div className="blog-icon">
                                                                {token &&
                                                                    <div className="blog-tags" onClick={(e) => bookmarkClick(data.video_id)}>
                                                                        {data.bookmark_video_id && <img className="bookmark-fill" src="images/bookmark-fill.png" alt="bookmark-fill" />}
                                                                        {!data.bookmark_video_id && <img className="bookmark-outline" src="images/bookmark-outline.png" alt="bookmark-fill" />}
                                                                    </div>}
                                                                {token && data.video_order_id && <div><img src="images/buy.png" alt="buy" /></div>}
                                                            </div>

                                                            {!token && <br />}

                                                            <h3 className="tooltip-box">
                                                                <Link to={{ pathname: "/video-detail", search: "?id=" + data.video_id }}>
                                                                {data.title.slice(0, 30)}
                                                                <span className="tooltip-title">{data.title}</span>
                                                                </Link>
                                                            </h3>

                                                            <div className="blog-post">
                                                                <div className="blog-author">
                                                                    <img src="images/favicon.png" alt="author" />
                                                                    <p>Hull Service</p>
                                                                </div>                                                                
                                                                <div className="date">
                                                                    {data.purchase_type == 'paid' && <p className="price">${data.cost}</p>}
                                                                    {data.purchase_type == 'unpaid' && <p className="price">Free</p>}
                                                                    {/* {data.created_at} */}
                                                                </div>
                                                            </div>

                                                            {/* <div className="video-bottom">
                                                                <p><img src="images/favicon.png" alt="author" />Hull Service</p>
                                                                {data.purchase_type == 'paid' && <p className="price">${data.cost}</p>}
                                                                {data.purchase_type == 'unpaid' && <p className="price">Free</p>}                                                                
                                                            </div> */}

                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                            {noresult &&
                                                // <div className="video-card">
                                                //     <img height="250px" width="350px" src="images/hull-no-results.png" alt="author" />
                                                //     <div className="no-data">No results found.</div>
                                                // </div>
                                                <div>
                                                    <center>
                                                        <img height="250px" width="350px" src="images/hull-no-results.png" alt="author" />
                                                        <div className="no-data">No results found.</div>
                                                    </center>                                                    
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="pagination">
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
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}