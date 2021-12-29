import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useForm, Controller } from "react-hook-form";

export default function Changepassword() {

    const params = new URLSearchParams(window.location.search) // id=123
    let token = params.get('resetcode')

    const { resetpassword } = useAuth();
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();


    const password = useRef({});
    password.current = watch("password", "");

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
                                        <h2>Change Password</h2>                                        
                                        <div className="form-group">

                                            <Controller
                                                name={"password"}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/ },
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters",
                                                    }
                                                }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="password"
                                                        onChange={onChange}
                                                        className="form-control"
                                                        value={value}
                                                        placeholder={`Password *`}
                                                    />
                                                )}
                                            ></Controller>

                                            {(errors.password?.type === "required" && <small className="error">Password is required</small>)}
                                            {(errors.password?.type === "minLength" && <small className="error">Password is at least 8 characters </small>)}
                                            {(errors.password?.type === "pattern" && <small className="error">Please enter at least 8 characters, 1 numeric, 1 lowercase letter, 1 uppercase letter and 1 special character.</small>)}
                                        </div>
                                        <div className="form-group">

                                            <Controller
                                                name={"confirmpassword"}
                                                control={control}
                                                rules={{
                                                    validate: value => value === password.current || "The passwords do not match",
                                                    required: true,
                                                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/ },
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters",
                                                    }
                                                }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="password"
                                                        onChange={onChange}
                                                        className="form-control"
                                                        value={value}
                                                        placeholder={`Confirm password *`}
                                                    />
                                                )}
                                            ></Controller>
                                            {(errors.confirmpassword?.type === "required" && <small className="error">Confirm password is required</small>)}
                                            {errors.confirmpassword && <small className="error">{errors.confirmpassword.message}</small>}
                                        </div>                                        
                                        <button type="submit" className="sign-btn">Submit</button>

                                    </div>
                                </form>

                                {/* <div className="row">
                                    <div className="col-md-6">
                                        <Link className="forgot-btn" to='/login'>
                                            Sign In
                                        </Link>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <Link className="forgot-btn" to='/register'>
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