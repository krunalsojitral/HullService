import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';



export default function PrivateRoute(props) {   
    const { user, isLoading } = useContext(UserContext); 

    const tokenString = localStorage.getItem('token');

    const { component: Component,...rest } = props;

  
    
    if (tokenString){
      return ( <Route {...rest} render={(props) => (<Component {...props}/>)}/>)
    } else {
        return <Redirect to='/login'/> 
    }
}




