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
} from '@coreui/react'
import '../TextEditors.scss'
import { useForm, Controller } from "react-hook-form";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";


const Membershipfees = ({ match }) => {
  
  const {
    handleSubmit,
    setValue,
    control,    
    formState: { errors },
  } = useForm();

  React.useEffect(() => { 
    
    axios.get(api_url + "/common/getMembershipFees", {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;   
            setValue("membership_fees", usersdata[0].membership_fees);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
  }, []);

  const updateInformationAct = (data) => {    
    
    axios.post(api_url + "/common/updateMembershipFees", data, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");        
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


            <form onSubmit={handleSubmit(updateInformationAct)}>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="title">Membership Fees <span className="label-validation">*</span></CLabel>
                    <Controller
                      name={"membership_fees"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <CInput
                          type="number"
                          min="1"
                          onChange={onChange}
                          value={value}
                          required
                          placeholder={`Enter your membership fees`}
                        />
                      )}
                    ></Controller>
                  </CFormGroup>
                  {errors.membership_fees && errors.membership_fees.type === "required" && (
                    <p style={{ color: "red", fontSize: "12px" }}>Membership fees is required.</p>
                  )}
                </CCol>
              </CRow>

              <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> Update </button>

            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Membershipfees
