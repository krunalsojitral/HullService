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
        $("#confirm_pswd_info").hide();
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
        $("#confirm_pswd_info").hide();
        $('#password_error').show();
    }

    const onFocusPassword = (e) => {
        $("#pswd_info").hide();
        $("#confirm_pswd_info").hide();
        $('#password_error').show();
    }

    const onKeyUpConfirmPassword = (e) => {
        $('#pswd_info').hide();
        $('#confirm_password_error').hide();
        // keyup code here
        var pswd = e.target.value;
        if (pswd) {
            $('#confirm_pswd_info').show();
            //validate the length
            if (pswd.length < 8) {
                $('#confirm_length').removeClass('valid').addClass('invalid');
            } else {
                $('#confirm_length').removeClass('invalid').addClass('valid');
            }

            //validate letter
            if (pswd.match(/[a-z]/)) {
                $('#confirm_letter').removeClass('invalid').addClass('valid');
            } else {
                $('#confirm_letter').removeClass('valid').addClass('invalid');
            }

            //validate capital letter
            if (pswd.match(/[A-Z]/)) {
                $('#confirm_capital').removeClass('invalid').addClass('valid');
            } else {
                $('#confirm_capital').removeClass('valid').addClass('invalid');
            }

            //validate number
            if (pswd.match(/\d/)) {
                $('#confirm_number').removeClass('invalid').addClass('valid');
            } else {
                $('#confirm_number').removeClass('valid').addClass('invalid');
            }
            if (/^[a-zA-Z0-9- ]*$/.test(pswd) == false) {
                $('#confirm_special').removeClass('invalid').addClass('valid');
            } else {
                $('#confirm_special').removeClass('valid').addClass('invalid');
            }
        } else {
            $('#confirm_pswd_info').hide();
        }
    }

    const onBlurConfirmPassword = (e) => {
        $('#pswd_info').hide();
        $("#confirm_pswd_info").hide();
        $('#confirm_password_error').show();
    }

    const onFocusConfirmPassword = (e) => {
        $('#pswd_info').hide();
        $("#confirm_pswd_info").hide();
        $('#confirm_password_error').show();
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
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Change Password</h2>
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
                        <h3 class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms" style={{ "visibility": "visible", "animation-duration": "500ms", "animation-name": "fadeInUp" }}>Change Password</h3>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="login-content mt-6">
                                <form onSubmit={handleSubmit(onSubmit)} class="wow animate__fadeIn mt-4" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
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
                                                <div id="pswd_info" className="password_error_list" style={{ 'display': 'none' }}>
                                                    <ul>
                                                        <li id="length" className="invalid">Must be atleast 8 characters!</li>
                                                        <li id="letter" className="invalid">Must contain atleast 1 letter in small case!</li>
                                                        <li id="capital" className="invalid">Must contain atleast 1 letter in capital case!</li>
                                                        <li id="number" className="invalid">Must contain atleast 1 number!</li>
                                                        <li id="special" className="invalid">Must contain atleast 1 special character!</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
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
                                                            id="confirm_password"
                                                            type="password"
                                                            onChange={onChange}
                                                            onKeyUp={(e) => onKeyUpConfirmPassword(e)}
                                                            onBlur={(e) => onBlurConfirmPassword(e)}
                                                            onFocus={(e) => onFocusConfirmPassword(e)}
                                                            className="form-control"
                                                            value={value}
                                                            placeholder={`Confirm password *`}
                                                        />
                                                    )}
                                                ></Controller>
                                                <div id="confirm_password_error">
                                                    {(errors.confirmpassword?.type === "required" && <small className="error">Confirm password is required</small>)}
                                                    {errors.confirmpassword && <small className="error">{errors.confirmpassword.message}</small>}
                                                </div>
                                                <div id="confirm_pswd_info" className="password_error_list" style={{ 'display': 'none' }}>
                                                    <ul>
                                                        <li id="confirm_length" className="invalid">Must be atleast 8 characters!</li>
                                                        <li id="confirm_letter" className="invalid">Must contain atleast 1 letter in small case!</li>
                                                        <li id="confirm_capital" className="invalid">Must contain atleast 1 letter in capital case!</li>
                                                        <li id="confirm_number" className="invalid">Must contain atleast 1 number!</li>
                                                        <li id="confirm_special" className="invalid">Must contain atleast 1 special character!</li>
                                                    </ul>
                                                </div>
                                            </div>                                            
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group" style={{ "text-align": "center" }}>
                                                <button type="submit" className="btn btn-default signin-btn">Submit</button>
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