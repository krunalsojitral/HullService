import React from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'

import DemoTable from './DemoTable'
import { useHistory } from 'react-router-dom'

const Course = () => {
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

export default Course
