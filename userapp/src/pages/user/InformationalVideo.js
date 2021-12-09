import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import Paginator from 'react-hooks-paginator';
import axios from 'axios';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import api_url from '../../components/Apiurl';
import './../dev.css';

export default function Video() {

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [searchtext, setSearchtext] = React.useState('')
    const { handleSubmit, formState } = useForm();
    const [selectedFilter, setSelectedFilter] = useState("desending");



    React.useEffect(() => {

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
                    setData(videodata);
                } else {
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
                    setData(videodata);
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
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
                                    <div className="dashboard-content">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <form onSubmit={handleSubmit(search)}>
                                                    <div className="form-group search-input video-flex">
                                                        <input type="text" onChange={onChangeSearch} className="form-control" name="search_name" placeholder="Search…" />
                                                        <button className="btn-submit-video" type="button">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-12">
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
                                            </div>
                                        </div>
                                        <div className="row">
                                            {currentData.map((data, index) => (
                                                <div key={index} className="col-md-6 col-lg-4">
                                                    <div className="video-card">
                                                        <div className="video-img">
                                                            <iframe width="100%" height="195px" title="YouTube video player" src={`https://www.youtube.com/embed/${data.video_embeded_id}?rel=0&modestbranding=1&showinfo=0`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>                                                            
                                                        </div>
                                                        <h3 class="tooltip-box">
                                                            <Link to={{ pathname: "/video-detail", search: "?id=" + data.video_id }}>
                                                             {data.title.slice(0, 30)}
                                                            <span className="tooltip-title">{data.title}</span>
                                                            </Link>
                                                        </h3>
                                                        <div className="video-bottom">
                                                            <p><img src="images/hull-icon.png" alt="author" />Hull Service</p>
                                                            <Link to={{ pathname: "/video-detail", search: "?id=" + data.video_id }}><img src="images/video.png" alt="video" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {
                                                currentData.length == 0 &&
                                                <div className="video-card">
                                                    <div className="no-data">No video available.</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="pagination">
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
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}