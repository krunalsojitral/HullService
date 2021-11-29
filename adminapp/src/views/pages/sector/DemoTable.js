import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,  
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
    { key: 'sector_name', _style: { width: '20%'} },
    { key: 'status', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]
  

  const updateItemStatus = (item, status) => {
   
    var obj = {
      sector_id: item.sector_id,
      status: status,
    };
    axios.post(api_url + "/sector/changesectorStatus", obj)
      .then((result) => {
        if (result.data.status) {
          getNewListWrap();
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        //Swal.fire('Oops...', err, 'error')
      });
  }

  
  const getNewList = () => { 
    axios.get(api_url + '/sector/sectorList', {}).then((result) => {
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
            <td>
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
                </a>
              )}
              {/* <CBadge color={getBadge(item.status)}>{item.status}</CBadge> */}
            </td>
          ),
          'show_details':
            item => {
              return (
                <td className="py-2">
                  {/* <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => history.push(`/sectordetail/${item.id}`)}
                  >
                    Show
                  </CButton> */}

                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => history.push(`/sectoredit/${item.sector_id}`)}
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
  )
}

export default DemoTable
