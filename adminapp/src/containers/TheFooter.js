import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      {/* <div>
        <CLink href="https://coreui.io/react/docs/" target="_blank">
          Library documentation
        </CLink>
      </div> */}
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://hullservice.com" target="_blank" rel="noopener noreferrer">Hull Service</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
