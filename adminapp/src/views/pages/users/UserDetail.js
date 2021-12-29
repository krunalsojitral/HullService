import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import api_url from '../../Apiurl';
import Swal from "sweetalert2";

const UserDetail = ({ match }) => {

  const [details, setDetails] = useState({})

  React.useEffect(() => {
    axios.post(api_url + '/user/getAdminUserById', { 'user_id': match.params.id }).then((result) => {
      if (result.data.status) {
        var usersData = result.data.response.data;
        setDetails(usersData);
      } else {
        Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
      //Swal.fire('Oops...', err, 'error')
    })
  }, [])
  
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            User Detail
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>                
                 
                <tr><td>First Name :</td><td><strong>{details.first_name}</strong></td></tr>
                <tr><td>Last Name :</td><td><strong>{details.last_name}</strong></td></tr>                
                <tr><td>Email :</td><td><strong>{details.email}</strong></td></tr>
                <tr><td>City :</td><td><strong>{details.city}</strong></td></tr>
                {details.sectorname && <tr><td>Sector :</td><td><strong>{details.sectorname}</strong></td></tr>}
                {details.occupationname && <tr><td>Occupation :</td><td><strong>{details.occupationname}</strong></td></tr>}
                {details.academicdisciplinename && <tr><td>Academic Discipline :</td><td><strong>{details.academicdisciplinename}</strong></td></tr>}
                {details.rinterestarea && <tr><td>Interest Area :</td><td><strong>{details.rinterestarea}</strong></td></tr>}
                {details.pinterestarea && <tr><td>Interest Area :</td><td><strong>{details.pinterestarea}</strong></td></tr>}

              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDetail
