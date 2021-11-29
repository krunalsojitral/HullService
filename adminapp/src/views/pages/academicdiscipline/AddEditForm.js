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
 

 

  React.useEffect(() => {   

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/academicdiscipline/getacademicdisciplineDataById", { academicdiscipline_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            console.log(usersdata);
            setValue("academicdiscipline_name", usersdata.academicdiscipline_name);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.academicdiscipline_id = match.params.id;
    axios.post(api_url + "/academicdiscipline/updateacademicdisciplineByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/academic-discipline");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {    
    axios.post(api_url + "/academicdiscipline/addacademicdisciplineByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/academic-discipline");
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
                    <CLabel htmlFor="Name">Academic Discipline <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"academicdiscipline_name"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="academicdiscipline_name"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your academic discipline name`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.academicdiscipline_name && errors.academicdiscipline_name.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>academicdiscipline name is required.</p>
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
