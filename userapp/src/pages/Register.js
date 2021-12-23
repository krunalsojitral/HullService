import React, { useRef, ref } from 'react';
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

export default function Register() {

    

    const [sectorList, setSectorList] = React.useState([]);
    const [academicDisciplineList, setAcademicDisciplineList] = React.useState([]);
    const [occupationList, setOccupationList] = React.useState([]);

    const [city, setCity] = React.useState('');
    const [cityError, setCityError] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [country, setCountry] = React.useState('');

    const [selectedProfessionalInterestArea, setSelectedProfessionalInterestArea] = React.useState([])
    const [professionalInterestAreaDropdown, setProfessionalInterestAreaDropdown] = React.useState([])

    const [selectedResearcherInterestArea, setSelectedResearcherInterestArea] = React.useState([])
    const [researcherInterestAreaDropdown, setResearcherInterestAreaDropdown] = React.useState([])

    const removeProfessionalInterest = (value) => {
        var removeskill = selectedProfessionalInterestArea.filter(function (place) { return place.value !== value })
        setSelectedProfessionalInterestArea(removeskill);
    };

    const removeResearcherInterest = (value) => {        
        var removeskill = selectedResearcherInterestArea.filter(function (place) { return place.value !== value })
        setSelectedResearcherInterestArea(removeskill);
    };

    

    const [userTypeList, setUserTypeList] = React.useState('researcher');

    React.useEffect(() => {

        setTimeout(() => {
            $(".dropdown-heading-value .gray").text("Interest area");
        }, 50);        

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

        axios.get(api_url + "/common/getProfessionalInterestAreaList", {})
            .then((result) => {
                if (result.data.status) {
                    var obj = result.data.response.data.map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.name;
                        retObj['value'] = data.professional_interest_area_id;
                        return retObj;
                    });
                    setProfessionalInterestAreaDropdown(obj);
                }
            })
            .catch((err) => { console.log(err); });

        axios.get(api_url + "/common/getResearcherInterestAreaList", {})
            .then((result) => {
                if (result.data.status) {
                    var obj = result.data.response.data.map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.name;
                        retObj['value'] = data.researcher_interest_area_id;
                        return retObj;
                    });
                    setResearcherInterestAreaDropdown(obj);
                }
            })
            .catch((err) => { console.log(err); });

        
    }, []);


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
        if (!city){
            setCityError('City is required.');
        } else if (!latitude && !longitude){
            setCityError('Please enter proper address.');
        }else{
            data.city = city;
            data.latitude = latitude;
            data.longitude = longitude;
            data.country = country;
            data.professional_interest_of_area = selectedProfessionalInterestArea;
            data.researcher_interest_of_area = selectedResearcherInterestArea;

            if (userTypeList == 'researcher'){
                data.role = 3;
            }else{
                data.role = 2;
            }            

            registerUser(data);

            // axios.post(api_url + '/user/checkEmail', { email : data.email }).then((result) => {
            //     if (result.data.status) {
            //         localStorage.setItem('registerdata', JSON.stringify(data));
            //         history.push("/payment");
            //     } else {
            //         Swal.fire('Oops...', result.data.response.msg, 'error')
            //     }
            // }).catch((err) => {
            //     console.log(err);
            // })
        }
    }

    const {
        ready,
        value: cityValue,
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
                        if (country) { setCountry(country); }
                        return getLatLng(results[0])

                    })
                    .then(({ lat, lng }) => {
                        setLatitude(lat)
                        setLongitude(lng)
                    })
                    .catch((error) => {
                        setLatitude('');
                        setLongitude('');
                        setCountry('');
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
        if (!e.target.value){
            setValue(e.target.value);
            setCity(e.target.value);
            setCityError('City is required.');
        }else{
            setValue(e.target.value);
            setCity(e.target.value);
            setCityError('');
        }
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
                                        <div className="sub-title">Please Tell Us About Yourself</div>
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
                                                        type="last_name"
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
                                        <div className="form-group">
                                            <div ref={ref}>
                                                <input
                                                    value={cityValue}
                                                    onChange={handleInput}
                                                    disabled={!ready}
                                                    placeholder="City *"
                                                    className="form-control input"
                                                />
                                                {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
                                                {cityError && <small className="error">{cityError}<div><br /></div></small>}
                                            </div>
                                        </div>
                                        

                                        {userTypeList == 'researcher' &&
                                            <div>
                                            <div className="form-group select-dropdown open-select">
                                                    <Controller
                                                        name="academic_discipline"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field: { onChange, value } }) => (
                                                            <select className="form-control" onChange={onChange} value={value}>
                                                                <option key="0" value="">Academic Discipline *</option>
                                                                {academicDisciplineList.map((item) => (
                                                                    <option key={item.academic_discipline_id} value={item.academic_discipline_id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    ></Controller>
                                                    {errors.academic_discipline && errors.academic_discipline.type === "required" && (
                                                        <small className="error">Academic Discipline is required.<div><br /></div></small>
                                                    )}

                                                </div>
                                                <div className="form-group">
                                                    <MultiSelect
                                                        options={researcherInterestAreaDropdown}
                                                        value={selectedResearcherInterestArea}                                                
                                                        hasSelectAll={false}
                                                        onChange={setSelectedResearcherInterestArea}
                                                        labelledBy="Interest area"
                                                    /> 
                                                    {selectedResearcherInterestArea.map(item => (
                                                        <span className="interest-area">{item.label}<i onClick={(e) => removeResearcherInterest(item.value)} className="fa fa-times"></i></span>
                                                    ))} 
                                                </div>
                                            </div>
                                        }


                                        {userTypeList == 'professional' && <div>

                                            <div className="form-group select-dropdown">
                                                <Controller
                                                    name="sector"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <select className="form-control" onChange={onChange} value={value}>
                                                            <option key="0" value="">Sector *</option>
                                                            {sectorList.map((item) => (
                                                                <option key={item.sector_id} value={item.sector_id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.sector && errors.sector.type === "required" && (
                                                    <small className="error">Sector is required.<div><br/></div></small>
                                                )}
                                            </div>
                                           
                                            <div className="form-group select-dropdown">
                                                <Controller
                                                    name="level_of_education"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <select className="form-control" onChange={onChange} value={value}>
                                                            <option key="0" value="">Level of education *</option>
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
                                                    <small className="error">Level of education is required.<div><br /></div></small>
                                                )}
                                            </div>
                                            
                                            <div className="form-group select-dropdown">
                                                <Controller
                                                    name="occupation"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <select className="form-control" onChange={onChange} value={value}>
                                                            <option key="0" value="">Occupation *</option>
                                                            {occupationList.map((item) => (
                                                                <option key={item.occupation_id} value={item.occupation_id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.occupation && errors.occupation.type === "required" && (
                                                    <small className="error">Occupation is required.<div><br /></div></small>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <MultiSelect
                                                    options={professionalInterestAreaDropdown}
                                                    value={selectedProfessionalInterestArea}
                                                    hasSelectAll={false}
                                                    onChange={setSelectedProfessionalInterestArea}
                                                    labelledBy="Interest area"
                                                />
                                                {selectedProfessionalInterestArea.map(item => (
                                                    <span className="interest-area">{item.label}<i onClick={(e) => removeProfessionalInterest(item.value)} className="fa fa-times"></i></span>
                                                ))}
                                            </div>

                                        </div>}

                                       
                                        
                                        
                                         

                                        <button type="submit" className="sign-btn">Submit</button>
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
                                            <Link className="forgot-btn" to='/forgotpassword'>
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