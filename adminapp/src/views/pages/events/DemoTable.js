import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import api_url from "./../../Apiurl";
import Swal from "sweetalert2";
import { CCardBody, CButton, CDataTable, CCardHeader } from "@coreui/react";

const DemoTable = () => {
  const history = useHistory();
  // const [details, setDetails] = useState([])
  const [items, setItems] = useState([]);
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(true);
  const ref = React.useRef();
  const [filterstatus, setFilterStatus] = React.useState("");

  React.useEffect(() => {
    getNewList("");
    getNewListWrap("");
  }, []);

  const fields = [
    { key: "checkbox", label: "", _style: { width: "1%" }, filter: false },
    { key: "title", _style: { width: "20%" } },
    { key: "start_date", _style: { width: "20%" } },
    { key: "end_date", _style: { width: "20%" } },
    { key: "status", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
    },
  ];

  const updateItemStatus = (indexs, item, status) => {
    var message = "";
    if (status == 1) {
      message = "Are you sure you want to activate the event ?";
    } else {
      message = "Are you sure you want to deactivate the event ?";
    }
    Swal.fire({
      //title: 'warning!',
      icon: "warning",
      text: message,
      confirmButtonText: `Yes`,
      showCancelButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "#e57979",
    }).then((result) => {
      if (result.isConfirmed) {
        var obj = {
          event_id: item.event_id,
          status: status,
        };
        axios
          .post(api_url + "/event/changeEventStatus", obj)
          .then((result) => {
            if (result.data.status) {
              // getNewListWrap('');

              if (filterstatus) {
                setItems(items.filter((data, index) => index !== indexs));
              } else {
                let tempColl = [...items];
                //tempColl[index].reply = [result.data.response.data, ...tempColl[index].reply]
                tempColl[indexs].status = status;
                setItems(tempColl);
              }

              var successmessage = "";
              if (status == 1) {
                successmessage = "You have successfully activated event.";
              } else {
                successmessage = "You have successfully deactivated event.";
              }
              Swal.fire("Success!", successmessage, "success");
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
  };

  const getNewList = (status) => {
    axios
      .get(api_url + "/event/getEventList?status=" + status, {})
      .then((result) => {
        if (result.data.status) {
          var usersdatas = result.data.response.data;
          setItems(usersdatas);
        } else {
          // Swal.fire('Oops...', result.data.response.msg, 'error')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNewListWrap = (status) => {
    getNewList(status);
  };

  const deleteItem = (e) => {
    const filteredThatArray = items
      .filter((item) => item.isChecked == true)
      .map((item) => {
        const container = {};
        container["event_id"] = item.event_id;
        return container;
      });

    if (filteredThatArray.length > 0) {
      Swal.fire({
        //title: 'warning!',
        icon: "warning",
        text: "Are you sure you want to delete the selected event(s) ?",
        confirmButtonText: `Yes`,
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "#e57979",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(api_url + "/event/deleteEvent", { event: filteredThatArray })
            .then((result) => {
              if (result.data.status) {
                getNewListWrap("");
                Swal.fire("Success", result.data.response.msg, "success");
              } else {
                Swal.fire("Oops...", result.data.response.msg, "error");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else {
      Swal.fire("Oops...", "Please select event", "error");
    }
  };

  const handleAddrTypeChange = (e) => {
    if (e.target.value == "0") {
      getNewListWrap(e.target.value);
      setFilterStatus(e.target.value);
    } else if (e.target.value == "1") {
      getNewListWrap(e.target.value);
      setFilterStatus(e.target.value);
    } else {
      getNewListWrap("");
      setFilterStatus("");
    }
  };

  const handleOnChange = (e) => {
    const index = e.target.name;
    let itemlist = [...items];
    itemlist[index].isChecked = e.target.checked;
    setItems(itemlist);

    const filteredThatArray = items.filter((item) => item.isChecked == true);
    if (filteredThatArray.length > 0) {
      setDeleteButtonDisable("");
    } else {
      setDeleteButtonDisable(true);
    }
  };

  return (
    <div>
      <CCardHeader className="custom-table-header">
        <div> &nbsp;&nbsp; Event </div>
        <div>
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            onClick={() => deleteItem()}
            disabled={deleteButtonDisable}
            className="d-inline-block"
          >
            {" "}
            Delete
          </CButton>
          <select
            ref={ref}
            onChange={(e) => handleAddrTypeChange(e)}
            className="form-control d-inline-block"
          >
            <option key="0" value="">
              Select Option
            </option>
            <option key="1" value="1">
              Active
            </option>
            <option key="2" value="0">
              Inactive
            </option>
          </select>
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            className="d-inline-block"
            onClick={() => history.push(`/eventadd`)}
          >
            Add
          </CButton>
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
          scopedSlots={{
            checkbox: (item, index) => (
              <td>
                <input
                  key={item.blog_id}
                  name={index}
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={handleOnChange}
                />
              </td>
            ),
            status: (item, index) => (
              <td className="tooltip-box">
                {item.status === 1 ? (
                  <p
                    href
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => {
                      updateItemStatus(index, item, 0, getNewListWrap);
                    }}
                  >
                    Active{" "}
                    <span className="tooltip-title">
                      De-activating the page will remove the page from the front
                      end.
                    </span>
                  </p>
                ) : (
                  <p
                    href
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => {
                      updateItemStatus(index, item, 1, getNewListWrap);
                    }}
                  >
                    Inactive
                    <span className="tooltip-title">
                      Activating the page will add the page back on the front
                      end.
                    </span>
                  </p>
                )}
                {/* <CBadge color={getBadge(item.status)}>{item.status}</CBadge> */}
              </td>
            ),
            show_details: (item) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => history.push(`/eventedit/${item.event_id}`)}
                    className="mr-1"
                  >
                    {" "}
                    Edit
                  </CButton>
                </td>
              );
            },
          }}
        />
      </CCardBody>
    </div>
  );
};

export default DemoTable;
