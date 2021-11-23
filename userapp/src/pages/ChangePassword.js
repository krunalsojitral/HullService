import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useForm } from "react-hook-form";

export default function Changepassword() {

    const params = new URLSearchParams(window.location.search) // id=123
    let token = params.get('resetcode')

    const { resetpassword } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        var obj = {
            password: data.password,
            reset_password_token: token
        }       
        await resetpassword(obj);

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
                                        <h2>Change Password</h2>                                        
                                        <div class="form-group">
                                            <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Password" />
                                            {errors?.password?.type === "required" && <small className="error">Password is required</small>}
                                        </div>

                                        <div class="form-group">
                                            <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Confirm Password" />
                                            {errors?.password?.type === "required" && <small className="error">Confirm Password is required</small>}
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