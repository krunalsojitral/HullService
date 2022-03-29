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

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderSuggestion(suggestion) {
    return <span>{suggestion.organization_name}</span>;
}

function renderSectionTitle(section) {
    //return <strong>{section.name[0].organization_name}</strong>;
    return '';
}

function getSectionSuggestions(section) {
    return section.name;
}

export default function ResearchRequestForm() {

    let history = useHistory();
    const [values, setValues] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const [suggestionOrganizationList, setSuggestionOrganizationList] = useState([]);

    const getSuggestions = (value) => {

        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === "") { return []; }
        const regex = new RegExp("^" + escapedValue, "i");
        const return_value = suggestionOrganizationList.map(section => {
            return {
                name: section.organization.filter(language =>
                    regex.test(language.organization_name)
                )
            };
        }).filter(section => section.name.length > 0);
        return return_value;
    }

    const onChange = (event, { newValue, method }) => {
        setFormValue("organization", newValue)
        setValues(newValue);
        return newValue;
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestion(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestion([]);
    };

    const getSuggestionValue = suggestion => {
        setFormValue("organization", suggestion.organization_name)
        return suggestion.organization_name;
    };

    const inputProps = {
        placeholder: "Organization",
        value: values,
        onChange: onChange
    };

    const [selectedFile, setSelectedFile] = useState();

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

    const [otherProfessionalInterestArea, setOtherProfessionalInterestArea] = React.useState(false);
    const [otherResearcherInterestArea, setOtherResearcherInterestArea] = React.useState(false);

    const removeProfessionalInterest = (value) => {
        var removeskill = selectedProfessionalInterestArea.filter(function (place) { return place.value !== value })
        setSelectedProfessionalInterestArea(removeskill);
        if (value == 0) {
            setOtherProfessionalInterestArea(false);
        }
    };

    const removeResearcherInterest = (value) => {
        var removeskill = selectedResearcherInterestArea.filter(function (place) { return place.value !== value })
        setSelectedResearcherInterestArea(removeskill);
        if (value == 0) {
            setOtherResearcherInterestArea(false);
        }
    };

    const [userTypeList, setUserTypeList] = React.useState('researcher');

    React.useEffect(() => {
        $("#pswd_info").hide();

        setTimeout(() => {
            $(".dropdown-heading-value .gray").text("Interest area");
        }, 50);

        // const typeString = localStorage.getItem('selection');

        // setUserTypeList(typeString);

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
        axios.get(api_url + "/common/getOrganizationList", {})
            .then((result) => {
                if (result.data.status) {
                    var orgdata = result.data.response.data;
                    setSuggestionOrganizationList(orgdata);
                }
            })
            .catch((err) => { console.log(err); });


        axios.get(api_url + "/common/getProfessionalInterestAreaList", {})
            .then((result) => {
                if (result.data.status) {

                    if (result.data.response.data.length > 0) {
                        var obj = result.data.response.data.map((data, index) => {
                            let retObj = {};
                            retObj['id'] = (index + 1);
                            retObj['label'] = data.name;
                            retObj['value'] = data.professional_interest_area_id;
                            return retObj;
                        });
                        obj.push({ id: 0, 'label': 'Other', 'value': 0 });
                        setProfessionalInterestAreaDropdown(obj);
                    } else {
                        var obj = [];
                        obj.push({ id: 0, 'label': 'Other', 'value': 0 });
                        setProfessionalInterestAreaDropdown(obj);
                    }
                } else {
                    var obj = [];
                    obj.push({ id: 0, 'label': 'Other', 'value': 0 });
                    setProfessionalInterestAreaDropdown(obj);
                }
            })
            .catch((err) => { console.log(err); });

        axios.get(api_url + "/common/getResearcherInterestAreaList", {})
            .then((result) => {
                if (result.data.status) {
                    if (result.data.response.data.length > 0) {
                        var obj = result.data.response.data.map((data, index) => {
                            let retObj = {};
                            retObj['id'] = (index + 1);
                            retObj['label'] = data.name;
                            retObj['value'] = data.researcher_interest_area_id;
                            return retObj;
                        });
                        obj.push({ id: 0, 'label': 'Other', 'value': 0 });
                        setResearcherInterestAreaDropdown(obj);
                    } else {
                        var obj = [];
                        obj.push({ id: 0, 'label': 'Other', 'value': 0 });
                        setResearcherInterestAreaDropdown(obj);
                    }
                } else {
                    var obj = [];
                    obj.push({ id: 0, 'label': 'Other', 'value': 0 });
                    setResearcherInterestAreaDropdown(obj);
                }
            })
            .catch((err) => { console.log(err); });
    }, []);


    const {
        handleSubmit,
        control,
        watch,
        setValue: setFormValue,
        formState: { errors },
    } = useForm();

    const sector_selected = watch("sector");
    const occupation_selected = watch("occupation");
    const academic_discipline_selected = watch("academic_discipline");

    const password = useRef({});
    password.current = watch("password", "");
    const { researcherrequestUser } = useAuth();


    const onSubmit = (data) => {


        if (userTypeList == 'general') {
            if (userTypeList == 'researcher') {
                data.role = 3;
            } else if (userTypeList == 'professional') {
                data.role = 2;
            } else {
                data.role = 4;
            }

            researcherrequestUser(data);

            // axios.post(api_url + "/user/checkEmail", { email: data.email })
            //     .then((result) => {
            //         if (result.data.status) {
            //             if (data.role == 4){
            //                 registerUser(data);
            //             }else{
            //                 localStorage.setItem('registerdata', JSON.stringify(data));
            //                 history.push('/payment');
            //             }
            //         } else {
            //             Swal.fire('Oops...', result.data.response.msg, 'error');
            //         }
            //     })
            //     .catch((err) => { console.log(err); });


        } else {
            if (!city) {
                setCityError('Address is required.');
            } else if (!latitude && !longitude) {
                setCityError('Please enter proper address.');
            } else {
                data.city = city;
                data.latitude = latitude;
                data.longitude = longitude;
                data.country = country;
                data.professional_interest_of_area = selectedProfessionalInterestArea;
                data.researcher_interest_of_area = selectedResearcherInterestArea;

                if (userTypeList == 'researcher') {
                    data.role = 3;
                } else if (userTypeList == 'professional') {
                    data.role = 2;
                } else {
                    data.role = 4;
                }

                researcherrequestUser(data);

                // axios.post(api_url + "/user/checkEmail", { email: data.email })
                //     .then((result) => {
                //         console.log(result);
                //         if (result.data.status) {
                //             if (data.role == 4) {
                //                 registerUser(data);
                //             } else {
                //                 localStorage.setItem('registerdata', JSON.stringify(data));
                //                 history.push('/payment');
                //             }
                //         }else{
                //             Swal.fire('Oops...', result.data.response.msg, 'error');
                //         }
                //     })
                //     .catch((err) => { console.log(err); });
            }
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
                setCity(description);
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

        if (!e.target.value) {
            setValue(e.target.value);
            setCity(e.target.value);
            setCityError('City is required.');
        } else {
            setValue(e.target.value);
            setCity(e.target.value);
            setCityError('');
        }
    };


    const changeSelectedProfessionalInterestArea = (e) => {
        const containsOther = !!e.find(user => {
            return user.label === 'Other'
        })
        if (containsOther) {
            setOtherProfessionalInterestArea(true);
        } else {
            setOtherProfessionalInterestArea(false);
        }
    }

    const changeSelectedResearcherInterestArea = (e) => {
        const containsOther = !!e.find(user => {
            return user.label === 'Other'
        })
        if (containsOther) {
            setOtherResearcherInterestArea(true);
        } else {
            setOtherResearcherInterestArea(false);
        }
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



                                        {/* <div className="form-group">
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

                                            <div id="pswd_info" className="password_error_list" style={{'display':'none'}}>
                                                <ul>
                                                    <li id="length" className="invalid">Must be atleast 8 characters!</li>
                                                    <li id="letter" className="invalid">Must contain atleast 1 letter in small case!</li>
                                                    <li id="capital" className="invalid">Must contain atleast 1 letter in capital case!</li>
                                                    <li id="number" className="invalid">Must contain atleast 1 number!</li>
                                                    <li id="special" className="invalid">Must contain atleast 1 special character!</li>
                                                </ul>
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group">

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

                                        </div> */}



                                        {userTypeList !== 'general' && <div className="form-group google-serach">
                                            <div ref={ref}>
                                                <input
                                                    value={cityValue}
                                                    onChange={handleInput}
                                                    disabled={!ready}
                                                    placeholder="Address *"
                                                    className="form-control input"
                                                />
                                                {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
                                                {cityError && <small className="error">{cityError}</small>}
                                            </div>
                                        </div>}

                                        {userTypeList !== 'general' && <div className="form-group autosuggestion">
                                            <Controller
                                                name={"organization"}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <Autosuggest
                                                        suggestions={suggestion}
                                                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                        getSuggestionValue={getSuggestionValue}
                                                        renderSuggestion={renderSuggestion}
                                                        renderSectionTitle={renderSectionTitle}
                                                        getSectionSuggestions={getSectionSuggestions}
                                                        inputProps={inputProps}
                                                        className="form-control"
                                                        multiSection={true}
                                                    />
                                                )}
                                            />
                                            {errors.suggestion && errors.suggestion.type === "required" && (
                                                <small className="error">suggestion is required.</small>
                                            )}
                                        </div>}


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
                                                                <option key="01" value="0">Other</option>
                                                            </select>
                                                        )}
                                                    ></Controller>
                                                    {errors.academic_discipline && errors.academic_discipline.type === "required" && (
                                                        <small className="error">Academic Discipline is required.</small>
                                                    )}
                                                </div>

                                                {academic_discipline_selected == 0 && <div className="form-group">
                                                    <Controller
                                                        name={"other_academic_discipline"}
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field: { onChange, value } }) => (
                                                            <input
                                                                type="text"
                                                                onChange={onChange}
                                                                value={value}
                                                                className="form-control"
                                                                placeholder={`Other Academic Discipline *`}
                                                            />
                                                        )}
                                                    ></Controller>
                                                    {errors.other_academic_discipline && errors.other_academic_discipline.type === "required" && (
                                                        <small className="error">Academic Discipline is required.</small>
                                                    )}
                                                </div>}

                                                <div className="form-group">
                                                    <MultiSelect
                                                        options={researcherInterestAreaDropdown}
                                                        value={selectedResearcherInterestArea}
                                                        hasSelectAll={false}
                                                        //onChange={setSelectedResearcherInterestArea}
                                                        onChange={(e) => {
                                                            changeSelectedResearcherInterestArea(e);
                                                            setSelectedResearcherInterestArea(e);
                                                        }}
                                                        labelledBy="Interest area"
                                                    />
                                                    {selectedResearcherInterestArea.filter(item => item.label !== 'Other').map(item => (
                                                        <span className="interest-area">{item.label}<i onClick={(e) => removeResearcherInterest(item.value)} className="fa fa-times"></i></span>
                                                    ))}
                                                </div>


                                                {otherResearcherInterestArea && <div className="form-group">
                                                    <Controller
                                                        name={"other_research_interest_area"}
                                                        control={control}
                                                        render={({ field: { onChange, value } }) => (
                                                            <input
                                                                type="text"
                                                                onChange={onChange}
                                                                value={value}
                                                                className="form-control"
                                                                placeholder={`Other Interest Area`}
                                                            />
                                                        )}
                                                    ></Controller>
                                                </div>}

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
                                                            <option key="01" value="0">Other</option>
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.sector && errors.sector.type === "required" && (
                                                    <small className="error">Sector is required.</small>
                                                )}
                                            </div>

                                            {sector_selected == 0 && <div className="form-group">
                                                <Controller
                                                    name={"other_sector"}
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input
                                                            type="text"
                                                            onChange={onChange}
                                                            value={value}
                                                            className="form-control"
                                                            placeholder={`Other Sector *`}
                                                        />
                                                    )}
                                                ></Controller>
                                                {errors.other_sector && errors.other_sector.type === "required" && (
                                                    <small className="error">Sector is required.</small>
                                                )}
                                            </div>}



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
                                                    <small className="error">Level of education is required.</small>
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
                                                            <option key="01" value="0">Other</option>
                                                        </select>
                                                    )}
                                                ></Controller>
                                                {errors.occupation && errors.occupation.type === "required" && (
                                                    <small className="error">Occupation is required.</small>
                                                )}
                                            </div>


                                            {occupation_selected == 0 && <div className="form-group">
                                                <Controller
                                                    name={"other_occupation"}
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input
                                                            type="text"
                                                            onChange={onChange}
                                                            value={value}
                                                            className="form-control"
                                                            placeholder={`Other Occupation *`}
                                                        />
                                                    )}
                                                ></Controller>
                                                {errors.other_occupation && errors.other_occupation.type === "required" && (
                                                    <small className="error">Occupation is required.</small>
                                                )}
                                            </div>}

                                            <div className="form-group">
                                                <MultiSelect
                                                    options={professionalInterestAreaDropdown}
                                                    value={selectedProfessionalInterestArea}
                                                    hasSelectAll={false}
                                                    //onChange={setSelectedProfessionalInterestArea}
                                                    onChange={(e) => {
                                                        changeSelectedProfessionalInterestArea(e);
                                                        setSelectedProfessionalInterestArea(e);
                                                    }}
                                                    labelledBy="Interest area"
                                                />
                                                {selectedProfessionalInterestArea.filter(item => item.label !== 'Other').map(item => (
                                                    <span className="interest-area">{item.label}<i onClick={(e) => removeProfessionalInterest(item.value)} className="fa fa-times"></i></span>
                                                ))}
                                            </div>


                                            {otherProfessionalInterestArea && <div className="form-group">
                                                <Controller
                                                    name={"other_professional_interest_area"}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input
                                                            type="text"
                                                            onChange={onChange}
                                                            value={value}
                                                            className="form-control"
                                                            placeholder={`Other Interest Area`}
                                                        />
                                                    )}
                                                ></Controller>
                                            </div>}

                                        </div>}


                                        {/* <div className="form-group checkbox">
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
                                        </div>                                         */}


                                        <button type="submit" className="sign-btn">Submit</button>
                                        {/* <span>OR</span>
                                            <ul>
                                                <li><a href="javacript:;"><img src="images/google.png" /></a></li>
                                                <li><a href="javacript:;"><img src="images/facebook.png" /></a></li>
                                                <li><a href="javacript:;"><img src="images/twitter.png" /></a></li>
                                                <li><a href="javacript:;"><img src="images/linkedin.png" /></a></li>
                                            </ul> */}
                                    </div>
                                    {/* <div className="row">
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
                                    </div> */}
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