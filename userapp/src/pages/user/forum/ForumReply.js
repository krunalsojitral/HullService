import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import axios from 'axios';
import api_url from '../../../components/Apiurl';
import Swal from "sweetalert2";
import ForumSubReply from "./ForumSubReply";
import TextareaAutosize from 'react-textarea-autosize';
import ForumDescription from "./ForumDescription";
import { Link } from 'react-router-dom';

function ForumReply(props) {

    const [forumReplyCommentList, setForumReplyCommentList] = useState([]);
    const [visible, setVisible] = useState(3);
    const [replyVisible, setReplyVisible] = useState(3);
    const [forumId, setForumId] = useState();
    const [hideLoad, setHideLoad] = useState(true);    

    useEffect(() => {
        setForumReplyCommentList(props.replyDetail);
        if ((parseInt(props.replyDetail.length) < parseInt(visible)) || (parseInt(props.replyDetail.length) == parseInt(visible))) {
            setHideLoad(false);
        } else {
            if (parseInt(props.replyDetail.length) !== parseInt(visible)) {
                setHideLoad(true);
            }
        }        
        setForumId(props.replyForumId);
    }, [visible, props.replyDetail]);

    const showMoreCommentItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }

    const showMoreReplyCommentItems = () => {
        setReplyVisible((prevValue) => prevValue + 3);
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
                        //tempColl[index].reply = [result.data.response.data, ...tempColl[index].reply]
                        tempColl[index].reply = result.data.response.data
                        setForumReplyCommentList(tempColl);

                    } else {
                        Swal.fire("Oops...", result.data.response.msg, "error");
                    }
                }).catch((err) => { console.log(err); });
        }
    }    

    const forumReport = (forum_comment_id, index, report_id) => {
        var message = '';
        if (report_id) {
            message = 'Are you sure you want to unreport this Comment?'
        } else {
            message = 'Are you sure you want to report this Comment?'
        }
        Swal.fire({
            //title: 'warning!',
            icon: 'warning',
            text: message,
            confirmButtonText: `Yes`,
            showCancelButton: true,
            cancelButtonText: 'No',
            cancelButtonColor: '#e57979',
        }).then((result) => {
            if (result.isConfirmed) {
                const tokenString = localStorage.getItem('token');
                var token = JSON.parse(tokenString);
                const config = {
                    headers: { Authorization: `${token}` }
                };
                axios.post(api_url + '/forum/forumReport', { forum_comment_id: forum_comment_id }, config).then((result) => {
                    if (result.data.status) {
                        if (result.data.response.data.length > 0) { 
                            let tempColl = [...forumReplyCommentList];
                            tempColl[index].forum_report_id = result.data.response.data[0].forum_report_id;
                        }else{
                            let tempColl = [...forumReplyCommentList];
                            tempColl[index].forum_report_id = "";
                        }
                       // Swal.fire('Success', result.data.response.msg, 'success')
                    } else {
                        Swal.fire('Oops...', result.data.response.msg, 'error')
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        });
    }


    return (
        <div>
                {forumReplyCommentList && forumReplyCommentList.slice(0, visible).map((replydata, index) => (
                <div key={replydata.reply_comment_id} className="forums-reply-card">
                    <div className="forums-reply-icon">
                        {!replydata.avatar && <img src="images/user.png" />}
                        {replydata.avatar && <img src={replydata.avatar} />}
                    </div>
                    <div className="forums-reply-text">

                            <h3><Link className="btn-edit" to={{ pathname: "/view-profile", search: "?id=" + replydata.user_id }}>{replydata.first_name} {replydata.last_name}</Link><span>({replydata.role})</span></h3>
                        <span>{replydata.created_at}</span>
                        <ForumDescription description={replydata.comment}></ForumDescription>
                        <span onClick={(e) => reply(replydata.reply_comment_id)} className="Reply-Btn-New">Reply <img src="images/reply_btn.png" /></span>
                            <span onClick={(e) => forumReport(replydata.reply_comment_id, index, replydata.forum_report_id)} className="forum-report"><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;
                            {(replydata.forum_report_id) ? "Reported" : "Report"}
                            </span>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="new-forums-input" id={replydata.reply_comment_id} style={{ display: 'none' }}>
                                    <TextareaAutosize maxRows="4" minRows="2" className="form-control" type="text" id={"input" + replydata.reply_comment_id} name="comment" />
                                    <small id={"error" + replydata.reply_comment_id} style={{ display: 'none' }} className="error">Comment is required.</small>
                                    <button type="submit" className="add-comment-btn" onClick={(e) => replySubmit(replydata.reply_comment_id, index)}>Reply</button>
                                </div>

                                {replydata && replydata.reply && replydata.reply.length > 0 && <ForumSubReply subReplyDetail={replydata.reply}></ForumSubReply>}
                                    

                                {/* 
                                {replydata && replydata.reply && replydata.reply.length > 0 && replydata.reply.slice(0, replyVisible).map((subdata, index) => (
                                    <div>
                                        <div className="sub-reply">
                                            <h3>{subdata.first_name} {subdata.last_name} <span>({subdata.role})</span></h3>
                                            <small>{subdata.created_at}</small>
                                            <p dangerouslySetInnerHTML={{ __html: subdata.comment }}></p>
                                        </div>                                
                                    </div>                            
                                ))}

                                <span className="reply-loadmore" onClick={showMoreReplyCommentItems}>View more comments</span> */}
                            </div>
                        </div>

                    </div>
                 </div>   
         
                ))}

                {/* {forumReplyCommentList && forumReplyCommentList.slice(0, visible).map((replydata, index) => (
                    <div className="reply-card">
                        <h3>{replydata.first_name} {replydata.last_name} <span>({replydata.role})</span></h3>
                        <small>{replydata.created_at}</small>                       
                        <ForumDescription description={replydata.comment}></ForumDescription>

                        <p onClick={(e) => reply(replydata.reply_comment_id)}><img src="images/reply.png" alt="reply" /> <span>Reply</span></p>

                        <div className="reply-box" id={replydata.reply_comment_id} style={{ display: 'none' }}>
                            <TextareaAutosize maxRows="4" className="form-control" type="text" id={"input" + replydata.reply_comment_id} name="comment" />
                            <small id={"error" + replydata.reply_comment_id} style={{ display: 'none' }} className="error">Comment is required.</small>
                            <button type="submit" onClick={(e) => replySubmit(replydata.reply_comment_id, index)}>Reply</button>
                        </div>

                        {replydata && replydata.reply && replydata.reply.length > 0 && <ForumSubReply subReplyDetail={replydata.reply}></ForumSubReply>}

                    </div>
                ))} */}

            {hideLoad && <span className="reply-subloadmore" onClick={showMoreCommentItems}>View more comments</span>}
           
        </div>
    )
}

export default ForumReply














