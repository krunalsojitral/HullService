import React, { useState, ref } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import useForm from './../hooks/useForm';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import api_url from "../Apiurl";
import axios from "axios";
import Swal from "sweetalert2";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";


const AddEditForm = ({ match }) => {

  const [editResume, setEditResume] = useState([])

  let history = useHistory();
  const {
    handleSubmit,
    getValues,
    setValue,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm();
  
  
  const [isEditMode, setisEditMode] = React.useState(0);
  const [certificationList, setCertificationList] = React.useState([]);
  const [industryRoleList, setIndustryRoleList] = React.useState([]);
  const [industryTypeList, setIndustryTypeList] = React.useState([]);
  const [educationLevelList, setEducationLevelList] = React.useState([]);
  const [employmentList, setEmploymentList] = React.useState([]);
  const [selectedSkill, setSelectedSkill] = React.useState([])
  const [skillDropdown, setSkillDropdown] = React.useState([])
  const [city, setCity] = React.useState([])
  const [latitude, setlatitude] = React.useState([])
  const [longitude, setlongitude] = React.useState([])
  const [country, setcountry] = React.useState([])
  const [setectavatar, setSetectavatar] = React.useState(0);
  

  React.useEffect(() => {

    axios.get(api_url + "/common/getCertificationList")
      .then((response) => {
        var res = response.data;
        if (res.status) { setCertificationList(res.response.data); }
      }).catch(function (error) { console.log(error); });

    axios.get(api_url + "/common/getIndustryRoleList")
      .then((response) => {
        var res = response.data;
        if (res.status) { setIndustryRoleList(res.response.data); }
      }).catch(function (error) { console.log(error); });

    axios.get(api_url + "/common/getIndustryTypeList")
      .then((response) => {
        var res = response.data;
        if (res.status) { setIndustryTypeList(res.response.data); }
      }).catch(function (error) { console.log(error); });

    axios.get(api_url + "/common/getEducationLevelList")
      .then((response) => {
        var res = response.data;
        if (res.status) { setEducationLevelList(res.response.data); }
      }).catch(function (error) { console.log(error); });

    axios.get(api_url + "/common/getEmploymentList")
      .then((response) => {
        var res = response.data;
        if (res.status) { setEmploymentList(res.response.data); }
      }).catch(function (error) { console.log(error); });

    axios.get(api_url + '/common/getSkillList').then(response => {
      var res = response.data;
      if (res.status) {
        var obj = res.response.data.map((data, index) => {
          let retObj = {};
          retObj['id'] = (index + 1);
          retObj['label'] = data.skill_name;
          retObj['value'] = data.skill_id;
          return retObj;
        });
        setSkillDropdown(obj);
      }
    }).catch(function (error) { console.log(error); });
    

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/user/getadminuserData", { id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {

            var usersdata = result.data.response.data;
            

            setValue("firstname", usersdata.firstname);
            setValue("lastname", usersdata.lastname);
            setValue("email", usersdata.email);
            setValue("linkedln_profile", usersdata.linkedln_profile);
            setValue("city", usersdata.city);
            setValue("latitude", usersdata.latitude);
            setValue("longitude", usersdata.longitude);
            setValue("phone", usersdata.phone);
            setValue("experience", usersdata.experience);
            setValue("industry_type", usersdata.industry_type);
            setValue("industry_role", usersdata.role);
            setValue("education_level", usersdata.education_level);
            setValue("certification", usersdata.certification_id);
            setValue("interest_role", usersdata.interest_role_id);
            setValue("notice_period", usersdata.notice_period);
            setValue("type_of_employment", usersdata.type_of_employment);
            setValue("hourly_rate", usersdata.hourly_rate);
            setValue("description_of_experience", usersdata.description_of_experience);
            setValue("description_of_mentoringterms", usersdata.description_of_mentoringterms);
            setValue("description_of_motivation", usersdata.description_of_motivation);
            setValue("resume", usersdata.resume);
            setValue("password", usersdata.password);
            setSetectavatar(usersdata.avatar);
            setValueLocation(usersdata.city);
            setEditResume(usersdata.resume);

            if (usersdata.skill.length > 0) {
              var obj = usersdata.skill.map((data, index) => {
                let retObj = {};
                retObj['id'] = (index + 1);
                retObj['label'] = data.skill_name;
                retObj['value'] = data.skill_id;
                return retObj;
              });
              setSelectedSkill(obj)
            }

            
            setTimeout(() => {
               clearSuggestions();
            }, 800);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => {
          console.log(err);
          //Swal.fire('Oops...', err, 'error')
        });
    }

   
  }, []);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue: setValueLocation,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  
  const handleInput = (e) => { setValueLocation(e.target.value); };

  const handleSelect =
    ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValueLocation(description, false);
        setCity(description, false);

        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => {
            const address_components = results[0].address_components;
            var filtered_array = address_components.filter(function (address_component) {
              return address_component.types.includes("country");
            });
            var country = filtered_array.length ? filtered_array[0].long_name : "";
            if (country) { setcountry(country) }
            return getLatLng(results[0])

          })
          .then(({ lat, lng }) => {
            setlatitude(lat)
            setlongitude(lng)
          })
          .catch((error) => {
            setlatitude('')
            setlongitude('')
            setcountry('')
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
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  const [selectedAvatarFile, setSelectedAvatarFile] = useState();
  const changeAvatarFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSetectavatar(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedAvatarFile(event.target.files[0]);
    }
  };

  const [selectedFile, setSelectedFile] = useState();
  const changeFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const updateInformationAct = (data) => {
    

    data.skill = selectedSkill;
    data.city = city;
    data.latitude = latitude;
    data.longitude = longitude;
    data.country = country;

    data.user_id = match.params.id;
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    if (selectedAvatarFile) {
      formData.append("avatar", selectedAvatarFile, selectedAvatarFile.name);
    }
    if (selectedFile) {
      formData.append("resume", selectedFile, selectedFile.name);
    }

    axios.post(api_url + "/user/updateAdminProfile", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/user/users");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {
    
    data.skill = selectedSkill;
    data.city = city;
    data.latitude = latitude;
    data.longitude = longitude;
    data.country = country;
    
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    if (selectedAvatarFile) {
      formData.append("avatar", selectedAvatarFile, selectedAvatarFile.name);
    }
    if (selectedFile) {
      formData.append("resume", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/user/addUserByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Oops...", result.data.response.msg, "error");
          history.push("/user/users");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };

  const removeSkill = (value) => {
    var removeskill = selectedSkill.filter(function (place) { return place.value !== value })
    setSelectedSkill(removeskill);
  };

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          {/* <CCardHeader>
            User id: {match.params.id}
          </CCardHeader> */}
          <CCardBody>


            <form onSubmit={handleSubmit((isEditMode === 1) ? updateInformationAct : addInformationAct)}>
              <CRow>
                <CCol xs="12">
                  <div className="Profile-title">
                    <h4>Profile Creation</h4>
                    <hr/>
                  </div>
                   <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="company">
                          LinkedIn Profile Link
                         </CLabel>
                        <Controller
                          name={"linkedln_profile"}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="text"
                              onChange={onChange}
                              value={value}
                              placeholder={`Enter your linkedln profile`}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>

                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="ccnumber">Upload resume</CLabel>
                        <input
                          type="file"
                          accept=".doc, .docx,.pdf"
                          name="myfile"
                          onChange={changeFileHandler}
                        />
                        {(isEditMode === 1 && editResume) ? <a target="_blank" download href={editResume}>Resume</a> : ''}
                      </CFormGroup>
                    </CCol>
                  </CRow> 

                </CCol>
              </CRow> 

              <br/><br />

              <CRow>
                <CCol xs="12">
                  <div className="Profile-title">
                    <h4>Personal Information</h4>
                    <hr />
                  </div>

                  <CRow>
                    <CCol xs="12">

                      <CFormGroup>
                        <CLabel htmlFor="ccnumber">Upload Picture &nbsp;</CLabel>
                        <input type="file" accept=".png,.jpg" name="myfile" onChange={changeAvatarFileHandler} />
                        {!setectavatar && <img style={{ width: "100px" }} alt="avatar" src="images/company-logo.png" />}
                        {setectavatar && <img style={{ width: "100px" }} src={setectavatar} alt="user-image" />}
                      </CFormGroup>

                    </CCol>
                  </CRow>    
                  


                  <CRow>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="company">
                          First Name
                         </CLabel>
                        <Controller
                          name={"firstname"}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="text"
                              onChange={onChange}
                              value={value}
                              placeholder={`Enter your firstname`}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.firstname && errors.firstname.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter firstname.</p>
                      )}
                    </CCol>

                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="company">
                          Last Name
                         </CLabel>
                        <Controller
                          name={"lastname"}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="text"
                              onChange={onChange}
                              value={value}
                              placeholder={`Enter your lastname`}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.lastname && errors.lastname.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter lastname.</p>
                      )}
                    </CCol>
                  </CRow>


                   <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          City
                         </CLabel>
                        <div ref={ref}>
                          <CInput
                            value={value}
                            onChange={handleInput}
                            disabled={!ready}
                            placeholder="city"
                          />
                          {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
                        </div>
                      </CFormGroup>
                      {errors.city && errors.city.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter city.</p>
                      )}
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="ccnumber">Email</CLabel>
                        <Controller
                          name={"email"}
                          control={control}
                          rules={{ required: true,
                                    pattern: {
                                      value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                    } }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="email"
                              onChange={onChange}
                              disabled={(isEditMode === 1) ? true : false}
                              value={value}
                              placeholder={`Enter your Email`}
                            />
                          )}
                        ></Controller>
                        {(errors.email && errors.email.type === "required" && (<p style={{ color: "red", fontSize: "12px" }}>Email is required.</p>)) ||
                          (errors.email && errors.email.type === "pattern" && (<p style={{ color: "red", fontSize: "12px" }}>Email is invalid.</p>))
                        }
                      </CFormGroup>
                    </CCol>

                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="ccnumber">Phone</CLabel>
                        <Controller
                          name={"phone"}
                          control={control}
                          rules={{
                            required: true
                          }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="text"
                              onChange={onChange}
                              value={value}
                              placeholder={`Enter your phone`}
                            />
                          )}
                        ></Controller>
                        {errors.phone && errors.phone.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>Please enter phone.</p>
                        )}
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                <CFormGroup>
                  <CLabel htmlFor="password">Password</CLabel>
                    <Controller
                      name={"password"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="password"
                          disabled={(isEditMode === 1) ? true : false}
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your password`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.password && errors.password.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Please enter lastname.</p>
                  )}
                </CCol>
              </CRow>

               <CRow>
                <CCol xs="12">
                  <div class="Profile-title">
                    <h4>Past Experience</h4>
                    <hr />
                  </div>
                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="company">
                          Total Experience
                         </CLabel>
                        <Controller
                          name={"experience"}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="text"
                              onChange={onChange}
                              value={value}
                              placeholder={`Enter your experience`}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.experience && errors.experience.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter experience.</p>
                      )}
                    </CCol>
                  </CRow>

                   <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          What industry did you have this experience from? *
                         </CLabel>
                        <Controller
                          name="industry_type"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <select className="form-control" onChange={onChange} value={value}>
                              <option key="0" value="">select value</option>
                              {industryTypeList.map((item) => (
                                <option key={item.industry_type_id} value={item.industry_type_id}>
                                  {item.industry_name}
                                </option>
                              ))}
                            </select>                            
                          )}
                        ></Controller>
                      </CFormGroup>                      
                      {errors.industry_type && errors.industry_type.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter industry.</p>
                      )}
                    </CCol>
                  </CRow>


                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          What was your role in this case?
                         </CLabel>
                        <Controller
                          name="industry_role"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <select className="form-control" onChange={onChange} value={value}>
                              <option key="0" value="">select value</option>
                              {industryRoleList.map((item) => (
                                <option key={item.industry_role_id} value={item.industry_role_id}>
                                  {item.role_name}
                                </option>
                              ))}
                            </select>
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.industry_role && errors.industry_role.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter industry.</p>
                      )}
                    </CCol>
                  </CRow>

                </CCol>
              </CRow>

            
              <CRow>
                <CCol xs="12">
                  <div class="Profile-title">
                    <h4>Education</h4>
                    <hr />
                  </div>    

                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          Education Level
                         </CLabel>
                        <Controller
                          name="education_level"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <select className="form-control" onChange={onChange} value={value}>
                              <option key="0" value="">select value</option>
                              {educationLevelList.map((item) => (
                                <option key={item.education_level_id} value={item.education_level_id}>
                                  {item.education_name}
                                </option>
                              ))}
                            </select>
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.education_level && errors.education_level.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter industry.</p>
                      )}
                    </CCol>
                  </CRow>


                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          Certifications
                         </CLabel>
                        <Controller
                          name="certification"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <select className="form-control" onChange={onChange} value={value}>
                              <option key="0" value="">select value</option>
                              {certificationList.map((item) => (
                                <option key={item.certification_id} value={item.certification_id}>
                                  {item.certi_name}
                                </option>
                              ))}
                            </select>
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.certification && errors.certification.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter certification</p>
                      )}
                    </CCol>
                  </CRow>

                 

                 

                </CCol>
              </CRow> 

 
              <CRow>
                <CCol xs="12">
                  <div class="Profile-title">
                    <h4>Preferences</h4>
                    <hr />
                  </div>

                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          Which of the following roles interest you the most? *
                         </CLabel>
                        <Controller
                          name="interest_role"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <select className="form-control" onChange={onChange} value={value}>
                              <option key="0" value="">select value</option>
                              {industryRoleList.map((item) => (
                                <option key={item.industry_role_id} value={item.industry_role_id}>
                                  {item.role_name}
                                </option>
                              ))}
                            </select>
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.interest_role && errors.interest_role.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter certification</p>
                      )}
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          Skills you are looking for
                         </CLabel>
                          <MultiSelect
                            options={skillDropdown}
                            value={selectedSkill}
                            selectionLimit="2"
                            hasSelectAll={false}
                            onChange={setSelectedSkill}
                            labelledBy="Select"
                          />                          
                      </CFormGroup>    
                      <br />
                      {selectedSkill.map(item => (
                        <span className="skill-name">{item.label} &nbsp;<i onClick={(e) => removeSkill(item.value)} className="fa fa-times">X</i></span>
                      ))}
                    </CCol>
                  </CRow>

                  <br /><br />


                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          When can you start in a new position?
                         </CLabel>
                        <Controller
                          name="notice_period"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <select className="form-control" onChange={onChange} value={value}>
                              <option key="0" value="">select value</option>
                              <option key="0" value="">select value</option>
                              <option key="0" value="1">1 week</option>
                              <option key="1" value="2">2 week</option>
                              <option key="2" value="3">3 week</option>
                              <option key="3" value="4">4 week</option>
                              <option key="4" value="other">Other</option>
                            </select>
                          )}
                        ></Controller>
                      </CFormGroup>

                      {/* <CFormGroup>
                        <CLabel htmlFor="company">
                          Total Experience
                         </CLabel>
                        <Controller
                          name={"notice_period"}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="text"
                              onChange={onChange}
                              value={value}
                              placeholder={`Enter your experience`}
                            />
                          )}
                        ></Controller>
                      </CFormGroup> */}
                      {errors.notice_period && errors.notice_period.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter certification</p>
                      )}
                    </CCol>
                  </CRow>


                  

                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          What type of employment are you looking for?
                         </CLabel>
                        <Controller
                          name="type_of_employment"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <select className="form-control" onChange={onChange} value={value}>
                              <option key="0" value="">select value</option>
                              {employmentList.map((item) => (
                                <option key={item.employment_id} value={item.employment_id}>
                                  {item.employment_name}
                                </option>
                              ))}
                            </select>
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.type_of_employment && errors.type_of_employment.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter certification</p>
                      )}
                    </CCol>
                  </CRow>


                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="company">
                          What hourly rate are you looking for?
                         </CLabel>
                        <Controller
                          name={"hourly_rate"}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <CInput
                              type="text"
                              onChange={onChange}
                              value={value}
                              placeholder={`Enter your experience`}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>
                      {errors.hourly_rate && errors.hourly_rate.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter certification</p>
                      )}
                    </CCol>
                  </CRow>

                 

                  


                </CCol>
              </CRow>



              <CRow>
                <CCol xs="12">
                  <div class="Profile-title">
                    <h4>About Yourself</h4>
                    <hr />
                  </div>

                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          Can you explain your experience with the regulatory requirements of this industry?
                         </CLabel>
                        <Controller
                          type={"text"}
                          name={"description_of_experience"}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <CTextarea
                              placeholder="Description"
                              class="textarea"
                              value={value}
                              onChange={onChange}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          Can you talk about your experience mentoring teams?
                         </CLabel>
                        <Controller
                          type={"text"}
                          name={"description_of_mentoringterms"}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <CTextarea
                              placeholder="Description"
                              class="textarea"
                              value={value}
                              onChange={onChange}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="city">
                          What keeps you motivated about work?
                         </CLabel>
                        <Controller
                          type={"text"}
                          name={"description_of_motivation"}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <CTextarea
                              placeholder="Description"
                              class="textarea"
                              value={value}
                              onChange={onChange}
                            />
                          )}
                        ></Controller>
                      </CFormGroup>                     
                    </CCol>
                  </CRow>

                </CCol>
              </CRow> 

              <button type="submit" class="btn-submit"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>

            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
