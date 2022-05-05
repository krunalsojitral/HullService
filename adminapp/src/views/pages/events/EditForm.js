import React, { useState, useRef, ref } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CButton,
  CLabel,
  CRow,
  CTabs,
  CTabPane,
  CTabContent,
  CCardHeader,
  CNavItem,
  CNavLink,
  CNav,
} from "@coreui/react";



//import { MultiSelect } from "react-multi-select-component";
import "../TextEditors.scss";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from "./../../Apiurl";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { setTimeout } from "core-js/web";
import TimezoneSelect from "react-timezone-select";
import NestedArray from "./EditnestedFieldArray";
import "./EditForm.css";

const AddEditForm = ({ match }) => {
  const [active, setActive] = useState(0);

  const [city, setCity] = React.useState("");
  const [cityError, setCityError] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [timezoneList, setTimezoneList] = React.useState([]);
  const [cohostlist, setCohostlist] = React.useState([]);
  const [cohostLoop, setCohostLoop] = React.useState();
  const [sessionCity, setSessionCity] = React.useState("");

  let history = useHistory();
  const {
    register,
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
    },
  });

  const purchase_type_selected = watch("purchase_type");
  const event_type_selected = watch("event_type");
  const no_of_sessions_selected = watch("no_of_sessions");
  const no_of_group_selected = watch("no_of_group");
  const session_purchase_type_selected = watch("session_purchase_type");
  const session_type_selected = watch("session_type");
  const [groupSessionData, setGroupSessionData] = useState([]);
  const [eventId, setEventId] = React.useState(0);
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [selectSpeakerImage, setSelectSpeakerImage] = React.useState(0);
  const [selectedSpeakerFile, setSelectedSpeakerFile] = useState();
  const [showReflect, setShowReflect] = React.useState(0);
  const [selectSessionimage, setSelectSessionimage] = React.useState(0);
  const [selectedSessionFile, setSelectedSessionFile] = useState();
  const [contentEditor, setContentEditor] = useState();
  const [displayImage, setDisplayImage] = React.useState([]);
  const [deleteresources, setDeleteresources] = React.useState([]);

  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  };

  const changeSessionImageFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSelectSessionimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedSessionFile(event.target.files[0]);
    }
  };

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
  const {
    fields: session,
    append: sessionAppend,
    remove: sessionRemove,
  } = useFieldArray({
    control,
    name: "sessionStartTime",
    name: "sessionEndTime",
    name: "sessionNoOfParticipate",
    name: "sessionTimezone",
    nested: [{ name: "nested" }],
  });

  const {
    fields: video,
    append: videoAppend,
    remove: videoRemove,
  } = useFieldArray({
    control,
    name: "videoURL",
  });

  const {
    fields: webPage,
    append: webPageAppend,
    remove: webPageRemove,
  } = useFieldArray({
    control,
    name: "webPageUrl",
  });

  const [file, setFile] = useState([{ type: "", name: "", file: [] }]);
  const [finalFile, setFinalFile] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [eData, setEData] = useState([]);

  function uploadSingleFile(e) {
    setFinalFile([...finalFile, e.target.files[0]]);
    var type = "";
    var ext = e.target.files[0].type;
    var arrayExtensions = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/bmp",
      "image/gif",
    ];
    if (arrayExtensions.lastIndexOf(ext.toLowerCase()) == -1) {
      type = "doc";
    } else {
      type = "image";
    }
    setFile([
      ...file,
      {
        type: type,
        name: e.target.files[0].name,
        file: URL.createObjectURL(e.target.files[0]),
      },
    ]);
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
        <li
          className="city_suggestion"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <p>
            {" "}
            <strong>{main_text}</strong> {secondary_text}
          </p>
        </li>
      );
    });

  const handleInput = (e) => {
    if (!e.target.value) {
      setValue(e.target.value);
      setCity(e.target.value);
      setCityError("City is required.");
    } else {
      setValue(e.target.value);
      setCity(e.target.value);
      setCityError("");
    }
  };

  const sessionhandleInput = (e) => {
    setValue(e.target.value);
    setSessionCity(e.target.value);
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
      setValue(description, false);
      setCity(description);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => {
          const address_components = results[0].address_components;
          var filtered_array = address_components.filter(function (
            address_component
          ) {
            return address_component.types.includes("country");
          });
          var country = filtered_array.length
            ? filtered_array[0].long_name
            : "";
          if (country) {
            setCountry(country);
          }
          return getLatLng(results[0]);
        })
        .then(({ lat, lng }) => {
          setLatitude(lat);
          setLongitude(lng);
        })
        .catch((error) => {
          setLatitude("");
          setLongitude("");
          setCountry("");
          console.log("Error: ", error);
        });
    };

  React.useEffect(() => {
    axios
      .get(api_url + "/common/timezone-list", {})
      .then((result) => {
        if (result.data.status) {
          setTimezoneList(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getPurchaseData();
    getEmailData();

    if (match.params.id) {
      setEventId(match.params.id);
      axios
        .post(
          api_url + "/event/getEventDataById",
          { event_id: match.params.id },
          {}
        )
        .then(async (result) => {
          if (result.data.status) {
            var eventdata = result.data.response.data;
            setFormValue("title", eventdata.title);
            $("#start_date").val(eventdata.start_date);
            $("#end_date").val(eventdata.end_date);
            setFormValue(
              "start_date",
              new Date(Date.parse(eventdata.start_date))
            );
            setFormValue("end_date", new Date(Date.parse(eventdata.end_date)));
            setFormValue("speaker_name", eventdata.speaker_name);
            setFormValue("about_speaker", eventdata.about_speaker);
            setContentEditor(eventdata.description);
            setCity(eventdata.location);
            setValue(eventdata.location);
            setSetectimage(eventdata.image);
            setSelectSpeakerImage(eventdata.speaker_image);
            setFormValue("purchase_type", eventdata.purchase_type);
            setFormValue("cost", eventdata.cost);
            setFormValue("event_type", eventdata.event_type);
            setFormValue("video_link", eventdata.video_link);
            setFormValue("session_title", eventdata.session_title);
            setFormValue("session_about", eventdata.session_about);
            setFormValue("no_of_group", eventdata.session_group_count);
            setFormValue("no_of_sessions", eventdata.session_count);
            setFormValue("session_type", eventdata.session_type);
            setFormValue("session_location", eventdata.session_location);
            setFormValue("session_image", eventdata.session_image);
            setFormValue(
              "session_purchase_type",
              eventdata.session_purchase_type
            );
            setFormValue("session_cost", eventdata.session_cost);
            setCohostlist(eventdata.cohost);
            setCohostLoop(eventdata.cohost.length);
            for (var i = 0; i < (await eventdata.cohost.length); i++) {
              console.log(i);
              console.log(eventdata.cohost[i]?.cohost_name);
              setFormValue(
                `co_host_speaker_${i}`,
                eventdata.cohost[i]?.cohost_name
              );
              setFormValue(
                `co_host_email_${i}`,
                eventdata.cohost[i]?.cohost_email
              );
            }

            if (eventdata.group_session.length > 0) {
              setShowReflect(1);
              var session_start_time = [];
              var session_end_time = [];
              var session_timezone = [];
              var session_no_of_participate = [];
              eventdata.group_session.forEach((item, index) => {
                // $("#start_time_" + index).val(item.session_start_time)
                // $("#end_date").val(eventdata.end_date)
                console.log(item.session_start_time);

                session_start_time.push({ value: item.session_start_time });
                session_end_time.push({ value: item.session_end_time });
                session_timezone.push({ value: item.session_timezone });
                session_no_of_participate.push({
                  value: item.session_no_of_participate,
                });
              });

              if (
                session_start_time.length > 0 ||
                session_end_time.length > 0 ||
                session_timezone.length > 0 ||
                session_no_of_participate.length > 0
              ) {
                session_start_time.forEach((item, index) => {
                  sessionAppend({});
                });
                setTimeout(() => {
                  session_timezone.forEach((item, index) => {
                    setFormValue(`sessionTimezone.${index}.value`, item.value);
                  });
                  session_no_of_participate.forEach((item, index) => {
                    setFormValue(
                      `sessionNoOfParticipate.${index}.value`,
                      item.value
                    );
                  });
                }, 500);
              }
            }

            if (eventdata.videoURL.length > 0) {
              var videoURL = [];
              eventdata.videoURL.forEach((item, index) => {
                if (index == 0) {
                  videoURL.push({ name: "default Value", value: item.path });
                } else {
                  videoURL.push({ value: item.path });
                }
              });
              if (videoURL.length > 0) {
                eventdata.videoURL.forEach((item, index) => {
                  if (index > 0) {
                    videoAppend({});
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
                  webPageUrl.push({ name: "default Value", value: item.path });
                } else {
                  webPageUrl.push({ value: item.path });
                }
              });
              if (webPageUrl.length > 0) {
                webPageUrl.forEach((item, index) => {
                  if (index > 0) {
                    webPageAppend({});
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
              setDisplayImage(eventdata.resource);
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
        });
    }
  }, []);

  const CoHostInput = () => {
    let inputItems = [];
    for (var i = 0; i < cohostLoop; i++) {
      inputItems.push(
        <div
          style={{
            border: "2px solid gray",
            padding: "2%",
            borderRadius: "10px",
            margin: "5px",
          }}
        >
          <CButton
            color="danger"
            shape="rounded-pill"
            style={{
              marginLeft: "91%",
            }}
            onClick={() => {
              setCohostLoop(cohostLoop - 1);
            }}
          >
            X
          </CButton>

          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor={`co_host_speaker_${i}`}>
                  Enter Co host Name
                </CLabel>
                <Controller
                  name={`co_host_speaker_${i}`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CInput
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder={`Enter Co host Speaker Name`}
                    />
                  )}
                ></Controller>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor={`co_host_email_${i}`}>
                  Enter Co host Email
                </CLabel>
                <Controller
                  name={`co_host_email_${i}`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CInput
                      type="email"
                      onChange={onChange}
                      value={value}
                      placeholder={`Enter Co host email`}
                    />
                  )}
                ></Controller>
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
      );
    }
    return <div>{inputItems}</div>;
  };
  const updateInformationAct = (data) => {
    // data.timezone = selectedTimezone;
    data.description = contentEditor;
    data.event_id = eventId;
    data.deleteresources = deleteresources;
    data.location = city;

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }

    if (selectedSpeakerFile) {
      formData.append(
        "speaker_image",
        selectedSpeakerFile,
        selectedSpeakerFile.name
      );
    }

    if (finalFile && finalFile.length > 0) {
      for (var i = 0; i < finalFile.length; i++) {
        if (finalFile[i].name) {
          formData.append("resources[]", finalFile[i], finalFile[i].name);
        }
      }
    }

    axios
      .post(api_url + "/event/updateEventByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/events");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
  };

  const deleteImage = async (event_resource_id) => {
    setDisplayImage(
      displayImage.filter(
        (item, index) => item.event_resource_id !== event_resource_id
      )
    );
    var image = displayImage.filter(
      (item, index) => item.event_resource_id == event_resource_id
    );
    if (deleteresources.length > 0) {
      setDeleteresources((oldArray) => [...oldArray, image]);
    } else {
      setDeleteresources([image]);
    }
  };

  const addReflectiveSessions = () => {
    session.forEach((item, index) => {
      sessionRemove({});
    });
    setShowReflect(1);

    let arr = Array.apply(null, { length: no_of_group_selected }).map(
      Number.call,
      Number
    );
    arr.forEach((item, index) => {
      // console.log(item);
      // console.log(session);
      sessionAppend({});
    });
  };

  const Subnested = (i) => {
    const arr = [];

    for (var k = 0; k < no_of_sessions_selected; k++) {
      arr.push(
        <CCol xs="4" key={k}>
          <CRow>
            <CCol xs="10">
              <CFormGroup>
                <Controller
                  name={`time[${i + -1}].nestedArray[${k}].value`}
                  control={control}
                  id={"time_" + k}
                  render={({ field: { onChange, value } }) => (
                    <ReactDatePicker
                      className="form-control"
                      selected={value}
                      onChange={onChange}
                      dateFormat="yyyy/MM/dd"
                      dateFormatCalendar="yyyy/MM/dd"
                      minDate={new Date()}
                      maxDate={new Date(2030, 11)}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      isClearable
                      placeholderText={`Session Date`}
                    />
                  )}
                ></Controller>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCol>
      );
    }
    return (
      <CRow key={1}>
        <CCol xs="12">
          <CRow>{arr}</CRow>
        </CCol>
      </CRow>
    );
  };

  const sessionInput = () => {
    return (
      <div>
        <CRow>
          {session.map((item, index) => (
            <div key={item.id}>
              <CCol xs="12">
                <CRow>
                  <CLabel htmlFor="title">Group {index + 1} Details :</CLabel>
                </CRow>
              </CCol>
              <br />
              {Subnested(index + 1)}
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
                    <CLabel htmlFor="title">
                      No. of Participant for Group {index + 1}
                    </CLabel>
                    <CFormGroup>
                      <Controller
                        name={`sessionNoOfParticipate.${index}.value`}
                        control={control}
                        defaultValue={item.value}
                        render={({ field }) => (
                          <input
                            type="text"
                            placeholder={`No. of Participant for Group`}
                            className="form-control"
                            {...field}
                          />
                        )}
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
                          <select
                            className="form-control"
                            onChange={onChange}
                            value={value}
                          >
                            <option key="0" value="">
                              select value
                            </option>
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
      </div>
    );
  };

  const getPurchaseData = () => {
    axios
      .get(api_url + "/event/listEventPurchace", {})
      .then((result) => {
        if (result.data.status) {
          var data = [];
          //match.params.id
          setPurchaseData([]);
          result.data.response.data.map((item, index) => {
            // alert(match.params.id)
            if (item.event_id+"" === match.params.id) {
              data.push(item);
            }
          });
          console.log(data);
          setPurchaseData(data);

          console.log("groupedData");
          var data1 = groupArrayOfObjects(data, "user_email");
          var dd = [];
          const propertyNames = Object.values(data1);
          console.log(propertyNames);
          console.log(JSON.stringify(propertyNames));
          setPurchaseData(propertyNames);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  const getEmailData = () => {
    axios
      .get(api_url + "/event/listUserEmail", {})
      .then((result) => {
        if (result.data.status) {
          var data = result.data.response.data;
          setEmailData(data);
          //  var d = emailData.find( (data) => data.email === "badrinr89@gmail.com")
          //  console.log("email")
          //  console.log(d != null)
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const email = data =>{
    var loopvalue = "";
    for(let i = 0;i<data.length;i++){
      loopvalue = data[i].user_email
    }
  return loopvalue
  }

  const date = data =>{
    var loopvalue;
    for(let i = 0;i<data.length;i++){
      loopvalue = data[i].event_purchase_date
    }
    return loopvalue
  }
  
  const event = data =>{
    var loopvalue = "x";
    for(let i = 0;i<data.length;i++){
      if (data[i].event_type === "active") {
        loopvalue = "✓"
      }
    }
    return loopvalue
  }

  const reflective = data =>{
    var loopvalue = "x";
    for(let i = 0;i<data.length;i++){
      if (data[i].event_type === "reflective") {
        loopvalue = "✓"
      }
    }
    return loopvalue
  }

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>Edit Event</CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit(updateInformationAct)}>
              <CTabs
                activeTab={active}
                onActiveTabChange={(idx) => setActive(idx)}
              >
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      Event
                      {active === 0 && " "}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Group Session
                      {active === 1 && " "}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Resources
                      {active === 2 && " "}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Subscribe user
                      {active === 3 && " "}
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
                            <CLabel htmlFor="title">
                              Title <span className="label-validation">*</span>
                            </CLabel>
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
                            <p style={{ color: "red", fontSize: "12px" }}>
                              Title is required.
                            </p>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="title">
                              Start Date{" "}
                              <span className="label-validation">*</span>
                            </CLabel>
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
                          {errors.start_date &&
                            errors.start_date.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Start date is required.
                              </p>
                            )}
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="title">
                              End Date{" "}
                              <span className="label-validation">*</span>
                            </CLabel>
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
                          {errors.end_date &&
                            errors.end_date.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                End date is required.
                              </p>
                            )}
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
                                plugins:
                                  "link image textpattern lists textcolor colorpicker",
                                toolbar:
                                  "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                              {!selectSpeakerImage && (
                                <img
                                  style={{ width: "100px" }}
                                  alt="avatar"
                                  src="/company-logo.png"
                                />
                              )}
                              {selectSpeakerImage && (
                                <img
                                  style={{ width: "100px" }}
                                  src={selectSpeakerImage}
                                  alt="user-image"
                                />
                              )}
                            </span>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel className="forum-feedback">
                              <b>About the speaker : </b> &nbsp;
                            </CLabel>
                            <Controller
                              name={"about_speaker"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <textarea
                                  rows="6"
                                  cols="45"
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
                      {/* Co Host */}

                      <div
                        style={{
                          borderColor: "gray",
                          padding: "3%",
                          borderRadius: "20%",
                        }}
                      >
                        <CButton
                          color="info"
                          style={{
                            marginLeft: "91%",
                          }}
                          onClick={() => {
                            console.log(cohostLoop + 1);
                            setCohostLoop(cohostLoop + 1);
                          }}
                          shape="rounded-pill"
                        >
                          +
                        </CButton>
                        {CoHostInput()}
                      </div>
                      {/* Co HOST */}
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">
                              Online & Offline{" "}
                              <span className="label-validation">*</span>
                            </CLabel>
                            <Controller
                              name="event_type"
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <select
                                  className="form-control"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option key="0" value="">
                                    select value
                                  </option>
                                  <option key="1" value="online">
                                    Online
                                  </option>
                                  <option key="2" value="offline">
                                    Offline
                                  </option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.event_type &&
                            errors.event_type.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Type is required.
                              </p>
                            )}
                        </CCol>
                      </CRow>

                      {event_type_selected === "offline" && (
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
                                {status === "OK" && (
                                  <ul className="suggestion">
                                    {renderSuggestions()}
                                  </ul>
                                )}
                                {cityError && (
                                  <small className="error">{cityError}</small>
                                )}
                              </div>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      )}

                      {/* {event_type_selected === 'online' &&
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
                        </CRow>} */}

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
                              {!setectimage && (
                                <img
                                  style={{ width: "100px" }}
                                  alt="avatar"
                                  src="company-logo.png"
                                />
                              )}
                              {setectimage && (
                                <img
                                  style={{ width: "100px" }}
                                  src={setectimage}
                                  alt="user-image"
                                />
                              )}
                            </span>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">
                              Paid / Unpaid{" "}
                              <span className="label-validation">*</span>
                            </CLabel>
                            <Controller
                              name="purchase_type"
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <select
                                  className="form-control"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option key="0" value="">
                                    select value
                                  </option>
                                  <option key="1" value="paid">
                                    Paid
                                  </option>
                                  <option key="2" value="unpaid">
                                    Unpaid
                                  </option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.purchase_type &&
                            errors.purchase_type.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Type is required.
                              </p>
                            )}
                        </CCol>
                      </CRow>

                      {purchase_type_selected === "paid" && (
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="cost">
                                Cost <span className="label-validation">*</span>
                              </CLabel>
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
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Cost is required.
                              </p>
                            )}
                          </CCol>
                        </CRow>
                      )}

                      <CRow>
                        <CCol xs="12">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => nextTab(1)}
                          >
                            Next
                          </button>
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
                            <CLabel className="forum-feedback">
                              About the Sessions : &nbsp;
                            </CLabel>
                            <Controller
                              name={"session_about"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <textarea
                                  rows="6"
                                  cols="45"
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
                            <CLabel htmlFor="title">
                              No of Groups{" "}
                              <span className="label-validation">*</span>
                            </CLabel>
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
                        <CCol xs="4">
                          <CFormGroup>
                            <CLabel htmlFor="title">
                              No of sessions{" "}
                              <span className="label-validation">*</span>
                            </CLabel>
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
                        </CCol>
                        <CCol xs="4">
                          <button
                            type="button"
                            className="btn btn-success mt-4"
                            onClick={() => addReflectiveSessions()}
                          >
                            Submit
                          </button>
                        </CCol>
                      </CRow>

                      {sessionInput()}

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">Online & Offline</CLabel>
                            <Controller
                              name="session_type"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <select
                                  className="form-control"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option key="0" value="">
                                    select value
                                  </option>
                                  <option key="1" value="online">
                                    Online
                                  </option>
                                  <option key="2" value="offline">
                                    Offline
                                  </option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      {session_type_selected === "offline" && (
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="title">Location</CLabel>
                              <div ref={ref}>
                                <input
                                  value={cityValue}
                                  onChange={sessionhandleInput}
                                  disabled={!ready}
                                  placeholder="Address *"
                                  className="form-control input"
                                />
                                {status === "OK" && (
                                  <ul className="suggestion">
                                    {renderSuggestions()}
                                  </ul>
                                )}
                                {cityError && (
                                  <small className="error">{cityError}</small>
                                )}
                              </div>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      )}

                      <CRow>
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
                              {!selectSessionimage && (
                                <img
                                  style={{ width: "100px" }}
                                  alt="avatar"
                                  src="company-logo.png"
                                />
                              )}
                              {selectSessionimage && (
                                <img
                                  style={{ width: "100px" }}
                                  src={selectSessionimage}
                                  alt="user-image"
                                />
                              )}
                            </span>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="role">
                              Paid/Free{" "}
                              <span className="label-validation">*</span>
                            </CLabel>
                            <Controller
                              name="session_purchase_type"
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <select
                                  className="form-control"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option key="0" value="">
                                    select value
                                  </option>
                                  <option key="1" value="paid">
                                    Paid
                                  </option>
                                  <option key="2" value="unpaid">
                                    Unpaid
                                  </option>
                                </select>
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.session_purchase_type &&
                            errors.session_purchase_type.type ===
                              "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Type is required.
                              </p>
                            )}
                        </CCol>
                      </CRow>

                      {session_purchase_type_selected === "paid" && (
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="cost">
                                Price{" "}
                                <span className="label-validation">*</span>
                              </CLabel>
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
                            {errors.session_cost &&
                              errors.session_cost.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  Cost is required.
                                </p>
                              )}
                          </CCol>
                        </CRow>
                      )}

                      <CRow>
                        <CCol xs="12">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => nextTab(2)}
                          >
                            Next
                          </button>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CTabPane>

                  <CTabPane>
                    <CCol>
                      <br />
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title">
                            <b>Resource</b>
                          </CLabel>
                        </CRow>
                      </CCol>
                      <CRow>
                        <CCol xs="12">
                          <CRow>
                            <CCol xs="9">
                              <CFormGroup>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={uploadSingleFile}
                                />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="3">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-block"
                                onClick={upload}
                              >
                                Upload
                              </button>
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
                                          {item.type == "image" && (
                                            <img
                                              style={{
                                                width: "50px",
                                                height: "50px",
                                              }}
                                              src={item.file}
                                              alt=""
                                            />
                                          )}
                                          {item.type == "doc" && item.name}
                                        </CCol>
                                        <CCol xs="6">
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() =>
                                              deleteImage(
                                                item.event_resource_id
                                              )
                                            }
                                          >
                                            delete
                                          </button>
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
                                      {index > 0 && (
                                        <div>
                                          <CRow key={index}>
                                            <CCol xs="4">
                                              {item.type == "image" && (
                                                <img
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                  }}
                                                  src={item.file}
                                                  alt=""
                                                />
                                              )}
                                              {item.type == "doc" && item.name}
                                            </CCol>
                                            <CCol xs="6">
                                              <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                  deleteFile(index, item.name)
                                                }
                                              >
                                                delete
                                              </button>
                                            </CCol>
                                          </CRow>
                                          <hr />
                                        </div>
                                      )}
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
                          <CLabel htmlFor="title">
                            <b>Video URL</b>
                          </CLabel>
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
                                    <CLabel htmlFor="title">
                                      Url {index + 1}
                                    </CLabel>
                                  </CRow>
                                </CCol>
                                <CCol xs="10">
                                  <CFormGroup>
                                    <Controller
                                      name={`videoURL.${index}.value`}
                                      control={control}
                                      defaultValue={item.value}
                                      render={({ field }) => (
                                        <input
                                          type="text"
                                          placeholder={`Video url`}
                                          className="form-control"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="1">
                                  <div
                                    className="btn btn-danger"
                                    onClick={() => videoRemove(index)}
                                  >
                                    Delete
                                  </div>
                                </CCol>
                              </CRow>
                            </CCol>
                          </CRow>
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-md-12 text-right">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => videoAppend({ value: "" })}
                          >
                            Add More Video
                          </button>
                        </div>
                      </div>
                    </CCol>

                    <hr />

                    <CCol>
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title">
                            <b>Web Page URL</b>
                          </CLabel>
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
                                    <CLabel htmlFor="title">
                                      WebUrl {index + 1}
                                    </CLabel>
                                  </CRow>
                                </CCol>
                                <CCol xs="10">
                                  <CFormGroup>
                                    <Controller
                                      name={`webPageUrl.${index}.value`}
                                      control={control}
                                      defaultValue={item.value}
                                      render={({ field }) => (
                                        <input
                                          type="text"
                                          placeholder={`web Page url`}
                                          className="form-control"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="1">
                                  <div
                                    className="btn btn-danger"
                                    onClick={() => webPageRemove(index)}
                                  >
                                    Delete
                                  </div>
                                </CCol>
                              </CRow>
                            </CCol>
                          </CRow>
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-md-12 text-right">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => webPageAppend({ value: "" })}
                          >
                            Add More Web Url
                          </button>
                        </div>
                      </div>
                    </CCol>
                  </CTabPane>

                  <CTabPane>
                    <CCol>
                      <table style={{ marginTop: "10px" }}>
                        <tr>
                          <td style={{paddingTop:"12px", paddingBottom:"12px" }}>SI No</td>
                          <td>Email</td>
                          <td>Paurchase Date</td>
                          <td>Event</td>
                          <td>Reflective</td>
                          <td>Member</td>
                        </tr>

                        {purchaseData.map((item, index) => {
                          return(
                          <tr>
                            <td style={{ fontSize: "15px", paddingTop:"20px", paddingBottom:"20px" }}>{index+1}</td>
 
                            <td style={{ fontSize: "15px" }}>{email(item)}</td>

                            <td style={{ fontSize: "15px" }}> {date(item)} </td>

                            <td style={{ fontSize: "15px",color:event(item) === "x" ? "red" :"green" }}>{event(item)}</td>
                                 
                            <td style={{ fontSize: "15px", color:reflective(item) === "x" ? "red" :"green" }}>{reflective(item)}</td>

                            <td style={{ fontSize: "15px", color:emailData.find((data) => data.email === email(item)) != null ? "green" :"red" }}>
                              {emailData.find((data) => data.email === email(item)) != null
                                ? "✓"
                                : "x"}
                            </td>
                          </tr>
                        )})}
                      </table>
                      <br />
                    </CCol>
                  </CTabPane>
                </CTabContent>
              </CTabs>
              <br />
              <hr />
              <center>
                <button type="submit" className="btn btn-outline-primary">
                  Update
                </button>
              </center>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddEditForm;