import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import axios from 'axios';
import api_url from '../../../components/Apiurl';
import Swal from "sweetalert2";
import TextareaAutosize from 'react-textarea-autosize';
import $ from 'jquery';
import { useModal } from 'react-hooks-use-modal';
import { useForm, Controller } from "react-hook-form";
import ForumReply from "./ForumReply";
import ForumDescription from "./ForumDescription";


export default function ForumDetail() {

    const [forumCommentList, setForumCommentList] = useState([]);
    const [visible, setVisible] = useState(3);
    const [forumCommentDetail, setForumCommentDetail] = useState([]);
    const [forumId, setForumId] = useState([]);
    const [hideLoad, setHideLoad] = useState(false);
    const [loginUserID, setLoginUserID] = useState();
    const [Modal, open, close] = useModal('root', {});

    React.useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let forum_id = params.get('id')
        setForumId(forum_id);
        getNewList(forum_id);
        getCommentDetail(forum_id);
        getCommentDetailWrap(forum_id);

        const typeString = localStorage.getItem('userdata');
        var usersessiondata = JSON.parse(typeString);
        setLoginUserID(usersessiondata.id)

    }, []);

    React.useEffect(() => {
        if (forumCommentList.length > 0 && parseInt(forumCommentList.length) > parseInt(visible)) {
            setHideLoad(true);
        } else {
            setHideLoad(false);
        }
    }, [visible, forumCommentList]);


    const getNewList = (forum_id) => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        var obj = {
            'forum_id': forum_id
        }

        axios.post(api_url + '/forum/getForumCommentList', obj, config).then((result) => {
            if (result.data.status) {
                var forumdata = result.data.response.data;
                if (forumdata) {
                    if (forumCommentList.length > 0 && parseInt(forumCommentList.length) > parseInt(visible)) {
                        setHideLoad(true);
                    }
                    setForumCommentList(forumdata);
                }
            } else {
                // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })
    }

    const handleFollow = (id) => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/forum/followUser', { "forum_id": forumId }, config).then((result) => {
            if (result.data.status) {
                forumCommentDetail.follow = 1
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleUnFollow = () => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/forum/unfollowUser', { "forum_id": forumId }, config).then((result) => {
            if (result.data.status) {
                forumCommentDetail.follow = 0
            }
        }).catch((err) => {
            console.log(err);
        })
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
                comment: textareaText
            }
            axios.post(api_url + "/forum/addComment", obj, config)
                .then((result) => {
                    if (result.data.status) {
                        $("#" + comment_id).css('display', 'none');
                        let tempColl = [...forumCommentList];
                        //tempColl[index].reply = [result.data.response.data, ...tempColl[index].reply]
                        tempColl[index].reply = result.data.response.data
                        $("#input" + comment_id).val('')
                        setForumCommentList(tempColl);

                    } else {
                        Swal.fire("Oops...", result.data.response.msg, "error");
                    }
                }).catch((err) => { console.log(err); });
        }
    }

    const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm({});

    const onSubmit = (data, e) => {

        var textareaText = data.comment;
        textareaText = textareaText.replace(/\r?\n/g, '<br />');

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        data.forum_id = forumId;
        data.comment = textareaText;
        axios.post(api_url + "/forum/addComment", data, config)
            .then((result) => {
                if (result.data.status) {

                    let tempColl = [result.data.response.data, ...forumCommentList]
                    setForumCommentList(tempColl);
                    forumCommentDetail.replies = parseInt(forumCommentDetail.replies) + parseInt(1);
                    setForumCommentDetail(forumCommentDetail);
                    if (forumCommentList.length > 0 && parseInt(forumCommentList.length) > parseInt(visible)) {
                        setHideLoad(true);
                    }
                    reset()
                    e.target.reset();
                    setValue("comment", "")

                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            }).catch((err) => { console.log(err); });
    }

    // const forumlikeClick = () => {
    //     const tokenString = localStorage.getItem('token');
    //     var token = JSON.parse(tokenString);
    //     const config = {
    //         headers: { Authorization: `${token}` }
    //     };
    //     var obj = {
    //         "forumid": forumId,
    //         "action_type": 'like'
    //     }
    //     axios.post(api_url + '/forum/forumLike', obj, config).then(response => {
    //         var res = response.data;
    //         if (res.status) {
    //             getCommentDetailWrap(forumId);
    //         }
    //     }).catch(function (error) { console.log(error); });
    // };

    // const forumdislikeClick = () => {
    //     const tokenString = localStorage.getItem('token');
    //     var token = JSON.parse(tokenString);
    //     const config = {
    //         headers: { Authorization: `${token}` }
    //     };
    //     var obj = {
    //         "forumid": forumId,
    //         "action_type": 'unlike'
    //     }
    //     axios.post(api_url + '/forum/forumLike', obj, config).then(response => {
    //         var res = response.data;
    //         if (res.status) {
    //             getCommentDetailWrap(forumId);
    //         }
    //     }).catch(function (error) { console.log(error); });
    // };

    const getCommentDetailWrap = (forum_id) => {
        getCommentDetail(forum_id, setForumCommentDetail);
    };

    const getCommentDetail = (forum_id) => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.post(api_url + '/forum/getForumCommentDetail', { 'forum_id': forum_id }, config).then((result) => {
            if (result.data.status) {
                var forumDetailData = result.data.response.data;
                setForumCommentDetail(forumDetailData);
            } else {
                // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })
    }

    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }

    const forumReport = (forum_comment_id, index, report_id) => {        
        var message = '';
        if (report_id){
            message = 'Are you sure you want to unreport this Comment?'
        }else{
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
                        if (result.data.response.data.length > 0){
                            let tempColl = [...forumCommentList];
                            tempColl[index].forum_report_id = result.data.response.data[0].forum_report_id;
                        }else{
                            let tempColl = [...forumCommentList];
                            tempColl[index].forum_report_id = '';
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
                        let tempColl = [...forumCommentList];
                        tempColl[index].comment = textareaText
                        $("#edit_input" + comment_id).val('')
                        $("#edit_description" + comment_id).css('display', 'none');
                        $("#show_description" + comment_id).css('display', 'block');
                        setForumCommentList(tempColl);

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
                            setForumCommentList(forumCommentList.filter(item => item.forum_comment_id !== comment_id));
                    } else {
                        Swal.fire("Oops...", result.data.response.msg, "error");
                    }
                }).catch((err) => { console.log(err); });
            }
        });    
        
    }

    

    // const forumCommentLikeClick = (comment_id, index) => {
    //     const tokenString = localStorage.getItem('token');
    //     var token = JSON.parse(tokenString);
    //     const config = { headers: { Authorization: `${token}` } };
    //     var obj = {
    //         "comment_id": comment_id,
    //         "action_type": 'like'
    //     }
    //     axios.post(api_url + '/forum/forumCommentLike', obj, config).then(response => {
    //         var res = response.data;
    //         if (res.status) {
    //             let tempColl = [...forumCommentList];
    //             if (res.response.data == 'like') {

    //                 tempColl[index].like_comment_count = parseInt(tempColl[index].like_comment_count) + parseInt(1);
    //                 tempColl[index].comment_like_id = 1;
    //                 if (tempColl[index].comment_dislike_id > 0) {
    //                     tempColl[index].unlike_comment_count = (parseInt(tempColl[index].unlike_comment_count) > 0) ? parseInt(tempColl[index].unlike_comment_count) - parseInt(1) : parseInt(tempColl[index].unlike_comment_count);
    //                     tempColl[index].comment_dislike_id = '';
    //                 }

    //             } else {
    //                 tempColl[index].like_comment_count = (parseInt(tempColl[index].like_comment_count) > 0) ? parseInt(tempColl[index].like_comment_count) - parseInt(1) : parseInt(tempColl[index].like_comment_count);
    //                 tempColl[index].comment_like_id = '';
    //             }
    //             setForumCommentList(tempColl);
    //         }
    //     }).catch(function (error) { console.log(error); });
    // }

    // const forumCommentDisLikeClick = (comment_id, index) => {
    //     const tokenString = localStorage.getItem('token');
    //     var token = JSON.parse(tokenString);
    //     const config = { headers: { Authorization: `${token}` } };
    //     var obj = { "comment_id": comment_id, "action_type": 'unlike' }
    //     axios.post(api_url + '/forum/forumCommentLike', obj, config).then(response => {
    //         var res = response.data;
    //         if (res.status) {
    //             let tempColl = [...forumCommentList];
    //             if (res.response.data == 'like') {
    //                 tempColl[index].unlike_comment_count = parseInt(tempColl[index].unlike_comment_count) + parseInt(1);
    //                 tempColl[index].comment_dislike_id = 1;

    //                 if (tempColl[index].comment_like_id > 0) {
    //                     tempColl[index].like_comment_count = (parseInt(tempColl[index].like_comment_count) > 0) ? parseInt(tempColl[index].like_comment_count) - parseInt(1) : parseInt(tempColl[index].like_comment_count);
    //                     tempColl[index].comment_like_id = '';
    //                 }
    //             } else {
    //                 tempColl[index].unlike_comment_count = (parseInt(tempColl[index].unlike_comment_count) > 0) ? parseInt(tempColl[index].unlike_comment_count) - parseInt(1) : parseInt(tempColl[index].unlike_comment_count);
    //                 tempColl[index].comment_dislike_id = '';
    //             }
    //             setForumCommentList(tempColl);
    //         }
    //     }).catch(function (error) { console.log(error); });
    // }



    return (
        <div>
            <Header />

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Forum</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="dashboard-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 side-col">
                            <Sidebar />
                        </div>

                        <div className="col-md-10">
                            <div className="new-forums-card">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="new-forums-blog">
                                            {forumCommentDetail.started && <small>{forumCommentDetail.started}</small>}
                                            <h3>{forumCommentDetail.forum_title && forumCommentDetail.forum_title}</h3>
                                            {forumCommentDetail.forum_description && <p dangerouslySetInnerHTML={{ __html: forumCommentDetail.forum_description }}></p>}
                                        </div>
                                        {forumCommentDetail.retire == 1 &&
                                            <div className="message-card">
                                                <div className="message-icon">
                                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                                </div>
                                                <div className="message-text">
                                                    <h2>This thread has been closed by the moderators of hull services</h2>
                                                    <p>New comments cannot be posted</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {forumCommentDetail.retire == 0 &&
                                        <div className="col-md-12">
                                            <div className="new-forums-input">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <Controller
                                                        name={"comment"}
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field: { onChange, value } }) => (
                                                            <TextareaAutosize
                                                                maxRows="4"
                                                                minRows="2"
                                                                type="text"
                                                                name="comment"
                                                                id="main-comment"
                                                                onChange={onChange}
                                                                value={value}
                                                                className="form-control"
                                                                placeholder={`Add Comment`}
                                                            />
                                                        )}
                                                    ></Controller>
                                                    {errors.comment && errors.comment.type === "required" && (
                                                        <small className="error">Comment is required.</small>
                                                    )}
                                                    <button type="submit" className="add-comment-btn">Add Comment</button>
                                                </form>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="new-forums-count">
                                            <span>{forumCommentDetail.replies}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="new-forums-follow-btn">
                                            {forumCommentDetail.follow == 0 && <span className="btn-follow" onClick={(e) => handleFollow()} >
                                                <img src="images/add-user.png" /> Follow
                                            </span>}
                                            {forumCommentDetail.follow == 1 && <span className="btn-follow" onClick={(e) => handleUnFollow()} >
                                                <img src="images/add-user.png" /> Following
                                            </span>}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {forumCommentList && forumCommentList.slice(0, visible).map((data, index) => (
                                    <div key={data.forum_comment_id} className="new-forums-reply">
                                        <div className="forums-reply-card">
                                            <div className="forums-reply-icon">
                                                {!data.avatar && <img src="images/user.png" />}
                                                {data.avatar && <img src={data.avatar} />}
                                                <img src="images/user.png" />
                                            </div>
                                            <div className="forums-reply-text">    
                                            <div class="comment-dot-btn">
                                                <h3><Link className="btn-edit" to={{ pathname: "/view-profile", search: "?id=" + data.user_id }}>{data.first_name} {data.last_name}</Link><span>({data.role})</span></h3>
                                                <div class="Bars-view dropdown">
                                                    <a href="#" class="Bars-Btn-New dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                                    <ul class="dropdown-menu">                                                        
                                                        {(loginUserID == data.user_id) && <li onClick={(e) => forumCommentEdit(data.forum_comment_id, index, data.comment)}><span className="forum_action"><i class="fa fa-pencil"></i> Edit</span></li>}
                                                        {(loginUserID == data.user_id) && <li onClick={(e) => forumCommentDelete(data.forum_comment_id, index)}><span className="forum_action"><i class="fa fa-trash-o"></i> Delete</span></li>}
                                                        <li onClick={(e) => forumReport(data.forum_comment_id, index, data.forum_report_id)}><span className="forum_action"><i class="fa fa-bug"></i> {(data.forum_report_id) ? "Reported" : "Report"}</span></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* {(loginUserID == data.user_id) && <span onClick={(e) => forumCommentEdit(data.forum_comment_id, index, data.comment)} className="forum-report">Edit</span>}
                                            {(loginUserID == data.user_id) && <span onClick={(e) => forumCommentDelete(data.forum_comment_id, index)} className="forum-report">Delete</span>}

                                            <span onClick={(e) => forumReport(data.forum_comment_id, index, data.forum_report_id)} className="forum-report">
                                                <i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;{(data.forum_report_id) ? "Reported" : "Report"}
                                            </span> */}


                                                <span>{data.created_on}</span>
                                                <div id={"show_description" + data.forum_comment_id}><ForumDescription description={data.comment}></ForumDescription></div>

                                                <div className="row" id={"edit_description" + data.forum_comment_id} style={{ display: 'none' }}>
                                                    <div className="col-md-12">
                                                        <div className="new-forums-input-edit">
                                                            <TextareaAutosize minRows="2" maxRows="4" className="form-control" type="text" id={"edit_input" + data.forum_comment_id} name="comment" />
                                                            <div className="comment-update-cancel">
                                                                <button type="submit" onClick={(e) => replyEdit(data.forum_comment_id, index)} className="add-comment-btn">Update</button>
                                                                <button type="submit" onClick={(e) => cancelClick(data.forum_comment_id, index)} className="add-comment-btn cancel-btn">Cancel</button>
                                                            </div>
                                                            <small style={{ display: 'none' }} id={"edit_error" + data.forum_comment_id} className="error">Comment is required.</small>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    {forumCommentDetail.retire == 1 && <span className="Reply-Btn-New">Reply <i className="fa fa-reply"></i></span>}
                                                    {forumCommentDetail.retire == 0 && <span onClick={(e) => reply(data.forum_comment_id)} className="Reply-Btn-New">Reply <i className="fa fa-reply"></i></span>}
                                                </div>                                                
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="new-forums-input" id={data.forum_comment_id} style={{ display: 'none' }}>
                                                            <TextareaAutosize minRows="2" maxRows="4" className="form-control" type="text" id={"input" + data.forum_comment_id} name="comment" />
                                                            <button type="submit" onClick={(e) => replySubmit(data.forum_comment_id, index)} className="add-comment-btn">Reply</button>
                                                            <small id={"error" + data.forum_comment_id} style={{ display: 'none' }} className="error">Comment is required.</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                {data.reply && <ForumReply close={close} replyDetail={data.reply} replyForumId={forumId}></ForumReply>}
                                            </div>
                                        </div>
                                    </div>
                            ))}

                            <div className="loadmore">
                                {(hideLoad) && <span onClick={showMoreItems}>View more comments</span>}
                            </div>

                        </div>

                        {/* <div className="col-md-10">
                            <div className="category-table">
                                <div className="breadcrumbs-main"> <a href="javascript:;">{"<<"} Back to Forum Categories</a> </div>  
                                <div className="cat-title">
                                    <div>
                                        <h2 className="mb-0"> {forumCommentDetail.forum_title && forumCommentDetail.forum_title} </h2>
                                        {forumCommentDetail.forum_description && <p dangerouslySetInnerHTML={{ __html: forumCommentDetail.forum_description }}></p>}                                        
                                        {forumCommentDetail.started && <p className="forum-date">{forumCommentDetail.started}</p>}
                                    </div>
                                </div>
                                {forumCommentDetail.retire == 1 && 
                                    <div className="message-card">
                                    <div className="message-icon">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                        </div>
                                    <div className="message-text">
                                         <h2>This thread has been closed by the moderators of hull services</h2>
                                            <p>New comments cannot be posted</p>
                                        </div>
                                    </div>
                                }
                                {forumCommentDetail.retire == 1 && <br/>}
                                {forumCommentDetail.retire == 0 &&  <div className="row comment-box">
                                   
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="forum-comment-textarea">
                                            <Controller
                                                name={"comment"}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <TextareaAutosize
                                                        maxRows="4"
                                                        type="text"
                                                        name="comment"
                                                        id="main-comment"
                                                        onChange={onChange}
                                                        value={value}
                                                        className="form-control"
                                                        placeholder={`Add Comment`}
                                                    />
                                                )}
                                            ></Controller>
                                            {errors.comment && errors.comment.type === "required" && (
                                                <small className="error">Comment is required.</small>
                                            )}
                                        </div>
                                        <div className="forum-comment-button">
                                            <button type="submit" className="add-comment">Add Comment</button>
                                        </div>
                                    </form>
                                </div>}

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="dislike-like">
                                            <ul>
                                                <li> <i className="fa fa-comment"></i> <span>{forumCommentDetail.replies}</span> </li>
                                            </ul>
                                        </div>   
                                    </div>
                                    <div className="col-md-4">
                                        <div className="follow">
                                            {forumCommentDetail.follow == 0 && <span onClick={(e) => handleFollow()} >
                                                Follow
                                            </span>}
                                            {forumCommentDetail.follow == 1 && <span onClick={(e) => handleUnFollow()} >
                                                Following
                                            </span>}
                                        </div>
                                    </div>
                                </div>
                                {forumCommentList && forumCommentList.slice(0, visible).map((data, index) => (
                                    <div key={index} className="research-main">
                                        <div className="research-box">
                                            <div className="research-detail">
                                                <p>{data.first_name} {data.last_name}  <span className="researcher">( {data.role} )</span>  </p>
                                                <div className="research-date">
                                                    <label>{data.created_on}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="forum-text">

                                            {forumCommentDetail.retire == 1 && 
                                            <div className="forum-comments">
                                                
                                                <p><img src="images/reply.png" alt="reply" /> <span>Reply</span></p>
                                            </div>}

                                            {forumCommentDetail.retire == 0 && 
                                            <div className="forum-comments">
                                                
                                                <p onClick={(e) => reply(data.forum_comment_id)}><img src="images/reply.png" alt="reply" /> <span>Reply</span></p>
                                            </div>} 

                                            <ForumDescription description={data.comment}></ForumDescription>                                            
                                            <div className="reply-box" id={data.forum_comment_id} style={{ display: 'none' }}>
                                                <TextareaAutosize maxRows="4" className="form-control" type="text" id={"input" + data.forum_comment_id} name="comment" />
                                                <small id={"error" + data.forum_comment_id} style={{ display: 'none' }} className="error">Comment is required.</small>
                                                <button type="submit" onClick={(e) => replySubmit(data.forum_comment_id, index)}>Reply</button>
                                            </div>

                                            {data.reply && <ForumReply close={close} replyDetail={data.reply} replyForumId={forumId}></ForumReply>}  
                                        </div>
                                    </div>

                                ))}
                            </div>
                            <div className="loadmore">
                                {(hideLoad) && <span onClick={showMoreItems}>View more comments</span>}
                            </div>
                        </div> */}

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
















