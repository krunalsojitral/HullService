
import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import axios from 'axios';
import api_url from '../../../components/Apiurl';
import Swal from "sweetalert2";

function ForumReply(props) {

    const [forumReplyCommentList, setForumReplyCommentList] = useState([]);
    const [visible, setVisible] = useState(3);
    const [forumId, setForumId] = useState();
    const [hideLoad, setHideLoad] = useState(true);
    useEffect(() => {
        setForumReplyCommentList(props.replyDetail);
        // console.log(parseInt(props.replyDetail.length)+"============"+ parseInt(visible));
        if (parseInt(props.replyDetail.length) < parseInt(visible)) {
            setHideLoad(false);
        } else {
            if (parseInt(props.replyDetail.length) !== parseInt(visible)) {
                console.log("testt");
                setHideLoad(true);
            }

        }
        setForumId(props.replyForumId);
    }, [visible, props.replyDetail]);

    const showMoreCommentItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }

    const reply = (id) => { $("#" + id).css('display', 'block'); }

    const replySubmit = (comment_id, index) => {

        if ($("#input" + comment_id).val().trim() == '') {
            $("#error" + comment_id).show();
        } else {
            $("#error" + comment_id).hide();

            var textareaText = $("#input" + comment_id).val();
            textareaText = textareaText.replace(/\r?\n/g, '<br />');
            const tokenString = localStorage.getItem('token');
            var token = JSON.parse(tokenString);
            const config = { headers: { Authorization: `${token}` } };
            var obj = {
                forum_id: forumId,
                parent_comment_id: comment_id,
                comment: textareaText,
                subcomment: 'subcomment'
            }
            axios.post(api_url + "/forum/addComment", obj, config)
                .then((result) => {
                    if (result.data.status) {
                        $("#" + comment_id).css('display', 'none');
                        $("#input" + comment_id).val('')

                        let tempColl = [...forumReplyCommentList];
                        tempColl[index] = result.data.response.data;
                        setForumReplyCommentList(tempColl);

                        // let tempColl = [result.data.response.data, ...forumReplyCommentList]
                        // setForumReplyCommentList(tempColl);

                    } else {
                        Swal.fire("Oops...", result.data.response.msg, "error");
                    }
                }).catch((err) => { console.log(err); });
        }
    }

    return (
        <div>

            <div className="reply-list">
                {forumReplyCommentList && forumReplyCommentList.slice(0, visible).map((replydata, index) => (
                    <div className="reply-card">
                        <h3>{replydata.first_name} {replydata.last_name} <span>({replydata.role})</span></h3>
                        <small>{replydata.created_at}</small>
                        <p dangerouslySetInnerHTML={{ __html: replydata.comment }}></p>

                        {!replydata.subfirstname && <p onClick={(e) => reply(replydata.reply_comment_id)}><img src="images/reply.png" alt="reply" /> <span>Reply</span></p>}

                        <div className="reply-box" id={replydata.reply_comment_id} style={{ display: 'none' }}>
                            <textarea maxlength="1500" className="form-control" type="text" id={"input" + replydata.reply_comment_id} name="comment" />
                            <small id={"error" + replydata.reply_comment_id} style={{ display: 'none' }} className="error">Comment is required.</small>
                            <button type="submit" onClick={(e) => replySubmit(replydata.reply_comment_id, index)}>Reply</button>
                        </div>

                        {replydata.subcom && <div className="sub-reply">
                            <h3>{replydata.subfirstname} {replydata.sublastname} <span>({replydata.subrole})</span></h3>
                            <small>{replydata.subdate}</small>
                            <p dangerouslySetInnerHTML={{ __html: replydata.subcom }}></p>
                        </div>}



                    </div>
                ))}

                {hideLoad && <span className="reply-loadmore" onClick={showMoreCommentItems}>View more comments</span>}

            </div>





        </div>
    )
}

export default ForumReply