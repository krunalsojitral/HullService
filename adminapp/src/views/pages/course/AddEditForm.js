import React, { useState } from 'react'
import {  
  CCard,  
  CCardBody,
  CCol,
  CFormGroup,  
  CInput,
  CLabel,
  CRow,
} from '@coreui/react'
import { Editor } from "@tinymce/tinymce-react";
import './TextEditors.scss'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";
import $ from 'jquery';


const AddEditForm = ({ match }) => {

  let history = useHistory();
  const {
    handleSubmit,    
    setValue,
    control,    
    watch,
    formState: { errors },
  } = useForm();
  
  
  const [isEditMode, setisEditMode] = React.useState(0);
  const [roleList, setRoleList] = React.useState([]);
  const purchase_type_selected = watch("purchase_type");
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();
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

  const [contentLearnEditor, setContentLearnEditor] = useState();
  const handleEditorLearnChange = (content, editor) => {
    setContentLearnEditor(content);
  }

  const [contentPrerequisitesEditor, setContentPrerequisitesEditor] = useState();
  const handleEditorPrerequisitesChange = (content, editor) => {
    setContentPrerequisitesEditor(content);
  }

  const [contentDescriptionEditor, setContentDescriptionEditor] = useState();
  const handleEditorDescriptionChange = (content, editor) => {
    setContentDescriptionEditor(content);
  }

  const [courseContentFirstChange, setCourseContentFirstChange] = useState();
  const handleEditorCourseContentFirstChange = (content, editor) => {
    setCourseContentFirstChange(content);
  }

  const [courseContentSecondChange, setCourseContentSecondChange] = useState();
  const handleEditorCourseContentSecondChange = (content, editor) => {
    setCourseContentSecondChange(content);
  }

  const [courseContentThirdChange, setCourseContentThirdChange] = useState();
  const handleEditorCourseContentThirdChange = (content, editor) => {
    setCourseContentThirdChange(content);
  }

  const [courseContentFourthChange, setCourseContentFourthChange] = useState();
  const handleEditorCourseContentFourthChange = (content, editor) => {
    setCourseContentFourthChange(content);
  }

  const [courseContentFiveChange, setCourseContentFiveChange] = useState();
  const handleEditorCourseContentFiveChange = (content, editor) => {
    setCourseContentFiveChange(content);
  }

  React.useEffect(() => {   

    
    axios.get(api_url + "/common/roleList", {})
      .then((result) => {
        if (result.data.status) {
          var roledata = result.data.response.data;
          setRoleList(roledata);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/course/getcourseDataById", { course_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setValue("title", usersdata.title);
            setValue("description", usersdata.description);
            setValue("purchase_type", usersdata.purchase_type);
            setValue("user_role", usersdata.role);            
            setValue("session_type", usersdata.session_type);            
            setValue("video_content_title", usersdata.video_content_title);
            setValue("video_title_first", usersdata.video_title_first);
            setValue("video_url_first", usersdata.video_url_first);
            setValue("video_time_first", usersdata.video_time_first);
            setValue("video_title_second", usersdata.video_title_second);
            setValue("video_url_second", usersdata.video_url_second);
            setValue("video_time_second", usersdata.video_time_second);
            setValue("video_title_third", usersdata.video_title_third);
            setValue("video_url_third", usersdata.video_url_third);
            setValue("video_time_third", usersdata.video_time_third);
            setValue("video_title_fourth", usersdata.video_title_fourth);
            setValue("video_url_fourth", usersdata.video_url_fourth);
            setValue("video_time_fourth", usersdata.video_time_fourth);
            setValue("video_title_five", usersdata.video_title_five);
            setValue("video_url_five", usersdata.video_url_five);
            setValue("video_time_five", usersdata.video_time_five);
            setValue("video_title_six", usersdata.video_title_six);
            setValue("video_url_six", usersdata.video_url_six);
            setValue("video_time_six", usersdata.video_time_six);
            setValue("video_title_seven", usersdata.video_title_seven);
            setValue("video_url_seven", usersdata.video_url_seven);
            setValue("video_time_seven", usersdata.video_time_seven);
            setValue("video_title_eight", usersdata.video_title_eight);
            setValue("video_url_eight", usersdata.video_url_eight);
            setValue("video_time_eight", usersdata.video_time_eight);
            setValue("video_title_nine", usersdata.video_title_nine);
            setValue("video_url_nine", usersdata.video_url_nine);
            setValue("video_time_nine", usersdata.video_time_nine);
            setValue("video_title_ten", usersdata.video_title_ten);
            setValue("video_url_ten", usersdata.video_url_ten);
            setValue("video_time_ten", usersdata.video_time_ten);
            setValue("content_title_one", usersdata.content_title_one);
            setValue("content_description_one", usersdata.content_description_one);
            setValue("content_title_two", usersdata.content_title_two);
            setValue("content_description_two", usersdata.content_description_two);
            setValue("content_title_third", usersdata.content_title_third);
            setValue("content_description_third", usersdata.content_description_third);
            setValue("content_title_four", usersdata.content_title_four);
            setValue("content_description_four", usersdata.content_description_four);
            setValue("content_title_five", usersdata.content_title_five);
            setValue("content_description_five", usersdata.content_description_five);
            setValue("trainer", usersdata.trainer);
            setValue("main_cost", usersdata.main_cost);
            setValue("sale_cost", usersdata.sale_cost);
            setValue("live_session_url", usersdata.live_session_url);           
            setValue("live_session_time", usersdata.live_session_time);
            setValue("live_session_minute", usersdata.live_session_minute);
            setSession(usersdata.session_type);
            setSetectimage(usersdata.image);
            setContentDescriptionEditor(usersdata.description);
            setContentLearnEditor(usersdata.learn_description);
            setContentPrerequisitesEditor(usersdata.prerequisites_description);
            setCourseContentFirstChange(usersdata.content_description_one);
            setCourseContentSecondChange(usersdata.content_description_two);
            setCourseContentThirdChange(usersdata.content_description_third);
            setCourseContentFourthChange(usersdata.content_description_four);
            setCourseContentFiveChange(usersdata.content_description_five);
            $('#date-input').val(usersdata.live_session_date);
            
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.course_id = match.params.id;
    data.live_session_date = $('#date-input').val();
    data.session_type = session;
    data.description = contentDescriptionEditor;
    data.learn_description = contentLearnEditor;
    data.prerequisites_description = contentPrerequisitesEditor;
    data.content_description_one = courseContentFirstChange;
    data.content_description_two = courseContentSecondChange;
    data.content_description_third = courseContentThirdChange;
    data.content_description_four = courseContentFourthChange;
    data.content_description_five = courseContentFiveChange;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/course/updatecourseByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/course");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {    
    data.session_type = session;
    data.live_session_date = $('#date-input').val();
    data.description = contentDescriptionEditor;
    data.learn_description = contentLearnEditor;
    data.prerequisites_description = contentPrerequisitesEditor;
    data.content_description_one = courseContentFirstChange;
    data.content_description_two = courseContentSecondChange;
    data.content_description_third = courseContentThirdChange;
    data.content_description_four = courseContentFourthChange;
    data.content_description_five = courseContentFiveChange;
    
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/course/addcourseByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/course");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });
  };

  

  const [session, setSession] = React.useState(1);
  const radioHandlerSession = (status) => {
    // values.legally_entitle = status;
    setSession(status);
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
                  <CFormGroup>
                    <CLabel htmlFor="title">Select session <span className="label-validation">*</span></CLabel>
                    <br />
                    <input checked={session == 1}  onClick={(e) => radioHandlerSession(1)} name={"session"} id="No" value="1" type="radio" /> Live session &nbsp;
                    <input checked={session == 2}  onClick={(e) => radioHandlerSession(2)} name={"session"} id="Yes" value="0" type="radio" /> Pre-recorded session &nbsp;
                    &nbsp;
                    {/* {(validationErrors.legally_entitle && <p className="error"> {validationErrors.legally_entitle}</p>)} */}
                  </CFormGroup>
                </CCol>
              </CRow>

              {session == 1 && <div>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="password">Live session URL</CLabel>
                      <Controller
                        name={"live_session_url"}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <CInput
                            type="live_session_url"
                            onChange={onChange}
                            value={value}
                            placeholder={`Enter your live session URL`}
                          />
                        )}
                      ></Controller>
                    </CFormGroup>
                    {errors.live_session_url && errors.live_session_url.type === "required" && (
                      <p style={{ color: "red", fontSize: "12px" }}>Live session URL is required.</p>
                    )}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="4">
                    <CFormGroup>                      
                      <CLabel htmlFor="date-input">Date</CLabel>
                      <CCol xs="12">
                        <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="4">

                    


                    <CFormGroup>
                      <CLabel htmlFor="password">Time</CLabel>
                      <Controller
                        name="live_session_time"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <select className="form-control" onChange={onChange} value={value}>
                            <option key="0" value="">select value</option>
                            <option key="1" value="00:00">12.00 AM</option>
                            <option key="2" value="00:30">12.30 AM</option>
                            <option key="3" value="01:00">01.00 AM</option>
                            <option key="4" value="01:30">01.30 AM</option>
                            <option key="5" value="02:00">02.00 AM</option>
                            <option key="6" value="02:30">02.30 AM</option>
                            <option key="7" value="03:00">03.00 AM</option>
                            <option key="8" value="03:30">03.30 AM</option>
                            <option key="9" value="04:00">04.00 AM</option>
                            <option key="10" value="04:30">04.30 AM</option>
                            <option key="11" value="05:00">05.00 AM</option>
                            <option key="12" value="05:30">05.30 AM</option>
                            <option key="13" value="06:00">06.00 AM</option>
                            <option key="14" value="06:30">06.30 AM</option>
                            <option key="15" value="07:00">07.00 AM</option>
                            <option key="16" value="07:30">07.30 AM</option>
                            <option key="17" value="08:00">08.00 AM</option>
                            <option key="18" value="08:30">08.30 AM</option>
                            <option key="19" value="09:00">09.00 AM</option>
                            <option key="20" value="09:30">09.30 AM</option>
                            <option key="21" value="10:00">10.00 AM</option>
                            <option key="22" value="10:30">10.30 AM</option>
                            <option key="23" value="11:00">11.00 AM</option>
                            <option key="24" value="11:30">11.30 AM</option>
                            <option key="25" value="12:00">12.00 PM</option>
                            <option key="26" value="12:30">12.30 PM</option>
                            <option key="27" value="13:00">01.00 PM</option>
                            <option key="28" value="13:30">01.30 PM</option>
                            <option key="29" value="14:00">02.00 PM</option>
                            <option key="30" value="14:30">02.30 PM</option>
                            <option key="31" value="15:00">03.00 PM</option>
                            <option key="32" value="15:30">03.30 PM</option>
                            <option key="33" value="16:00">04.00 PM</option>
                            <option key="34" value="16:30">04.30 PM</option>
                            <option key="35" value="17:00">05.00 PM</option>
                            <option key="36" value="17:30">05.30 PM</option>
                            <option key="37" value="18:00">06.00 PM</option>
                            <option key="38" value="18:30">06.30 PM</option>
                            <option key="39" value="19:00">07.00 PM</option>
                            <option key="40" value="19:30">07.30 PM</option>
                            <option key="41" value="20:00">08.00 PM</option>
                            <option key="42" value="20:30">08.30 PM</option>
                            <option key="43" value="21:00">09.00 PM</option>
                            <option key="44" value="21:30">09.30 PM</option>
                            <option key="45" value="22:00">10.00 PM</option>
                            <option key="46" value="22:30">10.30 PM</option>
                            <option key="47" value="23:00">11.00 PM</option>
                            <option key="48" value="23:30">11.30 PM</option>
                          </select>
                        )}
                      ></Controller>                      
                    </CFormGroup>
                  </CCol>
                  <CCol xs="4">
                    <CFormGroup>
                      <CLabel htmlFor="password">Total Minute</CLabel>
                      <Controller
                        name={"live_session_minute"}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <CInput
                            type="live_session_minute"
                            onChange={onChange}
                            value={value}
                            placeholder={`like 1hr,2hrs ...`}
                          />
                        )}
                      ></Controller>
                    </CFormGroup>
                  </CCol>
                </CRow>

                
              </div>}


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Course Content title </CLabel>
                    <Controller
                      name={"video_content_title"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_content_title"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your course content title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="1">
                  1)
                  </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_first"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_first"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL </CLabel>
                    <Controller
                      name={"video_url_first"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_first"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_first"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_first"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  2)
                  </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_second"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_second"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL </CLabel>
                    <Controller
                      name={"video_url_second"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_second"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_second"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_second"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="1">
                  3)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_third"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_third"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL</CLabel>
                    <Controller
                      name={"video_url_third"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_third"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_third"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_third"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  4)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_fourth"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_fourth"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL </CLabel>
                    <Controller
                      name={"video_url_fourth"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_fourth"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_fourth"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_fourth"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  5)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_five"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_five"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL </CLabel>
                    <Controller
                      name={"video_url_five"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_five"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_five"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_five"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  6)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_six"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_six"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL </CLabel>
                    <Controller
                      name={"video_url_six"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_six"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_six"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_six"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  7)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_seven"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_seven"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL </CLabel>
                    <Controller
                      name={"video_url_seven"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_seven"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_seven"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_seven"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  8)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_eight"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_eight"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL</CLabel>
                    <Controller
                      name={"video_url_eight"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_eight"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_eight"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_eight"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  9)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title </CLabel>
                    <Controller
                      name={"video_title_nine"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_nine"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL</CLabel>
                    <Controller
                      name={"video_url_nine"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_nine"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_nine"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_nine"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="1">
                  10)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Title</CLabel>
                    <Controller
                      name={"video_title_ten"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_title_ten"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video URL</CLabel>
                    <Controller
                      name={"video_url_ten"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url_ten"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time </CLabel>
                    <Controller
                      name={"video_time_ten"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_time_ten"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your time`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Course Content Title 1</CLabel>
                    <Controller
                      name={"content_title_one"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="content_title_one"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your course content title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Course Content Description 1</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={courseContentFirstChange}
                      onEditorChange={handleEditorCourseContentFirstChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Course Content Title 2 </CLabel>
                    <Controller
                      name={"content_title_two"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="content_title_two"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Course Content Description 2</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={courseContentSecondChange}
                      onEditorChange={handleEditorCourseContentSecondChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Course Content Title 3</CLabel>
                    <Controller
                      name={"content_title_third"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="content_title_third"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Course Content Description 3</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={courseContentThirdChange}
                      onEditorChange={handleEditorCourseContentThirdChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Course Content Title 4</CLabel>
                    <Controller
                      name={"content_title_four"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="content_title_four"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Course Content Description 4</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={courseContentFourthChange}
                      onEditorChange={handleEditorCourseContentFourthChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Course Content Title 5</CLabel>
                    <Controller
                      name={"content_title_five"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="content_title_five"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Course Content Description 5</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={courseContentFiveChange}
                      onEditorChange={handleEditorCourseContentFiveChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>


              <hr />

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="role">User Role <span className="label-validation">*</span></CLabel>
                    <Controller
                      name="user_role"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <select className="form-control" onChange={onChange} value={value}>
                          <option key="0" value="">select value</option>
                          {roleList.map((item) => (
                            <option key={item.role_id} value={item.role_id}>
                              {item.name}
                            </option>
                          ))}
                          <option key="5" value="all">All</option>
                        </select>
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.user_role && errors.user_role.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>User role is required.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Course Title <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"title"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="title"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
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
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Course Image</CLabel>
                    <br/>
                    <input
                      type="file"
                      accept=".png,.PNG,.JPG,.jpg,.jpeg"
                      name="myfile"
                      onChange={changeFileHandler}
                    />
                    {(isEditMode === 1) &&
                      <span>
                        {!setectimage && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                        {setectimage && <img style={{ width: "100px" }} src={setectimage} alt="user-image" />}
                      </span>
                    }
                    {(isEditMode !== 1 && setectimage != '') && <img style={{ width: "100px" }} src={setectimage} alt="user-image" />}
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">What you’ll learn</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={contentLearnEditor}
                      onEditorChange={handleEditorLearnChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Prerequisites section</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={contentPrerequisitesEditor}
                      onEditorChange={handleEditorPrerequisitesChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Description</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
                      }}
                      value={contentDescriptionEditor}
                      onEditorChange={handleEditorDescriptionChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <hr/>

              
              

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Trainer </CLabel>
                    <Controller
                      name={"trainer"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="trainer"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your trainer`}
                        />
                      )}
                    ></Controller>
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
              <div>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="cost">Main Cost <span className="label-validation">*</span></CLabel>
                      <Controller
                        name={"main_cost"}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <CInput
                            type="main_cost"
                            onChange={onChange}
                            value={value}
                            placeholder={`Enter your main cost`}
                          />
                        )}
                      ></Controller>
                    </CFormGroup>
                    {errors.main_cost && errors.main_cost.type === "required" && (
                      <p style={{ color: "red", fontSize: "12px" }}>Main cost is required.</p>
                    )}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="cost">Sale Cost <span className="label-validation">*</span></CLabel>
                      <Controller
                        name={"sale_cost"}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <CInput
                            type="sale_cost"
                            onChange={onChange}
                            value={value}
                            placeholder={`Enter your sale cost`}
                          />
                        )}
                      ></Controller>
                    </CFormGroup>
                    {errors.sale_cost && errors.sale_cost.type === "required" && (
                      <p style={{ color: "red", fontSize: "12px" }}>Sale cost is required.</p>
                    )}
                  </CCol>
                </CRow>
              </div>
                }

              <button type="submit" class="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>
            </form> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
