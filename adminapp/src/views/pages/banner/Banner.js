import React, { useState }  from 'react'
import {
  CCard,  
  CCol,
  CRow,
  CCardHeader,
  CButton
} from '@coreui/react'
//import DemoTable from './DemoTable'
import axios from 'axios';
import api_url from '../../Apiurl';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom'

const Banner = () => {

  const history = useHistory()
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true)
  const ref = React.useRef();
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    getNewList('');
    getNewListWrap('');
  }, [])


  const updateItemStatus = (item, status) => {
    if (status == 1) {
      var message = 'Are you sure you want to activate the banner ?'
    } else {
      var message = 'Are you sure you want to deactivate the banner ?'
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
          banner_id: item.banner_id,
          status: status,
        };
        axios.post(api_url + "/banner/changebannerStatus", obj)
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
    axios.get(api_url + '/banner/bannerList?status=' + status, {}).then((result) => {
      if (result.data.status) {
        var usersdatas = result.data.response.data;
        setList(usersdatas);
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
    } else {
      getNewListWrap('');
    }
  }

  const handleOnChange = (e) => {

    const index = e.target.name
    let itemlist = [...list];
    itemlist[index].isChecked = e.target.checked;
    setList(itemlist);

    const filteredThatArray = list.filter((item) => item.isChecked == true)
    if (filteredThatArray.length > 0) {
      setDeleteButtonDisable('');
    } else {
      setDeleteButtonDisable(true);
    }
  };

  const deleteItem = (e) => {
    const filteredThatArray = list.filter((item) => item.isChecked == true).map(item => {
      const container = {};
      container['banner_id'] = item.banner_id;
      return container;
    });

    if (filteredThatArray.length > 0) {
      Swal.fire({
        //title: 'warning!',
        icon: 'warning',
        text: 'Are you sure you want to delete the selected banners ?',
        confirmButtonText: `Yes`,
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#e57979',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(api_url + '/banner/deletebanner', { banner: filteredThatArray }).then((result) => {
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
      Swal.fire('Oops...', 'Please select banner', 'error')
    }
  }

  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
  }

  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);


  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list
    });


    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", '');
  }

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;
    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
    }

    

  }

  const onDrop = (event) => {

    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });

    if (dragAndDrop.updatedOrder.length > 0){
      var updatedList = dragAndDrop.updatedOrder;
      const newLists = updatedList.map((item, index)=> {
        const container = {};
        container['banner_id'] = item.banner_id;
        container['index'] = index;
        return container;
      });
      axios.post(api_url + '/banner/updateBannerOrder', { banner: newLists }).then((result) => {
        if (result.data.status) {
         // getNewListWrap('');
          //Swal.fire('Success', result.data.response.msg, 'success')
        } else {
          Swal.fire('Oops...', result.data.response.msg, 'error')
        }
      }).catch((err) => {
        console.log(err);
      })
    }

    

  }


  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    });

  }

  // Not needed, just for logging purposes:
  React.useEffect(() => {
    console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
    console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
  }, [dragAndDrop])

  React.useEffect(() => {
    console.log("List updated!");
  }, [list])

  return (
    <CRow>
      <CCol sm="12">
        <CCard>

          <CCardHeader className="custom-table-header">
            <div>
              &nbsp;&nbsp; Banner
            </div>
            <div>
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => deleteItem()}
                disabled={deleteButtonDisable}
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
                onClick={() => history.push(`/banneradd`)}
                className="d-inline-block"
              >Add</CButton>
            </div>
          </CCardHeader>

        
          {/* <DemoTable /> */}

          <div className="card-body">
            <div className="position-relative table-responsive">
              <table class="table table-hover datatable">
                <thead>
                  <tr>
                    <th style={{ width: "1%"}}>&nbsp;</th>
                    <th style={{ width: "20%" }}>Image</th>
                    <th>Title</th>
                    <th>Status</th>  
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 && list.map((item, index) => {
                    return (
                      <tr key={index}
                        data-position={index}
                        draggable
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onDragLeave={onDragLeave}
                        className={dragAndDrop && dragAndDrop.draggedTo === Number(index) ? "dropArea" : ""} class="align-middle">
                        <td><input
                          key={item.banner_id}
                          name={index}
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={handleOnChange}
                        /></td>
                        <td>
                          <img width="150px" height="50px" src={item.image} />
                        </td>
                        <td>{item.title}</td>
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
                        <td><button onClick={() => history.push(`/banneredit/${item.banner_id}`)} className="mr-1 btn btn-outline-primary btn-sm btn-square" type="button"> Edit</button></td>
                      </tr>                     
                    )
                  })}

                  {list.length == 0 && <tr><td colspan="7"><div class="text-center my-5"><h2>No items <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-icon c-icon-custom-size text-danger mb-2" role="img"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" class="ci-primary"></path></svg></h2></div></td></tr>}
                </tbody>
              </table>
            </div>
          </div>        
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Banner
