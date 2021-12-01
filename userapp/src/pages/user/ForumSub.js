import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
//import { useForm } from "react-hook-form";
import Sidebar from './Sidebar';

export default function ForumSub() {

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
                                <a href="javascript:;">Back to Forum Categories</a>
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
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                            <tr>
                                                <td>How do I find an appropriate therapist for me?</td>
                                                <td>Need Advice</td>
                                                <td>47</td>
                                                <td>456</td>
                                                <td>HappyDude <span>10 minutes ago</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="pagination"></div>
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