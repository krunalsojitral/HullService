import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react'
import useAutoLogout from "./useAutoLogout";

export default function PrivateRoute(props) {   
    
    if (useAutoLogout(18000) == 0) {
      localStorage.clear();
      window.location.replace('/');
    }
    
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




