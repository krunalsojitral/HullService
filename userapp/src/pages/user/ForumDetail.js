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
                        <div class="col-md-7">
                            <div class="category-table">
                                <h2 class="mb-0 text-center">How Do I Find An Appropriate Therapist For Me? </h2>
                                {/* <a href="javascript:;"> Back to Forum Categories</a> */}
                                     <div class="forum-post">
                                    <div class="forum-cal">
                                        <div class="forum-inner">
                                            <p><label>Started</label> <i>1 day ago </i></p>
                                        </div>
                                        <div class="forum-inner">
                                            <p>Likes <label>22</label></p>
                                        </div>
                                        <div class="forum-inner">
                                            <p>Replies <label>47</label></p>
                                        </div>
                                        <div class="forum-inner">
                                            <p>Views <label>456</label></p>
                                        </div>
                                    </div>
                                    <div class="forum-cat">
                                        <div class="forum-inner">
                                            <p>Category <label>Therapy</label></p>
                                        </div>
                                        <div class="forum-inner">
                                            <p>Last Post <label>1 min</label></p>
                                        </div>
                                        <div class="forum-inner">
                                            <p>HappyDude</p>
                                        </div>
                                        <div class="forum-inner">
                                            <a href="javascript:;"><img src="images/forward.png" alt="forward" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="forum-topic">
                                    <h4>NOV 3rd, 2021 11:00 am</h4>
                                    <div class="forum-chat">
                                        <div class="forum-title">
                                            <p><label>DocSmiles (OP)</label> researcher</p>
                                            <a href="javascript:;"><img src="images/briefcase.png" alt="briefcase" /><span>Oct 2021</span></a>
                                            <a href="javascript:;"><img src="images/edit.png" alt="briefcase" /><span>222 Posts</span></a>
                                        </div>
                                        <div class="forum-text">
                                            <p>Hey Everyone, <br /><br />
                                    Ive been having difficulty finding a therapist that works for me. have any of you experienced this? Got any tips on overcoming it?</p>
                                            <div class="forum-comments">
                                                <a href="javascript:;"><img src="images/like.png" alt="like" /> <span>+3</span></a>
                                                <div class="reply-forum">
                                                    <a href="javascript:;"><img src="images/reply.png" alt="reply" /> <span>Reply</span></a>
                                                    <a href="javascript:;"><img src="images/quote.png" alt="quote" /> <span>Quote</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="forum-topic">
                                    <h4>NOV 3rd, 2021 11:00 am</h4>
                                    <div class="forum-chat">
                                        <div class="forum-title">
                                            <p><label>DocSmiles (OP)</label> researcher</p>
                                            <a href="javascript:;"><img src="images/briefcase.png" alt="briefcase" /><span>Oct 2021</span></a>
                                            <a href="javascript:;"><img src="images/edit.png" alt="briefcase" /><span>222 Posts</span></a>
                                        </div>
                                        <div class="forum-text">
                                            <div class="replied-text">
                                                <p>Hey Everyone, <br /><br />
                                        Ive been having difficulty finding a therapist that works for me. have any of you experienced this? Got any tips on overcoming it?</p>
                                            </div>
                                            <p>Hope You find what you’re looking for. It’s often difficult to find the right mental health professional for you.</p>
                                            <div class="forum-comments">
                                                <a href="javascript:;"><img src="images/like-black.png" alt="like" /></a>
                                                <div class="reply-forum">
                                                    <a href="javascript:;"><img src="images/reply.png" alt="reply" /> <span>Reply</span></a>
                                                    <a href="javascript:;"><img src="images/quote.png" alt="quote" /> <span>Quote</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="pagination">

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