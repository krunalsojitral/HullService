import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import './../dev.css';
//import { useForm } from "react-hook-form";

export default function Articles() {


    //     const { loginUser } = useAuth();

    //    // const [isFirstRadioLoaded, setIsFirstRadioLoaded] = useState(false);  

    //     const { register, handleSubmit, formState: { errors } } = useForm();
    //     const onSubmit = async (data) => {
    //         var obj = {
    //             email: data.email,
    //             password: data.password
    //         }

    //        // setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
    //         await loginUser(obj);

    //     }

    return (
        <div>
            <Header />
            <section class="inner-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Article</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section class="dashboard-card">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2 side-col">
                            <Sidebar />
                        </div>

                        <div class="col-md-8 articlebox">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="blog-box">
                                        <img src="images/blog-1.png" alt="blog" />
                                        <div class="blog-text">
                                            <div class="blog-tags">
                                                <p>Telemedicine</p>
                                                <a href="javascript:;"><img src="images/bookmark-fill.png" alt="bookmark-fill" /></a>
                                            </div>
                                            <h3>The Team with Penny Tompson, MICE and Account…</h3>
                                            <div class="blog-post">
                                                <div class="blog-author">
                                                    <img src="images/author.png" alt="author" />
                                                    <p>Amanda Smith</p>
                                                </div>
                                                <div class="clap">
                                                    <a href="javascript:;"><img src="images/clap.png" alt="clap" />48</a>
                                                </div>
                                                <div class="date">October 11,2019</div>
                                            </div>
                                        </div>
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