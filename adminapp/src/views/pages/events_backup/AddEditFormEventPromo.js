import React, { useState, Fragment  } from 'react'
import { Editor } from "@tinymce/tinymce-react";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CTabs,
  CTabPane,
  CTabContent,
  CCardHeader,
  CNavItem,
  CNavLink,
  CNav
} from '@coreui/react'
//import { MultiSelect } from "react-multi-select-component";
import '../TextEditors.scss'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";



const AddEditFormEventPromo = ({ match }) => {
  const [active, setActive] = useState(0)


  let history = useHistory();
  const {
    handleSubmit,
    setValue,
    control,    
    trigger,
    formState: { errors },
  } = useForm({    
   
  });

 
  
  const [isEditMode, setisEditMode] = React.useState(0);
  
  const [selectimage, setSelectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();

  const [selectpromoimage, setSelectpromoimage] = React.useState(0);
  const [selectedPromoFile, setSelectedPromoFile] = useState();
  

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  }

  const [contentPromoEditor, setContentPromoEditor] = useState();
  const handlePromoEditorChange = (content, editor) => {
    setContentPromoEditor(content);
  }

  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSelectimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  const changePromoFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSelectpromoimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedPromoFile(event.target.files[0]);
    }
  };

  
  const [eventList, setEventList] = React.useState([]);


  React.useEffect(() => {

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/event/getEventPromoDataById", { event_promo_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var eventdata = result.data.response.data;
            setValue("event", eventdata.event_id);
            setSelectimage(eventdata.image);
            setSelectpromoimage(eventdata.promo_image);
            setValue("promo_title", eventdata.promo_title);
            setContentPromoEditor(eventdata.promo_description);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }

    axios.get(api_url + "/event/getEventPromoList", {})
      .then((result) => {
        if (result.data.status) {
          var data = result.data.response.data;         
          setEventList(data);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });

  }, []);  

  const addInformationAct = async (data) => {
    data.description = contentEditor;
    data.promo_description = contentPromoEditor;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedPromoFile) {
      formData.append("promo_image", selectedPromoFile, selectedPromoFile.name);
    }
    axios.post(api_url + "/event/addEventPromoByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");
        history.push("/eventpromo");
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });  
  };
  
  const updateInformationAct = (data) => {
    data.event_promo_id = match.params.id;
    data.description = contentEditor;
    data.promo_description = contentPromoEditor;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedPromoFile) {
      formData.append("promo_image", selectedPromoFile, selectedPromoFile.name);
    }

    axios.post(api_url + "/event/updateEventPromoByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/eventpromo");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  return (
    <CRow>             
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
          <CCardHeader>
            Add Event Promo
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit((isEditMode === 1) ? updateInformationAct : addInformationAct)}>              
              <CCol>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="role">Event <span className="label-validation">*</span></CLabel>
                      <Controller
                        name="event"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <select className="form-control" onChange={onChange} value={value}>
                            <option key="0" value="">select value</option>
                            {eventList.map((item) => (
                              <option key={item.event_id} value={item.event_id}>
                                {item.title}
                              </option>
                            ))}
                          </select>
                        )}
                      ></Controller>
                    </CFormGroup>
                    {errors.event && errors.event.type === "required" && (
                      <p style={{ color: "red", fontSize: "12px" }}>Event is required.</p>
                    )}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="title">Promo title </CLabel>
                      <Controller
                        name={"promo_title"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <CInput
                            type="text"
                            onChange={onChange}
                            value={value}
                            required
                            placeholder={`Enter promo title`}
                          />
                        )}
                      ></Controller>
                    </CFormGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="ccnumber">Promo upload image</CLabel>
                      <br />
                      <input
                        type="file"
                        accept=".png,.PNG,.JPG,.jpg,.jpeg"
                        name="myfile"
                        onChange={changePromoFileHandler}
                      />
                      <span>
                        {!selectpromoimage && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                        {selectpromoimage && <img style={{ width: "100px" }} src={selectpromoimage} alt="promo-image" />}
                      </span>
                    </CFormGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="password">Promo description</CLabel>
                      <Editor
                        apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                        cloudChannel="dev"
                        init={{
                          selector: "textarea",
                          plugins: "link image textpattern lists textcolor colorpicker",
                          toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                        }}
                        value={contentPromoEditor}
                        onEditorChange={handlePromoEditorChange}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>

              </CCol>
              
              <center>
                <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> {(isEditMode === 1) ? 'Update' : 'Add'}</button>
              </center>              
            </form>
          </CCardBody>
        </CCard>
      </CCol>

     
    </CRow>
  )
}

export default AddEditFormEventPromo
