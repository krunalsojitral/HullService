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

const DemoTable = () => {

  const history = useHistory() 
  const [items, setItems] = useState([])
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true)
  const ref = React.useRef();
  const [filterstatus, setFilterStatus] = React.useState('');

  React.useEffect(() => {
    getNewList();
  }, [])

  const fields = [
    { key: 'email', _style: { width: '20%' } },
    { key: 'created_at', _style: { width: '20%' }, filter: false }
  ] 
  
  
  const getNewList = (status) => {
    axios.get(api_url + '/user/userSubscribeList').then((result) => {
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
          <CIcon name="cil-grid" /> Subsciber User
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
          // loading
          // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
          // onPageChange={(val) => console.log('new page:', val)}
          // onPagesChange={(val) => console.log('new pages:', val)}
          // onPaginationChange={(val) => console.log('new pagination:', val)}
          // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
          // onSorterValueChange={(val) => console.log('new sorter value:', val)}
          // onTableFilterChange={(val) => console.log('new table filter:', val)}
          // onColumnFilterChange={(val) => console.log('new column filter:', val)}
          
        />
      </CCardBody>
    </div>
    
  )
}

export default DemoTable
