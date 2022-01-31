import React, { useState } from 'react'
import { Editor } from "@tinymce/tinymce-react";

import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react'
import '../TextEditors.scss'
import { useForm, Controller } from "react-hook-form";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";


const BecomeMemberContent = ({ match }) => {
  
  const {
    handleSubmit,
    setValue,
    control,    
    formState: { errors },
  } = useForm();
  
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();  
  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  }

  const [contentSecondDescriptionEditor, setContentSecondDescriptionEditor] = useState();
  const handleSecondDescriptionEditorChange = (content, editor) => {
    setContentSecondDescriptionEditor(content);
  }

  const [contentTestimonialsEditor, setContentTestimonialsEditor] = useState();
  const handleTestimonialsEditorChange = (content, editor) => {
    setContentTestimonialsEditor(content);
  }

  const [becomeMemberEditor, setBecomeMemberEditor] = useState();
  const handleBecomeMemberEditorChange = (content, editor) => {
    setBecomeMemberEditor(content);
  }

  const [emailUsDescriptionEditor, setEmailUsDescriptionEditor] = useState();
  const handleEmailDescriptionEditorChange = (content, editor) => {
    setEmailUsDescriptionEditor(content);
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

  React.useEffect(() => { 
    
    axios.get(api_url + "/common/getBecomeMemberContent", {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;            
            setValue("main_title", usersdata.main_title);
            setValue("sub_title", usersdata.sub_title);
            setValue("description", usersdata.description);            
            setValue("second_description", usersdata.second_description);
            setValue("testimonials", usersdata.testimonials);
            setValue("become_member_title", usersdata.become_member_title);
            setSetectimage(usersdata.image);
            setContentEditor(usersdata.description);
            setContentSecondDescriptionEditor(usersdata.second_description);
            setContentTestimonialsEditor(usersdata.testimonials);
            setBecomeMemberEditor(usersdata.become_member_description);
            setEmailUsDescriptionEditor(usersdata.email_us_description);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    
  }, []);

  const updateInformationAct = (data) => {    
    data.description = contentEditor;  
    data.second_description = contentSecondDescriptionEditor;
    data.testimonials = contentTestimonialsEditor;
    data.become_member_description = becomeMemberEditor;
    data.email_us_description = emailUsDescriptionEditor;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/common/updateBecomeMemberByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");        
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });

  };


  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          {/* <CCardHeader>
            User id: {match.params.id}
          </CCardHeader> */}
          <CCardBody>


            <form onSubmit={handleSubmit(updateInformationAct)}>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Main Title <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"main_title"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          required
                          placeholder={`Enter your main title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.main_title && errors.main_title.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Main Title is required.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Sub Title <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"sub_title"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          required
                          placeholder={`Enter your sub title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.sub_title && errors.sub_title.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Sub Title is required.</p>
                  )}
                </CCol>
              </CRow>

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
                    <CLabel htmlFor="password">Description</CLabel>
                    {/* <ReactQuill value={text} modules={modules} onChange={setText} /> */}

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
                    <CLabel htmlFor="password">Second Description</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={contentSecondDescriptionEditor}
                      onEditorChange={handleSecondDescriptionEditorChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Testimonials</CLabel>                    
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={contentTestimonialsEditor}
                      onEditorChange={handleTestimonialsEditorChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>      


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Become a Member Title <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"become_member_title"}
                      control={control}
                     // rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          required
                          placeholder={`Enter your become a member title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {/* {errors.sub_title && errors.sub_title.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Title is required.</p>
                  )} */}
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Become a Member escription</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={becomeMemberEditor}
                      onEditorChange={handleBecomeMemberEditorChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Email us description</CLabel>
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={emailUsDescriptionEditor}
                      onEditorChange={handleEmailDescriptionEditorChange}

                    />
                  </CFormGroup>
                </CCol>
              </CRow>


              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> Update </button>

            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BecomeMemberContent
