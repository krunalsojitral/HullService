import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import api_url from './../Apiurl';
import Swal from "sweetalert2";


const ArticalDetail = ({ match }) => {

  const [details, setDetails] = useState({})

  React.useEffect(() => {


    axios.post(api_url + '/user/getadminuserData', { 'id' : match.params.id}).then((result) => {
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
            User : {details.firstname} {details.lastname}
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {details.avatar && <tr><td><img style={{'width':'100px'}} src={details.avatar} alt="avatar"/></td></tr>}
                <tr><td>First Name</td><td><strong>{details.firstname}</strong></td></tr>
                <tr><td>Last Name</td><td><strong>{details.lastname}</strong></td></tr>
                <tr><td>Phone</td><td><strong>{details.phone}</strong></td></tr>
                <tr><td>Email</td><td><strong>{details.email}</strong></td></tr>
                <tr><td>Linkedln profile</td><td><strong>{details.linkedln_profile}</strong></td></tr>
                {details.resume && <tr><td>Resume</td><td><strong> <a target="_blank" download href={details.resume}> Resume </a></strong></td></tr>}
                <tr><td>Location</td><td><strong>{details.city}</strong></td></tr>
                <tr><td>Certification</td><td><strong>{details.certification}</strong></td></tr>
                <tr><td>Education</td><td><strong>{details.education}</strong></td></tr>
                <tr><td>Employment</td><td><strong>{details.employment}</strong></td></tr>
                <tr><td>Total experience</td><td><strong>{details.experience}</strong></td></tr>
                <tr><td>Experience industry</td><td><strong>{details.experience_industry}</strong></td></tr>
                <tr><td>Interest role</td><td><strong>{details.interest_role}</strong></td></tr>                
                <tr><td>Notice Period</td><td><strong>{details.notice_period}</strong></td></tr>
                <tr><td>Hourly Rate</td><td><strong>{details.hourly_rate}</strong></td></tr>
                {details.skill && details.skill.length > 0 && <tr><td>Skill</td><td><strong>
                  {details.skill.map(data => (<span>{data.skill_name} , </span>)) }
                  </strong></td></tr>}
                <tr><td>Description of experience</td><td><strong>{details.description_of_experience}</strong></td></tr>
                <tr><td>Description of mentoringterms</td><td><strong>{details.description_of_mentoringterms}</strong></td></tr>
                <tr><td>Description of motivation</td><td><strong>{details.description_of_motivation}</strong></td></tr>

              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ArticalDetail
