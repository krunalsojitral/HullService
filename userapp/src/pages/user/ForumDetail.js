import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
//import { useForm } from "react-hook-form";
import Sidebar from './Sidebar';

export default function ForumDetail() { 

   
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
                                <h2 className="mb-0 text-center">How Do I Find An Appropriate Therapist For Me? </h2>
                                {/* <a href="javascript:;"> Back to Forum Categories</a> */}
                                     <div className="forum-post">
                                    <div className="forum-cal">
                                        <div className="forum-inner">
                                            <p><label>Started</label> <i>1 day ago </i></p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>Likes <label>22</label></p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>Replies <label>47</label></p>
                                        </div>
                                        <div className="forum-inner">
                                            <p>Views <label>456</label></p>
                                        </div>
                                    </div>
                                    <div className="forum-cat">
                                        <div className="forum-inner">
                                            <p>Category <label>Therapy</label></p>
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
                                <div className="forum-topic">
                                    <h4>NOV 3rd, 2021 11:00 am</h4>
                                    <div className="forum-chat">
                                        <div className="forum-title">
                                            <p><label>DocSmiles (OP)</label> researcher</p>
                                            <a href="javascript:;"><img src="images/briefcase.png" alt="briefcase" /><span>Oct 2021</span></a>
                                            <a href="javascript:;"><img src="images/edit.png" alt="briefcase" /><span>222 Posts</span></a>
                                        </div>
                                        <div className="forum-text">
                                            <p>Hey Everyone, <br /><br />
                                    Ive been having difficulty finding a therapist that works for me. have any of you experienced this? Got any tips on overcoming it?</p>
                                            <div className="forum-comments">
                                                <a href="javascript:;"><img src="images/like.png" alt="like" /> <span>+3</span></a>
                                                <div className="reply-forum">
                                                    <a href="javascript:;"><img src="images/reply.png" alt="reply" /> <span>Reply</span></a>
                                                    <a href="javascript:;"><img src="images/quote.png" alt="quote" /> <span>Quote</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="forum-topic">
                                    <h4>NOV 3rd, 2021 11:00 am</h4>
                                    <div className="forum-chat">
                                        <div className="forum-title">
                                            <p><label>DocSmiles (OP)</label> researcher</p>
                                            <a href="javascript:;"><img src="images/briefcase.png" alt="briefcase" /><span>Oct 2021</span></a>
                                            <a href="javascript:;"><img src="images/edit.png" alt="briefcase" /><span>222 Posts</span></a>
                                        </div>
                                        <div className="forum-text">
                                            <div className="replied-text">
                                                <p>Hey Everyone, <br /><br />
                                        Ive been having difficulty finding a therapist that works for me. have any of you experienced this? Got any tips on overcoming it?</p>
                                            </div>
                                            <p>Hope You find what you’re looking for. It’s often difficult to find the right mental health professional for you.</p>
                                            <div className="forum-comments">
                                                <a href="javascript:;"><img src="images/like-black.png" alt="like" /></a>
                                                <div className="reply-forum">
                                                    <a href="javascript:;"><img src="images/reply.png" alt="reply" /> <span>Reply</span></a>
                                                    <a href="javascript:;"><img src="images/quote.png" alt="quote" /> <span>Quote</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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