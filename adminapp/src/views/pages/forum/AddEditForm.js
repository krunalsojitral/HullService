import React from 'react'

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

const AddEditForm = ({ match }) => {

  let history = useHistory();
  const {
    handleSubmit,    
    setValue,
    control,   
    formState: { errors },
  } = useForm(); 
  
  const [isEditMode, setisEditMode] = React.useState(0);  
  const [tagList, setTagList] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState([])
  const [headingList, setHeadingList] = React.useState([]);   
 

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

    axios.get(api_url + "/common/getHeadingList", {})
      .then((result) => {
        if (result.data.status) {
          var headingdata = result.data.response.data;
          setHeadingList(headingdata);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });
    
  

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/forum/getforumDataById", { forum_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setValue("title", usersdata.title);
            setValue("heading", usersdata.heading);            
            setSelectedTag(usersdata.tag);
            
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.forum_id = match.params.id;  
    data.tag = selectedTag;
    axios.post(api_url + "/forum/updateforumByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/forum");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {    
    data.tag = selectedTag;
    axios.post(api_url + "/forum/addforumByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/forum");
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
                    <CLabel htmlFor="title">Question <span className="label-validation">*</span></CLabel>
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
                    <CLabel htmlFor="city">Topic <span className="label-validation">*</span></CLabel>
                    <Controller
                      name="heading"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <select className="form-control" onChange={onChange} value={value}>
                          <option key="0" value="">select value</option>
                          {headingList.map((item) => (
                            <option key={item.forumheading_id} value={item.forumheading_id}>
                              {item.forumheading_name}
                            </option>
                          ))}
                        </select>
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.heading && errors.heading.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Please enter heading.</p>
                  )}
                </CCol>
              </CRow>

{/* 
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="city">Category <span className="label-validation">*</span></CLabel>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <select className="form-control" onChange={onChange} value={value}>
                          <option key="0" value="">select value</option>
                          {categoryList.map((item) => (
                            <option key={item.category_id} value={item.category_id}>
                              {item.category_name}
                            </option>
                          ))}
                        </select>
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.category && errors.category.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Please enter category.</p>
                  )}
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
              <br/>
             

             
              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>

            </form> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
