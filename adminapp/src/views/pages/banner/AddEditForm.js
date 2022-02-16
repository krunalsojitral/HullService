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
  CTextarea,
} from '@coreui/react'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from '../../Apiurl';
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
  
  
  const [isEditMode, setisEditMode] = React.useState(0);  
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  const changeFileHandler = (event) => {
 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const img = new Image();      
      reader.onload = (event) => {   
        img.src = reader.result;
        img.onload = function () {    
          setImgWidth(img.width)
          setImgHeight(img.height)
          if (img.width >= 1920 && img.height >= 500){
            setSetectimage(event.target.result);
          }else{
            setSelectedFile('')
            Swal.fire("Oops...", "Image size should be minimum 1920(width) X 500(height)", "error");
          }          
        }
      };
      
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  React.useEffect(() => {   
    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/banner/getbannerDataById", { banner_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setValue("title", usersdata.title);
            setValue("description", usersdata.description);
            setValue("button_text", usersdata.button_text);
            setValue("button_url", usersdata.button_url);
            setSetectimage(usersdata.image);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {  
    data.banner_id = match.params.id;
    if (selectedFile) { 
      if (imgWidth >= 1920 && imgHeight >= 500) {
       
        if (data.description){
          var textareaText = data.description;
          textareaText = textareaText.replace(/\r?\n/g, '<br />');
          data.description = textareaText;
        }        
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (selectedFile) {
          formData.append("image", selectedFile, selectedFile.name);
        }
        axios.post(api_url + "/banner/updatebannerByadmin", formData, {})
          .then((result) => {
            if (result.data.status) {
              Swal.fire("Success!", result.data.response.msg, "success");
              history.push("/banner");
            } else {
              Swal.fire("Oops...", result.data.response.msg, "error");
            }
          }).catch((err) => { console.log(err); });
      } else {
        Swal.fire("Oops...", "Image size should be minimum 1920(width) X 500(height)", "error");
      }
    }else{
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (selectedFile) {
        formData.append("image", selectedFile, selectedFile.name);
      }
      axios.post(api_url + "/banner/updatebannerByadmin", formData, {})
        .then((result) => {
          if (result.data.status) {
            Swal.fire("Success!", result.data.response.msg, "success");
            history.push("/banner");
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        }).catch((err) => { console.log(err); });
    }
  };


  const addInformationAct = (data) => { 
    if (data.description) {
      var textareaText = data.description;
      textareaText = textareaText.replace(/\r?\n/g, '<br />');
      data.description = textareaText;
    }
    
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      if (imgWidth >= 1920 && imgHeight >= 500) {
        formData.append("image", selectedFile, selectedFile.name);
        axios.post(api_url + "/banner/addbannerByadmin", formData, {})
          .then((result) => {
            if (result.data.status) {
              Swal.fire("Success!", result.data.response.msg, "success");
              history.push("/banner");
            } else {
              Swal.fire("Oops...", result.data.response.msg, "error");
            }
          }).catch((err) => { console.log(err); });
      }else{
        Swal.fire("Oops...", "Image size should be minimum 1920(width) X 500(height)", "error");
      }      
    }else{
      Swal.fire("Oops...", "Banner image is required", "error");
    }    
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
                  <CRow>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="ccnumber">Upload Image</CLabel>
                        <br />
                        <input
                          type="file"
                          accept=".png,.PNG,.JPG,.jpg,.jpeg"
                          name="myfile"
                          onChange={changeFileHandler}
                        />
                        <div><b>Note:</b> Image size should be minimum 1920(width) X 500(height).</div>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                      {(isEditMode === 1) &&
                        <span>
                          {!setectimage && <img style={{ width: "200px" }} alt="avatar" src="company-logo.png" />}
                          {setectimage && <img style={{ width: "200px" }} src={setectimage} alt="user-image" />}
                        </span>
                      }
                      {(isEditMode !== 1 && setectimage != '') && <img style={{ width: "200px" }} src={setectimage} alt="user-image" />}
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Title </CLabel>
                    <Controller
                      name={"title"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          maxlength="38"
                          placeholder={`Enter banner title`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="description">Description </CLabel>
                    <Controller
                      name={"description"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CTextarea
                          type="text"
                          onChange={onChange}
                          value={value}
                          maxlength="443"
                          placeholder={`Enter banner description`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Button text </CLabel>
                    <Controller
                      name={"button_text"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          maxlength="40"
                          placeholder={`Enter button text`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Button url </CLabel>
                    <Controller
                      name={"button_url"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter button url`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>                  
                </CCol>
              </CRow>

              <br />            
              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>
            </form> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditForm
