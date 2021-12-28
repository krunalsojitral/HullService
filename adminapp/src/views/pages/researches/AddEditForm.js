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
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const purchase_type_selected = watch("purchase_type");
  const [isEditMode, setisEditMode] = React.useState(0);
  const [roleList, setRoleList] = React.useState([]);
  const [tagList, setTagList] = React.useState([]);
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

    axios.get(api_url + "/common/tagList", {})
      .then((result) => {
        if (result.data.status) {
          var roledata = result.data.response.data;
          var obj = roledata.map((data, index) => {
            let retObj = {};
            retObj['id'] = (index + 1);
            retObj['label'] = data.tag_name;
            retObj['value'] = data.tag_id;
            return retObj;
          });
          setTagList(obj);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });

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

          // setRoleList(roledata);
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
    data.tag = selectedTag;
    data.user_role = selectedRole;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/blog/addBlogByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");
        history.push("/blog");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });
  };

  // const [text, setText] = React.useState(initialText)

  const removeSkill = (value) => {
    var removeskill = selectedTag.filter(function (place) { return place.value !== value })
    setSelectedTag(removeskill);
  };

  const removeRole = (value) => {
    var removeRole = selectedRole.filter(function (place) { return place.value !== value })
    setSelectedRole(removeRole);
  };

  const preview = () => {

    var obj = {
      cost: (control._fields.cost && control._fields.cost._f.value) ? control._fields.cost._f.value : '',
      purchase_type: (control._fields.purchase_type && control._fields.purchase_type._f.value) ? control._fields.purchase_type._f.value : '',
      title: (control._fields.title && control._fields.title._f.value) ? control._fields.title._f.value : '',
      description: (contentEditor) ? contentEditor : '',
      tag: selectedTag,
      type: 'blog'
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

  const draft_blog = () => {
    var obj = {
      cost: (control._fields.cost && control._fields.cost._f.value) ? control._fields.cost._f.value : '',
      purchase_type: (control._fields.purchase_type && control._fields.purchase_type._f.value) ? control._fields.purchase_type._f.value : '',
      title: (control._fields.title && control._fields.title._f.value) ? control._fields.title._f.value : '',
      user_role: selectedRole,
      description: (contentEditor) ? contentEditor : '',
      tag: selectedTag,
      draft: 1
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/blog/addBlogByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", 'Draft added successfully.', "success");
        history.push("/draft-blog");
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
                    <CLabel htmlFor="city">Tag</CLabel>
                    <MultiSelect
                      options={tagList}
                      value={selectedTag}
                      selectionLimit="2"
                      hasSelectAll={false}
                      onChange={setSelectedTag}
                      labelledBy="Select"
                    />
                  </CFormGroup>
                  {selectedTag.map(item => (
                    <span className="skill-name">{item.label} &nbsp;<i onClick={(e) => removeSkill(item.value)} className="fa fa-times">X</i></span>
                  ))}
                </CCol>
              </CRow>
              <br />

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
                            type="cost"
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

              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>
              &nbsp;
              {(isEditMode !== 1) && <button type="button" className="btn btn-outline-primary btn-sm btn-square" onClick={(e) => preview()}> Preview </button>}
              &nbsp;
              {(isEditMode !== 1) && <button type="button" className="btn btn-outline-primary btn-sm btn-square" onClick={(e) => draft_blog()}> Draft </button>}

            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
