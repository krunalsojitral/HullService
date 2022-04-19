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

export default ({ nestIndex, no_of_sessions_selected, editdata, control, register, errors }) => {

  React.useEffect(() => { 
    console.log(editdata);
    console.log(nestIndex)
    console.log(fields);

    // if (editdata.length > 0) {
      
    //   var session_time = [];
      
    //   editdata.forEach((item, index) => {
    //     $("#time_" + index).val(item.session_time)
    //     session_time.push({ "value": item.session_time })
    //   });

    //   if (session_time.length > 0) {
    //     session_time.forEach((item, index) => {
    //       append({})
    //     });
    //     setTimeout(() => {
    //       // session_time.forEach((item, index) => {
    //       //   setFormValue(`time.${nestIndex}.value`, new Date());
    //       // });
    //     }, 500);
    //   }
    // }else{

      let arr = Array.apply(null, { length: (no_of_sessions_selected) }).map(Number.call, Number);
      fields.forEach((item, index) => {
        remove()
      });

      arr.forEach((item, index) => {
        append({ field1: "field1" })
      });
   //}
  

   


    
  }, []);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `time[${nestIndex}].nestedArray`
  });

 

  return (
    <CRow key={nestIndex}>
      <CCol xs="12">
        <CRow>
          {fields.map((item, k) => {
            return (
              <CCol xs="4" key={k}>
                <CFormGroup>
                  <Controller
                    name={`time[${nestIndex}].nestedArray[${k}].value`}
                    control={control}
                    id={"time_"+k}
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
                {/* <button type="button" onClick={() => remove(k)} style={{ height: "40px", marginTop: 0 }}>
                Delete
              </button> */}
              </CCol>
            );
          })}

          {/* <button type="button" onClick={() => append({ field1: "field1" })} style={{ marginLeft: "10px" }} >
            Append Nested
          </button> */}
        </CRow>
      </CCol>
      
    </CRow>
  );
};
