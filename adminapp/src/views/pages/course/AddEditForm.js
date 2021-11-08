import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import {  
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CFormGroup,
  CTextarea,
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

const AddEditForm = ({ match }) => {

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
    console.log('Content was updated:', content);
    setContentLearnEditor(content);
  }

  const [contentPrerequisitesEditor, setContentPrerequisitesEditor] = useState();
  const handleEditorPrerequisitesChange = (content, editor) => {
    console.log('Content was updated:', content);
    setContentPrerequisitesEditor(content);
  }

  const [contentDescriptionEditor, setContentDescriptionEditor] = useState();
  const handleEditorDescriptionChange = (content, editor) => {
    console.log('Content was updated:', content);
    setContentDescriptionEditor(content);
  }

  const initialText = ``;

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ]
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
            setSetectimage(usersdata.image);
            setText(usersdata.description);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.course_id = match.params.id;
    data.description = text;
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
    data.description = text;
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

  const [text, setText] = React.useState(initialText)

    

 

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
                      apiKey="z2fvgb12fid20qablvolrzqahufdng4v0sjz28p7hxhp9w9u"
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
                      apiKey="z2fvgb12fid20qablvolrzqahufdng4v0sjz28p7hxhp9w9u"
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
                      apiKey="z2fvgb12fid20qablvolrzqahufdng4v0sjz28p7hxhp9w9u"
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
                    <CLabel htmlFor="title"> Course Content title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                       1)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  2)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  3)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  4)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  5)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  6)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  7)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  8)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  9)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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
                <CCol xs="1">
                  10)
                </CCol>
                <CCol xs="5">
                  <CFormGroup>
                    <CLabel htmlFor="title"> title <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Video <span className="label-validation">*</span></CLabel>
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
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="title"> Time <span className="label-validation">*</span></CLabel>
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

              <hr />



              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Trainer <span className="label-validation">*</span></CLabel>
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
                    <CLabel htmlFor="title">Select session <span className="label-validation">*</span></CLabel>
                    <br/>
                    <input name={"legally"} id="No" value="1" type="radio" /> Live session &nbsp;
                    <input name={"legally"} id="Yes" value="0" type="radio" /> Pre-recorded session &nbsp;
                    &nbsp;
                    {/* {(validationErrors.legally_entitle && <p className="error"> {validationErrors.legally_entitle}</p>)} */}
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
