import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,  
  CButton,  
  CDataTable,
  CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ContactUs = () => {

  const history = useHistory() 
  const [items, setItems] = useState([])
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true)
  const ref = React.useRef();
  const [filterstatus, setFilterStatus] = React.useState('');

  React.useEffect(() => {
    getNewList();
  }, [])

  const fields = [    
    { key: 'first_name', _style: { width: '20%'} },
    { key: 'last_name', _style: { width: '20%'} },
    { key: 'phone', _style: { width: '20%'} },
    { key: 'email', _style: { width: '20%'} },
    { key: 'description', _style: { width: '20%'} },
    { key: 'created_at', _style: { width: '20%' }, filter: false }
  ] 
  
  
  const getNewList = (status) => {
    axios.get(api_url + '/user/contactUsList').then((result) => {
      if (result.data.status) {
        var usersdatas = result.data.response.data;
        setItems(usersdatas);
      } else {
        Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  

  return (

    <div>
      <CCardHeader className="custom-table-header">
        <div>
          <CIcon name="cil-grid" /> Contact Us
        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={items}
          fields={fields}
          columnFilter
          tableFilter={{ 'placeholder': 'Type something...' }}
          cleaner
          itemsPerPageSelect
          itemsPerPage={10}
          hover
          sorter
          pagination          
        />
      </CCardBody>
    </div>
    
  )
}

export default ContactUs;
