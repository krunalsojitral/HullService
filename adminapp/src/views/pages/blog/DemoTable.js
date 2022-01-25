import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import {  
  CCardBody,  
  CCardHeader,
  CButton,  
  CDataTable
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
    { key: 'checkbox',label: '',_style: { width: '1%' },filter: false},    
    { key: 'title', _style: { width: '20%'} },
    { key: 'role', _style: { width: '20%' } },
    { key: 'created_on', _style: { width: '20%' } },
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
      var message = 'Are you sure you want to activate the blog ?'
    } else {
      var message = 'Are you sure you want to deactivate the blog ?'
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
          blog_id: item.blog_id,
          status: status,
        };
        axios.post(api_url + "/blog/changeBlogStatus", obj)
          .then((result) => {
            if (result.data.status) {
              getNewListWrap('');
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
    
    axios.get(api_url + '/blog/blogList?status=' + status, {}).then((result) => {
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
    if (e.target.value == '0') {
      getNewListWrap(e.target.value);
    } else if (e.target.value == '1') { 
      getNewListWrap(e.target.value);
    }else{
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
      container['blog_id'] = item.blog_id;
      return container;
    });
    
    if (filteredThatArray.length > 0){  
      
      Swal.fire({
        //title: 'warning!',
        icon: 'warning',
        text: 'Are you sure you want to delete the blog ?',
        confirmButtonText: `Yes`,
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#e57979',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(api_url + '/blog/deleteBlog', { blog: filteredThatArray }).then((result) => {
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
      Swal.fire('Oops...', 'Please select blog', 'error')
    }
  }

  return (
    <div>    
      <CCardHeader className="custom-table-header">
        <div> &nbsp;&nbsp; Blog </div>
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
            onClick={() => history.push(`/blogadd`)}
            className="d-inline-block"
          > Add
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
                    <span className="tooltip-title">De-activating the blog will remove the blog from the front end.</span>
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
                      <span className="tooltip-title">Activating the blog will add the blog back on the front end.</span>
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
                      onClick={() => history.push(`/blogedit/${item.blog_id}`)}
                      className="mr-1"
                    > Edit
                    </CButton>

                  </td>
                )
              }
          }}
        />
      </CCardBody>
    </div>
  )
}

export default DemoTable
