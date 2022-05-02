import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useForm } from "react-hook-form";

export default function Login() {  

    const { loginUser } = useAuth();
   // const [isFirstRadioLoaded, setIsFirstRadioLoaded] = useState(false);  

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        var obj = {
            email: data.email,
            password: data.password
        }
       // setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
        await loginUser(obj);
    }

    return(
        <div>
        <Header/>
            <section class="second-banner-sec" style={{ background: `url('images/contact-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="text-box">
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Login</h2>
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
                        <h3 class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms" style={{"visibility": "visible", "animation-duration": "500ms", "animation-name": "fadeInUp"}}>Login</h3>                        
                    </div>
					<div class="row">
						<div class="col-lg-12">
							<div class="login-content mt-6">
								<div class="login-title">Welcome to the Virtual Center for the Study and Prevention of Developmental Trauma</div>
								
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
											<div class="form-group">
                                                <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Password *" />
                                                {errors?.password?.type === "required" && <small className="error">Password is required</small>}
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group" style={{"text-align":"center"}}>
                                                <button class="btn btn-default signin-btn" type="submit">Sign in</button>
											</div>
										</div>
										<div class="col-md-12">
											<p class="mt-4 login-text">
                                                <Link className="forgot-btn" to='/forgotpassword'>
                                                    Forgot your password?
                                                </Link>                                                  
                                            </p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div >
				</div >
            </section >  

            
        <Footer/>
        </div>
    )
}