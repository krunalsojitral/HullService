import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import Swal from "sweetalert2";
import api_url from '../components/Apiurl';


export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    
    //set user
    const setUserContext = async (data) => {        
        const config = {
            headers: { Authorization: `${data.token}` }
        };
        return await axios.get(api_url + '/user/getuserDetail', config).then(async (result) => {  
            if (result.data.status){
                
                if (result.data.response.data.user_role === 2){
                    localStorage.setItem('token', JSON.stringify(data.token));
                    localStorage.setItem('userdata', JSON.stringify(result.data.response.data));
                    setUser(result.data.response.data);
                    if (result.data.response.data.firstname){
                      //  history.push('/jobs');
                    }else{
                     //   history.push('/profilecreation');
                    }
                }else{
                    localStorage.setItem('token', JSON.stringify(data.token));
                    localStorage.setItem('userdata', JSON.stringify(result.data.response.data));
                    setUser(result.data.response.data);
                    if (result.data.response.data.firstname) {
                      //  history.push('/find-talent');
                    } else {
                      //  history.push('/company-profile');
                    }
                }
            }else{
                
            }
            
            })
            .catch((err) => {
            setError(err.response.data);
        })
    }

    //register user  
    const registerUser = async (data) => {
        return axios.post(api_url + '/user/register', data).then(async (result) => {
            if (result.data.status) { 
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: result.data.response.msg,
                    confirmButtonText: `ok`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push("/login");
                    } else {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }else{
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
                    
                    //history.push('/login');
            })
            .catch((err) => {
                   return setError(err.response.data);
            })
        };

    //login user 
    const loginUser = async (data) => {
        const { email, password } = data;
        return axios.post(api_url +'/user/login', {
                email,
                password,
            }).then(async (result) => {
                if (result.data.status) {   
                    await setUserContext(result.data.response);
                }else{
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
                //Swal.fire('Oops...', err, 'error')
            })
        };


    const verifyEmail = (data) => {
        const { email_verify_token } = data;
        return axios.post(api_url + '/user/email-varification', {
            email_verify_token
        }).then((result) => {               
            return result.data.status;
        }).catch((err) => {
            return 0;            
        })
    };

    const forgotpassword = (data) => {
        const { email } = data;
        return axios.post(api_url + '/user/forgot-password', {
            email
        }).then((result) => {            
            if (result.data.status){
                Swal.fire('Success!', result.data.response.msg, 'success');
            }else{
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }            
        }).catch((err) => {
            Swal.fire('Oops...', err, 'error')
        })
    };

    const resetpassword = (data) => {
        const { password, reset_password_token } = data;
        return axios.post(api_url + '/user/reset-password', {
            password, reset_password_token
        }).then((result) => {
            if (result.data.status) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: result.data.response.msg,
                    confirmButtonText: `ok`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push("/login");
                    } else {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            Swal.fire('Oops...', err, 'error')
        })
    };

    

    return {
        registerUser,
        loginUser,
        verifyEmail,
        forgotpassword,
        resetpassword,
        error
    }
}
