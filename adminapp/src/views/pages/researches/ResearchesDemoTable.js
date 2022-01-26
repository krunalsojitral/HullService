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


const ResearchesDemoTable = () => {

  const history = useHistory()  
  const [items, setItems] = useState([])
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true)
  const ref = React.useRef();

  React.useEffect(() => {
    getNewList('');
    getNewListWrap('');
  }, [])

  const fields = [
    { key: 'checkbox', label: '', _style: { width: '1%' }, filter: false },
    { key: 'research_title', _style: { width: '20%'} },
    { key: 'researcher_name', _style: { width: '20%' } },
    { key: 'email', _style: { width: '20%' } },
    { key: 'start_date', _style: { width: '20%' } },    
    { key: 'status', _style: { width: '20%' }, filter: false },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]


  const updateItemStatus = (item, status) => {
    if (status == 1){
      var message = 'Activating the research will display it on the front end. Are you sure you want to deactivate the selected research? '
    }else{
      var message = 'De-activating the research will remove it from the front end. Are you sure you want to deactivate the selected research? '
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
      
      if (result.isDismissed) {}      
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {        
        var obj = {
          researches_id: item.researches_id,
          status: status,
        };
        axios.post(api_url + "/researches/changeResearchesStatus", obj)
          .then((results) => {
            if (results.data.status) {
              getNewListWrap('');
            } else {
              Swal.fire("Oops...", results.data.response.msg, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            //Swal.fire('Oops...', err, 'error')
          });
      } 
    })
  }

  const getNewList = (status) => {
    axios.get(api_url + '/researches/researchesList?status=' + status, {}).then((result) => {
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
      container['researches_id'] = item.researches_id;
      return container;
    });

    if (filteredThatArray.length > 0) {

      Swal.fire({
        //title: 'warning!',
        icon: 'warning',
        text: 'Are you sure you want to delete the selected researches ?',
        confirmButtonText: `Yes`,
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#e57979',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(api_url + '/researches/deleteResearches', { researches: filteredThatArray }).then((result) => {
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
      Swal.fire('Oops...', 'Please select researches', 'error')
    }
  }

  return (
    <div className="card">
      <CCardHeader className="custom-table-header">
        <div>
          &nbsp;&nbsp; Researches
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
                  Active{" "}
                  <span className="tooltip-title">De-activating the research will remove the research from the front end.</span>
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
                    <span className="tooltip-title">Activating the research will add the research back on the front end.</span>
                </p>
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
                    onClick={() => history.push(`/research-detail/${item.researches_id}`)}
                    className="mr-1"
                  > View
                  </CButton> 

                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => history.push(`/participate-list/${item.researches_id}`)}
                    className="mr-1"
                  > View Participants
                  </CButton>                 

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
    </div>
  )
}

export default ResearchesDemoTable
