import React, { useState} from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DemoTable from './DemoTable'
import { useHistory } from 'react-router-dom'
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import Swal from "sweetalert2";
import api_url from './../../../Apiurl';

const Generalpublic = () => {

  const [csvData, setCsvData] = useState([["Name", "Email", "Phone"]]);

  React.useEffect(() => {
    getNewList();
  }, [])

  const getNewList = () => {
    axios.post(api_url + '/user/csvuserList', { role: 4 }).then((result) => {
      if (result.data.status) {
        var usersdatas = result.data.response.data;
        setCsvData(usersdatas);        
      } else {
        Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })
  }


  const history = useHistory()
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader className="custom-table-header">

            <div className="header-left">
              <CIcon name="cil-grid" /> General Public
            </div>
            <div className="header-right">
              <CSVLink data={csvData}>Export User</CSVLink> &nbsp;
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => history.push(`/generalpublicadd`)}
              >
                Add
            </CButton>
            </div>           
          </CCardHeader>
          <DemoTable />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Generalpublic
