import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useForm } from "react-hook-form";

export default function Forgotpassword() {   

    const { forgotpassword } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();   
    const onSubmit = async (data) => {
        var obj = {
            email: data.email
        }
        await forgotpassword(obj);
    } 

    return (
        <div>
            <Header />

            <section class="second-banner-sec" style={{ background: `url('images/contact-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="text-box">
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Forgot Password</h2>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="image-holder">
                                    <img src="images/second-banner-img.png" alt="" class="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                        <div class="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="1000ms">
                            <img src="images/second-banner-shape.png" alt="" class="img-fluid" />
                        </div>
                    </div>
                </div >
            </section>

            <section class="login-sec">
                <div class="container">
                    <div class="researcher-heading">
                        <h3 class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms" style={{ "visibility": "visible", "animation-duration": "500ms", "animation-name": "fadeInUp" }}>Forgot Password</h3>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="login-content mt-6">
                                <form onSubmit={handleSubmit(onSubmit)} class="wow animate__fadeIn mt-4" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <input type="text" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} className="form-control" placeholder="Email *" />
                                                {errors?.email?.type === "required" && <small className="error">Email is required</small>}
                                                {errors?.email?.type === "pattern" && (<small className="error">Invalid email address</small>)}
                                            </div>
                                        </div>                                        
                                        <div class="col-md-12">
                                            <div class="form-group" style={{ "text-align": "center" }}>                                                
                                                <button disabled={isSubmitting} type="submit" class="btn btn-default signin-btn">
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm"></span>}
                                                    Submit</button>      
                                            </div>
                                        </div>                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </section >
                      
            <Footer />
        </div>
    )
}