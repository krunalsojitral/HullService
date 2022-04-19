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
import $ from 'jquery';
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { setTimeout } from 'core-js/web';
import TimezoneSelect from 'react-timezone-select'

const AddEditForm = ({ match }) => {
  const [active, setActive] = useState(0)

  const [city, setCity] = React.useState('');
  const [cityError, setCityError] = React.useState('');
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [selectedTimezone, setSelectedTimezone] = useState({})

  let history = useHistory();
  const {
    handleSubmit,
    setValue: setFormValue,
    control,    
    trigger,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({    
    defaultValues: {
      sessionTitle: [{ name: "default Value" }],
      sessionDescription: [{ name: "default Value" }],
      sessionURL: [{ name: "default Value" }],
      videoURL: [{ name: "default Value" }],
      webPageUrl: [{ name: "default Value" }],
    }
  });

  const purchase_type_selected = watch("purchase_type");
  const event_type_selected = watch("event_type");
 
  const [eventId, setEventId] = React.useState(0);
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();

  const [selectSpeakerImage, setSelectSpeakerImage] = React.useState(0);
  const [selectedSpeakerFile, setSelectedSpeakerFile] = useState();

  const [selectpromoimage, setSelectpromoimage] = React.useState(0);
  const [selectedPromoFile, setSelectedPromoFile] = useState();

  const [contentEditor, setContentEditor] = useState();
  const [displayImage, setDisplayImage] = React.useState([]);
  const [deleteresources, setDeleteresources] = React.useState([]);
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  }

  const [contentPromoEditor, setContentPromoEditor] = useState();
  const handlePromoEditorChange = (content, editor) => {
    setContentPromoEditor(content);
  }

  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSetectimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

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
  const { fields: session, insert:sessionInsert, append: sessionAppend, remove: sessionRemove } = useFieldArray({
    control,    
    name: 'sessionURL',   
    name: 'sessionDescription',
    name: 'sessionTitle',
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
        console.log(description);

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

  const changePromoFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSelectpromoimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedPromoFile(event.target.files[0]);
    }
  };


  React.useEffect(() => {    
   
    if (match.params.id) {
      setEventId(match.params.id)      
      axios.post(api_url + "/event/getEventDataById", { event_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var eventdata = result.data.response.data;            
            setFormValue("title", eventdata.title);
            $("#start_date").val(eventdata.start_date)
            $("#end_date").val(eventdata.end_date)
            setFormValue("start_date", new Date(Date.parse(eventdata.start_date)));
            setFormValue("end_date", new Date(Date.parse(eventdata.end_date)));
            // setFormValue("start_time", eventdata.start_time);
            // setFormValue("end_time", eventdata.end_time);
            setFormValue("speaker_name", eventdata.speaker_name);
            setFormValue("about_speaker", eventdata.about_speaker);
            setContentEditor(eventdata.description);
            setCity(eventdata.location)
            setValue(eventdata.location)
            setSetectimage(eventdata.image);
            setSelectSpeakerImage(eventdata.speaker_image)
            setFormValue("promo_title", eventdata.promo_title);
            setContentPromoEditor(eventdata.promo_description);
            setSelectpromoimage(eventdata.promo_image);
            setFormValue("purchase_type", eventdata.purchase_type);
            setFormValue("cost", eventdata.cost);
            setFormValue("event_type", eventdata.event_type);
            setFormValue("video_link", eventdata.video_link);
            if (eventdata.timezone){
              setSelectedTimezone(eventdata.timezone)
            }
            

            // var sessionTitle = [{ "name": "default Value", "value": "Group Session 1" }, { "value": "Group Session 2" }];
            // var sessionDescription = [{ "name": "default Value", "value": "Group Description 1" }, { "value": "Group Description 2" }];
            // var sessionURL = [{ "name": "default Value", "value": "Group URL 1" }, { "value": "Group URL 2" }];
            // var videoURL = [{ "name": "default Value", "value": "Url 1 " }, { "value": "Url 2 " }];
            // var webPageUrl = [{ "name": "default Value", "value": "Web Page URL 1" }, { "value": "Web Page URL 2" }];

            // setTimeout(() => {
            //   sessionTitle.forEach((item, index) => {
            //     setValue(`sessionTitle.${index}.value`, item.value);
            //   });
            //   sessionDescription.forEach((item, index) => {
            //     setValue(`sessionDescription.${index}.value`, item.value);
            //   });
            //   sessionURL.forEach((item, index) => {
            //     setValue(`sessionURL.${index}.value`, item.value);
            //   });
            //   videoURL.forEach((item, index) => {
            //     setValue(`videoURL.${index}.value`, item.value);
            //   });
            //   webPageUrl.forEach((item, index) => {
            //     setValue(`webPageUrl.${index}.value`, item.value);
            //   });
            // }, 500);

            // videoURL.forEach((item, index) => {
            //   if (index > 0) {
            //     videoAppend({})
            //   }
            // });

            // webPageUrl.forEach((item, index) => {
            //   if (index > 0) {
            //     webPageAppend({})
            //   }
            // });           

            if (eventdata.group_session.length > 0){
              var sessionTitle = [];
              var sessionDescription = [];
              var sessionURL = [];
              eventdata.group_session.forEach((item, index) => {
                if (index == 0){
                  sessionTitle.push({ "name": "default Value", "value": item.title })
                  sessionDescription.push({ "name": "default Value", "value": item.description })
                  sessionURL.push({ "name": "default Value", "value": item.url })
                }else{
                  sessionTitle.push({ "value": item.title })
                  sessionDescription.push({ "value": item.description })
                  sessionURL.push({ "value": item.url })
                }                
              });

              if ((sessionTitle.length > 0) || (sessionDescription.length > 0) || (sessionURL.length > 0)){
                sessionTitle.forEach((item, index) => {
                  if (index > 0) {
                    sessionAppend({})
                  }
                });
                setTimeout(() => {
                  sessionTitle.forEach((item, index) => {
                    setFormValue(`sessionTitle.${index}.value`, item.value);
                  });
                  sessionDescription.forEach((item, index) => {
                    setFormValue(`sessionDescription.${index}.value`, item.value);
                  });
                  sessionURL.forEach((item, index) => {
                    setFormValue(`sessionURL.${index}.value`, item.value);
                  });
                }, 500);
              }
            }

            if (eventdata.videoURL.length > 0) {
              var videoURL = [];
              eventdata.videoURL.forEach((item, index) => {
                if (index == 0) {
                  videoURL.push({ "name": "default Value", "value": item.path })
                } else {
                  videoURL.push({ "value": item.path })
                }
              });
              if (videoURL.length > 0) {
                eventdata.videoURL.forEach((item, index) => {
                  if (index > 0) {
                    videoAppend({})
                  }
                });
                setTimeout(() => {
                  eventdata.videoURL.forEach((item, index) => {
                    setFormValue(`videoURL.${index}.value`, item.path);
                  });
                }, 500);
              }
            }

            if (eventdata.webPageUrl.length > 0) {
              var webPageUrl = [];
              eventdata.webPageUrl.forEach((item, index) => {                
                if (index == 0) {
                  webPageUrl.push({ "name": "default Value", "value": item.path })
                } else {
                  webPageUrl.push({ "value": item.path })
                }
              });
              if (webPageUrl.length > 0) {
                webPageUrl.forEach((item, index) => {
                  if (index > 0) {
                    webPageAppend({})
                  }
                });
                setTimeout(() => {
                  eventdata.webPageUrl.forEach((item, index) => {
                    setFormValue(`webPageUrl.${index}.value`, item.path);
                  });
                }, 500);
              }
            }
    
            if (eventdata.resource.length > 0) {
              setDisplayImage(eventdata.resource)
            }
            
            setTimeout(() => {
              clearSuggestions();
            }, 800);
            
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.timezone = selectedTimezone;
    data.description = contentEditor;
    data.promo_description = contentPromoEditor;
    data.event_id = eventId;
    data.deleteresources = deleteresources;
    data.location = city;
   
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }

    if (selectedSpeakerFile) {
      formData.append("speaker_image", selectedSpeakerFile, selectedSpeakerFile.name);
    }


    if (selectedPromoFile) {
      formData.append("promo_image", selectedPromoFile, selectedPromoFile.name);
    }
    
    if (finalFile && finalFile.length > 0) {
      for (var i = 0; i < finalFile.length; i++) {
        if (finalFile[i].name){
          formData.append("resources[]", finalFile[i], finalFile[i].name);
        }
      }
    }

    axios.post(api_url + "/event/updateEventByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");
        history.push("/events");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });

  };

  const nextTab = async (tab) => {
    if (tab == 1){
      const result = await trigger(["title", "start_date", "end_date"]);
      if (result){
        setActive(tab);
      }
    }else{
      setActive(tab);
    }
  }

  const deleteImage = async (event_resource_id) => {
    setDisplayImage(displayImage.filter((item, index) => item.event_resource_id !== event_resource_id));
    var image = displayImage.filter((item, index) => item.event_resource_id == event_resource_id);
    if (deleteresources.length > 0){
      setDeleteresources(oldArray => [...oldArray, image]);
    }else{
      setDeleteresources([image]);
    }
    

  }
  

 

 

  return (
    <CRow>             
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
          <CCardHeader>
            Edit Event
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit(updateInformationAct)}>
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
                    Group Session
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
                      Promo
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
                                  isClearable
                                  id="start_date"
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

                      {/* <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="title">End Time <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"end_time"}
                              control={control}
                            //  rules={{ required: true }}
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
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.end_time && errors.end_time.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>End time is required.</p>
                          )}
                        </CCol>
                      </CRow> */}

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="password">Select timezone</CLabel>
                            <TimezoneSelect
                              value={selectedTimezone}
                              onChange={setSelectedTimezone}
                            />
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
                            <CLabel htmlFor="speaker_name">Speaker Name</CLabel>
                            <Controller
                              name={"speaker_name"}
                              control={control}
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

                      {event_type_selected === 'online' &&
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="video_link">Video link <span className="label-validation">*</span></CLabel>
                              <Controller
                                name={"video_link"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                  <CInput
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    placeholder={`Enter your video link`}
                                  />
                                )}
                              ></Controller>
                            </CFormGroup>
                            {errors.video_link && errors.video_link.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>Video link is required.</p>
                            )}
                          </CCol>
                        </CRow>}


                      {/* <CRow>
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
                      </CRow> */}
                      
                     

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="ccnumber">Upload Image</CLabel>
                            <br />
                            <input
                              type="file"
                              accept=".png,.PNG,.JPG,.jpg,.jpeg"
                              name="myfile"
                              onChange={changeFileHandler}
                            />                            
                            <span>
                              {!setectimage && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                              {setectimage && <img style={{ width: "100px" }} src={setectimage} alt="user-image" />}
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
                      <br/>
                      {session.map((item, index) => (
                        <div key={item.id}>
                          <CCol xs="12">
                            <CRow>
                              <CLabel htmlFor="title">Group Session {index + 1}</CLabel>
                            </CRow>
                          </CCol>
                          <br/>
                          <CCol xs="12">
                            <CRow>
                              <CCol xs="11">
                                <CRow>
                                  <CCol xs="2"> <CLabel htmlFor="title">Title</CLabel> </CCol>
                                  <CCol xs="10">
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionTitle.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <input type="text" placeholder={`Title`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol xs="2"> <CLabel htmlFor="title">Description</CLabel> </CCol>
                                  <CCol xs="10">
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionDescription.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <textarea rows="4" type="text" placeholder={`Description`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol xs="2"> <CLabel htmlFor="title">URL</CLabel> </CCol>
                                  <CCol xs="10">
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionURL.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <input type="text" placeholder={`URL`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                              </CCol>
                              <CCol xs="1">
                                <div className="btn btn-danger"  onClick={() => sessionRemove(index)}>Delete</div>
                              </CCol>
                            </CRow>
                          </CCol>
                          <hr/>
                        </div>
                      ))}
                      <CRow>
                        <div className="col-md-12 text-right">
                          <button type="button" className="btn btn-success" onClick={() => sessionAppend({ value: "" })}>Add More Session</button>
                        </div>
                      </CRow>     
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

                              
                              {displayImage.length > 0 &&
                                displayImage.map((item, index) => {
                                  return (
                                    <div>
                                      <CRow key={index}>
                                        <CCol xs="4">
                                          {item.type == 'image' && <img style={{ width: '50px', height: '50px' }} src={item.file} alt="" />}
                                          {item.type == 'doc' && item.name}
                                        </CCol>
                                        <CCol xs="6">
                                          <button type="button" className="btn btn-danger" onClick={() => deleteImage(item.event_resource_id)}>delete</button>
                                          </CCol>
                                      </CRow>
                                      <hr />
                                    </div>
                                  );
                                })}

                              {file.length > 0 &&
                                file.map((item, index) => {
                                  return (
                                    <div>
                                      {index > 0 &&
                                        <div>
                                          <CRow key={index}>
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

                    <hr/>

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

                  </CTabPane>

                  <CTabPane>

                    <CCol>
                      <br />


                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="title">Promo title </CLabel>
                            <Controller
                              name={"promo_title"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}                                  
                                  placeholder={`Enter promo title`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="ccnumber">Promo upload image</CLabel>
                            <br />
                            <input
                              type="file"
                              accept=".png,.PNG,.JPG,.jpg,.jpeg"
                              name="myfile"
                              onChange={changePromoFileHandler}
                            />
                            <span>
                              {!selectpromoimage && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                              {selectpromoimage && <img style={{ width: "100px" }} src={selectpromoimage} alt="promo-image" />}
                            </span>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="password">Promo description</CLabel>
                            <Editor
                              apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                              cloudChannel="dev"
                              init={{
                                selector: "textarea",
                                plugins: "link image textpattern lists textcolor colorpicker",
                                toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                              }}
                              value={contentPromoEditor}
                              onEditorChange={handlePromoEditorChange}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>

                    </CCol>
                  </CTabPane>


                </CTabContent>
              </CTabs>
              <br/>
              <hr/>
              <center>
                <button type="submit" className="btn btn-outline-primary">Update</button>
              </center>              
            </form>
          </CCardBody>
        </CCard>
      </CCol>

     
    </CRow>
  )
}

export default AddEditForm
