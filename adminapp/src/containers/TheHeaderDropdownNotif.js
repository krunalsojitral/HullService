import React from 'react'
import {
  CBadge,
  CDropdown,  
  CDropdownToggle,  
  CDropdownMenu,
  CDropdownItem,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import api_url from '../views/Apiurl';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const TheHeaderDropdownNotif = () => {
  const history = useHistory()
  const [notiTotalCount, setNotiTotalCount] = React.useState(0);
  const [forumNotiCount, setForumNotiCount] = React.useState(0);
  const [researchNotiCount, setResearchNotiCount] = React.useState(0);
  const [forumCommentList, setForumCommentList] = React.useState([]);
  const [researcherNotiCount, setResearcherNotiCount] = React.useState(0);


  React.useEffect(() => {

    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      getNotificationCount();
    }, 2500)

    return () => clearInterval(intervalId); //This is important

  }, [])

  const getNotificationCount = () => {

    axios.get(api_url + '/forum/getForumNotificationCount').then((result) => {
      if (result.data.status) {
        var data = result.data.response.data;
        //setNotiCount(data[0].cnt);
        setForumNotiCount(data.forum_cnt)
        setResearchNotiCount(data.research_request_cnt)
        setNotiTotalCount(parseInt(data.forum_cnt) + parseInt(data.research_request_cnt) + parseInt(data.research_cnt))
        setForumCommentList(data.forum_list)
        setResearcherNotiCount(data.research_cnt);
      }
    }).catch((err) => {
      console.log(err);
      //Swal.fire('Oops...', err, 'error')
    })
  }
  

  // return (
  //   <CDropdown
  //     inNav
  //     className="c-header-nav-item mx-2"
  //   >
  //     <CDropdownToggle className="c-header-nav-link" caret={false}>
  //       <CIcon name="cil-list" onClick={() => history.push(`/forum-request`)} title="Research"/>
  //       <CBadge shape="pill" color="danger">{noticount}</CBadge>
  //     </CDropdownToggle>     
  //   </CDropdown>
  // )
  
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        {notiTotalCount > 0 && <CBadge shape="pill" color="danger">{notiTotalCount}</CBadge>}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {notiTotalCount} notifications</strong>
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push(`/researchers`)}><CIcon name="cil-comment-square" className="mr-2 text-success" /> New Research Signup Requests &nbsp; <CBadge color="success" className="mfs-auto">{researcherNotiCount}</CBadge></CDropdownItem>
        <CDropdownItem onClick={() => history.push(`/research-requests`)}><CIcon name="cil-comment-square" className="mr-2 text-success" /> New Research Thread Requests &nbsp; <CBadge color="success" className="mfs-auto">{researchNotiCount}</CBadge></CDropdownItem>
        <CDropdownItem onClick={() => history.push(`/forum-request`)} ><CIcon name="cil-comment-square" className="mr-2 text-danger" /> New Forum Request &nbsp; <CBadge color="success" className="mfs-auto">{forumNotiCount}</CBadge></CDropdownItem>

        {forumCommentList.length > 0 && forumCommentList.map((data, index) => (<div key={index}>
          <CDropdownItem onClick={() => history.push(`/forumcomment/` + data.forum_id)} ><CIcon name="cil-comment-square" className="mr-2 text-danger" /> "{data.comment.substring(0, 8)}" has more than 5 reports</CDropdownItem>
        </div>
        ))}

        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif