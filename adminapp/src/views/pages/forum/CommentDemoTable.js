import React, { useState } from 'react'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,  
  CButton,
  CCollapse,
  CDataTable
} from '@coreui/react'

const CommentDemoTable = ({ match }) => {
 
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])

  React.useEffect(() => {
    getNewList();
    getNewListWrap();
  }, [])

  const fields = [
    { key: 'comment', _style: { width: '20%'} },
    { key: 'user_name', _style: { width: '20%' } },
    { key: 'created_at', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]
  

  const deleteForum = (comment_id) => {

    Swal.fire({
      title: "Are you sure?",
      icon: 'warning',
      text: "You will not be able to recover this comment!",
      confirmButtonText: `Delete`,
    }).then((results) => {
      if (results.isConfirmed) {
        var obj = { comment_id: comment_id }
        axios.post(api_url + '/forum/deleteForum', obj).then((result) => {
          if (result.data.status) {
            getNewListWrap();
          } else {
            Swal.fire('Oops...', result.data.response.msg, 'error')
          }
        }).catch((err) => {
          console.log(err);
        })
      } else {

      }
    })
  };

  
  const getNewList = () => { 
    if (match.params.id) { 
      console.log(match.params.id);
      axios.post(api_url + '/forum/forumCommentList', { forum_id: match.params.id}).then((result) => {
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
          'show_details':
            item => {
              return (
                <td className="py-2">                 

                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => deleteForum(item.forum_comment_id)}
                    className="mr-1"
                  > Delete
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

export default CommentDemoTable
