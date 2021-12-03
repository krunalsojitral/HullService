import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import { useModal } from 'react-hooks-use-modal';
import DirectionModel from "./../DirectionModel";
import { useHistory } from "react-router-dom";

export default function Forum() {
   
    const [forumList, setForumList] = useState([]);

    React.useEffect(() => { 
        axios.get(api_url + '/forum/getForumHeadingList').then((result) => {
            if (result.data.status) {
                var forumdata = result.data.response;
                setForumList(forumdata);
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })
    }, [])
   

    return(
        <div>
            <Header/>
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
                        <div className="col-md-7">
                            
                            {forumList.map((data, index) => (
                                 <div className="category-table">
                                    <h2 className="mb-0">{data.forumheading_name}</h2>

                                    <Link to={{ pathname: "/forum-sub", search: "?id=" + data.forumheading_id }}>
                                        View More >>
                                    </Link>

                                    <br />
                                    <div className="forum-table table-responsive">
                                        <table className="table">
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
                                                {data.forum.map((forumdata, index) => (
                                                    <tr>
                                                        <td>{forumdata.topic}</td>
                                                        <td>{forumdata.category_name}</td>
                                                        <td>{forumdata.total_view}</td>
                                                        <td>456</td>
                                                        <td>HappyDude <span>10 minutes ago</span></td>
                                                    </tr>
                                                ))}                                             
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="pagination"></div>
                                </div>
                             ))} 
                           
                        </div>
                        <div className="col-md-3 article-tags">
                            <div className="video-tag">
                                <h3>Sort By Tags</h3>
                                <ul>
                                    <li><a className="active" href="#">Telemedicine</a></li>
                                    <li><a href="#">Mavisamankwah</a></li>
                                    <li><a href="#">Medilives</a></li>
                                    <li><a href="#">Blockchain</a></li>
                                    <li><a href="#">Mliv</a></li>
                                </ul>
                            </div>
                            <div className="banner-ads">
                                <a href="javascript:;"><img src="images/course-ad.png" alt="course-ad"/></a>
                                <a href="javascript:;"><img src="images/Banner-ad.png" alt="Banner-ad"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>                    
            <Footer/>
        </div>
    )
}