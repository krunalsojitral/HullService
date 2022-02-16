import React from 'react'
import {
  CCard,  
  CCol,
  CRow,
} from '@coreui/react'
import DemoTable from './DemoTable'

const Article = () => {  



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

export default Article
