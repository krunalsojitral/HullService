import React, { useEffect, useState } from 'react'

function ForumReply(props) {
    
    const [forumReplyCommentList, setForumReplyCommentList] = useState([]);
    const [visible, setVisible] = useState(3);
    const [hideLoad, setHideLoad] = useState(true);    
    useEffect(() => {        
        setForumReplyCommentList(props.replyDetail);
       // console.log(parseInt(props.replyDetail.length)+"============"+ parseInt(visible));
        if (parseInt(props.replyDetail.length) < parseInt(visible)){                  
            setHideLoad(false);
        }else{
            if (parseInt(props.replyDetail.length) !== parseInt(visible)){
                console.log("testt");
                setHideLoad(true);
            }
            
        }
    }, [visible, props.replyDetail]);
    const showMoreCommentItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }

    return (
        <div>

            <div className="reply-list">

                {forumReplyCommentList && forumReplyCommentList.slice(0, visible).map((replydata, index) => (
                    <div class="reply-card">
                        <h3>{replydata.first_name} {replydata.last_name} <span>({replydata.role})</span></h3>
                        <small>{replydata.created_on}</small>
                        <p>{replydata.comment}</p>
                    </div>
                ))}

                {hideLoad && <span className="reply-loadmore" onClick={showMoreCommentItems}>View more comments</span>}

            </div>

         



        </div>
    )
}

export default ForumReply
