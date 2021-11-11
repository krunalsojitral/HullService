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
  const [selectedTag, setSelectedTag] = React.useState([])
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
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
          setRoleList(roledata);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/artical/getarticalDataById", { artical_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setValue("title", usersdata.title);
            setValue("description", usersdata.description);
            setValue("purchase_type", usersdata.purchase_type);
            setValue("user_role", usersdata.role);      
            setValue("cost", usersdata.cost);
            setSelectedTag(usersdata.tag);
            setSetectimage(usersdata.image);
            //setText(usersdata.description);
            setContentEditor(usersdata.description);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.artical_id = match.params.id;
    //data.description = text;
    data.description = contentEditor;
    data.tag = selectedTag;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/artical/updatearticalByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/article");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {    
    //data.description = text;
    data.description = contentEditor;
    data.tag = selectedTag;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/artical/addarticalByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/article");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });
  };

 

  const removeSkill = (value) => {
    var removeskill = selectedTag.filter(function (place) { return place.value !== value })
    setSelectedTag(removeskill);
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
                    <CLabel htmlFor="password">Description</CLabel>
                    {/* <ReactQuill value={text} modules={modules} onChange={setText} /> */}
                    <Editor
                      apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                      cloudChannel="dev"
                      init={{
                        selector: "textarea",
                        plugins: "link image textpattern lists "
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

              <button type="submit" class="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>

            </form> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
