import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {  
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CTabs,
  CTabPane,
  CTabContent,
  CCardHeader,
  CNavItem,
  CNavLink,
  CNav  
} from '@coreui/react'
import ReactDatePicker from 'react-datepicker';
import { setTimeout } from "core-js/web/immediate";
import $ from 'jquery';
//no_of_sessions_selected
export default ({ nestIndex, editdata, control, register, errors }) => {

  React.useEffect(() => { 
    console.log(editdata);
    console.log(nestIndex)
    console.log(fields);

    // var session_time = [];

    // editdata.forEach((item, index) => {
    //   $("#time_" + index).val(item.session_time)
    //   session_time.push({ "value": item.session_time })
    // });

    // if (session_time.length > 0) {
    //   session_time.forEach((item, index) => {
    //     append({})
    //   });
    //   setTimeout(() => {
    //     // session_time.forEach((item, index) => {
    //     //   setFormValue(`time.${nestIndex}.value`, new Date());
    //     // });
    //   }, 500);
    // }
  

   


    
  }, []);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `time[${nestIndex}].nestedArray`
  });

 

  return (
    <CRow key={nestIndex}>
      <CCol xs="12">
        <CRow>
          <button style={{'margin-left':'18px'}} type="button" class="btn btn-outline-primary" onClick={() => append({ field1: "field1" })} >
            Add Session
          </button>
        </CRow>  
        <br/>
        <CRow>
          {fields.map((item, k) => {
            return (
              <CCol xs="4" key={k}>
                <CRow >
                  <CCol xs="10">
                    <CFormGroup>
                      <Controller
                        name={`time[${nestIndex}].nestedArray[${k}].value`}
                        control={control}
                        id={"time_" + k}
                        render={({ field: { onChange, value } }) => (
                          <ReactDatePicker
                            className="form-control"
                            selected={value}
                            onChange={onChange}
                            dateFormat="yyyy/MM/dd"
                            dateFormatCalendar="yyyy/MM/dd"
                            minDate={new Date()}
                            maxDate={new Date(2030, 11)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            isClearable
                            placeholderText={`Session Date ${k + 1}`}
                          />
                        )}
                      ></Controller>
                    </CFormGroup>  
                  </CCol>
                  <CCol xs="2">
                    <button type="button" onClick={() => remove(k)} class="btn btn-outline-primary">
                      X
                    </button>
                  </CCol>
                </CRow>    
              </CCol>
            );
          })}          
        </CRow>
      </CCol>      
    </CRow>
  );
};
