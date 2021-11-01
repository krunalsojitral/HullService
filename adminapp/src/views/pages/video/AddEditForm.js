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
    getValues,
    setValue,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm();


  const [isEditMode, setisEditMode] = React.useState(0);
  const [roleList, setRoleList] = React.useState([]);
  const [tagList, setTagList] = React.useState([]);

  const [setectvideo, setSetectvideo] = React.useState(0);
  const [selectedTag, setSelectedTag] = React.useState([])
  const [selectedFile, setSelectedFile] = useState();
  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSetectvideo(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };



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
      axios.post(api_url + "/video/getvideoDataById", { video_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            console.log(usersdata);
            setValue("title", usersdata.title);
            setValue("description", usersdata.description);
            setValue("purchase_type", usersdata.purchase_type);
            setValue("user_role", usersdata.role);
            setSetectvideo(usersdata.video);
            setText(usersdata.description);
            setQna(usersdata.qna);
            setNotes(usersdata.notes);
            setOverview(usersdata.overview);
            setInformation(usersdata.information);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.video_id = match.params.id;
    data.tag = selectedTag;
    data.description = text;
    data.qna = qna;
    data.notes = notes;
    data.overview = overview;
    data.information = information;
    data.tag = selectedTag;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("video", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/video/updateVideoByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/video");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {
    data.description = text;
    data.qna = qna;
    data.notes = notes;
    data.overview = overview;
    data.information = information;
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
  };

  const [qna, setQna] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [overview, setOverview] = React.useState('')
  const [information, setInformation] = React.useState('')
  const [text, setText] = React.useState('')

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
                    <CLabel htmlFor="ccnumber">Upload Video</CLabel>
                    <br />
                    <input
                      type="file"
                      accept=".mp4,.MP4,.mp3,.MP3"
                      name="myfile"
                      onChange={changeFileHandler}
                    />
                    {(isEditMode === 1) &&
                      <span>
                        {!setectvideo && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                        {setectvideo && <img style={{ width: "100px" }} src={setectvideo} alt="user-video" />}
                      </span>
                    }
                    {(isEditMode !== 1 && setectvideo != '') && <img style={{ width: "100px" }} src={setectvideo} alt="user-video" />}
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="Description">Description</CLabel>
                    <ReactQuill value={text} modules={modules} onChange={setText} />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
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
              <button type="submit" class="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>

            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
