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
//import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";

const AddEditForm = ({ match }) => {

  //let history = useHistory();
  const {
    handleSubmit,    
    setValue,
    control,        
    formState: { errors },
  } = useForm();
  

  const [firstsectionupperparagraph, setFirstsectionupperparagraph] = useState();
  const handlefirstsectionupperparagraph = (content, editor) => { setFirstsectionupperparagraph(content); }

  const [firstsectionlowerparagraph, setFirstsectionlowerparagraph] = useState();
  const handlefirstsectionlowerparagraph = (content, editor) => { setFirstsectionlowerparagraph(content); }

  const [thirdsectionupperparagraph, setThirdsectionupperparagraph] = useState();
  const handlethirdsectionupperparagraph = (content, editor) => { setThirdsectionupperparagraph(content); }

  const [thirdsectionlowerparagraph, setThirdsectionlowerparagraph] = useState();
  const handlethirdsectionlowerparagraph = (content, editor) => { setThirdsectionlowerparagraph(content); }


  React.useEffect(() => {   

    axios.get(api_url + "/cms/getHomeContentData")
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setValue("first_section_title", usersdata.first_section_title);
            setValue("first_section_sub_title", usersdata.first_section_sub_title);
            setValue("second_section_title", usersdata.second_section_title);
            setValue("second_section_sub_title", usersdata.second_section_sub_title);
            setValue("video_url", usersdata.video_url);
            setValue("third_section_title", usersdata.third_section_title);
            setValue("third_section_sub_title", usersdata.third_section_sub_title);
            setFirstsectionupperparagraph(usersdata.first_section_upper_paragraph);
            setFirstsectionlowerparagraph(usersdata.first_section_lower_paragraph);
            setThirdsectionupperparagraph(usersdata.third_section_upper_paragraph);
            setThirdsectionlowerparagraph(usersdata.third_section_lower_paragraph);
            
            
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    
  }, []);

  const updateInformationAct = (data) => {
    
    data.first_section_upper_paragraph = firstsectionupperparagraph;
    data.first_section_lower_paragraph = firstsectionlowerparagraph;
    data.third_section_upper_paragraph = thirdsectionupperparagraph;
    data.third_section_lower_paragraph = thirdsectionlowerparagraph;
    
    axios.post(api_url + "/cms/updatecontentByadmin", data, {})
      .then((result) => {
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
                    <CLabel htmlFor="title">First section title </CLabel>
                    <Controller
                      name={"first_section_title"}
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
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">First section sub title </CLabel>
                    <Controller
                      name={"first_section_sub_title"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your sub title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">First section upper paragraph</CLabel>
                    {/* <ReactQuill value={text} modules={modules} onChange={setText} /> */}
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={firstsectionupperparagraph}
                      onEditorChange={handlefirstsectionupperparagraph}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">First section lower paragraph</CLabel>
                    {/* <ReactQuill value={text} modules={modules} onChange={setText} /> */}
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={firstsectionlowerparagraph}
                      onEditorChange={handlefirstsectionlowerparagraph}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

            
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Second section title </CLabel>
                    <Controller
                      name={"second_section_title"}
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
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Second section sub title </CLabel>
                    <Controller
                      name={"second_section_sub_title"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your sub title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Youtube video URL </CLabel>
                    <Controller
                      name={"video_url"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your URL`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Third section title </CLabel>
                    <Controller
                      name={"third_section_title"}
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
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Third section sub title </CLabel>
                    <Controller
                      name={"third_section_sub_title"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your sub title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Third section upper paragraph</CLabel>
                    {/* <ReactQuill value={text} modules={modules} onChange={setText} /> */}
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={thirdsectionupperparagraph}
                      onEditorChange={handlethirdsectionupperparagraph}

                    />
                  </CFormGroup>
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Third section lower paragraph</CLabel>
                    {/* <ReactQuill value={text} modules={modules} onChange={setText} /> */}
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists textcolor colorpicker",
                        toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                      }}
                      value={thirdsectionlowerparagraph}
                      onEditorChange={handlethirdsectionlowerparagraph}

                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              
              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> {'Update'}</button>

            </form> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
