import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
//import CIcon from '@coreui/icons-react'
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

                { details.avatar && <tr><td></td><td className="userimage"><img style={{width:'150px', height:'150px'}} src={details.avatar}/></td></tr>}
                <tr><td>First Name :</td><td><strong>{details.first_name}</strong></td></tr>
                <tr><td>Last Name :</td><td><strong>{details.last_name}</strong></td></tr>                
                <tr><td>Email :</td><td><strong>{details.email}</strong></td></tr>
                {details.about_us && <tr><td>About US :</td><td><strong>{details.about_us}</strong></td></tr>}
                {details.city && <tr><td>City :</td><td><strong>{details.city}</strong></td></tr>}
                {details.organization && <tr><td>Organization :</td><td><strong>{details.organization}</strong></td></tr>}
                {details.sectorname && <tr><td>Sector :</td><td><strong>{details.sectorname}</strong></td></tr>}
                {details.other_sector && <tr><td>Other Sector :</td><td><strong>{details.other_sector}</strong></td></tr>}
                {details.level_of_education && <tr><td>Level Of Education :</td><td><strong>{details.level_of_education}</strong></td></tr>}
                {details.occupationname && <tr><td>Occupation :</td><td><strong>{details.occupationname}</strong></td></tr>}
                {details.other_occupation && <tr><td>Occupation :</td><td><strong>Other; {details.other_occupation}</strong></td></tr>}
                {details.academicdisciplinename && <tr><td>Academic Discipline :</td><td><strong>{details.academicdisciplinename}</strong></td></tr>}
                {details.other_academic_discipline && <tr><td>Academic Discipline :</td><td><strong>Other; {details.other_academic_discipline}</strong></td></tr>}
                {details.rinterestarea && <tr><td>Interest Area :</td><td><strong>{details.rinterestarea}</strong></td></tr>}
                {details.other_research_interest_area && <tr><td>Interest Area :</td><td><strong>Other; {details.other_research_interest_area}</strong></td></tr>}
                {details.pinterestarea && <tr><td>Interest Area :</td><td><strong>{details.pinterestarea}</strong></td></tr>}
                {details.other_professional_interest_area && <tr><td>Interest Area :</td><td><strong>Other; {details.other_professional_interest_area}</strong></td></tr>}              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDetail
