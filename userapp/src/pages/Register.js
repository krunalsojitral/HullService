import React, { useRef, ref } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import $ from 'jquery';
import usePlacesAutocomplete, {getGeocode,getLatLng,} from "use-places-autocomplete";
import api_url from './../components/Apiurl';
import axios from "axios";
//import Swal from "sweetalert2";

export default function Register() {

    const [sectorList, setSectorList] = React.useState([]);
    const [academicDisciplineList, setAcademicDisciplineList] = React.useState([]);
    const [occupationList, setOccupationList] = React.useState([]);

    const [userTypeList, setUserTypeList] = React.useState('researcher');

    React.useEffect(() => {    
        
        const typeString = localStorage.getItem('selection');
        //var userdata = JSON.parse(typeString);
        setUserTypeList(typeString);
        


        axios.get(api_url + "/common/academicDisciplineList", {})
            .then((result) => {
                if (result.data.status) {
                    var educationdata = result.data.response.data;
                    setAcademicDisciplineList(educationdata);
                }
            })
            .catch((err) => { console.log(err); });
           
        
        axios.get(api_url + "/common/occupationList", {})
            .then((result) => {
                if (result.data.status) {
                    var occupationdata = result.data.response.data;
                    setOccupationList(occupationdata);
                } 
            })
            .catch((err) => { console.log(err); });

        axios.get(api_url + "/common/sectorList", {})
            .then((result) => {
                if (result.data.status) {
                    var sectordata = result.data.response.data;
                    setSectorList(sectordata);
                }
            })
            .catch((err) => { console.log(err); });
    },[]);
  
    
    const {
        handleSubmit,        
        control,
        watch,
        formState: { errors },
    } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const { registerUser } = useAuth();

    const onSubmit = (data) => {
        console.log(data); 
        registerUser(data);
    }

    const {
        ready,
        value:cityValue,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const handleSelect =
        ({ description }) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
               
                setValue(description, false);
               // value.city = description
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description })
                    .then((results) => {
                        const address_components = results[0].address_components;
                        var filtered_array = address_components.filter(function (address_component) {
                            return address_component.types.includes("country");
                        });
                        var country = filtered_array.length ? filtered_array[0].long_name : "";
                      //  if (country) { value.country = country }
                        return getLatLng(results[0])

                    })
                    .then(({ lat, lng }) => {
                    //    value.latitude = lat
                    //    value.longitude = lng
                    })
                    .catch((error) => {
                    //    value.latitude = ''
                    //    value.longitude = ''
                    //    value.country = ''
                       console.log("Error: ", error);
                    });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li className="city_suggestion" key={place_id} onClick={handleSelect(suggestion)}>
                    <p> <strong>{main_text}</strong>  {secondary_text}</p>
                </li>
            );
        });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const passwordClick = async (e) => {
        $('.toggle-password').toggleClass("fa-eye fa-eye-slash");
        if ($('#password').attr("type") == "password") {
            $('#password').attr("type", "text");
        } else {
            $('#password').attr("type", "password");
        }
    }

    const confirmpasswordClick = async (e) => {
        $('.toggle-confirm-password').toggleClass("fa-eye fa-eye-slash");
        if ($('#confirm_password').attr("type") == "password") {
            $('#confirm_password').attr("type", "text");
        } else {
            $('#confirm_password').attr("type", "password");
        }
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
                                    <span>Please Tell Us About Yourself</span>
                                    <div className="form-group">

                                        <Controller
                                            name={"first_name"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type="first_name"
                                                    onChange={onChange}
                                                    value={value}
                                                    className="form-control"
                                                    placeholder={`First Name`}
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
                                                        type="last_name"
                                                        onChange={onChange}
                                                        value={value}
                                                        className="form-control"
                                                        placeholder={`Last Name`}
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
                                                        placeholder={`Email`}
                                                    />
                                                )}
                                            ></Controller>
                                        {errors?.email?.type === "required" && <small className="error">This field is required</small>}
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
                                                        type="password"
                                                        onChange={onChange}      
                                                        className="form-control"
                                                        value={value}
                                                        placeholder={`Password`}
                                                    />
                                                )}
                                            ></Controller>

                                        {/* <input type="password" {...register("password", {
                                            required: true,
                                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/ },
                                            minLength: {
                                                value: 8,
                                                message: "Password must have at least 8 characters",
                                            }
                                        })} className="form-control" placeholder="Password" /> */}
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
                                                        placeholder={`Confirm password`}
                                                    />
                                                )}
                                            ></Controller>                                               
                                        {errors.confirmpassword && <small className="error">{errors.confirmpassword.message}</small>}
                                    </div>
                                        <div className="form-group">

                                            {/* <Controller
                                                name={"city"}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="city"
                                                        onChange={onChange}
                                                        value={value}
                                                        className="form-control"
                                                        placeholder={`City`}
                                                    />
                                                )}
                                            ></Controller>
                                            {errors.city && errors.city.type === "required" && (
                                                <small className="error">City is required.</small>
                                            )} */}

                                          

 
                                        <div ref={ref}>
                                            <input
                                                value={cityValue}
                                                onChange={handleInput}
                                                disabled={!ready}                                                
                                                placeholder="city"
                                                className="form-control input"
                                            />                                            
                                            {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
                                            
                                        </div> 
                                    </div>                                      

                                        {userTypeList == 'researcher' && 
                                            <div className="form-group">
                                                <Controller
                                                    name="academic_discipline"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <select className="form-control" onChange={onChange} value={value}>
                                                            <option key="0" value="">Academic Discipline</option>
                                                            {academicDisciplineList.map((item) => (
                                                                <option key={item.academic_discipline_id} value={item.academic_discipline_id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.academic_discipline && errors.academic_discipline.type === "required" && (
                                                <small className="error">Academic Discipline is required.</small>
                                                )}
                                            </div>
                                        }
                                        

                                        {userTypeList == 'professional' && <div>

                                            <div className="form-group">
                                                <Controller
                                                    name="sector"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <select className="form-control" onChange={onChange} value={value}>
                                                            <option key="0" value="">Sector</option>
                                                            {sectorList.map((item) => (
                                                                <option key={item.sector_id} value={item.sector_id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.sector && errors.sector.type === "required" && (
                                                    <small className="error">Sector is required.</small>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <Controller
                                                    name="level_of_education"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <select className="form-control" onChange={onChange} value={value}>
                                                            <option key="0" value="">Level of education</option>
                                                            <option key="1" value="high_school">High School</option>
                                                            <option key="2" value="diploma">Diploma</option>
                                                            <option key="3" value="professional_degree">Professional Degree</option>
                                                            <option key="4" value="undergrad">Undergrad</option>
                                                            <option key="5" value="masters">Masters</option>
                                                            <option key="6" value="doctorate">Doctorate</option>
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.level_of_education && errors.level_of_education.type === "required" && (
                                                    <small className="error">Level of education is required.</small>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <Controller
                                                    name="occupation"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <select className="form-control" onChange={onChange} value={value}>
                                                            <option key="0" value="">Occupation</option>
                                                            {occupationList.map((item) => (
                                                                <option key={item.occupation_id} value={item.occupation_id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.occupation && errors.occupation.type === "required" && (
                                                    <small className="error">Occupation is required.</small>
                                                )}
                                            </div>

                                    </div>  }  
                                    
                                    <button type="submit" className="sign-btn">Sign in</button>                                    
                                    {/* <span>OR</span>
                                    <ul>
                                        <li><a href="javacript:;"><img src="images/google.png" /></a></li>
                                        <li><a href="javacript:;"><img src="images/facebook.png" /></a></li>
                                        <li><a href="javacript:;"><img src="images/twitter.png" /></a></li>
                                        <li><a href="javacript:;"><img src="images/linkedin.png" /></a></li>
                                    </ul> */}
                                </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Link className="forgot-btn" to='/login'>
                                            Forgot your password?
                                        </Link>
                                    </div>
                                        <div className="col-md-6 text-right">
                                        <Link className="signup-btn" to='/login'>
                                               Sign in
                                        </Link>
                                        
                                    </div>
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