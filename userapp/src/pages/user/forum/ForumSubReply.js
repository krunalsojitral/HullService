import React, { useEffect, useState } from 'react'
import ForumDescription from "./ForumDescription";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import api_url from '../../../components/Apiurl';
import Swal from "sweetalert2";

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

    return (
        <div>
            {forumSubReplyCommentList && forumSubReplyCommentList.slice(0, replyVisible).map((subdata, index) => (
                <div key={subdata.reply_comment_id} className="forums-reply-card">
                    <div className="forums-reply-icon">
                        {!subdata.avatar && <img src="images/user.png" />}
                        {subdata.avatar && <img src={subdata.avatar} />}
                    </div>
                    <div className="forums-reply-text">
                        <h3><Link className="btn-edit" to={{ pathname: "/view-profile", search: "?id=" + subdata.user_id }}>{subdata.first_name} {subdata.last_name}</Link><span>({subdata.role})</span></h3>
                        <span>{subdata.created_at}</span>
                        <ForumDescription description={subdata.comment}></ForumDescription>
                        <span onClick={(e) => forumReport(subdata.reply_comment_id, index, subdata.forum_report_id)} className="forum-report-reply"><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;
                        {(subdata.forum_report_id) ? "Reported" : "Report"}
                        </span>
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














