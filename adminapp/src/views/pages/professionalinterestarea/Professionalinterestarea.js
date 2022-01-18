import React from 'react'
import {
  CCard,  
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import DemoTable from './DemoTable'
import { useHistory } from 'react-router-dom'

const Professionalinterestarea = () => {
  const history = useHistory()
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

export default Professionalinterestarea
