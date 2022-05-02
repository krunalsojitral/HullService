import React from 'react';

export default function Footer() {

    return(

        <div>
            <section class="newsletter-sec">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="newsletter-inner  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                <h4>Subscribe to get the latest news from us</h4>
                                <form>
                                    <input type="text" class="form-control" placeholder="Email Address" />
                                    <a href="#">Submit</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="footer-inner">
                                <div class="footer-text">
                                    <p>Pathways to Prevention acknowledges that we are on the ancestral lands of the Blackfoot Confederation: Siksika, Kainai, Piikani, and the Blackfeet of Montana, that extends from the North Saskatchewan River down to the Yellowstone River in Montana and from the Rocky Mountains east into Saskatchewan. Southern Alberta is also the territory of Treaty 7 that includes Siksika, Kainai, Piikani, Tsuut’ina, Îyârhe Nakoda (Wesley, Bearspaw, Chiniki bands), and Métis Nation Region 3 and all people who now make Southern Alberta their home.</p>
                                    <p>Though we are all on different lands, we are all connected.</p>
                                </div>
                                <div class="footer-detail">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="footer-logo">
                                                <a href="index.html"><img src="images/footer-logo.png" alt="" /></a>
                                            </div>
                                            <div class="text-footer">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis dui magna volutpat ut  pellentesque nam posuere at cras.</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-6">
                                            <div class="footer-link">
                                                <ul>
                                                    <li><a href="about-us.html">About Us   </a></li>
                                                    <li><a href="research.html">Research</a></li>
                                                    <li><a href="training-course.html">Trainings & Courses </a></li>
                                                    <li><a href="our-events.html">Events</a></li>
                                                    <li><a href="our-partners.html">Our Partners</a></li>
                                                    <li><a href="contact-us.html">Contact Us</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="footer-social">
                                                <h4>COnnect with us</h4>
                                                <ul>
                                                    <li><a href="#"><img src="images/facebook-icon.svg" alt="" class="img-fluid" /></a></li>
                                                    <li><a href="#"><img src="images/instagram-icon.svg" alt="" class="img-fluid" /></a></li>
                                                    <li><a href="#"><img src="images/twitter-icon.svg" alt="" class="img-fluid" /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="copyright">
                                    <p>Copyright 2022- Pathways to Prevention, All right reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        
        )
}


