import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,
  CBadge,
  CCardHeader,
  CButton,
  CCollapse,
  CDataTable
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CSVLink, CSVDownload } from "react-csv";


const FutureParticipantsDemoTable = () => {

  const history = useHistory()
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [csvData, setCsvData] = useState([["S.No","Name", "Email", "DOB", "No of Kids", "Age of kids"]]);

  React.useEffect(() => {
    getNewList();
    getNewListWrap();
    getCSVList();
  }, [])

  const headers = [
    { label: "S.No", key: "S.No" },
    { label: "Name", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "DOB", key: "DOB" },
    { label: "No of Kids", key: "No_of_Kids" },
    { label: "Age of kids", key: "Age_of_kids" }
  ];

  const getCSVList = () => {
    axios.get(api_url + '/researches/getCSVFutureResearchList').then((result) => {
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

  const fields = [
    { key: 'name', _style: { width: '20%'} },
    { key: 'dob', _style: { width: '20%' } },
    { key: 'email', _style: { width: '20%' } },    
    { key: 'no_of_kids', _style: { width: '20%' } },
    { key: 'age_of_kids', _style: { width: '20%' } },
    // {
    //   key: 'show_details',
    //   label: '',
    //   _style: { width: '1%' },
    //   filter: false
    // }
  ]

  const getNewList = () => {
    axios.get(api_url + '/researches/getFutureResearchList').then((result) => {
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
    <div className="card">
      <CCardBody>

        <CCardHeader className="custom-table-header">
          <div className="header-left">
            <CIcon name="cil-grid" /> Future Participants
            </div>
          <div className="header-right">
            <CSVLink headers={headers} data={csvData}>Download</CSVLink> &nbsp;
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
          scopedSlots={{                     
            'show_details':
              item => {
                return (
                  <td className="py-2">
                    <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                      onClick={() => history.push(`/futureresearchdetail/${item.future_research_id}`)}
                  >
                    View
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
    </div>    
  )
}

export default FutureParticipantsDemoTable
