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
import { MultiSelect } from "react-multi-select-component";
import './TextEditors.scss'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";

const AddEditForm = ({ match }) => {

  let history = useHistory();
  const {
    handleSubmit,
    getValues,
    setValue,
    control,    
    watch,
    formState: { errors },
  } = useForm();


  const [isEditMode, setisEditMode] = React.useState(0);
 // const [videoSizeError, setVideoSizeError] = React.useState('');
  const [roleList, setRoleList] = React.useState([]);
  const [tagList, setTagList] = React.useState([]);
  const [selectedRole, setSelectedRole] = React.useState([])

  //const [setectvideo, setSetectvideo] = React.useState(0);
  const [selectedTag, setSelectedTag] = React.useState([])
  const [selectedFile, setSelectedFile] = useState();
  const [draftStatus, setDraftStatus] = React.useState(0)

  // const changeFileHandler = (event) => {
  //   if (event.target.files[0].size > (1024 * 1024 * 25)) {
  //     setVideoSizeError("Audio file size should not be grater than 25 MB");
  //   }else{
  //     setVideoSizeError("");
  //     if (event.target.files && event.target.files[0]) {
  //       var reader = new FileReader();
  //       reader.onload = (event) => {
  //         setSetectvideo(event.target.result);
  //       };
  //       reader.readAsDataURL(event.target.files[0]);
  //       setSelectedFile(event.target.files[0]);
  //     }
  //   }   
  // };

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
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/video/getvideoDataById", { video_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var videodata = result.data.response.data;

            if (videodata.draft_status) {
              setDraftStatus(videodata.draft_status);
            } else {
              setDraftStatus(0);
            }

            setValue("title", videodata.title);
            setValue("video_url", videodata.video_url);
            setValue("description", videodata.description);
            setValue("purchase_type", videodata.purchase_type);
            setValue("user_role", videodata.role);
            setValue("cost", videodata.cost);
            setSelectedTag(videodata.tag);
            setSelectedRole(videodata.selected_role);
           // setSetectvideo(videodata.video);
            setContentEditor(videodata.description);
            // setQna(videodata.qna);
            // setNotes(videodata.notes);
            // setOverview(videodata.overview);
            //setInformation(videodata.information);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }    
  }, []);

  const updateInformationAct = (data) => {
   // if (!videoSizeError) {
    data.video_id = match.params.id;
    data.tag = selectedTag;
    data.description = contentEditor;
    data.user_role = selectedRole;
    // data.qna = qna;
    // data.notes = notes;
    // data.overview = overview;
    // data.information = information;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("video", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/video/updateVideoByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");          
          if (draftStatus == 1) {
            history.push("/draft-video");
          } else {
            history.push("/video");
          }
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });
  //  }
  };


  const addInformationAct = (data) => {

   // if (!videoSizeError){
      data.description = contentEditor;
      // data.qna = qna;
      // data.notes = notes;
      // data.overview = overview;
      // data.information = information;
      data.user_role = selectedRole;
      data.tag = selectedTag;
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (selectedFile) {
        formData.append("video", selectedFile, selectedFile.name);
      }
      axios.post(api_url + "/video/addVideoByadmin", formData, {})
        .then((result) => {
          if (result.data.status) {
            Swal.fire("Success!", result.data.response.msg, "success");
            history.push("/video");
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        }).catch((err) => { console.log(err); });
   // }
    
  };

  const removeRole = (value) => {
    var removeRole = selectedRole.filter(function (place) { return place.value !== value })
    setSelectedRole(removeRole);
  };

  const purchase_type_selected = watch("purchase_type");
  

  // const [qna, setQna] = React.useState('')
  // const [notes, setNotes] = React.useState('')
  // const [overview, setOverview] = React.useState('')
  // const [information, setInformation] = React.useState('')
  //const [text, setText] = React.useState('')

  const removeSkill = (value) => {
    var removeskill = selectedTag.filter(function (place) { return place.value !== value })
    setSelectedTag(removeskill);
  };

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  }


  const draft_video = () => {
    var obj = {
      cost: (control._fields.cost && control._fields.cost._f.value) ? control._fields.cost._f.value : '',
      purchase_type: (control._fields.purchase_type && control._fields.purchase_type._f.value) ? control._fields.purchase_type._f.value : '',
      title: (control._fields.title && control._fields.title._f.value) ? control._fields.title._f.value : '',
      video_url: (control._fields.video_url && control._fields.video_url._f.value) ? control._fields.video_url._f.value : '',
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
    axios.post(api_url + "/video/addVideoByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", 'Draft added successfully.', "success");
        history.push("/draft-video");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });
  }

  const preview = () => {    

    var obj = {
      cost: (control._fields.cost && control._fields.cost._f.value) ? control._fields.cost._f.value : '',
      purchase_type: (control._fields.purchase_type && control._fields.purchase_type._f.value) ? control._fields.purchase_type._f.value : '',
      title: (control._fields.title && control._fields.title._f.value) ? control._fields.title._f.value : '',
      description: (contentEditor) ? contentEditor : '',
      tag: selectedTag,
      video_url: (control._fields.video_url && control._fields.video_url._f.value) ? control._fields.video_url._f.value : '',
      user_role: selectedRole,
      type: 'video'
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
                {/* <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Upload Video</CLabel>
                    <br />
                    <input
                      type="file"
                      accept=".mp4,.MP4,.mp3,.MP3"
                      name="myfile"
                      onChange={changeFileHandler}
                    />
                    {videoSizeError && (
                      <p style={{ color: "red", fontSize: "12px" }}>{videoSizeError}</p>
                    )}
                    {(isEditMode === 1) &&
                      <span>
                        {setectvideo && 
                        <video width="320" height="240" controls>
                            <source src={setectvideo} type="video/mp4"/>
                            <source src={setectvideo} type="video/ogg"/>
                              Your browser does not support the video tag.
                        </video>
                        }
                      </span>
                    }                   
                  </CFormGroup>
                </CCol> */}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Youtube video url <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"video_url"}
                      control={control}
                      rules={{ required: true
                      // pattern: { value: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/ },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="video_url"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your youtube video url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.video_url && errors.video_url.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Youtube video url is required.</p>
                  )}
                  {/* {(errors.video_url?.type === "pattern" && <p style={{ color: "red", fontSize: "12px" }}>Enter valide video url.</p>)}                  */}
                  
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="Description">Description</CLabel>
                    
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

              {/* <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="QnA">QnA</CLabel>
                    <ReactQuill value={qna} modules={modules} onChange={setQna} />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="Notes">Notes</CLabel>
                    <ReactQuill value={notes} modules={modules} onChange={setNotes} />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="overview">Overview</CLabel>
                    <ReactQuill value={overview} modules={modules} onChange={setOverview} />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="Information">Information</CLabel>
                    <ReactQuill value={information} modules={modules} onChange={setInformation} />
                  </CFormGroup>
                </CCol>
              </CRow> */}

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

              {/* <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="role">
                      User Role <span className="label-validation">*</span>
                    </CLabel>
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
              {(isEditMode !== 1) && <button type="button" className="btn btn-outline-primary btn-sm btn-square" onClick={(e) => draft_video()}> Draft </button>}

            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
