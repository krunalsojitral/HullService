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
            <div className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="login-box">
                                <div className="login-img">
                                    <img alt="logo" src="images/logo.png" />
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="login-details">
                                        <h2>Forgot Password</h2>
                                        {/* <span>Please login to continue</span> */}
                                        <div className="form-group">
                                            <input type="text" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} className="form-control" placeholder="Email *" />
                                            {errors?.email?.type === "required" && <small className="error">Email is required</small>}
                                            {errors?.email?.type === "pattern" && (<small className="error">Invalid email address</small>)}
                                        </div>                                        

                                        <button disabled={isSubmitting} color="info" type="submit" className="sign-btn">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm"></span>}
                                        Submit</button>                                       
                                       
                                    </div>
                                </form>

                                {/* <div className="row">
                                    <div className="col-md-6">
                                        <Link className="forgot-btn" to='/login'>
                                            Sign In
                                        </Link>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <Link className="signup-btn" to='/userSelection'>
                                            Sign Up
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}