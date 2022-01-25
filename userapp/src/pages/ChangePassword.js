import React, { useRef } from 'react';
//import { Link } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useForm, Controller } from "react-hook-form";
import $ from 'jquery';

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

    const onKeyUpPassword = (e) => {
        $('#password_error').hide();
        // keyup code here
        var pswd = e.target.value;

        if (pswd) {
            $('#pswd_info').show();
            //validate the length
            if (pswd.length < 8) {
                $('#length').removeClass('valid').addClass('invalid');
            } else {
                $('#length').removeClass('invalid').addClass('valid');
            }

            //validate letter
            if (pswd.match(/[a-z]/)) {
                $('#letter').removeClass('invalid').addClass('valid');
            } else {
                $('#letter').removeClass('valid').addClass('invalid');
            }

            //validate capital letter
            if (pswd.match(/[A-Z]/)) {
                $('#capital').removeClass('invalid').addClass('valid');
            } else {
                $('#capital').removeClass('valid').addClass('invalid');
            }

            //validate number
            if (pswd.match(/\d/)) {
                $('#number').removeClass('invalid').addClass('valid');
            } else {
                $('#number').removeClass('valid').addClass('invalid');
            }
            if (/^[a-zA-Z0-9- ]*$/.test(pswd) == false) {
                $('#special').removeClass('invalid').addClass('valid');
            } else {
                $('#special').removeClass('valid').addClass('invalid');
            }
        } else {
            $('#pswd_info').hide();
        }

    }

    const onBlurPassword = (e) => {
        $("#pswd_info").hide();
        $('#password_error').show();
    }

    const onFocusPassword = (e) => {
        $("#pswd_info").hide();
        $('#password_error').show();
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
                                                        id="new_password"
                                                        type="password"                                                        
                                                        // onChange={(e) => {
                                                        //     onChange
                                                        //     onChangePassword(e);
                                                        // }}
                                                        onKeyUp={(e) => onKeyUpPassword(e)}
                                                        onBlur={(e) => onBlurPassword(e)}
                                                        onFocus={(e) => onFocusPassword(e)}                                                        
                                                        onChange={onChange}
                                                        className="form-control"
                                                        value={value}
                                                        placeholder={`Password *`}
                                                    />                                                    
                                                )}
                                            ></Controller>
                                            <div id="password_error">
                                                {(errors.password?.type === "required" && <small className="error">Password is required</small>)}
                                                {(errors.password?.type === "minLength" && <small className="error">Password is at least 8 characters </small>)}
                                                {(errors.password?.type === "pattern" && <small className="error">Please enter at least 8 characters, 1 numeric, 1 lowercase letter, 1 uppercase letter and 1 special character.</small>)}
                                            </div> 
                                            <div id="pswd_info">
                                                <ul>
                                                    <li id="length" className="invalid">Must be atleast 8 characters!</li>
                                                    <li id="letter" className="invalid">Must contain atleast 1 letter in small case!</li>
                                                    <li id="capital" className="invalid">Must contain atleast 1 letter in capital case!</li>
                                                    <li id="number" className="invalid">Must contain atleast 1 number!</li>
                                                    <li id="special" className="invalid">Must contain atleast 1 special character!</li>
                                                </ul>
                                            </div>
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