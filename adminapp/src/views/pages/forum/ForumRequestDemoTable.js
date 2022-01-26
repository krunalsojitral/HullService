import React, { useState } from 'react'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import UserRequest from "./UserRequest";

import {
  CCardHeader,
  CCardBody,    
  CDataTable,
  CBadge,
  CButton
} from '@coreui/react'


const ForumRequestDemoTable = ({ moduleConfigUrls }) => {
  
  const [items, setItems] = useState([])
  const [modal, setModal] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true)

  React.useEffect(() => {
    getNewList(moduleConfigUrls, setItems);
    getNewListWrap();
  }, [])

  const fields = [
    { key: 'checkbox', label: '', _style: { width: '1%' }, filter: false },
    { key: 'question', _style: { width: '20%'} },
    { key: 'topic', _style: { width: '20%' } },
    { key: 'created_on', _style: { width: '20%' } },
    { key: 'created_by', _style: { width: '20%' } },    
    { key: 'user_status', _style: { width: '20%' }, filter: false },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]
  
  const getNewList = () => { 
    axios.get(api_url + '/forum/forumRequestList', {}).then((result) => {
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

  const getNewListWrap = () => {
    getNewList(setItems);
  };

  const getBadge = (status)=>{
      if (status == 1){
        return 'success'
      } else if (status == 2) { 
        return 'danger'
      } else if (status == 0) {
        return 'warning'
      }
  }

  const handleOnChange = (e) => {
    const index = e.target.name
    let itemlist = [...items];
    itemlist[index].isChecked = e.target.checked;
    setItems(itemlist);

    const filteredThatArray = items.filter((item) => item.isChecked == true)
    if (filteredThatArray.length > 0) {
      setDeleteButtonDisable('');
    } else {
      setDeleteButtonDisable(true);
    }

  };

  const deleteItem = (e) => {
    const filteredThatArray = items.filter((item) => item.isChecked == true).map(item => {
      const container = {};
      container['forum_id'] = item.forum_id;
      return container;
    });

    if (filteredThatArray.length > 0) {

      Swal.fire({
        //title: 'warning!',
        icon: 'warning',
        text: 'Are you sure you want to delete the selected threads request ?',
        confirmButtonText: `Yes`,
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#e57979',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(api_url + '/forum/deleteMultipleForum', { forum: filteredThatArray }).then((result) => {
            if (result.data.status) {
              getNewListWrap('');
              Swal.fire('Success', result.data.response.msg, 'success')
            } else {
              Swal.fire('Oops...', result.data.response.msg, 'error')
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      });

    } else {
      Swal.fire('Oops...', 'Please select forum request', 'error')
    }
  }

  return (
    <div className="card">
      <CCardHeader className="custom-table-header">
        <div>
          &nbsp;&nbsp; Threads Request
        </div>

        <div>
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            disabled={deleteButtonDisable}
            onClick={() => deleteItem()}
            className="d-inline-block"
          > Delete
            </CButton>
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
        scopedSlots = {{    
          checkbox: (item, index) => (
            <td>
              <input
                key={index}
                name={index}
                type="checkbox"
                checked={item.isChecked}
                onChange={handleOnChange}
              />
            </td>
          ),
          user_status: (item) => (
            <td>
              {item.user_status === 1 && <CBadge color={getBadge(item.user_status)}>Approved</CBadge> }
              {item.user_status === 2 && <CBadge color={getBadge(item.user_status)}>Rejected</CBadge>}
              {item.user_status === 0 && <CBadge color={getBadge(item.user_status)}>Pending</CBadge>}              
            </td>
          ),
          'show_details':
            item => {
              return (
                <td className="py-2">                  
                  {item.user_status === 0 && 
                  <CBadge
                    color={getBadge(item.user_status)}
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item);
                      setModal(true);
                    }}
                    className="mr-1"
                  > View
                  </CBadge>
                  }
                </td>
              )
            },
          // 'details':
          //     item => {
          //       return (
          //       <CCollapse show={details.includes(item.id)}>
          //         <CCardBody>
          //           <h4>
          //             {item.username}
          //           </h4>
          //             <p className="text-muted">User since: {item.created_at}</p>
          //           <CButton size="sm" color="info">
          //             User Settings
          //           </CButton>
          //           <CButton size="sm" color="danger" className="ml-1">
          //             Delete
          //           </CButton>
          //         </CCardBody>
          //       </CCollapse>
          //     )
          //   }
        }}
      />
    </CCardBody>
      <UserRequest
        modal={modal}        
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setModal={setModal}                
        updateListing={getNewListWrap}
      />
    </div>
  )
}

export default ForumRequestDemoTable
