import React, { useState, useRef, ref } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import $ from 'jquery';
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import api_url from '../../components/Apiurl';
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import useAuth from '../../hooks/useAuth';
import Autosuggest from "react-autosuggest";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

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

export default function EditProfile() {

    let history = useHistory();
    const [values, setValues] = useState("");
    const [user, setUser] = useState({});
    const [removeImages, setRemoveImages] = useState('');
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

    const [userTypeList, setUserTypeList] = React.useState(0);

    React.useEffect(() => {
        
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };


        setTimeout(() => {
            $(".dropdown-heading-value .gray").text("Interest area");
        }, 50);

        const typeString = localStorage.getItem('userdata');
        var usersessiondata = JSON.parse(typeString);
        setUserTypeList(usersessiondata.role);
        

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
                        obj.push({ id: 0, 'label': 'Other Interest Area', 'value': 0 });
                        setProfessionalInterestAreaDropdown(obj);
                    } else {
                        var obj = [];
                        obj.push({ id: 0, 'label': 'Other Interest Area', 'value': 0 });
                        setProfessionalInterestAreaDropdown(obj);
                    }
                } else {
                    var obj = [];
                    obj.push({ id: 0, 'label': 'Other Interest Area', 'value': 0 });
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
                        obj.push({ id: 0, 'label': 'Other Interest Area', 'value': 0 });
                        setResearcherInterestAreaDropdown(obj);
                    } else {
                        var obj = [];
                        obj.push({ id: 0, 'label': 'Other Interest Area', 'value': 0 });
                        setResearcherInterestAreaDropdown(obj);
                    }
                } else {
                    var obj = [];
                    obj.push({ id: 0, 'label': 'Other Interest Area', 'value': 0 });
                    setResearcherInterestAreaDropdown(obj);
                }
            })
            .catch((err) => { console.log(err); });

        axios.get(api_url + "/user/getEditUserById", config)
            .then((result) => {
                
                if (result.data.status) {
                    var userdata = result.data.response.data;                    
                    setUser(userdata);
                    setFormValue('first_name', userdata.first_name)
                    setFormValue('last_name', userdata.last_name)
                    setFormValue('email', userdata.email)
                    setFormValue('phone', userdata.phone)
                    setFormValue('organization', userdata.organization)
                    setFormValue('subscribe', userdata.subscribe)
                    
                    if (userdata.organization){
                        setValues(userdata.organization)
                    }

                    if (userdata.other_sector){                        
                        setFormValue('sector', 0)
                        setFormValue('other_sector', userdata.other_sector)
                    }else{
                        setFormValue('sector', userdata.sector)
                    }

                    if (userdata.other_academic_discipline) {
                        setFormValue('academic_discipline', 0)
                        setFormValue('other_academic_discipline', userdata.other_academic_discipline)
                    } else {
                        setFormValue('academic_discipline', userdata.academic_discipline)
                    }                    
                    
                    setFormValue('level_of_education', userdata.level_of_education)                    

                    if (userdata.other_occupation) {
                        setFormValue('occupation', 0)
                        setFormValue('other_occupation', userdata.other_occupation)
                    } else {
                        setFormValue('occupation', userdata.occupation)
                    }
                    

                    if (userdata.about_us){ 
                        var regex = /<br\s*[\/]?>/gi;
                        setFormValue('about_us', userdata.about_us.replace(regex, "\n"));
                    }
                    // if (userdata.research_description) {
                    //     var regex = /<br\s*[\/]?>/gi;
                    //     setFormValue('research_description', userdata.research_description.replace(regex, "\n"));
                    // }
                    if (userdata.avatar){
                        setSetectavatar(userdata.avatar)
                    }                        
                    
                    if (userTypeList == 2){
                       
                        if (userdata.other_professional_interest_area) {
                            setOtherProfessionalInterestArea(true)
                            setFormValue('other_professional_interest_area', userdata.other_professional_interest_area)
                            if (userdata.pinterestarea && userdata.pinterestarea.length > 0) {
                                userdata.pinterestarea.push({ id: 0, label: "Other Interest Area", value: 0 });
                                setSelectedProfessionalInterestArea(userdata.pinterestarea);
                            } else {
                                setSelectedProfessionalInterestArea([{ id: 0, label: "Other Interest Area", value: 0 }]);
                            }
                        } else {
                            if (userdata.pinterestarea && userdata.pinterestarea.length > 0) {
                                setSelectedProfessionalInterestArea(userdata.pinterestarea);
                            }
                        }
                    }
                    
                               
                    if (userTypeList == 3) { 
                        if (userdata.other_research_interest_area) {
                            setOtherResearcherInterestArea(true)
                            setFormValue('other_research_interest_area', userdata.other_research_interest_area)
                            if (userdata.rinterestarea && userdata.rinterestarea.length > 0) {
                                userdata.rinterestarea.push({ id: 0, label: "Other Interest Area", value: 0 });
                                setSelectedResearcherInterestArea(userdata.rinterestarea);
                            } else {
                                setSelectedResearcherInterestArea([{ id: 0, label: "Other Interest Area", value: 0 }]);
                            }
                        } else {
                            if (userdata.rinterestarea && userdata.rinterestarea.length > 0) {
                                setSelectedResearcherInterestArea(userdata.rinterestarea);
                            }
                        }
                    }
                    

                    if (userdata.city){
                        setValue(userdata.city)
                        setCity(userdata.city)
                        setLatitude('23.23')
                        setLongitude('23.23')
                    }

                    setTimeout(() => {
                        clearSuggestions();
                    }, 800);
                }
            })
            .catch((err) => { console.log(err); });

    }, [userTypeList]);


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

    const onSubmit = (data) => {

        // if (!otherProfessionalInterestArea){
        //     data.other_professional_interest_area = '';
        // }
        // if (!otherResearcherInterestArea) {
        //     data.other_research_interest_area = '';
        // }

        if (data.sector > 0){            
            data.other_sector = ''
        }
        
        if (data.occupation > 0){
            data.other_occupation = ''
        }

        if (data.academic_discipline > 0) {
            data.other_academic_discipline = ''
        }
       
        if (data.about_us){
            var textareaText = data.about_us;
            textareaText = textareaText.replace(/\r?\n/g, '<br />');
            data.about_us = textareaText;
        }

        // if (data.research_description) {
        //     var textareaText = data.research_description;
        //     textareaText = textareaText.replace(/\r?\n/g, '<br />');
        //     data.research_description = textareaText;
        // }

        if (userTypeList == 4) {            
            data.role = userTypeList
            updateProfile(data);            
        } else {

            data.role = userTypeList

            updateProfile(data);

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
            //     data.role = userTypeList
                
            //     updateProfile(data);
                
            // }
        }
    }

    const updateProfile = (data) => {
        data.removeImages = removeImages;
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (selectedFile) {
            formData.append("image", selectedFile, selectedFile.name);
        }

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        axios.post(api_url + '/user/updateuserByadmin', formData, config).then((result) => {               
            if (result.data.status) {   
                var userdata = result.data.response.data;

                if (userdata.avatar) {
                    const typeStrings = localStorage.getItem('userdata');
                    var newstring = JSON.parse(typeStrings);
                    newstring.avatar = userdata.avatar
                    localStorage.setItem('userdata', JSON.stringify(newstring));
                }
              //  history.push("/view-profile?id=" + user.id);
                window.location = "/view-profile?id=" + user.id;
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        })
        .catch((err) => {

        })
    };

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
                        console.log(results);
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
            setCityError('Address is required.');
        } else {
            setValue(e.target.value);
            setCity(e.target.value);
            setCityError('');
        }
    };


    const changeSelectedProfessionalInterestArea = (e) => {  
        const containsOther = !!e.find(user => {
            return user.label === 'Other Interest Area'
        })
        if (containsOther) {
            setOtherProfessionalInterestArea(true);
        } else {
            setOtherProfessionalInterestArea(false);
        }
    }

    const changeSelectedResearcherInterestArea = (e) => {
        const containsOther = !!e.find(user => {
            return user.label === 'Other Interest Area'
        })        
        if (containsOther) {
            setOtherResearcherInterestArea(true);
        } else {
            setOtherResearcherInterestArea(false);
        }
    }

    const [setectavatar, setSetectavatar] = useState();
    const changeFileHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event) => {
                setSetectavatar(event.target.result);
            }
            reader.readAsDataURL(event.target.files[0]);
            setSelectedFile(event.target.files[0]);
        }
    };

    const removeImage = () =>{
        setSelectedFile('');
        setSetectavatar('');
        setRemoveImages('yes')
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
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Edit Profile</h2>
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
                        <h3 class="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms" style={{ "visibility": "visible", "animation-duration": "500ms", "animation-name": "fadeInUp" }}>Edit Profile</h3>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="login-content mt-6">

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="view-profile-card">
                                        <div className="view-profile-header">

                                            <div className="row">
                                                <div className="col-md-9">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group edit-profile">
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
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group edit-profile">
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
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group edit-profile">

                                                        <input type="file" className="form-control edit-avatar-image" name="myfile" accept=".png,.jpg" onChange={changeFileHandler} />
                                                        <div className="profile-img">
                                                            <span className="browse-img">
                                                                {!setectavatar && <img alt="avatar" src="images/user.png" />}
                                                                {setectavatar && <img alt="avatar" src={setectavatar} alt="user-image" />}
                                                            </span>
                                                            UPLOAD IMAGE
                                                        </div>
                                                        <small>{selectedFile && selectedFile.name}</small>
                                                        <br />
                                                        {setectavatar && <span className="remove-image" onClick={(e) => removeImage()}>Remove<i className="fa fa-times" aria-hidden="true"></i></span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="view-profile-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {(userTypeList == 3 || userTypeList == 2) &&
                                                        <div>
                                                            <div className="form-group edit-profile">
                                                                <Controller
                                                                    name={"about_us"}
                                                                    control={control}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <textarea
                                                                            type="text"
                                                                            onChange={onChange}
                                                                            value={value}
                                                                            className="form-control"
                                                                            placeholder={`Tell us something about yourself `}
                                                                        />
                                                                    )}
                                                                ></Controller>
                                                            </div>
                                                            
                                                        </div>
                                                    }
                                                    <div className="form-group edit-profile">
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
                                                                    disabled
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
                                                    <div className="form-group edit-profile">
                                                        <Controller
                                                            name={"phone"}
                                                            control={control}
                                                            rules={{
                                                                required: true,
                                                                pattern: {
                                                                    value: /^[0-9]+$/i,
                                                                },
                                                            }}
                                                            render={({ field: { onChange, value } }) => (
                                                                <input
                                                                    type="phone"
                                                                    onChange={onChange}
                                                                    className="form-control"
                                                                    value={value}
                                                                    placeholder={`Phone *`}
                                                                />
                                                            )}
                                                        ></Controller>
                                                        {errors?.phone?.type === "required" && <small className="error">Phone is required</small>}
                                                        {errors?.phone?.type === "pattern" && (<small className="error">Invalid phone address</small>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="row">
                                               
                                                <div className="col-md-6">
                                                    <div className="form-group edit-profile autosuggestion">
                                                        {userTypeList !== 4 && <div>
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

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group edit-profile">
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
                                                                    <option key="01" value="0">Other academic discipline</option>
                                                                </select>
                                                            )}
                                                        ></Controller>
                                                        {errors.academic_discipline && errors.academic_discipline.type === "required" && (
                                                            <small className="error">Academic Discipline is required.</small>
                                                        )}

                                                        {academic_discipline_selected == 0 && <div><br />
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

                                                    </div>
                                                </div>
                                            </div>
                                            

                                            {userTypeList == 2 && <div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group edit-profile select-dropdown">
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
                                                                        <option key="01" value="0">Other Sector</option>
                                                                    </select>
                                                                )}
                                                            ></Controller>
                                                            {errors.sector && errors.sector.type === "required" && (
                                                                <small className="error">Sector is required.</small>
                                                            )}

                                                            {sector_selected == 0 && <div >
                                                                <br />
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


                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group edit-profile select-dropdown">
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
                                                                        <option key="01" value="0">Other Occupation</option>
                                                                    </select>
                                                                )}
                                                            ></Controller>
                                                            {errors.occupation && errors.occupation.type === "required" && (
                                                                <small className="error">Occupation is required.</small>
                                                            )}

                                                            {occupation_selected == 0 && <div><br />
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

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group edit-profile select-dropdown">
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
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group edit-profile">
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
                                                            {selectedProfessionalInterestArea.filter(item => item.label !== 'Other Interest Area').map(item => (
                                                                <span className="interest-area">{item.label}<i onClick={(e) => removeProfessionalInterest(item.value)} className="fa fa-times"></i></span>
                                                            ))}

                                                            {otherProfessionalInterestArea && <div>
                                                                <br />
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
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>}


                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
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
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="edit-btn">
                                                        <center><button type="submit" className="btn-save">Save</button></center>
                                                    </div>
                                                </div>
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