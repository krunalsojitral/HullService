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
      axios.post(api_url + "/user/getuserData", { user_id: match.params.id })
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
          history.push("/serviceprovider");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });

  };


  const addInformationAct = (data) => {
    data.role = 4
    axios.post(api_url + "/user/adduserByadmin", data, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          history.push("/serviceprovider");
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
                    <CLabel htmlFor="title">Name <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"name"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="name"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your name`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.name && errors.name.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Name is required.</p>
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
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="email"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your email`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.email && errors.email.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Email is required.</p>
                  )}
                </CCol>
              </CRow>


              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Password <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"password"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="password"
                          onChange={onChange}
                          value={value}
                          placeholder={`Enter your password`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.password && errors.password.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>password is required.</p>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Phone <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"phone"}
                      control={control}
                      rules={{ required: true }}
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
                  {errors.phone && errors.phone.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Phone is required.</p>
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
