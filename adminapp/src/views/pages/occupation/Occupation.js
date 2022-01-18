import React from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'

import DemoTable from './DemoTable'

const Occupation = () => {  
  return (
    <CRow>
      <CCol sm="12">
        <CCard>         
          <DemoTable />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Occupation
