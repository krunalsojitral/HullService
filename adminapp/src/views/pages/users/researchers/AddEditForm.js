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
import api_url from './../../../Apiurl';
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
      axios.post(api_url + "/user/getuserData", { user_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setValue("name", usersdata.name);
            setValue("email", usersdata.email);
            setValue("password", usersdata.password);
            setValue("phone", usersdata.phone);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.user_id = match.params.id;
    axios.post(api_url + "/user/updateuserByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/researchers");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {
    data.role = 3
    axios.post(api_url + "/user/adduserByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/researchers");
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
                    <CLabel htmlFor="title">First Name <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"first_name"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your first name`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.first_name && errors.first_name.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>First name is required.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Last Name <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"last_name"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your last name`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.last_name && errors.last_name.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Last name is required.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Email <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"email"}
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="email"
                          onChange={onChange}
                          disabled={(isEditMode === 1) ? true : false}
                          value={value}
                          placeholder={`Enter your email`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.email && errors.email.type === "required" && (<p style={{ color: "red", fontSize: "12px" }}>Email is required.</p>)}
                  {errors.email && errors.email.type === "pattern" && (<p style={{ color: "red", fontSize: "12px" }}>Email is invalid.</p>)}
                </CCol>
              </CRow>

              {(isEditMode !== 1) &&
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Password<span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"password"}
                      control={control}
                      rules={{
                        required: true,
                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/ },
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        }
                      }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="password"
                          onChange={onChange}
                          disabled={(isEditMode === 1) ? true : false}
                          value={value}
                          placeholder={`Enter your password`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {(errors.password?.type === "required" && <p style={{ color: "red", fontSize: "12px" }}>Password is required</p>)}
                  {(errors.password?.type === "minLength" && <p style={{ color: "red", fontSize: "12px" }}>Password is at least 8 characters </p>)}
                  {(errors.password?.type === "pattern" && <p style={{ color: "red", fontSize: "12px" }}>Please enter at least 8 characters, 1 numeric, 1 lowercase letter, 1 uppercase letter and 1 special character.</p>)}
                </CCol>
              </CRow>}             

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Phone <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"phone"}
                      control={control}
                      rules={{
                        required: true,
                        pattern: { value: /^[0-9\b]+$/ },
                        minLength: {
                          value: 10,
                          message: "Phone number should be 10 digit.",
                        }
                      }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="phone"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your phone`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.phone && errors.phone.type === "required" && (<p style={{ color: "red", fontSize: "12px" }}>Phone is required.</p>)}
                  {(errors.phone?.type === "minLength" && <p style={{ color: "red", fontSize: "12px" }}>Phone is at least 10 characters. </p>)}
                  {(errors.phone?.type === "pattern" && <p style={{ color: "red", fontSize: "12px" }}>Phone must be only numeric.</p>)}
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
