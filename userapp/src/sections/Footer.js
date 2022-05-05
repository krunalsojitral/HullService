import React, { useState, useRef, ref } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import api_url from './../components/Apiurl';
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";



export default function Footer() {

    const {
        handleSubmit,
        control,
        watch,
        reset,
        setValue: setFormValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {
        axios.post(api_url + "/user/subscribeUser", data).then((result) => {
            if (result.data.status) {   
                reset()
                e.target.reset(); 
                Swal.fire('Success!', 'Successfully subscribe user.', 'success');
            }else{
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
            
        }).catch((err) => { console.log(err); });
        
    }

    return(

        <div>
            <section className="newsletter-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="newsletter-inner  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                <h4>Subscribe to get the latest news from us</h4>
                                <form onSubmit={handleSubmit(onSubmit)}>                                   
                                    <Controller
                                        name={"email"}
                                         control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <input
                                                type="text"
                                                onChange={onChange}
                                                value={value}
                                                className="form-control"
                                                placeholder={`Email Address`}
                                            />
                                        )}
                                    ></Controller>
                                    {errors.email && errors.email.type === "required" && (
                                        <small className="error">Email is required.</small>
                                    )}
                                    <button type="submit" className="btn subscription">Submit</button>
                                    {/* <a href="#">Submit</a> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-inner">
                                <div className="footer-text">
                                    <p>Pathways to Prevention acknowledges that we are on the ancestral lands of the Blackfoot Confederation: Siksika, Kainai, Piikani, and the Blackfeet of Montana, that extends from the North Saskatchewan River down to the Yellowstone River in Montana and from the Rocky Mountains east into Saskatchewan. Southern Alberta is also the territory of Treaty 7 that includes Siksika, Kainai, Piikani, Tsuut’ina, Îyârhe Nakoda (Wesley, Bearspaw, Chiniki bands), and Métis Nation Region 3 and all people who now make Southern Alberta their home.</p>
                                    <p>Though we are all on different lands, we are all connected.</p>
                                </div>
                                <div className="footer-detail">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="footer-logo">
                                                <a href="index.html"><img src="images/footer-logo.png" alt="" /></a>
                                            </div>
                                            <div className="text-footer">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis dui magna volutpat ut  pellentesque nam posuere at cras.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="footer-link">
                                                <ul>
                                                    <li><Link to="/about">About Us</Link></li>
                                                    <li><Link to="/research-request-form">Research</Link></li>
                                                    <li><Link to="/courses-training">Trainings & Courses</Link></li>
                                                    <li><Link to="/events">Events</Link></li>
                                                    <li><Link to="/partner">Our Partners</Link></li>
                                                    <li><Link to="/contact">Contact Us</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="footer-social">
                                                <h4>Connect with us</h4>
                                                <ul>
                                                    <li><a href="javascript:;"><img src="images/facebook-icon.svg" alt="" className="img-fluid" /></a></li>
                                                    <li><a href="javascript:;"><img src="images/instagram-icon.svg" alt="" className="img-fluid" /></a></li>
                                                    <li><a href="javascript:;"><img src="images/twitter-icon.svg" alt="" className="img-fluid" /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="copyright">
                                    <p>Copyright {(new Date().getFullYear())}- Pathways to Prevention, All right reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        
        )
}


