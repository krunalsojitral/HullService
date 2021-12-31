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
//import { UserContext } from './../../hooks/UserContext';


export default function MyVideo() {

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [noresult, setNoresult] = React.useState(false)

    //const { user, isLoading } = useContext(UserContext);

    React.useEffect(() => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/video/getBookMarkVideo', {}, config).then((result) => {
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
                                            {!noresult && currentData.map((data, index) => (
                                                <div key={index} className="col-md-6 col-lg-4">
                                                    <div className="video-card">
                                                        {data.purchase_type == 'paid' && <div className="video-img tooltip-video">
                                                            <iframe class="ytplayer" id="ytplayer" width="100%" height="195px" title="YouTube video player" src={`https://www.youtube.com/embed/${data.video_embeded_id}?rel=0&modestbranding=1&showinfo=0`} autoplay="false"></iframe>
                                                            <span class="tooltip-title">Paid Video.</span>
                                                        </div>}

                                                        {data.purchase_type == 'unpaid' &&
                                                            <div className="video-img">
                                                                <iframe width="100%" height="195px" title="YouTube video player" src={`https://www.youtube.com/embed/${data.video_embeded_id}?rel=0&modestbranding=1&showinfo=0`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                                            </div>
                                                        }
                                                        <div className="blog-text">                                                         
                                                            <h3 className="tooltip-box">
                                                                <Link to={{ pathname: "/video-detail", search: "?id=" + data.video_id }}>
                                                                    {data.title.slice(0, 30)}
                                                                    <span className="tooltip-title">{data.title}</span>
                                                                </Link>
                                                            </h3>
                                                            <div className="video-bottom">
                                                                <p><img src="images/hull-icon.png" alt="author" />Hull Service</p>
                                                                {data.purchase_type == 'paid' && <p className="price">${data.cost}</p>}
                                                                {data.purchase_type == 'unpaid' && <p className="price">Free</p>}
                                                                {/* <Link to={{ pathname: "/video-detail", search: "?id=" + data.video_id }}><img src="images/video.png" alt="video" /></Link> */}
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