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

    const [sectorList, setSectorList] = React.useState([]);
    const [academicDisciplineList, setAcademicDisciplineList] = React.useState([]);
    const [occupationList, setOccupationList] = React.useState([]);

    

    

    

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

        if (data.about_us) {
            var textareaText = data.about_us;
            textareaText = textareaText.replace(/\r?\n/g, '<br />');
            data.about_us = textareaText;
        }

        if (data.research_description) {
            var textareaText = data.research_description;
            textareaText = textareaText.replace(/\r?\n/g, '<br />');
            data.research_description = textareaText;
        }

        data.role = 3;
        researcherrequestUser(data);


        // if (userTypeList == 'general') {
        //     if (userTypeList == 'researcher') {
        //         data.role = 3;
        //     } else if (userTypeList == 'professional') {
        //         data.role = 2;
        //     } else {
        //         data.role = 4;
        //     }

        //     researcherrequestUser(data);

        //     // axios.post(api_url + "/user/checkEmail", { email: data.email })
        //     //     .then((result) => {
        //     //         if (result.data.status) {
        //     //             if (data.role == 4){
        //     //                 registerUser(data);
        //     //             }else{
        //     //                 localStorage.setItem('registerdata', JSON.stringify(data));
        //     //                 history.push('/payment');
        //     //             }
        //     //         } else {
        //     //             Swal.fire('Oops...', result.data.response.msg, 'error');
        //     //         }
        //     //     })
        //     //     .catch((err) => { console.log(err); });


        // } else {
        //     if (!city) {
        //         setCityError('Address is required.');
        //     } else if (!latitude && !longitude) {
        //         setCityError('Please enter proper address.');
        //     } else {
        //         data.city = city;
        //         data.latitude = latitude;
        //         data.longitude = longitude;
        //         data.country = country;
        //         data.professional_interest_of_area = selectedProfessionalInterestArea;
        //         data.researcher_interest_of_area = selectedResearcherInterestArea;

        //         if (userTypeList == 'researcher') {
        //             data.role = 3;
        //         } else if (userTypeList == 'professional') {
        //             data.role = 2;
        //         } else {
        //             data.role = 4;
        //         }

        //         researcherrequestUser(data);

        //         // axios.post(api_url + "/user/checkEmail", { email: data.email })
        //         //     .then((result) => {
        //         //         console.log(result);
        //         //         if (result.data.status) {
        //         //             if (data.role == 4) {
        //         //                 registerUser(data);
        //         //             } else {
        //         //                 localStorage.setItem('registerdata', JSON.stringify(data));
        //         //                 history.push('/payment');
        //         //             }
        //         //         }else{
        //         //             Swal.fire('Oops...', result.data.response.msg, 'error');
        //         //         }
        //         //     })
        //         //     .catch((err) => { console.log(err); });
        //     }
        // }
    }

   
   


    return (

        <div>
            <Header />


            <section class="second-banner-sec" style={{ background: `url('images/research-banner.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div class="container">
                    <div class="second-banner-inner">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="text-box">
                                    <h2 class="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Research</h2>
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
            </section >
            <section class="about-researcher">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12 order-lg-1 order-2">
                            <div class="content wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                            <p >Pathways to Prevention works with researchers who share our dedication to better understanding the nature and impacts of childhood trauma and who seek to prevent and reduce the effects of childhood trauma.</p>
                            <p>Our researchers are experts in their field of study, affiliated with various academic and social institutions across Canada and worldwide. Pathways to Prevention offers a collaborative space where researchers can join to work together on their shared pursuits in the study, prevention, and treatment of childhood trauma.   </p>
                            <p>As new knowledge is acquired through research, Pathways to Prevention translate findings into policy recommendations and advocates for targeted, efficient, and effective precision approaches. </p>
                            <p>Pathways to Prevention supports the advancement of the field by connecting researchers with community members with lived experiences who are willing to share their time, experience, and knowledge. We host a centralized pool of participants willing to be contacted for research participation and post current studies recruiting participants.  </p>
                            </div>
                        </div>               
                    </div>
                </div>
            </section>

            <section class="researcher-sec researchContact">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="researcher-heading" style={{"background-color":"#F7F7F7", "text-align":"center", "padding":"50px", "border-radius": "25px"}}>
                                {/* <strong class="wow animate__fadeInUp" data-wow-duration="1400ms" data-wow-delay="1000ms" style={{"visibility": "visible", "animation-duration": "1400ms", "animation-name": "fadeInUp", "font-size":"19px"}}>Registrations for the Researchers coming soon</strong> */}


                                <div className="login-section">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="login-box">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="login-details">                                                          

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
                                                                            type="text"
                                                                            onChange={onChange}
                                                                            value={value}
                                                                            className="form-control"
                                                                            placeholder={`Phone *`}
                                                                        />
                                                                    )}
                                                                ></Controller>
                                                                {errors.phone && errors.phone.type === "required" && (
                                                                    <small className="error">Phone is required.</small>
                                                                )}
                                                                {errors?.phone?.type === "pattern" && (<small className="error">Invalid phone number</small>)}
                                                            </div>
                                                           

                                                            <div className="form-group autosuggestion">
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

                                                                    
                                                                </div>
                                                            }

                                                            <div className="form-group">
                                                                <Controller
                                                                    name={"research_description"}
                                                                    control={control}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <textarea
                                                                            rows="4" cols="50"
                                                                            type="text"
                                                                            onChange={onChange}
                                                                            value={value}
                                                                            className="form-control"
                                                                            placeholder={`Description of Research `}
                                                                        />
                                                                    )}
                                                                ></Controller>
                                                            </div>


                                                            <div className="form-group">
                                                                <Controller
                                                                    name={"about_us"}
                                                                    control={control}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <textarea
                                                                            rows="4" cols="50"
                                                                            type="text"
                                                                            onChange={onChange}
                                                                            value={value}
                                                                            className="form-control"
                                                                            placeholder={`Tell us about you`}
                                                                        />
                                                                    )}
                                                                ></Controller>
                                                            </div>

                                                            <button type="submit" className="sign-btn">Submit</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
           


            

            <Footer />
        </div>
    )
}