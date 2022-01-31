import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import UserRequest from "./UserRequest";

import {
  CCardBody,  
  CButton,
  CCollapse,
  CDataTable,
  CBadge,
  CCardHeader
} from '@coreui/react'


const DemoTable = ({ moduleConfigUrls }) => {

  const history = useHistory()
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [modal, setModal] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true)
  const ref = React.useRef();

  React.useEffect(() => {
    getNewList('');
    getNewListWrap('');
  }, [])

  const fields = [
    { key: 'checkbox', label: '', _style: { width: '1%' }, filter: false },
    { key: 'question', _style: { width: '20%'} },
    { key: 'topic', _style: { width: '20%' } },
    { key: 'created_by', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' }, filter: false },
    { key: 'retire', _style: { width: '20%' }, filter: false },
   // { key: 'user_status', _style: { width: '20%' } },    
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]
  

  const updateItemStatus = (item, status) => {
    if (status == 1) {
      var message = 'Are you sure you want to activate a Forum ?'
    } else {
      var message = 'Are you sure you want to deactivate a Forum ?'
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
          forum_id: item.forum_id,
          status: status,
        };
        axios.post(api_url + "/forum/changeforumStatus", obj)
          .then((result) => {
            if (result.data.status) {
              getNewListWrap('');
            } else {
              Swal.fire("Oops...", result.data.response.msg, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            //Swal.fire('Oops...', err, 'error')
          });
      }
    });
  }

  const updateItemRetire = (item, status) => {
    var message = '';
    if (status == 1) {
      message = 'Are you sure you want to Retire this forum ?'
    } else {
      message = 'Are you sure you want to Unretire this Forum ?'
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
          forum_id: item.forum_id,
          retire: status,
        };
        axios.post(api_url + "/forum/changeforumRetireStatus", obj)
          .then((result) => {
            if (result.data.status) {
              getNewListWrap('');
            } else {
              Swal.fire("Oops...", result.data.response.msg, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            //Swal.fire('Oops...', err, 'error')
          });
      }
    });
  }
  
  const getNewList = (status) => {
    axios.get(api_url + '/forum/forumList?status=' + status, {}).then((result) => {
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

  const getNewListWrap = (status) => {
    getNewList(status);
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

  const handleAddrTypeChange = (e) => {
    if (e.target.value == '0') {
      getNewListWrap(e.target.value);
    } else if (e.target.value == '1') {
      getNewListWrap(e.target.value);
    } else {
      getNewListWrap('');
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
        text: 'Are you sure you want to delete the selected threads ?',
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
      Swal.fire('Oops...', 'Please select forum', 'error')
    }
  }

  return (
    <div>
      <CCardHeader className="custom-table-header">
        <div>
          &nbsp;&nbsp; Threads
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

          <select ref={ref} onChange={e => handleAddrTypeChange(e)} className="form-control d-inline-block" >
            <option key="0" value="">Select Option</option>
            <option key="1" value="1">Active</option>
            <option key="2" value="0">Inactive</option>
          </select>

          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            className="d-inline-block"
            onClick={() => history.push(`/forumadd`)}
          >Add</CButton>
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
            status: (item) => (
              <td className="tooltip-box">
                {item.status === 1 ? (
                  <p
                    onClick={() => {
                      updateItemStatus(
                        item,
                        0,
                        getNewListWrap
                      );
                    }}
                  >
                    Active
                    <span className="tooltip-title">De-activating the forum will remove the forum from the front end.</span>
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      updateItemStatus(
                        item,
                        1,
                        getNewListWrap
                      );
                    }}
                  >
                      Inactive
                      <span className="tooltip-title">Activating the forum will add  the forum back on the front end.</span>
                  </p>
                )
                }
                {/* <CBadge color={getBadge(item.status)}>{item.status}</CBadge> */}
              </td>
            ),    
            retire: (item) => (
              <td className="tooltip-box">
                {item.retire === 1 ? (                
                  <p
                    onClick={() => {
                      updateItemRetire(
                        item,
                        0,
                        getNewListWrap
                      );
                    }}
                  >
                    <CBadge color={getBadge(2)}>Retired</CBadge>
                    <span className="tooltip-title">Un-Retiring will un-lock the thread on the Front End and  new Comments can be added.</span>
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      updateItemRetire(
                        item,
                        1,
                        getNewListWrap
                      );
                    }}
                  >
                      <CBadge color={getBadge(0)}>Retire</CBadge>
                      <span className="tooltip-title">Hitting Retire will lock the thread on the Front End and no Comments can be added.</span>
                  </p>
                )
                }
                {/* <CBadge color={getBadge(item.status)}>{item.status}</CBadge> */}
              </td>
            ),
            // user_status: (item) => (
            //   <td>
            //     {item.user_status === 1 && <CBadge color={getBadge(item.user_status)}>Approved</CBadge> }
            //     {item.user_status === 2 && <CBadge color={getBadge(item.user_status)}>Rejected</CBadge>}
            //     {item.user_status === 0 &&
            //       <CBadge
            //       color={getBadge(item.user_status)}
            //         color="primary"
            //         variant="outline"
            //         shape="square"
            //         size="sm"
            //         onClick={() => {
            //           setSelectedItem(item);
            //           setModal(true);
            //         }}
            //         className="mr-1"
            //       >
            //       Pending
            //         </CBadge>}
                
            //   </td>
            // ),
            'show_details':
              item => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`/forumcomment/${item.forum_id}`)}
                    >
                      Comment
                    </CButton>

                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`/forumedit/${item.forum_id}`)}
                      className="mr-1"
                    > Edit
                    </CButton>

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

export default DemoTable
