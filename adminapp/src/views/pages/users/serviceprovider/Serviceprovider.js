import React from 'react'
import {
  CCard,    
  CCol,
  CRow,
} from '@coreui/react'
import DemoTable from './DemoTable'
//import { useHistory } from 'react-router-dom'
// import { CSVLink } from "react-csv";
// import axios from "axios";
// import Swal from "sweetalert2";
// import api_url from './../../../Apiurl';

const Serviceprovider = () => {

  // const [csvData, setCsvData] = useState([["Name", "Email", "Phone"]]);

  // React.useEffect(() => {
  //   getNewList();
  // }, [])

  // const getNewList = () => {
  //   axios.post(api_url + '/user/csvuserList', { role: 2 }).then((result) => {
  //     if (result.data.status) {
  //       var usersdatas = result.data.response.data;
  //       setCsvData(usersdatas);
  //     } else {
  //       Swal.fire('Oops...', result.data.response.msg, 'error')
  //     }
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

 // const history = useHistory()
  return (
    <CRow>
      <CCol sm="12">
        <CCard>         
          <DemoTable />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Serviceprovider
