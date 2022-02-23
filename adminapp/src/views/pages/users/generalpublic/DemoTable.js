import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,
  CButton,
  CDataTable,
  CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CSVLink } from "react-csv";
import DeactiveUser from "../DeactiveUser";

const DemoTable = () => {
  const ref = React.useRef();
  const history = useHistory()
 // const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [csvData, setCsvData] = useState([["S.No","Name", "Email"]]);
  const [filedate, setFiledate] = useState();
  const [modal, setModal] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const headers = [
    { label: "S.No", key: "no" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" }
  ];

  React.useEffect(() => {
    getNewList('');
    getNewListWrap('');
    getCSVNewList('');
    getCSVNewListWrap('');

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let current_date = month + '/' + date + '/' + year;
    setFiledate('General_' + current_date);

  }, [])

  const getCSVNewList = (status) => {
    axios.post(api_url + '/user/csvuserList', { data: { role: 4, status: status } }).then((result) => {
      if (result.data.status) {
        if (result.data.response.data.length > 0){
          var usersdatas = result.data.response.data;
          setCsvData(usersdatas);
        }else{
          setCsvData([]);
        }
      } else {
      //  Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })
  }


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
      var message = '';
      if (status == 1) {
        message = 'Are you sure you want to activate the user ?'
      } else {
        message = 'Are you sure you want to deactivate the user ?'
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
                ref.current.value = "";
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
    
  }

  
  const getNewList = (status) => {
    axios.post(api_url + '/user/userList', { data: { role: 4, status: status } }).then((result) => {
      if (result.data.status) {
        if (result.data.response.data.length > 0) {
          var usersdatas = result.data.response.data;
          setItems(usersdatas);
        } else {
          setItems([]);
        }
      } else {
       // Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const getNewListWrap = (status) => {
    getNewList(status);
  };

  const getCSVNewListWrap = (status) => {
    getCSVNewList(status);
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


  const handleAddrTypeChange = (e) => {

    if (e.target.value == '0') {
      getNewListWrap(e.target.value);
      getCSVNewListWrap(e.target.value);
    } else if (e.target.value == '1') {
      getNewListWrap(e.target.value);
      getCSVNewListWrap(e.target.value);
    } else if (e.target.value == '2') {
      getNewListWrap(e.target.value);
      getCSVNewListWrap(e.target.value);
    } else {
      getNewListWrap('');
      getCSVNewListWrap('');
    }

  }

  return (
    <CCardBody>

      <CCardHeader className="custom-table-header">
        <div className="header-left">
          <CIcon name="cil-grid" /> General Public
                </div>
        <div className="header-right">
          <select ref={ref} onChange={e => handleAddrTypeChange(e)} className="form-control d-inline-block" >
            <option key="0" value="">Select Option</option>
            <option key="3" value="2">Pending</option>
            <option key="1" value="1">Active</option>
            <option key="2" value="0">Inactive</option>
          </select>

          <CSVLink filename={filedate + ".csv"} headers={headers} className="d-inline-block" data={csvData}>Export User</CSVLink> &nbsp;
                      {/* <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => history.push(`/researchersadd`)}
                      >
                        Add
                    </CButton> */}
        </div>
      </CCardHeader>
    

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
            <td className="tooltip-box">
              {item.email_verification_token && item.email_verification_token !== null ? 'Pending' : ''}
              {(item.email_verification_token == null || item.email_verification_token == '') ? item.status === 1 ? (
                <p
                  onClick={() => {
                    setSelectedItem(item);
                    setModal(true);
                    updateItemStatus(
                      item,
                      0,
                      getNewListWrap
                    );
                  }}
                >
                  Active{" "}
                  <span className="tooltip-title">De-activating the user will remove the user from the front end.</span>
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
                    <span className="tooltip-title">Activating the user will add the user back on the front end.</span>
                </p>
              ) : ''}              
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
      <DeactiveUser
        modal={modal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setModal={setModal}
        updateListing={getNewListWrap}
      />

    </CCardBody>
    
  )
}

export default DemoTable
