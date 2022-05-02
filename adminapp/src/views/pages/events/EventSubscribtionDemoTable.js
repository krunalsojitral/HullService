import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../Apiurl';
import {
  CCardBody,  
  CButton,  
  CDataTable
} from '@coreui/react'

import PurchaseDetail from "./PurchaseDetail";


const EventSubscribtionDemoTable = (eventid) => {
  
  
  const history = useHistory()
  const [getEventId, setGetEventId] = useState()
  const [items, setItems] = useState([])
  const [modal, setModal] = useState();

  React.useEffect(() => {   
    setGetEventId(eventid)
    getNewList(eventid);
  }, [eventid])
  



  const fields = [
    { key: 'S.No', _style: { width: '20%' } },   
    { key: 'Name', _style: { width: '20%'} },   
    { key: 'Email', _style: { width: '20%' } },
    { key: 'Event Registration', _style: { width: '20%' } },
    { key: 'Sessions Registration', _style: { width: '20%' } },
    { key: 'Member', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]

  const getNewList = (eventid) => {
    axios.post(api_url + '/event/getUserPurchaseEventList', { event_id: eventid.eventid }).then((result) => {
      if (result.data.status) {
        var usersdatas = result.data.response.data;
        setItems(usersdatas);
      } else {
       // Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })
  }
 

  return (

    <div>
     
      <CCardBody>
        <CDataTable
          items={items}
          fields={fields}
          columnFilter
          tableFilter
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
          scopedSlots={{
            'S.No': (item) => (
              <td> {item.s_no} </td>
            ),
            'Name': (item) => (
              <td> {item.name} </td>
            ),
            'Email': (item) => (
              <td> {item.email} </td>
            ),
            'Event Registration': (item) => (
              <td> {item.event_registration} </td>
            ),
            'Sessions Registration': (item) => (
              <td> {item.session_registration} </td>
            ),
            'Member': (item) => (
              <td> {item.member} </td>
            ),
            'show_details':
              item => {
                return (
                  <td className="py-2">

                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      className="mr-1"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      View
                    </CButton>
                  </td>
                )
              }
          }}
        />
      </CCardBody>

      <PurchaseDetail
        modal={modal}
        setModal={setModal}
        items={items}
        setItems={setItems}
      />


    </div>
    
  )
}

export default EventSubscribtionDemoTable
