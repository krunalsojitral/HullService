import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useForm } from "react-hook-form";

export default function Forgotpassword() {   

    const { forgotpassword } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        var obj = {
            email: data.email
        }
        await forgotpassword(obj);

    }

 

    return (
        <div>
            <Header />
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
                                        <h2>Forgot Password</h2>
                                        {/* <span>Please login to continue</span> */}
                                        <div class="form-group">
                                            <input type="text" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} className="form-control" placeholder="Email" />
                                            {errors?.email?.type === "required" && <small className="error">Email is required</small>}
                                            {errors?.email?.type === "pattern" && (<small className="error">Invalid email address</small>)}
                                        </div>                                        

                                        <button color="info" type="submit" className="sign-btn">Submit</button>
                                       
                                    </div>
                                </form>

                                <div class="row">
                                    <div class="col-md-6">
                                        <Link className="forgot-btn" to='/login'>
                                            Sign In
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
            <Footer />
        </div>
    )
}