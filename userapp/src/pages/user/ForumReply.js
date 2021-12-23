import React, { useEffect, useState } from 'react'

function ForumReply(props) {
    
    const [forumReplyCommentList, setForumReplyCommentList] = useState([]);
    const [visible, setVisible] = useState(3);
    const [hideLoad, setHideLoad] = useState(true);    
    useEffect(() => {        
        setForumReplyCommentList(props.replyDetail);
        if (parseInt(props.replyDetail.length) < parseInt(visible)){            
            setHideLoad(false);
        }
    }, [visible]);
    const showMoreCommentItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }

    return (
        <div>

            <div className="reply-list">

                {forumReplyCommentList && forumReplyCommentList.slice(0, visible).map((replydata, index) => (
                    <div class="reply-card">
                        <h3>{replydata.first_name} {replydata.last_name} <span>({replydata.role})</span></h3>
                        <small>Oct 16 2021</small>
                        <p>{replydata.comment}</p>
                    </div>
                ))}

                {hideLoad && <span className="reply-loadmore" onClick={showMoreCommentItems}>View collapsed comments</span>}

            </div>

         



        </div>
    )
}

export default ForumReply
