import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
//import CIcon from '@coreui/icons-react'
import axios from 'axios';
import api_url from '../../Apiurl';
import Swal from "sweetalert2";

const UserDetail = ({ match }) => {

  const [details, setDetails] = useState({})
  const [userId, setUserId] = useState()
  const [loader, setLoader] = useState(0)
  

  React.useEffect(() => {

    setUserId(match.params.id);

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

  const userStatusAction = (action) => { 
    var obj = { 'user_id': match.params.id, 'status': action };
    if (action == 1) {
      var message = 'Are you sure you want to approve the user ?'
    } else {
      var message = 'Are you sure you want to reject the user ?'
    }


    Swal.fire({
      //title: 'warning!',
      icon: 'warning',
      text: message,
      confirmButtonText: `Yes`,
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#e57979',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(1)
        axios.post(api_url + '/user/userStatusAction', obj).then((result) => {
          setLoader(0)
          if (result.data.status) {
            Swal.fire("Success!", result.data.response.msg, "success");
          } else {
            Swal.fire('Oops...', result.data.response.msg, 'error');
          }
        }).catch((err) => {
          console.log(err);
          //Swal.fire('Oops...', err, 'error')
        })
      }
    });

   
  }
  
  const changeuserStatusClick = (action) => {  
    var obj = {
      id: userId,
      status: 1,
    };
    axios.post(api_url + "/user/changeuserStatus", obj)
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", "This user is become a researcher successfully.", "success");
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
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
                <tr><td>Phone :</td><td>{details.phone && <strong>{details.phone}</strong>}</td></tr>
                {/* {details.joined_date && <tr><td>Joined on :</td><td><strong>{details.joined_date}</strong></td></tr>}
                {details.renewal_date && <tr><td>Renewal Date :</td><td><strong>{details.renewal_date}</strong></td></tr>} */}                
                {details.city && <tr><td>City :</td><td><strong>{details.city}</strong></td></tr>}
                {details.organization && <tr><td>Organization :</td><td><strong>{details.organization}</strong></td></tr>}
                {details.sectorname && <tr><td>Sector :</td><td><strong>{details.sectorname}</strong></td></tr>}
                {details.other_sector && <tr><td>Other Sector :</td><td><strong>{details.other_sector}</strong></td></tr>}
                {details.level_of_education && <tr><td>Level Of Education :</td><td><strong>{details.level_of_education}</strong></td></tr>}
                {details.occupationname && <tr><td>Occupation :</td><td><strong>{details.occupationname}</strong></td></tr>}
                {details.other_occupation && <tr><td>Occupation :</td><td><strong>Other; {details.other_occupation}</strong></td></tr>}
                {(details.academicdisciplinename || details.other_academic_discipline) && <tr><td>Academic Discipline :</td><td><strong>{details.academicdisciplinename}</strong>{details.other_academic_discipline && <span>,&nbsp;</span>}  {details.other_academic_discipline && <strong>Other; {details.other_academic_discipline}</strong>} </td></tr>}
                {(details.role == 3 && (details.pinterestarea || details.other_research_interest_area)) && <tr><td>Interest Area :</td><td><strong>{details.pinterestarea}</strong> {details.other_research_interest_area && <span>,&nbsp;</span>} {details.other_research_interest_area && <strong>Other; {details.other_research_interest_area}</strong>}</td></tr>}
                {(details.role == 2 && (details.pinterestarea || details.other_professional_interest_area)) && <tr><td>Interest Area :</td><td><strong>{details.pinterestarea}</strong> {details.other_professional_interest_area && <span>,&nbsp;</span>} {details.other_professional_interest_area && <strong>Other; {details.other_professional_interest_area}</strong>} </td></tr>}
                {details.role == 3 && <tr><td>About Us :</td><td>{details.about_us && <strong dangerouslySetInnerHTML={{ __html: details.about_us }}></strong>}</td></tr>}
                {details.role == 3 && <tr><td>Research description :</td><td>{details.research_description && <strong dangerouslySetInnerHTML={{ __html: details.research_description }}></strong>}</td></tr>}

                </tbody>
            </table>
            <table className="table">
              <tbody>
                {(details.email_verification_token && details.email_verification_token !== null && details.status == 0) &&
                  <tr>
                    <td>
                    <button onClick={() => userStatusAction(1)} style={{ cursor: "pointer" }} className="badge badge-warning">
                      {loader == 1 && <span className="spinner-border spinner-border-sm"></span>}
                                        Approve</button>
                    </td>
                  </tr>}
                {(!details.email_verification_token && details.status == 0) &&
                  <tr>
                    <td>
                      <button onClick={() => changeuserStatusClick()} style={{ cursor: "pointer" }} className="badge badge-warning">
                        {loader == 1 && <span className="spinner-border spinner-border-sm"></span>}
                        Approve</button>
                    </td>
                  </tr>}

              </tbody>
            </table>
           

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDetail
