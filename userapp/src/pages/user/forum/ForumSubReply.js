import React, { useEffect, useState } from 'react'
import ForumDescription from "./ForumDescription";
import { Link } from 'react-router-dom';
// import $ from 'jquery';
// import axios from 'axios';
// import api_url from '../../components/Apiurl';
// import Swal from "sweetalert2";

function ForumSubReply(props) {

    const [forumSubReplyCommentList, setForumSubReplyCommentList] = useState([]);    
    const [replyVisible, setReplyVisible] = useState(3);    
    const [hideLoad, setHideLoad] = useState(true);    

    useEffect(() => {
        setForumSubReplyCommentList(props.subReplyDetail);        
        if ((parseInt(props.subReplyDetail.length) < parseInt(replyVisible)) || (parseInt(props.subReplyDetail.length) == parseInt(replyVisible))) {
            setHideLoad(false);
        } else {
            if (parseInt(props.subReplyDetail.length) !== parseInt(replyVisible)) {
                setHideLoad(true);
            }
        }        
        
    }, [replyVisible, props.subReplyDetail]);

    const showMoreReplyCommentItems = () => {
        setReplyVisible((prevValue) => prevValue + 3);
    }

    return (
        <div>
            {forumSubReplyCommentList && forumSubReplyCommentList.slice(0, replyVisible).map((subdata, index) => (
                 <div className="forums-reply-card">
                    <div className="forums-reply-icon">
                        {!subdata.avatar && <img src="images/user.png" />}
                        {subdata.avatar && <img src={subdata.avatar} />}
                    </div>
                    <div className="forums-reply-text">
                        <h3><Link className="btn-edit" to={{ pathname: "/view-profile", search: "?id=" + subdata.user_id }}>{subdata.first_name} {subdata.last_name}</Link><span>({subdata.role})</span></h3>
                        <span>{subdata.created_at}</span>
                        <ForumDescription description={subdata.comment}></ForumDescription>
                        <br/>
                    </div>
                </div>
            ))}
            {hideLoad && <span className="reply-subloadmore" onClick={showMoreReplyCommentItems}>View more comments</span>}
        </div>

        
                                       

        // <div className="subreply-list">
        //     {forumSubReplyCommentList && forumSubReplyCommentList.slice(0, replyVisible).map((subdata, index) => (
        //         <div>
        //             <div className="sub-reply">
        //                 <h3>{subdata.first_name} {subdata.last_name} <span>({subdata.role})</span></h3>
        //                 <small>{subdata.created_at}</small>
        //                 {/* <p dangerouslySetInnerHTML={{ __html: subdata.comment }}></p> */}
        //                 <ForumDescription description={subdata.comment}></ForumDescription>
        //             </div>
        //         </div>
        //     ))}
        //     {hideLoad && <span className="reply-subloadmore" onClick={showMoreReplyCommentItems}>View more comments</span>}
        // </div>
    )
}

export default ForumSubReply














