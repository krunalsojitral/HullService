import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import api_url from '../../Apiurl';
import Swal from "sweetalert2";


const FutureParticipateDetail = ({ match }) => {

  const [details, setDetails] = useState({})

  React.useEffect(() => {
    axios.post(api_url + '/researches/getFutureParticipateById', { 'future_research_id': match.params.id }).then((result) => {
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
            Future Participate Detail
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>                
                 
                <tr><td>Name :</td><td><strong>{details.name}</strong></td></tr>
                <tr><td>Email :</td><td><strong>{details.email}</strong></td></tr>
                <tr><td>DOB :</td><td><strong>{details.dob}</strong></td></tr>
                <tr><td>No of Kids :</td><td><strong>{(details.child && details.child.length > 0) ? details.child.length :0}</strong></td></tr>                
                <tr><td>Age of kids:</td>
                </tr>
                
                {details.child && details.child.length > 0 && details.child.map((item, index) => (
                  <tr> <td>Child {index + 1}  :</td> <td>  {item.child_dob}</td></tr>
                ))}                               

              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FutureParticipateDetail
