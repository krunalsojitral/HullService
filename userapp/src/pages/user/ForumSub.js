import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import Paginator from 'react-hooks-paginator';
import { useModal } from 'react-hooks-use-modal';
import DirectionModel from "./../DirectionModel";
import { useHistory } from "react-router-dom";

export default function ForumSub() {

    

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);

    

    React.useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let forum_heading_id = params.get('id')

        axios.post(api_url + '/forum/getForumSubHeadingList', { "forum_heading_id" : forum_heading_id }).then((result) => {
            if (result.data.status) {
                var forumdata = result.data.response;

                console.log(forumdata);
                setData(forumdata);
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })
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
                            <h2>Forum</h2>
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
                        <div class="col-md-7">
                            <div class="category-table">
                                <h2 class="mb-0">Welcoming Forums</h2>
                                <p>This is <b>not</b> a moderated forum. Please be polite to your peers. Be kind and remember the human on the other end.</p>
                                <br/>
                                {/* <a href="javascript:;">Back to Forum Categories</a> */}
                                <div class="forum-table table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Topic Title</th>
                                                <th>Category</th>
                                                <th>Replies</th>
                                                <th>Views</th>
                                                <th>Last Post</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentData.map((data, index) => (
                                                <tr>
                                                    <td><Link to={{ pathname: "/forum-detail", search: "?id=" + data.forum_id }}>{data.topic}</Link></td>
                                                    <td>{data.category_name}</td>
                                                    <td>47</td>
                                                    <td>456</td>
                                                    <td>HappyDude <span>10 minutes ago</span></td>
                                                </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                </div>
                                <div class="pagination">
                                    
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
                        <div class="col-md-3 article-tags">
                            <div class="video-tag">
                                <h3>Sort By Tags</h3>
                                <ul>
                                    <li><a class="active" href="#">Telemedicine</a></li>
                                    <li><a href="#">Mavisamankwah</a></li>
                                    <li><a href="#">Medilives</a></li>
                                    <li><a href="#">Blockchain</a></li>
                                    <li><a href="#">Mliv</a></li>
                                </ul>
                            </div>
                            <div class="banner-ads">
                                <a href="javascript:;"><img src="images/course-ad.png" alt="course-ad" /></a>
                                <a href="javascript:;"><img src="images/Banner-ad.png" alt="Banner-ad" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}