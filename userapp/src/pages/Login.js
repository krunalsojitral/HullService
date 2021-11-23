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
            <div class="login-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="login-box">
                                <div class="login-img">
                                    <img alt="logo" src="images/logo.png" />
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div class="login-details">
                                        <h2>Welcome to the Virtual Centre for the Study and Prevention of Developmental Trauma</h2>
                                        <span>Please login to continue</span>
                                        <div class="form-group">
                                            <input type="text" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} className="form-control" placeholder="Enter Email Id" />
                                            {errors?.email?.type === "required" && <small className="error">This field is required</small>}
                                            {errors?.email?.type === "pattern" && (<small className="error">Invalid email address</small>)}
                                        </div>
                                        <div class="form-group">
                                            <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Enter Password" />
                                            {errors?.password?.type === "required" && <small className="error">This field is required</small>}
                                        </div>
                                                
                                        <button color="info" type="submit" className="sign-btn">Sign in</button>
                                        
                                        {/* <span>OR</span>
                                        <ul>
                                            <li><a href="#"><img src="images/google.png" /></a></li>
                                            <li><a href="#"><img src="images/facebook.png" /></a></li>
                                            <li><a href="#"><img src="images/twitter.png" /></a></li>
                                            <li><a href="#"><img src="images/linkedin.png" /></a></li>
                                        </ul> */}
                                    </div>
                                </form>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <Link className="forgot-btn" to='/forgotpassword'>
                                                    Forgot your password?
                                                </Link>                                                
                                            </div>
                                            <div class="col-md-6 text-right">
                                                <Link className="forgot-btn" to='/register'>
                                                    Sign Up
                                                </Link>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <Footer/>
        </div>
    )
}