import React from 'react'
import {
  CCard,
  CCardHeader,  
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import CommentDemoTable from './CommentDemoTable'

const ForumComment = ({ match }) => {
 
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader className="custom-table-header">
            <div>
              <CIcon name="cil-grid" /> Forum Comment
            </div>           
          </CCardHeader>
          <CommentDemoTable match={match}/>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ForumComment
