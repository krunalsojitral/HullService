import React, { useEffect, useState } from 'react'
import ForumDescription from "./ForumDescription";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import api_url from '../../../components/Apiurl';
import Swal from "sweetalert2";
import TextareaAutosize from 'react-textarea-autosize';

function ForumSubReply(props) {

    const [forumSubReplyCommentList, setForumSubReplyCommentList] = useState([]);    
    const [replyVisible, setReplyVisible] = useState(3);    
    const [hideLoad, setHideLoad] = useState(true);    
    const [loginUserID, setLoginUserID] = useState();
    React.useEffect(() => {

        const typeString = localStorage.getItem('userdata');
        var usersessiondata = JSON.parse(typeString);
        setLoginUserID(usersessiondata.id)

    }, []);

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
                            let tempColl = [...forumSubReplyCommentList];
                            tempColl[index].forum_report_id = result.data.response.data[0].forum_report_id;
                        } else {
                            let tempColl = [...forumSubReplyCommentList];
                            tempColl[index].forum_report_id = "";
                        }
                        //Swal.fire('Success', result.data.response.msg, 'success')
                    } else {
                        Swal.fire('Oops...', result.data.response.msg, 'error')
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        });
    }

    const forumCommentEdit = (forum_comment_id, index, comment) => {  
        var regex = /<br\s*[\/]?>/gi;
        $("#edit_description" + forum_comment_id).css('display', 'block');
        $("#show_description" + forum_comment_id).css('display', 'none');
        $("#edit_input" + forum_comment_id).val(comment.replace(regex, "\n"))
    }

    const cancelClick = (forum_comment_id, index, comment) => {
        $("#edit_description" + forum_comment_id).css('display', 'none');
        $("#show_description" + forum_comment_id).css('display', 'block');
        $("#edit_error" + forum_comment_id).hide();
    }


    const replyEdit = (comment_id, index) => {

        if ($("#edit_input" + comment_id).val().trim() == '') {
            $("#edit_error" + comment_id).show();
        } else {
            $("#edit_error" + comment_id).hide();

            var textareaText = $("#edit_input" + comment_id).val();
            textareaText = textareaText.replace(/\r?\n/g, '<br />');            
            
            var obj = {
                forum_comment_id: comment_id,
                comment: textareaText
            }
            axios.post(api_url + "/forum/updateComment", obj)
                .then((result) => {
                    if (result.data.status) {
                        let tempColl = [...forumSubReplyCommentList];
                        tempColl[index].comment = textareaText
                        $("#edit_input" + comment_id).val('')
                        $("#edit_description" + comment_id).css('display', 'none');
                        $("#show_description" + comment_id).css('display', 'block');
                        setForumSubReplyCommentList(tempColl);

                    } else {
                        Swal.fire("Oops...", result.data.response.msg, "error");
                    }
                }).catch((err) => { console.log(err); });
        }
    }

    const forumCommentDelete = (comment_id, index) => {
        Swal.fire({
            //title: 'warning!',
            icon: 'warning',
            text: "Are you sure you want to delete comment ?",
            confirmButtonText: `Yes`,
            showCancelButton: true,
            cancelButtonText: 'No',
            cancelButtonColor: '#e57979',
        }).then((result) => {
            if (result.isConfirmed) { 
                var obj = {
                    forum_comment_id: comment_id
                }
                axios.post(api_url + "/forum/deleteComment", obj)
                    .then((result) => {
                        if (result.data.status) {
                           setForumSubReplyCommentList(forumSubReplyCommentList.filter(item => item.reply_comment_id !== comment_id));
                        } else {
                            Swal.fire("Oops...", result.data.response.msg, "error");
                        }
                    }).catch((err) => { console.log(err); });
            }
        });   
    }

    

    return (
        <div>
            {forumSubReplyCommentList && forumSubReplyCommentList.slice(0, replyVisible).map((subdata, index) => (
                <div key={subdata.reply_comment_id} className="forums-reply-card">
                    <div className="forums-reply-icon">
                        {!subdata.avatar && <img src="images/user.png" />}
                        {subdata.avatar && <img src={subdata.avatar} />}
                    </div>
                    <div className="forums-reply-text">

                        <div class="comment-dot-btn">
                            <h3><Link className="btn-edit" to={{ pathname: "/view-profile", search: "?id=" + subdata.user_id }}>{subdata.first_name} {subdata.last_name}</Link><span>({subdata.role})</span></h3>
                            <div class="Bars-view dropdown">
                                <a href="#" class="Bars-Btn-New dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                <ul class="dropdown-menu">
                                    {(loginUserID == subdata.user_id) && <li onClick={(e) => forumCommentEdit(subdata.reply_comment_id, index, subdata.comment)}><span className="forum_action"><i class="fa fa-pencil"></i> Edit</span></li>}
                                    {(loginUserID == subdata.user_id) && <li onClick={(e) => forumCommentDelete(subdata.reply_comment_id, index)}><span className="forum_action"><i class="fa fa-trash-o"></i> Delete</span></li>}
                                    <li onClick={(e) => forumReport(subdata.reply_comment_id, index, subdata.forum_report_id)}><span className="forum_action"><i class="fa fa-bug"></i> {(subdata.forum_report_id) ? "Reported" : "Report"}</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* <span onClick={(e) => forumReport(subdata.reply_comment_id, index, subdata.forum_report_id)} className="forum-report-reply"><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;
                        {(subdata.forum_report_id) ? "Reported" : "Report"}
                        </span>

                        {(loginUserID == subdata.user_id) && <span onClick={(e) => forumCommentEdit(subdata.reply_comment_id, index, subdata.comment)} className="forum-report">Edit</span>}
                        {(loginUserID == subdata.user_id) && <span onClick={(e) => forumCommentDelete(subdata.reply_comment_id, index)} className="forum-report">Delete</span>} */}

                        
                        <span>{subdata.created_at}</span>
                        

                        <div id={"show_description" + subdata.reply_comment_id}><ForumDescription description={subdata.comment}></ForumDescription></div>

                        <div className="row" id={"edit_description" + subdata.reply_comment_id} style={{ display: 'none' }}>
                            <div className="col-md-12">
                                <div className="new-forums-input-edit" id={subdata.reply_comment_id}>
                                    <TextareaAutosize minRows="2" maxRows="4" className="form-control" type="text" id={"edit_input" + subdata.reply_comment_id} name="comment" />
                                    
                                    <div className="comment-update-cancel">
                                        <button type="submit" onClick={(e) => replyEdit(subdata.reply_comment_id, index)} className="add-comment-btn">Update</button>
                                        <button type="submit" onClick={(e) => cancelClick(subdata.reply_comment_id, index)} className="add-comment-btn cancel-btn">Cancel</button>
                                    </div>
                                    <small style={{ display: 'none' }} id={"edit_error" + subdata.reply_comment_id} className="error">Comment is required.</small>
                                </div>
                            </div>
                        </div>

                       

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














