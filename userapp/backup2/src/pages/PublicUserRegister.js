import React, { useState, useRef, ref } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import $ from 'jquery';
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import api_url from './../components/Apiurl';
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import useAuth from './../hooks/useAuth';
import Autosuggest from "react-autosuggest";
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";

export default function PublicUserRegister() {

    let history = useHistory();
    const [userTypeList, setUserTypeList] = React.useState('researcher');

    React.useEffect(() => {

        $("#pswd_info").hide();

    }, []);


    const {
        handleSubmit,
        control,
        watch,
        setValue: setFormValue,
        formState: { errors },
    } = useForm();

    const password = useRef({});
    password.current = watch("password", "");
    const { publicUserRegister } = useAuth();


    const onSubmit = (data) => {

        data.role = 4;
        publicUserRegister(data);

        // if (!city) {
        //     setCityError('Address is required.');
        // } else if (!latitude && !longitude) {
        //     setCityError('Please enter proper address.');
        // } else {
        //     data.city = city;
        //     data.latitude = latitude;
        //     data.longitude = longitude;
        //     data.country = country;
        //     data.professional_interest_of_area = selectedProfessionalInterestArea;
        //     data.researcher_interest_of_area = selectedResearcherInterestArea;
        //     data.role = 3;
        //     data.user_id = user.id;
        //     registerResearcherUser(data);
        // }
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
            <div className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="login-box">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="login-details">
                                        <h2>Welcome to the Virtual Centre for the Study and Prevention of Developmental Trauma</h2>
                                        <div className="sub-title">Please Tell Us About Yourself</div>

                                        <div className="form-group">
                                            <Controller
                                                name={"first_name"}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="text"
                                                        onChange={onChange}
                                                        value={value}
                                                        className="form-control"
                                                        placeholder={`First Name *`}
                                                    />
                                                )}
                                            ></Controller>
                                            {errors.first_name && errors.first_name.type === "required" && (
                                                <small className="error">First Name is required.</small>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <Controller
                                                name={"last_name"}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="text"
                                                        onChange={onChange}
                                                        value={value}
                                                        className="form-control"
                                                        placeholder={`Last Name *`}
                                                    />
                                                )}
                                            ></Controller>
                                            {errors.last_name && errors.last_name.type === "required" && (
                                                <small className="error">Last Name is required.</small>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <Controller
                                                name={"email"}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                    pattern: {
                                                        value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                                    },
                                                }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="email"
                                                        onChange={onChange}
                                                        className="form-control"
                                                        value={value}
                                                        placeholder={`Email *`}
                                                    />
                                                )}
                                            ></Controller>
                                            {errors?.email?.type === "required" && <small className="error">Email is required</small>}
                                            {errors?.email?.type === "pattern" && (<small className="error">Invalid email address</small>)}

                                        </div>


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
                                        <div className="form-group">

                                            <Controller
                                                name={"confirmpassword"}
                                                control={control}
                                                rules={{
                                                    validate: value => value === password.current || "Passwords do not match",
                                                    required: true,
                                                    // pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/ },
                                                    // minLength: {
                                                    //     value: 8,
                                                    //     message: "Password must have at least 8 characters",
                                                    // }
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
                                      

                                        <div className="form-group checkbox">
                                            <Controller
                                                control={control}
                                                name="terms_condition"
                                                rules={{ required: true }}
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <input
                                                        type="checkbox"
                                                        onBlur={onBlur} // notify when input is touched
                                                        onChange={onChange} // send value to hook form
                                                        checked={value}
                                                        inputRef={ref}
                                                    />
                                                )}
                                            />
                                            <span>&nbsp;By clicking Sign Up, you agree to our <Link target="_blank" to='/terms-condition'>Terms and Conditions</Link></span><br />
                                            {errors.terms_condition && errors.terms_condition.type === "required" && (
                                                <small className="error">This is required.</small>
                                            )}
                                        </div>

                                        <div className="form-group checkbox">
                                            <Controller
                                                control={control}
                                                name="subscribe"
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <input
                                                        type="checkbox"
                                                        onBlur={onBlur} // notify when input is touched
                                                        onChange={onChange} // send value to hook form
                                                        checked={value}
                                                        inputRef={ref}
                                                    />
                                                )}
                                            />
                                            <span>&nbsp;Subscribe to Pathways To Preventions Email</span><br />
                                        </div>


                                        <button type="submit" className="sign-btn">Submit</button>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}