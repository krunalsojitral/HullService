import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {    
  CCol,
  CFormGroup,  
  CRow
} from '@coreui/react'
import ReactDatePicker from 'react-datepicker';
import { setTimeout } from "core-js/web/immediate";
import $ from 'jquery';
//no_of_sessions_selected
export default ({ nestIndex, editdata, setFormValue, control, register, errors }) => {

  React.useEffect(() => {   

    if (editdata[nestIndex] && editdata[nestIndex].session_data && editdata[nestIndex].session_data.length > 0){
      var datas = editdata[nestIndex].session_data;
      var session_date = [];

      datas.forEach((item, index) => {
        $("#time_" + nestIndex + index).val(item.value)
        session_date.push({ "value": item.value })
      });

      if (session_date.length > 0) {
        session_date.forEach((item, index) => {
          append({})
        });
        setTimeout(() => {
          session_date.forEach((item, index) => {
            setFormValue(`time[${nestIndex}].nestedArray[${index}].value`, new Date(Date.parse(item.value)));
          });
        }, 500);
      }
    }  
    
  }, []);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `time[${nestIndex}].nestedArray`
  }); 

  return (
    <CRow key={nestIndex}>
      <CCol xs="12">
        <CRow>
          <button style={{'marginLeft':'18px'}} type="button" className="btn btn-outline-primary" onClick={() => append({ field1: "field1" })} >
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
                        id={"time_" + nestIndex + k}
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
                    <button type="button" onClick={() => remove(k)} className="btn btn-outline-primary">
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
