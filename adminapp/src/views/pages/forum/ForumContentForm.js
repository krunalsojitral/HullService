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
import { MultiSelect } from "react-multi-select-component";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";
import './TextEditors.scss'

const ForumContentForm = () => {

  let history = useHistory();
  const {
    handleSubmit,    
    setValue,
    control,   
    formState: { errors },
  } = useForm(); 
  
  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  }
 

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
      axios.get(api_url + "/forum/getforumContent", {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            if (usersdata.length > 0){
              console.log(usersdata[0].description);
              
              setContentEditor(usersdata[0].description);
            }
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });   
  }, []);

  const updateInformationAct = (data) => {    
    data.description = contentEditor;

    axios.post(api_url + "/forum/updateForumContent", data, {})
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
                    <CLabel htmlFor="password">Forum Description</CLabel>
                    
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

             
              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> Update </button>

            </form> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ForumContentForm
