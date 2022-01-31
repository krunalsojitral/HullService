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
//import { MultiSelect } from "react-multi-select-component";
import '../TextEditors.scss'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";


const AddEditForm = ({ match }) => {

  let history = useHistory();
  const {
    handleSubmit,
    setValue,
    control,    
    formState: { errors },
  } = useForm();

 
  const [isEditMode, setisEditMode] = React.useState(0);
 
  const [menuList, setMenuList] = React.useState([]);
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedTag, setSelectedTag] = React.useState([])
  const [selectedRole, setSelectedRole] = React.useState([])
  const [draftStatus, setDraftStatus] = React.useState(0)

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
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

  //const initialText = ``;


  React.useEffect(() => {

    axios.get(api_url + "/common/menuList", {})
      .then((result) => {
        if (result.data.status) {
          var menudata = result.data.response.data;         
          setMenuList(menudata);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });
 

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/blog/getBlogDataById", { blog_id: match.params.id }, {})
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
            setSelectedRole(usersdata.selected_role);
            setValue("cost", usersdata.cost);
            setSelectedTag(usersdata.tag);
            setSetectimage(usersdata.image);
            setContentEditor(usersdata.description);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.blog_id = match.params.id;
    data.description = contentEditor;
    data.user_role = selectedRole;
    data.tag = selectedTag;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/blog/updateBlogByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");
        if (draftStatus == 1) {
          history.push("/draft-blog");
        } else {
          history.push("/blog");
        }
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {
    data.description = contentEditor;        
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/common/addPageByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");
        history.push("/dynamicPages");
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


            <form onSubmit={handleSubmit((isEditMode === 1) ? updateInformationAct : addInformationAct)}>

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
                          type="title"
                          onChange={onChange}
                          value={value}
                          required
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
                    <CLabel htmlFor="ccnumber">Upload Image</CLabel>
                    <br />
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
                      <CLabel htmlFor="role">Menu<span className="label-validation">*</span></CLabel>
                      <Controller
                        name="menu"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <select className="form-control" onChange={onChange} value={value}>
                            <option key="0" value="">select value</option>
                            {menuList.map((item) => (
                              <option key={item.dynamic_menu_id} value={item.dynamic_menu_id}>
                                {item.menu_name}
                              </option>
                            ))}                            
                          </select>
                        )}
                      ></Controller>
                    </CFormGroup>
                    {errors.menu && errors.menu.type === "required" && (
                      <p style={{ color: "red", fontSize: "12px" }}>Menu is required.</p>
                    )}
                  </CCol>
                </CRow>               

              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>

            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
