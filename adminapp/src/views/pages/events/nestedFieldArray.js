import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import {   
  CCol,
  CFormGroup,
  CRow
} from '@coreui/react'
import ReactDatePicker from 'react-datepicker';

export default ({ nestIndex, control, register, errors }) => {

  React.useEffect(() => { 

      //let arr = Array.apply(null, { length: (no_of_sessions_selected) }).map(Number.call, Number);
      // fields.forEach((item, index) => {
      //   remove()
      // });
      let arr = [1]

      arr.forEach((item, index) => {
        append({ field1: "field1" })
      });
    
  }, []);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `time[${nestIndex}].nestedArray`
  }); 

  return (
    <CRow key={nestIndex}>
      <CCol xs="12">
        <CRow>
          <button style={{ 'marginLeft': '18px' }} type="button" className="btn btn-outline-primary" onClick={() => append({ field1: "field1" })} >
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
