import React, { useState } from 'react'
import { CCard, CButton, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import api_url from '../../Apiurl';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom'

const ResearchDetail = ({ match }) => {
  const history = useHistory()
  const [details, setDetails] = useState({})

  React.useEffect(() => {
    axios.post(api_url + '/researches/getResearchesDetailById', { 'researches_id': match.params.id }).then((result) => {
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
            Research Detail
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>                
                 
                <tr><td>Research Topic :</td><td><strong>{details.topic}</strong></td></tr>


                {/* {details.description && <tr><td>Research Description : </td><td>
                  <div className={details.description && details.description.length > 380 ? "overflow-description" : ""}>
                    {details.description && details.description && <strong dangerouslySetInnerHTML={{ __html: details.description }}></strong>}
                  </div>
                </td></tr>} */}


                <tr><td>Research Description  :</td><td><strong>{details.description}</strong></td></tr> 



                <tr><td>Created By :</td><td><strong>{details.name}</strong></td></tr>
                <tr><td>Created Date :</td><td><strong>{(details.start_date)}</strong></td></tr>
                <tr><td>Status:</td>
                  <td>
                    {details.status == 1 && <strong>Active</strong>}
                    {details.status == 0 && <strong>InActive</strong>}
                  </td>                
                </tr>  
              </tbody>             
            </table>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`/participate-list/` + details.researches_id)}
                    >
                      View Participants
                    </CButton>   </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ResearchDetail
