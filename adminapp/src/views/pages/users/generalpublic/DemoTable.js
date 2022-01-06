import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../../Apiurl';
import Swal from "sweetalert2";

import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable
} from '@coreui/react'


const DemoTable = () => {

  const history = useHistory()
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])

  React.useEffect(() => {
    getNewList();
    getNewListWrap();
  }, [])

 

  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'email', _style: { width: '20%' } },
    { key: 'joining_date', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]
  

  const updateItemStatus = (item, status) => {

    if (status == 1) {
      var message = 'Are you sure you want to activate the user ?'
    } else {
      var message = 'Are you sure you want to deactivate the user ?'
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
        var obj = {
          id: item.id,
          status: status,
        };
        axios.post(api_url + "/user/changeuserStatus", obj)
          .then((result) => {
            if (result.data.status) {
              getNewListWrap();
            } else {
              Swal.fire("Oops...", result.data.response.msg, "error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  
  const getNewList = () => { 
    axios.post(api_url + '/user/userList', { role : 4 }).then((result) => {
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
    switch (status) {
      case '2': return 'Service Provider'
      case '3': return 'Researchers'
      case '4': return 'General Public'
      case 'all': return 'All'
      default: return 'Service Provider'
    }
  }

  return (
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
        scopedSlots = {{
          status: (item) => (
            <td class="tooltip-box">
              {item.status === 1 ? (
                <a
                  href
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    updateItemStatus(
                      item,
                      0,
                      getNewListWrap
                    );
                  }}
                >
                  Active{" "}
                  <span class="tooltip-title">De-activating the user will remove the user from the front end.</span>
                </a>
              ) : (
                <a
                  href
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    updateItemStatus(
                      item,
                      1,
                      getNewListWrap
                    );
                  }}
                >
                    Inactive
                    <span class="tooltip-title">Activating the user will add the user back on the front end.</span>
                </a>
              )}
              {/* <CBadge color={getBadge(item.status)}>{item.status}</CBadge> */}
            </td>
          ),
          'role':
            (item) => (
              <td>
                {getBadge(item.role)}
              </td>
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
                    onClick={() => history.push(`/userdetail/${item.id}`)}
                  >
                    View
                  </CButton>

                  {/* <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => history.push(`/generalpublicedit/${item.id}`)}
                    className="mr-1"
                  > Edit
                  </CButton> */}

                </td>
              )
            },
          'details':
              item => {
                return (
                <CCollapse show={details.includes(item.id)}>
                  <CCardBody>
                    <h4>
                      {item.username}
                    </h4>
                      <p className="text-muted">User since: {item.created_at}</p>
                    <CButton size="sm" color="info">
                      User Settings
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1">
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              )
            }
        }}
      />
    </CCardBody>
  )
}

export default DemoTable
