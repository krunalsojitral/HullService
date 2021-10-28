import React from 'react'
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
      axios.post(api_url + "/blog/getBlogDataById", { id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setValue("title", usersdata.title);
            setValue("description", usersdata.description);
            setText(usersdata.description);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.blog_id = match.params.id;
    axios.post(api_url + "/blog/updateBlogByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/blog");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {
    console.log(data);
    data.description = text;
    axios.post(api_url + "/blog/addBlogByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Oops...", result.data.response.msg, "error");
          history.push("/blog");
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
                    <CLabel htmlFor="role">
                      User Role
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
                    <p style={{ color: "red", fontSize: "12px" }}>Please enter user role.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="role">Paid / Unpaid</CLabel>
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
                    <p style={{ color: "red", fontSize: "12px" }}>Please enter type.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Title</CLabel>
                    <Controller
                      name={"title"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="title"
                          disabled={(isEditMode === 1) ? true : false}
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.title && errors.title.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Please enter title.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="password">Description</CLabel>
                    <ReactQuill value={text} modules={modules} onChange={setText} />
                  </CFormGroup>                  
                </CCol>
              </CRow>


              <button type="submit" class="btn-submit"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>

            </form> 


          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
