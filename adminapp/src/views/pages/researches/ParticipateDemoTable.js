import React, { useState } from 'react'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,  
  CCardHeader,    
  CDataTable,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CSVLink, CSVDownload } from "react-csv";
import { useHistory } from 'react-router-dom'

const ParticipateDemoTable = ({ match }) => {
  const history = useHistory()
  
  const [items, setItems] = useState([])
  const [csvData, setCsvData] = useState([["S.No","Name", "Email", "DOB","Gender"]]);
  const [filedate, setFiledate] = useState();

  const getCSVList = () => {
    axios.post(api_url + '/researches/csvParticipateList', { researches_id: match.params.id }).then((result) => {
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

  React.useEffect(() => {
    getCSVList();
    getNewList();
    getNewListWrap();

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let current_date = month + '/' + date + '/' + year;
    setFiledate('Participants_' + current_date);

  }, [])

  const fields = [
    { key: 'name', _style: { width: '20%'} },
    { key: 'email', _style: { width: '20%' } },
    { key: 'dob', _style: { width: '20%'} },
    { key: 'gender', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]
  
  const getNewList = () => {
    axios.post(api_url + '/researches/participateList', { researches_id : match.params.id }).then((result) => {
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

  const getNewListWrap = () => { getNewList(setItems); };

  return (
    <div className="card">
      <CCardHeader className="custom-table-header">
        <div className="header-left">
          <CIcon name="cil-grid" /> Participants
            </div>
        <div className="header-right">
          <CSVLink filename={filedate + ".csv"} data={csvData}>Download</CSVLink> &nbsp;
            </div>
      </CCardHeader>
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
            'show_details':
              item => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`/currentresearchdetail/${item.researches_participate_id}`)}
                    >
                      View
                  </CButton>
                  </td>
                )
              },
          }}
        />
      </CCardBody>
    </div>
  )
}

export default ParticipateDemoTable
