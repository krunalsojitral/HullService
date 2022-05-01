import React, { useState, useRef, ref } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CTabs,
  CTabPane,
  CTabContent,
  CCardHeader,
  CNavItem,
  CNavLink,
  CNav
} from '@coreui/react'
//import { MultiSelect } from "react-multi-select-component";
import '../TextEditors.scss'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import TimezoneSelect from 'react-timezone-select'
import NestedArray from "./nestedFieldArray";
import Search from "./search";

const AddEditForm = ({ match }) => {
  const [active, setActive] = useState(0)
  const [city, setCity] = React.useState('');
  const [cityError, setCityError] = React.useState('');
  const [showReflect, setShowReflect] = React.useState(0);

  const [timezoneList, setTimezoneList] = React.useState([]);

  React.useEffect(() => {
    axios.get(api_url + "/common/timezone-list", {}).then((result) => {
      if (result.data.status) {
        setTimezoneList(result.data.data);
      } 
    }).catch((err) => { console.log(err); });
  }, []);


  let history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   sessionStartTime: [{ name: "default Value" }],
    //   sessionEndTime: [{ name: "default Value" }],
    //   sessionNoOfParticipate: [{ name: "default Value" }],
    //   sessionTimezone: [{ name: "default Value" }],      
    //   videoURL: [{ name: "default Value" }],
    //   webPageUrl: [{ name: "default Value" }],
    // }
  });
  const [selectedTimezone, setSelectedTimezone] = useState({})

  const purchase_type_selected = watch("purchase_type");
  const event_type_selected = watch("event_type");
  const session_type_selected = watch("session_type");  
  //const no_of_sessions_selected = watch("no_of_sessions");
  const no_of_group_selected = watch("no_of_group");  
  const session_purchase_type_selected = watch("session_purchase_type");

  const [selectimage, setSelectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();

  // const [selectSessionimage, setSelectSessionimage] = React.useState(0);
  // const [selectedSessionFile, setSelectedSessionFile] = useState();

  const [selectSpeakerImage, setSelectSpeakerImage] = React.useState(0);
  const [selectedSpeakerFile, setSelectedSpeakerFile] = useState();

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  }

  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSelectimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  // const changeSessionImageFileHandler = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (event) => {
  //       setSelectSessionimage(event.target.result);
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //     setSelectedSessionFile(event.target.files[0]);
  //   }
  // };

  const changeSpeakerFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSelectSpeakerImage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedSpeakerFile(event.target.files[0]);
    }
  };


 

  //const initialText = ``;

  const preview = () => {

    var obj = {
      cost: (control._fields.cost && control._fields.cost._f.value) ? control._fields.cost._f.value : '',
      purchase_type: (control._fields.purchase_type && control._fields.purchase_type._f.value) ? control._fields.purchase_type._f.value : '',
      title: (control._fields.title && control._fields.title._f.value) ? control._fields.title._f.value : '',
      description: (contentEditor) ? contentEditor : '',
      start_date: (control._fields.start_date && control._fields.start_date._f.value) ? control._fields.start_date._f.value : '',
      start_time: (control._fields.start_time && control._fields.start_time._f.value) ? control._fields.start_time._f.value : '',
      end_date: (control._fields.end_date && control._fields.end_date._f.value) ? control._fields.end_date._f.value : '',
      end_time: (control._fields.end_time && control._fields.end_time._f.value) ? control._fields.end_time._f.value : '',
      speaker_name: (control._fields.speaker_name && control._fields.speaker_name._f.value) ? control._fields.speaker_name._f.value : '',
      location: city,
      type: 'event'
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/common/addPreview", formData).then((result) => {
      if (result.data.status) {
        window.open(result.data.response.preview + "preview-module");
        //window.open("http://localhost:4200/preview-module");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });

  }

  const addInformationAct = async (data) => {

    console.log(data);
    return;
    data.timezone = selectedTimezone;
    data.location = city;
    data.description = contentEditor;
    
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }

    if (selectedSpeakerFile) {
      formData.append("speaker_image", selectedSpeakerFile, selectedSpeakerFile.name);
    }

    // if (selectedSessionFile) {
    //   formData.append("session_image", selectedSessionFile, selectedSessionFile.name);
    // }

   

    if (finalFile && finalFile.length > 0) {
      for (var i = 0; i < finalFile.length; i++) {
        if (finalFile[i].name) {
          formData.append("resources[]", finalFile[i], finalFile[i].name);
        }
      }
    }


    axios.post(api_url + "/event/addEventByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");
       // history.push("/events");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });


  };

  const nextTab = async (tab) => {
    if (tab == 1) {
      const result = await trigger(["title", "start_date", "end_date"]);
      if (result) {
        setActive(tab);
      }
    } else {
      setActive(tab);
    }
  }

  const { fields: session, append: sessionAppend, remove: sessionRemove } = useFieldArray({
    control,
    name: 'sessionStartTime',
    name: 'sessionEndTime',
    name: 'sessionNoOfParticipate',
    name: 'sessionTimezone',
    nested: [{ name: "nested" }]
  });

  const { fields: video, append: videoAppend, remove: videoRemove } = useFieldArray({
    control,
    name: 'videoURL'
  });

  const { fields: webPage, append: webPageAppend, remove: webPageRemove } = useFieldArray({
    control,
    name: 'webPageUrl'
  });

  const [file, setFile] = useState([{ type: '', name: '', file: [] }]);
  const [finalFile, setFinalFile] = useState([]);

  function uploadSingleFile(e) {
    setFinalFile([...finalFile, (e.target.files[0])]);
    var type = ''
    var ext = e.target.files[0].type;
    var arrayExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
    if (arrayExtensions.lastIndexOf(ext.toLowerCase()) == -1) {
      type = 'doc';
    } else {
      type = 'image';
    }
    setFile([...file, { type: type, name: e.target.files[0].name, file: URL.createObjectURL(e.target.files[0]) }]);
  }

  function upload(e) {
    e.preventDefault();
  }

  function deleteFile(e, name) {
    const s = file.filter((item, index) => index !== e);
    const fs = finalFile.filter((item, index) => item.name !== name);
    setFile(s);
    setFinalFile(fs);
  }

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

  const sessionLocationhandleInput = (e) => {
    console.log(e);
    //setValue(e.target.value);
  };

  const addReflectiveSessions = () => {   

    session.forEach((item, index) => { 
      sessionRemove({});
    });
    setShowReflect(1)
    
    let arr = Array.apply(null, { length: (no_of_group_selected) }).map(Number.call, Number);
    arr.forEach((item, index) => {
      // console.log(item);
      // console.log(session);
      sessionAppend({})
    });
  }

  const {
    ready,
    value: cityValue,
    suggestions: { status, data },
    setValue ,
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
            if (country) { 
              //setCountry(country); 
            }
            return getLatLng(results[0])

          })
          .then(({ lat, lng }) => {
            // setLatitude(lat)
            // setLongitude(lng)
          })
          .catch((error) => {
            // setLatitude('');
            // setLongitude('');
            // setCountry('');
            console.log("Error: ", error);
          });
      };


  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            Add Event
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit(addInformationAct)}>
              <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      Event
                      {active === 0 && ' '}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Reflective practice sessions
                      {active === 1 && ' '}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Resources
                      {active === 2 && ' '}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Event Subscribe USer
                      {active === 3 && ' '}
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>

                  <CTabPane>
                    <br />
                    <CCol>
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="title">Title <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"title"}
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  placeholder={`Enter event title`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.title && errors.title.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Title is required.</p>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="title">Start Date <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"start_date"}
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <ReactDatePicker
                                  showTimeSelect
                                  className="form-control"
                                  selected={value}
                                  onChange={onChange}
                                  dateFormat="yyyy/MM/dd h:mm a"
                                  dateFormatCalendar="yyyy/MM/dd h:mm a"
                                  minDate={new Date()}
                                  maxDate={new Date(2030, 11)}
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  isClearable
                                  placeholderText="Start date"
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.start_date && errors.start_date.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Start date is required.</p>
                          )}
                        </CCol>  
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="title">End Date <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"end_date"}
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <ReactDatePicker
                                  showTimeSelect
                                  className="form-control"
                                  selected={value}
                                  onChange={onChange}
                                  dateFormat="yyyy/MM/dd h:mm a"
                                  dateFormatCalendar="yyyy/MM/dd h:mm a"
                                  minDate={new Date()}
                                  maxDate={new Date(2030, 11)}
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  isClearable
                                  placeholderText="End date"
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.end_date && errors.end_date.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>End date is required.</p>
                          )}
                        </CCol>                     
                      </CRow>
                      
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="event_timezone">Select timezone</CLabel>
                            <Controller
                              name={`event_timezone`}
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <select className="form-control" onChange={onChange} value={value}>
                                  <option key="0" value="">select value</option>
                                  {timezoneList.map((item) => (
                                    <option key={item.value} value={item.value}>
                                      {item.label}
                                    </option>
                                  ))}
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                        </CCol>
                      </CRow>                     

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="password">About the Event</CLabel>
                            <Editor
                              apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                              cloudChannel="dev"
                              init={{
                                selector: "textarea",
                                plugins: "link image textpattern lists textcolor colorpicker",
                                toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                              }}
                              value={contentEditor}
                              onEditorChange={handleEditorChange}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="Organization">Speaker Name</CLabel>
                            <Controller
                              name={"speaker_name"}
                              control={control}
                             // rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  placeholder={`Enter speaker name`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                          {/* {errors.speaker_name && errors.speaker_name.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Speaker name is required.</p>
                          )} */}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="Organization">Speaker Email</CLabel>
                            <Controller
                              name={"speaker_email"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  placeholder={`Enter speaker email`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="ccnumber">Speaker’s Image</CLabel>
                            <br />
                            <input
                              type="file"
                              accept=".png,.PNG,.JPG,.jpg,.jpeg"
                              name="myfile"
                              onChange={changeSpeakerFileHandler}
                            />
                            <span>
                              {!selectSpeakerImage && <img style={{ width: "100px" }} alt="avatar" src="/company-logo.png" />}
                              {selectSpeakerImage && <img style={{ width: "100px" }} src={selectSpeakerImage} alt="user-image" />}
                            </span>
                          </CFormGroup>
                        </CCol>
                      </CRow> 

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel className="forum-feedback"><b>About the speaker : </b> &nbsp;</CLabel>
                            <Controller
                              name={"about_speaker"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <textarea rows="6" cols="45"
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  className="form-control"
                                  placeholder={`About the speaker`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                        </CCol>
                      </CRow>


                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">Online & Offline <span className="label-validation">*</span></CLabel>
                            <Controller
                              name="event_type"
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <select className="form-control" onChange={onChange} value={value}>
                                  <option key="0" value="">select value</option>
                                  <option key="1" value="online">Online</option>
                                  <option key="2" value="offline">Offline</option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.event_type && errors.event_type.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Type is required.</p>
                          )}
                        </CCol>
                      </CRow>
                     
                      {event_type_selected === 'offline' &&
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="role">Location</CLabel>
                              <Controller
                                name={"session_location"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Search 
                                    value={value}
                                    onChange={onChange} />
                                )}
                              ></Controller>
                            </CFormGroup>

                            {/* <CFormGroup>
                              <CLabel htmlFor="title"> Session Location</CLabel>
                              <div ref={ref}>
                                <input
                                  value={cityValue}
                                  onChange={sessionLocationhandleInput}
                                  disabled={!ready}
                                  placeholder="Address *"
                                  className="form-control input"
                                />
                                {status === "OK" && <ul className="suggestion">{renderSuggestions('session_location')}</ul>}
                                {cityError && <small className="error">{cityError}</small>}
                              </div>
                            </CFormGroup> */}

                            
                            {/* <CFormGroup>
                              <CLabel htmlFor="Location">Location <span className="label-validation">*</span></CLabel>
                              <Controller
                                name={"session_location"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                  <CInput
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    placeholder={`Enter your location`}
                                  />
                                )}
                              ></Controller>
                            </CFormGroup> */}                           
                          </CCol>
                        </CRow> }
                     

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="ccnumber">Event Image</CLabel>
                            <br />
                            <input
                              type="file"
                              accept=".png,.PNG,.JPG,.jpg,.jpeg"
                              name="myfile"
                              onChange={changeFileHandler}
                            />
                            <span>
                              {!selectimage && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                              {selectimage && <img style={{ width: "100px" }} src={selectimage} alt="user-image" />}
                            </span>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">Paid / Unpaid <span className="label-validation">*</span></CLabel>
                            <Controller
                              name="purchase_type"
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <select className="form-control" onChange={onChange} value={value}>
                                  <option key="0" value="">select value</option>
                                  <option key="1" value="paid">Paid</option>
                                  <option key="2" value="unpaid">Unpaid</option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.purchase_type && errors.purchase_type.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Type is required.</p>
                          )}
                        </CCol>
                      </CRow>

                      {purchase_type_selected === 'paid' &&
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="cost">Cost <span className="label-validation">*</span></CLabel>
                              <Controller
                                name={"cost"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                  <CInput
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    placeholder={`Enter your cost`}
                                  />
                                )}
                              ></Controller>
                            </CFormGroup>
                            {errors.cost && errors.cost.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>Cost is required.</p>
                            )}
                          </CCol>
                        </CRow>}



                      <CRow>
                        <CCol xs="12">
                          <button className="btn btn-outline-primary" type="button" onClick={() => nextTab(1)}>Next</button>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CTabPane>

                  <CTabPane>
                    <CCol>
                      <br />

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="session_title">Title </CLabel>
                            <Controller
                              name={"session_title"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  placeholder={`Enter title`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>                          
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel className="forum-feedback">About the Sessions : &nbsp;</CLabel>
                            <Controller
                              name={"session_about"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <textarea rows="6" cols="45"
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  className="form-control"
                                  placeholder={`About the sessions`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="4">
                          <CFormGroup>
                            <CLabel htmlFor="title">No of Groups <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"no_of_group"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  placeholder={`Enter no of groups`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>                          
                        </CCol>
                        {/* <CCol xs="4">
                          <CFormGroup>
                            <CLabel htmlFor="title">No of sessions <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"no_of_sessions"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}
                                  placeholder={`Enter no of sessions`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>                          
                        </CCol> */}
                        <CCol xs="4">                          
                          <button type="button" className="btn btn-success mt-4" onClick={() => addReflectiveSessions()}>Submit</button>
                        </CCol>
                      </CRow>
                      
                       
                      {showReflect == 1 && <div>
                        <CRow>
                          {session.map((item, index) => (
                            <div key={item.id}>
                              <CCol xs="12">
                                <CRow>
                                  <CLabel htmlFor="title">Group {index + 1} Details :</CLabel>
                                </CRow>
                              </CCol>
                              <br />

                              <NestedArray
                                nestIndex={index}
                                editdata=""
                               // no_of_sessions_selected={2}
                                {...{ control, register, errors }}
                              />
                              

                              <CCol xs="12">
                                <CRow>
                                  <CCol xs="2">
                                    <CLabel htmlFor="title">Group StartTime</CLabel>
                                    <CFormGroup>                                      
                                      <Controller
                                        name={`sessionStartTime.${index}.value`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                          <ReactDatePicker
                                            selected={value}
                                            onChange={onChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="form-control"
                                            placeholderText={`Start Time`}
                                          />
                                        )}
                                      ></Controller>
                                    </CFormGroup>

                                    {/* <CFormGroup>
                                      <Controller
                                        name={`sessionStartTime.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <input type="text" placeholder={`Title`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup> */}
                                  </CCol>

                                  <CCol xs="2">
                                    <CLabel htmlFor="title">Group EndTime</CLabel>
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionEndTime.${index}.value`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                          <ReactDatePicker
                                            selected={value}
                                            onChange={onChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="form-control"
                                            placeholderText={`End Time`}
                                          />
                                        )}
                                      ></Controller>
                                    </CFormGroup>                                    
                                  </CCol>

                                  <CCol xs="4">
                                    <CLabel htmlFor="title">No. of Participant for Group {index + 1}</CLabel>
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionNoOfParticipate.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <input type="text" placeholder={`No. of Participant for Group`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup>
                                  </CCol>

                                  <CCol xs="4">
                                    <CFormGroup>
                                      <CLabel htmlFor="password">Select timezone</CLabel>
                                      <Controller
                                        name={`sessionTimezone.${index}.value`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                          <select className="form-control" onChange={onChange} value={value}>
                                            <option key="0" value="">select value</option>
                                            {timezoneList.map((item) => (
                                              <option key={item.value} value={item.value}>
                                                {item.label}
                                              </option>
                                            ))}
                                          </select>
                                        )}
                                      ></Controller>
                                    </CFormGroup>
                                  </CCol>

                                </CRow>
                              </CCol>

                             


                              <hr />
                            </div>
                          ))}
                        </CRow>
                       </div>}
                      

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">Online & Offline</CLabel>
                            <Controller
                              name="session_type"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <select className="form-control" onChange={onChange} value={value}>
                                  <option key="0" value="">select value</option>
                                  <option key="1" value="online">Online</option>
                                  <option key="2" value="offline">Offline</option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      {session_type_selected === 'offline' &&
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="title">Location</CLabel>
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
                            </CFormGroup>
                          </CCol>
                        </CRow>}

                      {/* <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="ccnumber">Sessions Image</CLabel>
                            <br />
                            <input
                              type="file"
                              accept=".png,.PNG,.JPG,.jpg,.jpeg"
                              name="myfile"
                              onChange={changeSessionImageFileHandler}
                            />
                            <span>
                              {!selectSessionimage && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                              {selectSessionimage && <img style={{ width: "100px" }} src={selectSessionimage} alt="user-image" />}
                            </span>
                          </CFormGroup>
                        </CCol>
                      </CRow> */}

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">Paid/Free <span className="label-validation">*</span></CLabel>
                            <Controller
                              name="session_purchase_type"
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <select className="form-control" onChange={onChange} value={value}>
                                  <option key="0" value="">select value</option>
                                  <option key="1" value="paid">Paid</option>
                                  <option key="2" value="unpaid">Unpaid</option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.session_purchase_type && errors.session_purchase_type.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Type is required.</p>
                          )}
                        </CCol>
                      </CRow>

                      {session_purchase_type_selected === 'paid' &&
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="cost">Price <span className="label-validation">*</span></CLabel>
                              <Controller
                                name={"session_cost"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                  <CInput
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    placeholder={`Enter your cost`}
                                  />
                                )}
                              ></Controller>
                            </CFormGroup>
                            {errors.session_cost && errors.session_cost.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>Cost is required.</p>
                            )}
                          </CCol>
                        </CRow>}
                     
                      
                      <CRow>
                        <CCol xs="12">
                          <button className="btn btn-outline-primary" type="button" onClick={() => nextTab(2)}>Next</button>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CTabPane>

                  <CTabPane>

                    <CCol>
                      <br />
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title"><b>Resource</b></CLabel>
                        </CRow>
                      </CCol>
                      <CRow>
                        <CCol xs="12">
                          <CRow>
                            <CCol xs="9">
                              <CFormGroup>
                                <input type="file" className="form-control" onChange={uploadSingleFile} />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="3">
                              <button type="button" className="btn btn-outline-primary btn-block" onClick={upload}>Upload</button>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CRow>
                            <CCol xs="12">
                              {file.length > 0 &&
                                file.map((item, index) => {
                                  return (
                                    <div key={item.name}>
                                      {index > 0 &&
                                        <div>
                                          <CRow>
                                            <CCol xs="4">
                                              {item.type == 'image' && <img style={{ width: '50px', height: '50px' }} src={item.file} alt="" />}
                                              {item.type == 'doc' && item.name}
                                            </CCol>
                                            <CCol xs="6">
                                              <button type="button" className="btn btn-danger" onClick={() => deleteFile(index, item.name)}>delete</button>
                                            </CCol>
                                          </CRow>
                                          <hr />
                                        </div>
                                      }
                                    </div>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCol>

                    <hr />


                    <CCol>
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title"><b>Video URL</b></CLabel>
                        </CRow>
                      </CCol>
                      {video.map((item, index) => (
                        <div key={item.id}>
                          <br />
                          <CRow>
                            <CCol xs="12">
                              <CRow>
                                <CCol xs="1">
                                  <CRow>
                                    <CLabel htmlFor="title">Url {index + 1}</CLabel>
                                  </CRow>
                                </CCol>
                                <CCol xs="10">
                                  <CFormGroup>
                                    <Controller
                                      name={`videoURL.${index}.value`}
                                      control={control}
                                      defaultValue={item.value}
                                      render={({ field }) => <input type="text" placeholder={`Video url`} className="form-control" {...field} />}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="1">
                                  <div className="btn btn-danger" onClick={() => videoRemove(index)}>Delete</div>
                                </CCol>
                              </CRow>
                            </CCol>
                          </CRow>
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-md-12 text-right">
                          <button type="button" className="btn btn-success" onClick={() => videoAppend({ value: "" })}>Add More Video</button>
                        </div>
                      </div>
                    </CCol>

                    <hr />

                    <CCol>
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title"><b>Web Page URL</b></CLabel>
                        </CRow>
                      </CCol>
                      {webPage.map((item, index) => (
                        <div key={item.id}>
                          <br />
                          <CRow>
                            <CCol xs="12">
                              <CRow>
                                <CCol xs="1">
                                  <CRow>
                                    <CLabel htmlFor="title">WebUrl {index + 1}</CLabel>
                                  </CRow>
                                </CCol>
                                <CCol xs="10">
                                  <CFormGroup>
                                    <Controller
                                      name={`webPageUrl.${index}.value`}
                                      control={control}
                                      defaultValue={item.value}
                                      render={({ field }) => <input type="text" placeholder={`web Page url`} className="form-control" {...field} />}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="1">
                                  <div className="btn btn-danger" onClick={() => webPageRemove(index)}>Delete</div>
                                </CCol>
                              </CRow>
                            </CCol>
                          </CRow>
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-md-12 text-right">
                          <button type="button" className="btn btn-success" onClick={() => webPageAppend({ value: "" })}>Add More Web Url</button>
                        </div>
                      </div>
                    </CCol>

                    <CRow>
                      <CCol xs="12">
                        <button className="btn btn-outline-primary" type="button" onClick={() => nextTab(3)}>Next</button>
                      </CCol>
                    </CRow>


                  </CTabPane>

                  <CTabPane>

                    <CCol>
                      <br />
                     
                    </CCol>
                  </CTabPane>

                </CTabContent>
              </CTabs>
              <br />
              <hr />
              <center>
                <button type="button" onClick={(e) => preview()} className="btn btn-outline-primary">Preview</button>&nbsp;
                <button type="submit" className="btn btn-outline-primary">Save</button>
              </center>
            </form>
          </CCardBody>
        </CCard>
      </CCol>


    </CRow>
  )
}

export default AddEditForm
