import React from 'react'
import {
  CCard,    
  CCol,
  CRow,
} from '@coreui/react'

import DemoTable from './DemoTable'

const Researcherinterestarea = () => {  
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

export default Researcherinterestarea
