import React, { useState } from 'react'
import axios from 'axios';
import api_url from './../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,  
  CButton,
  CCollapse,
  CDataTable,
  CCard,  
  CCol,
  CFormGroup, 
  CLabel,
  CRow,
} from '@coreui/react'
import { useForm, Controller } from "react-hook-form";
import $ from 'jquery';

const DemoTable = () => {

  
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [selectedFile, setSelectedFile] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  
  const [setectimage, setSetectimage] = React.useState('');

  React.useEffect(() => {
    getNewList();
    getNewListWrap();
  }, [])

  const fields = [
    { key: 'media', _style: { width: '20%'} },
    { key: 'media_url', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]

  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSetectimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  
  const {
    handleSubmit,    
    formState: { errors },
  } = useForm();
  

  

  
  const getNewList = () => { 
    axios.get(api_url + '/media/mediaList', {}).then((result) => {
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

  const deleteMedia = (media_id) => {
    
    Swal.fire({
      title: "Are you sure?",
      icon: 'warning',
      text: "You will not be able to recover this image!",
      confirmButtonText: `Delete`,
    }).then((results) => {
      if (results.isConfirmed) {
        var obj = { media_id: media_id }
        axios.post(api_url + '/media/deleteMedia', obj).then((result) => {
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

  

  const getNewListWrap = () => {
    getNewList(setItems);
  };

  const addInformationAct = (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/media/addMediaByadmin", formData, {})
      .then((result) => {
        if (result.data.status) {
          Swal.fire("Success!", result.data.response.msg, "success");
          getNewListWrap();
          setSetectimage('')
          setSelectedFile('');
          var image = $('#image_id');
          image.removeAttr('src').replaceWith(image.clone());

        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      }).catch((err) => { console.log(err); });
  };
  return (
    <CCardBody>

      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmit(addInformationAct)}>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="ccnumber">Upload Image &nbsp; </CLabel>
                      <input
                        id="myFile"
                        type="file"
                        accept=".png,.PNG,.JPG,.jpg,.jpeg"
                        name="myfile"
                        onChange={changeFileHandler}
                      />                      
                      <button type="submit" className="btn btn-outline-primary btn-sm btn-square"> Add</button> &nbsp;
                      <br/>                      
                      {(isUploaded) && <img id='image_id' style={{ width: "100px" }} src={setectimage} alt="user-image" />}
                    </CFormGroup>
                  </CCol>
                </CRow>
               
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CDataTable
        items={items}
        fields={fields}
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
          'media':
            item => {
              return (
                <td className="py-2">
                  <img width="50px" height="50px" src={item.media_url}/>
                </td>
              )},
          'show_details':
            item => {
              return (
                <td className="py-2">
                  {/* <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => history.push(`/blogdetail/${item.id}`)}
                  >
                    Show
                  </CButton> */}

                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => deleteMedia(item.media_id)}
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

export default DemoTable
