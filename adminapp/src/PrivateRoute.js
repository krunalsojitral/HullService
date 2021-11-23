import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';


import { CContainer, CFade } from '@coreui/react'

export default function PrivateRoute(props) {   
    

    const tokenString = localStorage.getItem('token');

    const { component: Component,...rest } = props;
    const loading = (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )

    
    
    if (tokenString){
      return ( 
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Route {...rest} />
          </Suspense>
        </CContainer>)
    } else {
      return <Redirect to='/login'/> 
    }
}




