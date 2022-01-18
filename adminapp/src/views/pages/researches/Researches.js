import React from 'react'
import {
  CCard,    
  CCol,
  CRow,
} from '@coreui/react'
import ResearchesDemoTable from './ResearchesDemoTable'

const Researches = () => {
  
  return (
    
    <CRow>
      <CCol sm="12">
        <CCard>         
          <ResearchesDemoTable />
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default Researches
