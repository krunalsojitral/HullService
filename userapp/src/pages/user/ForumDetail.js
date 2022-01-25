import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import api_url from '../../components/Apiurl';
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
    const [Modal, open, close] = useModal('root', {});

    React.useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let forum_id = params.get('id')
        setForumId(forum_id);
        getNewList(forum_id);
        getCommentDetail(forum_id);
        getCommentDetailWrap(forum_id);

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
                            <div className="category-table">
                                {/* <div className="breadcrumbs-main"> <a href="javascript:;">
                                {"<<"} Back to Forum Categories</a> </div>  */}
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

                                        {/* {forumCommentDetail.retire == 1 && <div className="dislike-like">
                                            <ul>
                                                <li className={forumCommentDetail.user_like === 1 ? 'liked' : ''}> <i className="fa fa-thumbs-o-up"></i> <span>{forumCommentDetail.likes}</span> </li>
                                                <li className={forumCommentDetail.user_dislike === 1 ? 'liked' : ''}> <i className="fa fa-thumbs-o-down"></i> <span>{forumCommentDetail.unlikes}</span> </li>
                                                <li> <i className="fa fa-comment"></i> <span>{forumCommentDetail.replies}</span> </li>
                                            </ul>
                                        </div>}
                                        {forumCommentDetail.retire == 0 && <div className="dislike-like">
                                            <ul>
                                                <li className={forumCommentDetail.user_like === 1 ? 'liked' : ''} onClick={() => forumlikeClick()}> <i className="fa fa-thumbs-o-up"></i> <span>{forumCommentDetail.likes}</span> </li>
                                                <li className={forumCommentDetail.user_dislike === 1 ? 'liked' : ''} onClick={() => forumdislikeClick()}> <i className="fa fa-thumbs-o-down"></i> <span>{forumCommentDetail.unlikes}</span> </li>
                                                <li> <i className="fa fa-comment"></i> <span>{forumCommentDetail.replies}</span> </li>
                                            </ul>
                                        </div>} */}
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
                                                {/* <p className={(data.comment_like_id && data.comment_like_id > 0) ? 'comment-liked' : ''}>
                                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                                    <span>+{data.like_comment_count}</span>
                                                </p>
                                                <p className={(data.comment_dislike_id && data.comment_dislike_id > 0) ? 'comment-liked' : ''}>
                                                    <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                                                    <span>+{data.unlike_comment_count}</span>
                                                </p> */}
                                                <p><img src="images/reply.png" alt="reply" /> <span>Reply</span></p>
                                            </div>}

                                            {forumCommentDetail.retire == 0 && 
                                            <div className="forum-comments">
                                                {/* <p className={(data.comment_like_id && data.comment_like_id > 0) ? 'comment-liked' : ''} onClick={() => forumCommentLikeClick(data.forum_comment_id, index)}>
                                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                                    <span>{data.like_comment_count}</span>
                                                </p>
                                                <p className={(data.comment_dislike_id && data.comment_dislike_id > 0) ? 'comment-liked' : ''} onClick={() => forumCommentDisLikeClick(data.forum_comment_id, index)}>
                                                    <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                                                    <span>{data.unlike_comment_count}</span>
                                                </p> */}
                                                <p onClick={(e) => reply(data.forum_comment_id)}><img src="images/reply.png" alt="reply" /> <span>Reply</span></p>
                                            </div>} 


                                            <ForumDescription description={data.comment}></ForumDescription>

                                            {/* <p dangerouslySetInnerHTML={{ __html: data.comment }}></p> */}

                                            {/* <div className="reply-list">
                                                {data.reply && data.reply.slice(0, visible).map((replydata, index) => (
                                                    <div className="reply-card">
                                                        <h3>{replydata.first_name} {replydata.last_name} <span>({replydata.role})</span></h3>
                                                        <small>{replydata.created_on}</small>
                                                        <p dangerouslySetInnerHTML={{ __html: replydata.comment }}></p>
                                                    </div>
                                                ))}
                                            </div>                                            */}

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
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
















