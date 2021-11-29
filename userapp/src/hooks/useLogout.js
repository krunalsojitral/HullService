import { useHistory } from 'react-router-dom';

export default function useLogout() {
    let history = useHistory();
  

    const logoutUser = async () => {
        
        try {
            localStorage.clear();
            history.push('/');            
        } catch(err) {
            console.log(err);
        } 
    }

    return {
        logoutUser
    }

}