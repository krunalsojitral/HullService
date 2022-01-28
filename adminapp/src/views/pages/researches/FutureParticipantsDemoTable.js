import React, { useState } from 'react'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom'
import {
  CCardBody,
  CCardHeader,
  CButton,  
  CDataTable
} from '@coreui/react'
import { CSVLink, CSVDownload } from "react-csv";


const FutureParticipantsDemoTable = () => {

  const history = useHistory()

  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true)
  const [items, setItems] = useState([])
  const [csvData, setCsvData] = useState([["S.No", "Name", "Email", "DOB", "No of Kids", "Kids Detail"]]);
  const [filedate, setFiledate] = useState();

  React.useEffect(() => {
    getNewList();
    getNewListWrap();
    getCSVList();

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let current_date = month + '/' + date + '/' + year;
    setFiledate('Future_Participants_' + current_date);

  }, [])

  const headers = [
    { label: "S.No", key: "S.No" },
    { label: "Name", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "DOB", key: "DOB" },
    { label: "No of Kids", key: "No_of_Kids" },
    { label: "Kids Detail", key: "Kids_detail" }
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
    { key: 'checkbox', label: '', _style: { width: '1%' }, filter: false },
    { key: 'name', _style: { width: '20%'} },
    { key: 'dob', _style: { width: '20%' } },
    { key: 'email', _style: { width: '20%' } },    
   // { key: 'no_of_kids', _style: { width: '20%' } },
   // { key: 'age_of_kids', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
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
      container['future_research_id'] = item.future_research_id;
      return container;
    });

    if (filteredThatArray.length > 0) {

      Swal.fire({
        //title: 'warning!',
        icon: 'warning',
        text: 'Are you sure you want to delete the selected future participates ?',
        confirmButtonText: `Yes`,
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#e57979',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(api_url + '/researches/deleteFutureParticipate', { futureparticipate: filteredThatArray }).then((result) => {
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

      
    }else{
      Swal.fire('Oops...', 'Please select future participate', 'error')
    }
  }
  

  return (
    <div className="card">
      <CCardBody>

        <CCardHeader className="custom-table-header">
          <div className="header-left">
            &nbsp; Future Participants
            </div>
          <div className="header-right">
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
            <CSVLink filename={filedate + ".csv"} headers={headers} data={csvData}>Download</CSVLink> &nbsp;
            </div>
        </CCardHeader>

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
          scopedSlots={{   
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
            // 'details':
            //   item => {
            //     return (
            //       <CCollapse show={details.includes(item.id)}>
            //         <CCardBody>
            //           <h4>
            //             {item.username}
            //           </h4>
            //           <p className="text-muted">User since: {item.created_at}</p>
            //           <CButton size="sm" color="info">
            //             User Settings
            //         </CButton>
            //           <CButton size="sm" color="danger" className="ml-1">
            //             Delete
            //         </CButton>
            //         </CCardBody>
            //       </CCollapse>
            //     )
            //   }
          }}
        />
      </CCardBody>
    </div>    
  )
}

export default FutureParticipantsDemoTable
