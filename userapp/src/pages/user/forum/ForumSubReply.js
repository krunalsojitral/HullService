import React, { useEffect, useState } from 'react'
import ForumDescription from "./ForumDescription";
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
        console.log(parseInt(props.subReplyDetail.length)+"============"+ parseInt(replyVisible));
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
                 <div class="forums-reply-card">
                    <div class="forums-reply-icon">
                        <img src="images/user.png"/>
                    </div>
                    <div class="forums-reply-text">
                        <h3>{subdata.first_name} {subdata.last_name}<span>({subdata.role})</span></h3>
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














