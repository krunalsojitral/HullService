import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import api_url from './../../../Apiurl';
import Swal from "sweetalert2";
import {
  CCardBody,
  CButton,
  CDataTable,
  CCardHeader,
  CLabel,
  CFormGroup,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CSVLink } from "react-csv";
import DeactiveUser from "../DeactiveUser";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";

const DemoTable = () => {

  const [toggle, setToggle] = useState(false)

  const ref = React.useRef();
  const history = useHistory()
  // const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [csvData, setCsvData] = useState([["S.No", "Name", "Email", "City", "Organization", "Academic Discipline", "Interestarea"]]);
  const [modal, setModal] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [filedate, setFiledate] = useState();
  const [academicDisciplineList, setAcademicDisciplineList] = React.useState([]);  
  const [city, setCity] = React.useState('');
  const [organizationList, setOrganizationList] = React.useState([]);
  const [selectedResearcherInterestArea, setselectedResearcherInterestArea] = React.useState([])
  const [researcherInterestAreaDropdown, setResearcherInterestAreaDropdown] = React.useState([])


  const handleInput = (e) => {
    if (!e.target.value) {
      setValue(e.target.value);
      setCity(e.target.value);

    } else {
      setValue(e.target.value);
      setCity(e.target.value);

    }
  };

  const {
    handleSubmit,
    control,
    watch,
    setValue: setFormValue,
    formState: { errors },
  } = useForm();

  const {
    ready,
    value: cityValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleSelect =
    ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"    

        console.log(description);
        setValue(description, false);
        setCity(description);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => {
            console.log(results);
            return getLatLng(results[0])

          })
          .then(() => { })
          .catch((error) => { });
      };


  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li className="city_suggestion" key={place_id} onClick={handleSelect(suggestion)}>
          <p> <strong>{main_text}</strong>  {secondary_text}</p>
        </li>
      );
    });


  const headers = [
    { label: "S.No", key: "no" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "City", key: "city" },
    { label: "Organization", key: "organization" },
    { label: "Academic Discipline", key: "academicdisciplinename" },
    { label: "Interestarea", key: "pinterestarea" },
  ];

  React.useEffect(() => {
    getNewList('');
    getNewListWrap('');    
    getCSVNewList('');
    getCSVNewListWrap('');

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let current_date = month + '/' + date + '/' + year;
    setFiledate('Researchers_' + current_date);

    axios.get(api_url + "/common/academicDisciplineList", {})
      .then((result) => {
        if (result.data.status) {
          var educationdata = result.data.response.data;
          setAcademicDisciplineList(educationdata);
        }
      })
      .catch((err) => { console.log(err); });

    axios.get(api_url + "/common/getAdminFilterOrganizationList", {})
      .then((result) => {
        if (result.data.status) {
          var orgdata = result.data.response.data;
          console.log(orgdata);
          setOrganizationList(orgdata);
        }
      })
      .catch((err) => { console.log(err); });

    axios.get(api_url + "/common/getResearcherInterestAreaList", {})
      .then((result) => {
        if (result.data.status) {
          if (result.data.response.data.length > 0) {
            var obj = result.data.response.data.map((data, index) => {
              let retObj = {};
              retObj['id'] = (index + 1);
              retObj['label'] = data.name;
              retObj['value'] = data.researcher_interest_area_id;
              return retObj;
            });
            setResearcherInterestAreaDropdown(obj);
          } 
        } 
      })
      .catch((err) => { console.log(err); });

  }, [])

  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'email', _style: { width: '20%' } },
    { key: 'joining_date', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]

  const getCSVNewList = (status) => {
    var datas = { data: { role: 2, status: status } }
    axios.post(api_url + '/user/csvuserList', datas).then((result) => {
      if (result.data.status) {
        if (result.data.response.data.length > 0) {
          var usersdatas = result.data.response.data;
          setCsvData(usersdatas);
        } else {
          setCsvData([]);
        }
      } else {
       // Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const updateItemStatus = (item, status) => {

    if (status == 1) {
      if (status == 1) {
        var message = 'Are you sure you want to activate the user ?'
      } else {
        var message = 'Are you sure you want to deactivate the user ?'
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
            id: item.id,
            status: status,
          };
          axios.post(api_url + "/user/changeuserStatus", obj)
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
            });
        }
      });
    }

  }


  const getNewList = (status) => {
    var datas = { data: { role: 3, status: status } }
    axios.post(api_url + '/user/userList', datas).then((result) => {
      if (result.data.status) {
        if (result.data.response.data.length > 0) {
          var usersdatas = result.data.response.data;
          setItems(usersdatas);
        } else {
          setItems([]);
        }        
      } else {
        //Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const getNewListWrap = (status) => {
    getNewList(status);
  };
  const getCSVNewListWrap = (status) => {
    getCSVNewList(status);
  };

  const getBadge = (status) => {
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
      getCSVNewListWrap(e.target.value);
    } else if (e.target.value == '1') {
      getNewListWrap(e.target.value);
      getCSVNewListWrap(e.target.value);
    } else if (e.target.value == '2') { 
      getNewListWrap(e.target.value);
      getCSVNewListWrap(e.target.value);
    }else {
      getNewListWrap('');
      getCSVNewListWrap('');
    }

  }

  const onSubmit = (data) => {
    if (city) { data.city = city; } else { data.city = ''; }

    if (selectedResearcherInterestArea && selectedResearcherInterestArea.length > 0) {
      var interestArea = [];
      selectedResearcherInterestArea.forEach(function (d) {
        interestArea.push(d.value);
      });
      data.research_interest_of_area = interestArea;
    }
    data.role = 3;
    console.log(data);

    axios.post(api_url + '/user/userList', { data }).then((result) => {
      if (result.data.status) {
        if (result.data.response.data.length > 0) {
          var usersdatas = result.data.response.data;
          setItems(usersdatas);
        } else {
          setItems([]);
        }
      } else {
        // Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })

    axios.post(api_url + '/user/csvuserList', { data }).then((result) => {
      if (result.data.status) {
        if (result.data.response.data.length > 0) {
          var usersdatas = result.data.response.data;
          setCsvData(usersdatas);
        } else {
          setCsvData([]);
        }
      } else {
        // Swal.fire('Oops...', result.data.response.msg, 'error')
      }
    }).catch((err) => {
      console.log(err);
    })

  }

  return (
    <div>

      

      <CCardHeader className="custom-table-header filter-section">
        <CRow>
          <CCol xs="8"><CIcon name="cil-grid" /> Researchers</CCol>
          <CCol xs="2" className="text-right" onClick={() => setToggle(!toggle)}>
            {(toggle) && <button type="submit" className="btn btn-outline-primary btn-sm btn-square mt-1">Hide Filters</button>}
            {(!toggle) && <button type="submit" className="btn btn-outline-primary btn-sm btn-square mt-1">Filters</button>}
          </CCol>
          <CCol xs="2" className="text-left"><CSVLink filename={filedate + ".csv"} headers={headers} className="d-inline-block" data={csvData}>Export User</CSVLink> &nbsp;</CCol>
        </CRow>
       

        {toggle && <div className="header-filter">
          <hr/>
          <CRow >
            <CCol xs="12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <CRow>
                  <CCol xs="4" className="google-serach">
                    <CLabel htmlFor="title">City</CLabel>
                    <div ref={ref}>
                      <input
                        value={cityValue}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="City "
                        className="form-control input"
                      />
                      {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
                    </div>
                  </CCol>
                  <CCol xs="4">
                    <CFormGroup>
                      <CLabel htmlFor="title">Organization</CLabel>
                      <Controller
                        name="organization"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <select className="form-control" onChange={onChange} value={value}>
                            <option key="0" value="">Organization </option>
                            {organizationList.map((item) => (
                              <option key={item.organization_name} value={item.organization_id}>
                                {item.organization_name}
                              </option>
                            ))}
                          </select>
                        )}
                      ></Controller>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="4">
                    <CLabel htmlFor="title">Academic Discipline</CLabel>
                    <Controller
                      name="academic_discipline"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <select className="form-control" onChange={onChange} value={value}>
                          <option key="0" value="">Academic Discipline</option>
                          {academicDisciplineList.map((item) => (
                            <option key={item.academic_discipline_id} value={item.academic_discipline_id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      )}
                    ></Controller>
                  </CCol>
                  <CCol xs="4">
                    <CLabel htmlFor="title">Interest area</CLabel>
                    <MultiSelect
                      options={researcherInterestAreaDropdown}
                      value={selectedResearcherInterestArea}
                      hasSelectAll={false}
                      //onChange={setselectedResearcherInterestArea}
                      onChange={(e) => {
                        setselectedResearcherInterestArea(e);
                      }}
                      labelledBy="Interest area"
                    />
                  </CCol>
                  <CCol xs="4">
                    <CLabel htmlFor="title">Status</CLabel>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <select className="form-control" onChange={onChange} value={value}>
                          <option key="0" value="">Select Option</option>
                          <option key="3" value="2">Pending</option>
                          <option key="1" value="1">Active</option>
                          <option key="2" value="0">Inactive</option>
                        </select>
                      )}
                    ></Controller>
                  </CCol>
                  <CCol xs="4">
                    <CLabel htmlFor="title">&nbsp;</CLabel>
                    <button type="submit" className="btn btn-outline-primary btn-sm btn-square mt-4">Submit</button>
                  </CCol>
                </CRow>

              </form>
            </CCol>
          </CRow>
        </div>
        }
      </CCardHeader>

      {/* 
          <select ref={ref} onChange={e => handleAddrTypeChange(e)} className="form-control d-inline-block" >
            <option key="0" value="">Select Option</option>
            <option key="3" value="2">Pending</option>
            <option key="1" value="1">Active</option>
            <option key="2" value="0">Inactive</option>
          </select> */}

      {/* <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => history.push(`/researchersadd`)}
                      >
                        Add
                    </CButton> */}
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
            status: (item) => (
              <td className="tooltip-box">
                {item.email_verification_token && item.email_verification_token !== null ? 'Pending' : ''}
                {(item.email_verification_token == null || item.email_verification_token == '') ? item.status === 1 ? (
                  <p
                    onClick={() => {
                      setSelectedItem(item);
                      setModal(true);
                      updateItemStatus(
                        item,
                        0,
                        getNewListWrap
                      );
                    }}
                  >
                    Active{" "}
                    <span className="tooltip-title">De-activating the user will remove the user from the front end.</span>
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
                    <span className="tooltip-title">Activating the user will add the user back on the front end.</span>
                  </p>
                ) : ''}

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
                      onClick={() => history.push(`/userdetail/${item.id}`)}
                    >
                      View
                          </CButton>

                    {/* <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => history.push(`/researchersedit/${item.id}`)}
                            className="mr-1"
                          > Edit
                          </CButton> */}

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

      <DeactiveUser
        modal={modal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setModal={setModal}
        updateListing={getNewListWrap}
      />
    </div>
  )
}

export default DemoTable
