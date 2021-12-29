import React, { useState } from 'react'

import {  
  CCard,  
  CCardBody,
  CCol,
  CCardHeader, 
  CLabel,
  CRow,
} from '@coreui/react'

import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";

const ForumView = ({ match }) => {

  const [details, setDetails] = useState({})

  React.useEffect(() => {        
    

    if (match.params.id) {      
      axios.post(api_url + "/forum/getforumViewDataById", { forum_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            setDetails(usersdata);
            
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

 

 

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            Forum : {details.title} 
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>                
                <tr><td>Topic</td><td><strong>{details.heading}</strong></td></tr>
                <tr><td>Thread title</td><td><strong>{details.question}</strong></td></tr>
                <tr><td>Thread description</td><td><strong>{details.description}</strong></td></tr>                                
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ForumView
