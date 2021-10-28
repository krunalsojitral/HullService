import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import {
  CButton,
  CCard,
  CCardBody,  
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import api_url from "./../../Apiurl";
import LoadSpinner from './../../LoadSpinner/LoadSpinner';

export default function Login() {

  const [isFirstRadioLoaded, setIsFirstRadioLoaded] = useState(false);
  let history = useHistory();
     
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    var obj = {
      email: data.email,
      password: data.password
    }
    
    setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
    axios.post(api_url + '/user/login', obj)
      .then(response => {
        var res = response.data;
        if (res.status) {
          localStorage.setItem('token', JSON.stringify(res));
          setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
          history.push({ pathname: '/dashboard', state: { some: 'state' } })
        } else {
          setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
          Swal.fire('Oops...', res.message, 'error');
        }
      })
      .catch(function (error) {
        Swal.fire('Oops...', error, 'error');
      });

  }

  return (
    <div>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>

          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <section className="login-sighup-section">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <h2>Login</h2>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-sighup-card">
                              <div className="form-group">
                                <label>Email</label>
                                <input type="text" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} className="form-control" placeholder="Enter Email Id" />
                                {errors?.email?.type === "required" && <small className="error">This field is required</small>}
                                {errors?.email?.type === "pattern" && (<small className="error">Invalid email address</small>)}
                              </div>
                              <div className="form-group">
                                <label>Password</label>
                                <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Enter Password" />
                                {errors?.password?.type === "required" && <small className="error">This field is required</small>}
                              </div>
                              <CButton color="info" type="submit" className="btn-login">Login</CButton>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>

    </div>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }