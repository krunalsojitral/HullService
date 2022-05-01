import React from 'react';

export default function Footer() {

    return(
        <div>
            <footer>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-10">
                            <div class="subscribe-now">
                                <h5> Subscribe to get the latest news from us</h5>
                                <div class="form-group">
                                    <input type="text" placeholder="Email Address" class="form-control"/>
                                        <button type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="footer-widget">
                                <div class="footer-logo">
                                    <a href="javascript:;"><img src="images/footer-logo.png" alt="footer-logo"/></a>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis dui magna volutpat ut pellentesque nam posuere at cras.</p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="footer-widget">
                                <div class="footer-links">
                                    <ul>
                                        <li>
                                            <a href="javascript:;">About Us </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Research</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Trainings & Courses </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Events</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Our Partners</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Contact Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="footer-widget">
                                <div class="footer-social">
                                    <h5>
                                        Connect with us
                                    </h5>
                                    <ul>
                                        <li><a href="javascript:;"><img src="images/facebook.png" alt=""/></a></li>
                                        <li><a href="javascript:;"><img src="images/instagram.png" alt=""/></a></li>
                                        <li><a href="javascript:;"><img src="images/twitter.png" alt=""/></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="copyrigts">
                                <p> Copyright 2022- Pathways to Prevention, All right reserved. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>)
}


