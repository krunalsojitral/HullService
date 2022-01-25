import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
//import { useForm } from "react-hook-form";
import Sidebar from './Sidebar';
import $ from 'jquery';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';

export default function Events() {
   

    const pageLimit = 9;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    // const { user, isLoading } = useContext(UserContext);
    
    const [noresult, setNoresult] = React.useState(false)


    React.useEffect(() => {       
        getBlogData();
    }, [])


    const getBlogData = () => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = { headers: { Authorization: `${token}` } };
        axios.get(api_url + '/researches/getMyResearchesList', config).then((result) => {
            if (result.data.status) {
                var blogdata = result.data.response.data;
                if (blogdata.length > 0) {
                    setData(blogdata);
                    setNoresult(false);
                } else {
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

    React.useEffect(() => {    
        if (offset > 0) {
            $('html, body').animate({
                scrollTop: $("#scrolltop").offset().top
            }, 2);
        }
        setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);
   

    const getBlogDataWrap = () => {
        getBlogData(setData);
    };


    return(
        <div>
            <Header/>
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>My Studies</h2>
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
                        <div className="col-md-10">
                            <div className="studies-research">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="studies-title">
                                            <h2>Current Studies & Research</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="studies-Btn">
                                            <Link className="book-apoint" to={{ pathname: "/add-research" }}>
                                                Add Research
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 articlebox" id="scrolltop">

                                        {!noresult && currentData.map((data, index) => (
                                            <div className="studies-card" key={index}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="studies-list">
                                                            <h3>{data.topic}</h3>
                                                            <p>{data.description}</p>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                    <div className="studies-box">
                                                        <div className="studies-header">
                                                            <h3>Dr. Andrew Santino</h3>
                                                            <small>Doctor’s Field</small>
                                                        </div>
                                                        <a href="#" className="btn-apply">Apply</a>
                                                    </div>
                                                </div> */}
                                                </div>
                                            </div>
                                        ))}
                                        {noresult &&
                                            // <div className="blog-box">
                                            //     <div className="no-data">
                                            //         <img src="images/hull-no-results.png" alt="author" />
                                            //         No blog available.
                                            //     </div>
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
                    </div>
                </div>
            </section>           

            <Footer/>
        </div>
    )
}