import React from 'react'
import {
  CCard,  
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import ParticipateDemoTable from './ParticipateDemoTable'

const Participate = () => {
  return (    
    <CRow>
      <CCol sm="12">
        <CCard>              
          <ParticipateDemoTable />
        </CCard>
      </CCol>
    </CRow>    
  )
}

export default Participate
