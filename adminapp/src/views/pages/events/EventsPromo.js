import React from 'react'
import {
  CCard,  
  CCol,
  CRow,
} from '@coreui/react'
import DemoTableEventPromo from './DemoTableEventPromo'

const EventsPromo = () => {
 
  return (
    <CRow>
      <CCol sm="12">
        <CCard>          
          <DemoTableEventPromo />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EventsPromo
