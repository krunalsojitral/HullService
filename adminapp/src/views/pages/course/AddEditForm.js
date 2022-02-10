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
import '../TextEditors.scss'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";
import $ from 'jquery';
import { MultiSelect } from "react-multi-select-component";

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
  const [selectedRole, setSelectedRole] = React.useState([])
  const [draftStatus, setDraftStatus] = React.useState(0)

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
          var obj = roledata.map((data, index) => {
            let retObj = {};
            retObj['id'] = (index + 1);
            retObj['label'] = data.name;
            retObj['value'] = data.role_id;
            return retObj;
          });
          setRoleList(obj);
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

            if (usersdata.draft_status) {
              setDraftStatus(usersdata.draft_status);
            } else {
              setDraftStatus(0);
            }

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
            setSelectedRole(usersdata.selected_role);
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
    data.user_role = selectedRole;
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
          
          if (draftStatus == 1) {
            history.push("/draft-courses");
          } else {
            history.push("/course");
          }
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {   
    
    data.user_role = selectedRole;
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

  const removeRole = (value) => {
    var removeRole = selectedRole.filter(function (place) { return place.value !== value })
    setSelectedRole(removeRole);
  };

  const preview = () => {

    var obj = {
      title: (control._fields.title && control._fields.title._f.value) ? control._fields.title._f.value : '',
      live_session_url: (control._fields.live_session_url && control._fields.live_session_url._f.value) ? control._fields.live_session_url._f.value : '',
      live_session_date: (control._fields.live_session_date && control._fields.live_session_date._f.value) ? control._fields.live_session_date._f.value : '',
      live_session_time: (control._fields.live_session_time && control._fields.live_session_time._f.value) ? control._fields.live_session_time._f.value : '',
      live_session_minute: (control._fields.live_session_minute && control._fields.live_session_minute._f.value) ? control._fields.live_session_minute._f.value : '',
      description: (control._fields.description && control._fields.description._f.value) ? control._fields.description._f.value : '',
      learn_description: (control._fields.learn_description && control._fields.learn_description._f.value) ? control._fields.learn_description._f.value : '',
      prerequisites_description: (control._fields.prerequisites_description && control._fields.prerequisites_description._f.value) ? control._fields.prerequisites_description._f.value : '',
      session_type: (control._fields.session_type && control._fields.session_type._f.value) ? control._fields.session_type._f.value : '',
      video_content_title: (control._fields.video_content_title && control._fields.video_content_title._f.value) ? control._fields.video_content_title._f.value : '',
      video_title_first: (control._fields.video_title_first && control._fields.video_title_first._f.value) ? control._fields.video_title_first._f.value : '',
      video_url_first: (control._fields.video_url_first && control._fields.video_url_first._f.value) ? control._fields.video_url_first._f.value : '',
      video_time_first: (control._fields.video_time_first && control._fields.video_time_first._f.value) ? control._fields.video_time_first._f.value : '',
      video_title_second: (control._fields.video_title_second && control._fields.video_title_second._f.value) ? control._fields.video_title_second._f.value : '',
      video_url_second: (control._fields.video_url_second && control._fields.video_url_second._f.value) ? control._fields.video_url_second._f.value : '',
      video_time_second: (control._fields.video_time_second && control._fields.video_time_second._f.value) ? control._fields.video_time_second._f.value : '',
      video_title_third: (control._fields.video_title_third && control._fields.video_title_third._f.value) ? control._fields.video_title_third._f.value : '',
      video_url_third: (control._fields.video_url_third && control._fields.video_url_third._f.value) ? control._fields.video_url_third._f.value : '',
      video_time_third: (control._fields.video_time_third && control._fields.video_time_third._f.value) ? control._fields.video_time_third._f.value : '',
      video_title_fourth: (control._fields.video_title_fourth && control._fields.video_title_fourth._f.value) ? control._fields.video_title_fourth._f.value : '',
      video_url_fourth: (control._fields.video_url_fourth && control._fields.video_url_fourth._f.value) ? control._fields.video_url_fourth._f.value : '',
      video_time_fourth: (control._fields.video_time_fourth && control._fields.video_time_fourth._f.value) ? control._fields.video_time_fourth._f.value : '',
      video_title_five: (control._fields.video_title_five && control._fields.video_title_five._f.value) ? control._fields.video_title_five._f.value : '',
      video_url_five: (control._fields.video_url_five && control._fields.video_url_five._f.value) ? control._fields.video_url_five._f.value : '',
      video_time_five: (control._fields.video_time_five && control._fields.video_time_five._f.value) ? control._fields.video_time_five._f.value : '',
      video_title_six: (control._fields.video_title_six && control._fields.video_title_six._f.value) ? control._fields.video_title_six._f.value : '',
      video_url_six: (control._fields.video_url_six && control._fields.video_url_six._f.value) ? control._fields.video_url_six._f.value : '',
      video_time_six: (control._fields.video_time_six && control._fields.video_time_six._f.value) ? control._fields.video_time_six._f.value : '',
      video_title_seven: (control._fields.video_title_seven && control._fields.video_title_seven._f.value) ? control._fields.video_title_seven._f.value : '',
      video_url_seven: (control._fields.video_url_seven && control._fields.video_url_seven._f.value) ? control._fields.video_url_seven._f.value : '',
      video_time_seven: (control._fields.video_time_seven && control._fields.video_time_seven._f.value) ? control._fields.video_time_seven._f.value : '',
      video_title_eight: (control._fields.video_title_eight && control._fields.video_title_eight._f.value) ? control._fields.video_title_eight._f.value : '',
      video_url_eight: (control._fields.video_url_eight && control._fields.video_url_eight._f.value) ? control._fields.video_url_eight._f.value : '',
      video_time_eight: (control._fields.video_time_eight && control._fields.video_time_eight._f.value) ? control._fields.video_time_eight._f.value : '',
      video_title_nine: (control._fields.video_title_nine && control._fields.video_title_nine._f.value) ? control._fields.video_title_nine._f.value : '',
      video_url_nine: (control._fields.video_url_nine && control._fields.video_url_nine._f.value) ? control._fields.video_url_nine._f.value : '',
      video_time_nine: (control._fields.video_time_nine && control._fields.video_time_nine._f.value) ? control._fields.video_time_nine._f.value : '',
      video_title_ten: (control._fields.video_title_ten && control._fields.video_title_ten._f.value) ? control._fields.video_title_ten._f.value : '',
      video_url_ten: (control._fields.video_url_ten && control._fields.video_url_ten._f.value) ? control._fields.video_url_ten._f.value : '',
      video_time_ten: (control._fields.video_time_ten && control._fields.video_time_ten._f.value) ? control._fields.video_time_ten._f.value : '',
      content_title_one: (control._fields.content_title_one && control._fields.content_title_one._f.value) ? control._fields.content_title_one._f.value : '',
      content_description_one: (control._fields.content_description_one && control._fields.content_description_one._f.value) ? control._fields.content_description_one._f.value : '',
      content_title_two: (control._fields.content_title_two && control._fields.content_title_two._f.value) ? control._fields.content_title_two._f.value : '',
      content_description_two: (control._fields.content_description_two && control._fields.content_description_two._f.value) ? control._fields.content_description_two._f.value : '',
      content_title_third: (control._fields.content_title_third && control._fields.content_title_third._f.value) ? control._fields.content_title_third._f.value : '',
      content_description_third: (control._fields.content_description_third && control._fields.content_description_third._f.value) ? control._fields.content_description_third._f.value : '',
      content_title_four: (control._fields.content_title_four && control._fields.content_title_four._f.value) ? control._fields.content_title_four._f.value : '',
      content_description_four: (control._fields.content_description_four && control._fields.content_description_four._f.value) ? control._fields.content_description_four._f.value : '',
      content_title_five: (control._fields.content_title_five && control._fields.content_title_five._f.value) ? control._fields.content_title_five._f.value : '',
      content_description_five: (control._fields.content_description_five && control._fields.content_description_five._f.value) ? control._fields.content_description_five._f.value : '',
      trainer: (control._fields.trainer && control._fields.trainer._f.value) ? control._fields.trainer._f.value : '',
      purchase_type: (control._fields.purchase_type && control._fields.purchase_type._f.value) ? control._fields.purchase_type._f.value : '',
      main_cost: (control._fields.main_cost && control._fields.main_cost._f.value) ? control._fields.main_cost._f.value : '',
      sale_cost: (control._fields.sale_cost && control._fields.sale_cost._f.value) ? control._fields.sale_cost._f.value : '',
      draft: 1,
      user_role: selectedRole,
      session_type: session,
      live_session_date: $('#date-input').val(),
      description: contentDescriptionEditor,
      learn_description: contentLearnEditor,
      prerequisites_description: contentPrerequisitesEditor,
      content_description_one: courseContentFirstChange,
      content_description_two: courseContentSecondChange,
      content_description_third: courseContentThirdChange,
      content_description_four: courseContentFourthChange,
      content_description_five: courseContentFiveChange,
      type: 'course'
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/common/addPreview", formData).then((result) => {
      if (result.data.status) {
       // window.open(result.data.response.preview + "preview-module");
        window.open("http://localhost:4200/preview-module");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });

  }



  const draft_course = () => {  


    var obj = {      
      title: (control._fields.title && control._fields.title._f.value) ? control._fields.title._f.value : '',  
      live_session_url: (control._fields.live_session_url && control._fields.live_session_url._f.value) ? control._fields.live_session_url._f.value : '',  
      live_session_date: (control._fields.live_session_date && control._fields.live_session_date._f.value) ? control._fields.live_session_date._f.value : '',
      live_session_time: (control._fields.live_session_time && control._fields.live_session_time._f.value) ? control._fields.live_session_time._f.value : '',                  
      live_session_minute: (control._fields.live_session_minute && control._fields.live_session_minute._f.value) ? control._fields.live_session_minute._f.value : '',
      description: (control._fields.description && control._fields.description._f.value) ? control._fields.description._f.value : '',
      learn_description: (control._fields.learn_description && control._fields.learn_description._f.value) ? control._fields.learn_description._f.value : '',
      prerequisites_description: (control._fields.prerequisites_description && control._fields.prerequisites_description._f.value) ? control._fields.prerequisites_description._f.value : '',
      session_type: (control._fields.session_type && control._fields.session_type._f.value) ? control._fields.session_type._f.value : '',
      video_content_title: (control._fields.video_content_title && control._fields.video_content_title._f.value) ? control._fields.video_content_title._f.value : '',
      video_title_first: (control._fields.video_title_first && control._fields.video_title_first._f.value) ? control._fields.video_title_first._f.value : '',
      video_url_first: (control._fields.video_url_first && control._fields.video_url_first._f.value) ? control._fields.video_url_first._f.value : '',
      video_time_first: (control._fields.video_time_first && control._fields.video_time_first._f.value) ? control._fields.video_time_first._f.value : '',
      video_title_second: (control._fields.video_title_second && control._fields.video_title_second._f.value) ? control._fields.video_title_second._f.value : '',
      video_url_second: (control._fields.video_url_second && control._fields.video_url_second._f.value) ? control._fields.video_url_second._f.value : '',
      video_time_second: (control._fields.video_time_second && control._fields.video_time_second._f.value) ? control._fields.video_time_second._f.value : '',
      video_title_third: (control._fields.video_title_third && control._fields.video_title_third._f.value) ? control._fields.video_title_third._f.value : '',
      video_url_third: (control._fields.video_url_third && control._fields.video_url_third._f.value) ? control._fields.video_url_third._f.value : '',
      video_time_third: (control._fields.video_time_third && control._fields.video_time_third._f.value) ? control._fields.video_time_third._f.value : '',
      video_title_fourth: (control._fields.video_title_fourth && control._fields.video_title_fourth._f.value) ? control._fields.video_title_fourth._f.value : '',
      video_url_fourth: (control._fields.video_url_fourth && control._fields.video_url_fourth._f.value) ? control._fields.video_url_fourth._f.value : '',
      video_time_fourth: (control._fields.video_time_fourth && control._fields.video_time_fourth._f.value) ? control._fields.video_time_fourth._f.value : '',
      video_title_five: (control._fields.video_title_five && control._fields.video_title_five._f.value) ? control._fields.video_title_five._f.value : '',
      video_url_five: (control._fields.video_url_five && control._fields.video_url_five._f.value) ? control._fields.video_url_five._f.value : '',
      video_time_five: (control._fields.video_time_five && control._fields.video_time_five._f.value) ? control._fields.video_time_five._f.value : '',
      video_title_six: (control._fields.video_title_six && control._fields.video_title_six._f.value) ? control._fields.video_title_six._f.value : '',
      video_url_six: (control._fields.video_url_six && control._fields.video_url_six._f.value) ? control._fields.video_url_six._f.value : '',
      video_time_six: (control._fields.video_time_six && control._fields.video_time_six._f.value) ? control._fields.video_time_six._f.value : '',
      video_title_seven: (control._fields.video_title_seven && control._fields.video_title_seven._f.value) ? control._fields.video_title_seven._f.value : '',
      video_url_seven: (control._fields.video_url_seven && control._fields.video_url_seven._f.value) ? control._fields.video_url_seven._f.value : '',
      video_time_seven: (control._fields.video_time_seven && control._fields.video_time_seven._f.value) ? control._fields.video_time_seven._f.value : '',
      video_title_eight: (control._fields.video_title_eight && control._fields.video_title_eight._f.value) ? control._fields.video_title_eight._f.value : '',
      video_url_eight: (control._fields.video_url_eight && control._fields.video_url_eight._f.value) ? control._fields.video_url_eight._f.value : '',
      video_time_eight: (control._fields.video_time_eight && control._fields.video_time_eight._f.value) ? control._fields.video_time_eight._f.value : '',
      video_title_nine: (control._fields.video_title_nine && control._fields.video_title_nine._f.value) ? control._fields.video_title_nine._f.value : '',
      video_url_nine: (control._fields.video_url_nine && control._fields.video_url_nine._f.value) ? control._fields.video_url_nine._f.value : '',
      video_time_nine: (control._fields.video_time_nine && control._fields.video_time_nine._f.value) ? control._fields.video_time_nine._f.value : '',
      video_title_ten: (control._fields.video_title_ten && control._fields.video_title_ten._f.value) ? control._fields.video_title_ten._f.value : '',
      video_url_ten: (control._fields.video_url_ten && control._fields.video_url_ten._f.value) ? control._fields.video_url_ten._f.value : '',
      video_time_ten: (control._fields.video_time_ten && control._fields.video_time_ten._f.value) ? control._fields.video_time_ten._f.value : '',
      content_title_one: (control._fields.content_title_one && control._fields.content_title_one._f.value) ? control._fields.content_title_one._f.value : '',
      content_description_one: (control._fields.content_description_one && control._fields.content_description_one._f.value) ? control._fields.content_description_one._f.value : '',
      content_title_two: (control._fields.content_title_two && control._fields.content_title_two._f.value) ? control._fields.content_title_two._f.value : '',
      content_description_two: (control._fields.content_description_two && control._fields.content_description_two._f.value) ? control._fields.content_description_two._f.value : '',
      content_title_third: (control._fields.content_title_third && control._fields.content_title_third._f.value) ? control._fields.content_title_third._f.value : '',
      content_description_third: (control._fields.content_description_third && control._fields.content_description_third._f.value) ? control._fields.content_description_third._f.value : '',
      content_title_four: (control._fields.content_title_four && control._fields.content_title_four._f.value) ? control._fields.content_title_four._f.value : '',
      content_description_four: (control._fields.content_description_four && control._fields.content_description_four._f.value) ? control._fields.content_description_four._f.value : '',
      content_title_five: (control._fields.content_title_five && control._fields.content_title_five._f.value) ? control._fields.content_title_five._f.value : '',
      content_description_five: (control._fields.content_description_five && control._fields.content_description_five._f.value) ? control._fields.content_description_five._f.value : '',
      trainer: (control._fields.trainer && control._fields.trainer._f.value) ? control._fields.trainer._f.value : '',      
      purchase_type: (control._fields.purchase_type && control._fields.purchase_type._f.value) ? control._fields.purchase_type._f.value : '',
      main_cost: (control._fields.main_cost && control._fields.main_cost._f.value) ? control._fields.main_cost._f.value : '',
      sale_cost: (control._fields.sale_cost && control._fields.sale_cost._f.value) ? control._fields.sale_cost._f.value : '',
      draft: 1,
      user_role : selectedRole,
      session_type : session,
      live_session_date : $('#date-input').val(),
      description : contentDescriptionEditor,
      learn_description : contentLearnEditor,
      prerequisites_description : contentPrerequisitesEditor,
      content_description_one : courseContentFirstChange,
      content_description_two : courseContentSecondChange,
      content_description_third : courseContentThirdChange,
      content_description_four : courseContentFourthChange,
      content_description_five : courseContentFiveChange
    } 

    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/course/addcourseByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", 'Draft added successfully.', "success");
        history.push("/draft-courses");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });
  }
 

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
                        render={({ field: { onChange, value } }) => (
                          <CInput
                            type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter course title`}
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
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
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                    <CLabel htmlFor="city">
                      User Role <span className="label-validation">*</span>
                    </CLabel>
                    <MultiSelect
                      options={roleList}
                      value={selectedRole}
                      selectionLimit="2"
                      hasSelectAll={true}
                      onChange={setSelectedRole}
                      labelledBy="Select"
                    />
                  </CFormGroup>
                  {selectedRole.map(item => (
                    <span className="skill-name">{item.label} &nbsp;<i onClick={(e) => removeRole(item.value)} className="fa fa-times">X</i></span>
                  ))}
                </CCol>
              </CRow>
              <br />

              {/* <CRow>
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
              </CRow> */}

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
                          type="text"
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
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

              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>
              &nbsp;
              {(isEditMode !== 1) && <button type="button" className="btn btn-outline-primary btn-sm btn-square" onClick={(e) => preview()}> Preview </button>}
              &nbsp; 
              {(isEditMode !== 1) && <button type="button" className="btn btn-outline-primary btn-sm btn-square" onClick={(e) => draft_course()}> Draft </button>}


            </form> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
