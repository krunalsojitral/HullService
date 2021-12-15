import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
//import { useForm } from "react-hook-form";
import Sidebar from './Sidebar';
import axios from 'axios';
import api_url from '../../components/Apiurl';
import Swal from "sweetalert2";

export default function ForumDetail() { 

    const [forumCommentList, setForumCommentList] = useState([]);
    const [forumCommentDetail, setForumCommentDetail] = useState([]);
    const [forumId, setForumId] = useState([]);

    React.useEffect(() => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        const params = new URLSearchParams(window.location.search) // id=123
        let forum_id = params.get('id')
        setForumId(forum_id);

        axios.post(api_url + '/forum/getForumCommentList', { 'forum_id': forum_id }, config).then((result) => {
            if (result.data.status) {
                var forumdata = result.data.response.data;
                setForumCommentList(forumdata);
            } else {
                // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })

        axios.post(api_url + '/forum/getForumCommentDetail', { 'forum_id': forum_id }, config).then((result) => {
            if (result.data.status) {
                var forumDetailData = result.data.response.data;
                setForumCommentDetail(forumDetailData);
            } else {
                // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })
    },[]);    

    const handleFollow = (id) => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/forum/followUser', { "forum_id": forumId }, config).then((result) => {
            if (result.data.status) {                     
                forumCommentDetail.follow = 1
            } 
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleUnFollow = () => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/forum/unfollowUser', { "forum_id": forumId }, config).then((result) => {
            if (result.data.status) {                
                forumCommentDetail.follow = 0
            } 
        }).catch((err) => {
            console.log(err);
        })
    }

    
   
   
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
                            <div className="category-table">
                                <h2 className="mb-0 text-center">How Do I Find An Appropriate Therapist For Me?</h2>
                                {/* <a href="javascript:;"> Back to Forum Categories</a> */}
                                <br />
                                <div className="forum-post">
                                    <div className="forum-cal">
                                        <div className="forum-inner">                                           
                                            <p><label>Started</label> <br/> <i>{forumCommentDetail.started} </i></p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>Likes <br /> <label>{forumCommentDetail.likes}</label></p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>Replies <br /> <label>{forumCommentDetail.replies}</label></p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>Views <br /> <label>{forumCommentDetail.views}</label></p>
                                        </div>
                                    </div>
                                    <div className="forum-cat">
                                        <div className="forum-inner">
                                            <p onClick={(e) => handleFollow()} >                                                 
                                                {forumCommentDetail.follow == 0 && 'Follow'}
                                            </p>
                                            <p onClick={(e) => handleUnFollow()} >
                                                {forumCommentDetail.follow == 1 && 'Followed'}                                                
                                            </p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>Last Post <label>1 min</label></p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>HappyDude</p>
                                        </div>
                                        <div className="forum-inner">
                                            <a href="javascript:;"><img src="images/forward.png" alt="forward" /></a>
                                        </div>
                                    </div>
                                </div>
                                <br/>



                                {forumCommentList.map((data, index) => (
                                    <div className="forum-topic">
                                        <h4>{data.created_on}</h4>
                                        <div className="forum-chat">
                                            <div className="forum-title">
                                                <p><label>{data.first_name} {data.last_name} </label> {data.role}</p>
                                            </div>
                                            <div className="forum-text">

                                                {data.parent && data.parent.length > 0 && <div className="replied-text">
                                                    {data.parent[0].comment}
                                                </div>}

                                                <p>{data.comment}</p>
                                                <div className="forum-comments">
                                                    <a href="javascript:;"><img src="images/like.png" alt="like" /> <span>+3</span></a>
                                                    <div className="reply-forum">
                                                        <a href="javascript:;"><img src="images/reply.png" alt="reply" /> <span>Reply</span></a>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}



                               

                            </div>
                            <div className="pagination">

                            </div>
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