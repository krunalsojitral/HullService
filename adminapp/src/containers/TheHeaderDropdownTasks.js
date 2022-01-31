import React from 'react'
import {
  CBadge,
  CDropdown,
  // CDropdownItem,
  // CDropdownMenu,
  CDropdownToggle,
  //CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import api_url from '../views/Apiurl';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const TheHeaderDropdownTasks = () => {
  const history = useHistory()

  const [noticount, setNotiCount] = React.useState(0);


  React.useEffect(() => {

    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      
        getNotificationCount();
      
    }, 2500)

    return () => clearInterval(intervalId); //This is important

  }, [])

 

  const getNotificationCount = () => {

    axios.get(api_url + '/researches/getResearchNotificationCount').then((result) => {
      if (result.data.status) {
        var data = result.data.response.data;        
        setNotiCount(data[0].cnt);
      }
    }).catch((err) => {
      console.log(err);
      //Swal.fire('Oops...', err, 'error')
    })
  }


  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
       <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon onClick={() => history.push(`/research-requests`)} name="cil-list" title="forum" />
        <CBadge shape="pill" color="danger">{noticount}</CBadge>
      </CDropdownToggle>     
    </CDropdown>
  )
}

export default TheHeaderDropdownTasks