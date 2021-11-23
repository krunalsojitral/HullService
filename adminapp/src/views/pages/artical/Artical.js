import React from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DemoTable from './DemoTable'
import { useHistory } from 'react-router-dom'

const Article = () => {
  const history = useHistory()
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader className="custom-table-header">
            <div>
              <CIcon name="cil-grid" /> Article
            </div>
            <CButton
              color="primary"
              variant="outline"
              shape="square"
              size="sm"
              onClick={() => history.push(`/articleadd`)}
            >
              Add
            </CButton>
          </CCardHeader>
          <DemoTable />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Article
