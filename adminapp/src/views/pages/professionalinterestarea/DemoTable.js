import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from '../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,  
  CButton,  
  CDataTable,
  CCardHeader
} from '@coreui/react'


const DemoTable = () => {

  const history = useHistory()
  const [items, setItems] = useState([])
  const ref = React.useRef();

  React.useEffect(() => {
    getNewList('');
    getNewListWrap('');
  }, [])

  const fields = [
    { key: 'checkbox', label: '', _style: { width: '1%' }, filter: false },
    { key: 'interest_area', _style: { width: '20%'} },
    { key: 'status', _style: { width: '20%' }, filter: false },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]
  

  const updateItemStatus = (item, status) => {
    if (status == 1) {
      var message = 'Are you sure you want to activate an interest area ?'
    } else {
      var message = 'Are you sure you want to deactivate an interest area ?'
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
          professional_interest_area_id: item.professional_interest_area_id,
          status: status,
        };
        axios.post(api_url + "/professionalinterestarea/changeprofessionalinterestareaStatus", obj)
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
            //Swal.fire('Oops...', err, 'error')
          });
      }
    });
  } 

  
  const getNewList = (status) => {
    axios.get(api_url + '/professionalinterestarea/professionalinterestareaList?status=' + status, {}).then((result) => {
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

  const handleAddrTypeChange = (e) => {
    console.clear();

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
  };

  const deleteItem = (e) => {
    const filteredThatArray = items.filter((item) => item.isChecked == true).map(item => {
      const container = {};
      container['professional_interest_area_id'] = item.professional_interest_area_id;
      return container;
    });

    if (filteredThatArray.length > 0) {
      axios.post(api_url + '/professionalinterestarea/deleteProfessionalinterestarea', { professionalinterestarea: filteredThatArray }).then((result) => {
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
  }




  return (

    <div>
      <CCardHeader className="custom-table-header">
            <div>
          &nbsp;&nbsp; Professional Interest Area
            </div>

            <div>

              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
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
                onClick={() => history.push(`/professionalinterestareaadd`)}
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
                    <span className="tooltip-title">De-activating the interest area will remove the interest area from the front end.</span>
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
                    <span className="tooltip-title">Activating the interest area will add the interest area back on the front end.</span>
                  </p>
                )}
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
                      onClick={() => history.push(`/professionalinterestareaedit/${item.professional_interest_area_id}`)}
                      className="mr-1"
                    > Edit
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

export default DemoTable
