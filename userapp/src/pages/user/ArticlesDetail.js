import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import { useModal } from 'react-hooks-use-modal';
import DirectionModel from "./../DirectionModel";
import { useHistory } from "react-router-dom";

export default function ArticlesDetail() {
    let history = useHistory();
    const [articleId, setArticleId] = React.useState(0)
    const [articleDetail, setArticleDetail] = React.useState({})
    const [articleCost, setArticleCost] = React.useState({})
    const [relatedArticleDetail, setRelatedArticleDetail] = React.useState([])
    //const [showModal, setShowModal] = useState(false);


    // const ref = useRef();

    // useOnClickOutside(ref, () => setShowModal(false));

    // function useOnClickOutside(ref, handler) {
    //     React.useEffect(
    //         () => {
    //             const listener = (event) => {
    //                 // Do nothing if clicking ref's element or descendent elements
    //                 if (!ref.current || ref.current.contains(event.target)) {
    //                     return;
    //                 }
    //                 handler(event);
    //             };
    //             document.addEventListener("mousedown", listener);
    //             document.addEventListener("touchstart", listener);
    //             return () => {
    //                 console.log('in');
    //                 document.removeEventListener("mousedown", listener);
    //                 document.removeEventListener("touchstart", listener);
    //             };
    //         },
    //         // Add ref and handler to effect dependencies
    //         // It's worth noting that because the passed-in handler is a new ...
    //         // ... function on every render that will cause this effect ...
    //         // ... callback/cleanup to run every render. It's not a big deal ...
    //         // ... but to optimize you can wrap handler in useCallback before ...
    //         // ... passing it into this hook.
    //         [ref, handler]
    //     );
    // }

    React.useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let article_id = params.get('id')
        setArticleId(article_id);

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        axios.post(api_url + '/article/getArticleDataById', { article_id }).then((result) => {
            if (result.data.status) {
                var articledata = result.data.response.data;
                if (articledata.purchase_type == "unpaid"){
                    setArticleDetail(articledata);
                }else{
                    if (articledata.purchase_type == "unpaid") { 
                        setArticleDetail(articledata);
                    }else{
                        setArticleCost(articledata.cost);
                        open()
                    }

                    // if (!token){
                    //     open()
                    // }else{
                    //     setArticleDetail(articledata);
                    // }
                    
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })

        if (token) {
            axios.post(api_url + '/article/getRelatedPaidArticleList', { "article_id": article_id }, config).then((result) => {
                if (result.data.status) {
                    var articledata = result.data.response.data;
                    setRelatedArticleDetail(articledata);
                }
            }).catch((err) => { console.log(err); })
        } else {
            axios.post(api_url + '/article/getRelatedUnpaidArticleList', { "article_id": article_id }).then((result) => {
                if (result.data.status) {
                    var articledata = result.data.response.data;
                    setRelatedArticleDetail(articledata);
                }
            }).catch((err) => { console.log(err); })
        }
    }, [])

    const [Modal, open, close] = useModal('root', {});

    const linkTarget = (id) => {
        history.replace("/article-detail?id=" + id);
        window.location.reload();
    };

    return (
        <div>
            <Header />
            <Modal>
                <DirectionModel close={close} cost={articleCost} articleDetail={articleId}></DirectionModel>
            </Modal>
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Article</h2>
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
                        <div className="col-md-7 bg-white">
                            <div className="research-main">
                                <div className="research-title">
                                    <h2>{articleDetail.title}</h2>
                                </div>
                                <div className="research-box">
                                    <div className="research-profile">
                                        <img src="images/hull-icon.png" alt="author" />
                                        <p>Hull Service</p>
                                    </div>
                                    <div className="research-date">
                                        <label>{articleDetail.created_at}</label>
                                    </div>
                                </div>
                                {articleDetail.image && <div className="video-image"><img src={articleDetail.image} alt="author" /></div>}
                                <div dangerouslySetInnerHTML={{ __html: articleDetail.description }}></div>
                            </div>
                        </div>
                        <div className="col-md-3 article-tags">
                            {articleDetail.tag && articleDetail.tag.length > 0 &&
                                <div className="video-tag">
                                    <h3>Tags</h3>
                                    <ul>
                                    {/* className="active" */}
                                        {articleDetail.tag.map(data => (<li><a href="javascript:;">{data.label}</a></li>))}
                                    </ul>
                                </div>}
                            <div className="video-list">
                                <h3>Other Articles </h3>
                                <div className="video-list-card">
                                    {relatedArticleDetail.map(data => (
                                        <div className="video-list-view">
                                            <div className="video-list-icon">
                                                <a onClick={(e) => linkTarget(data.article_id)}>
                                                    {data.image && <img src={data.image} alt="blog" />}
                                                    {!data.image && <img src="images/blog.jpg" alt="blog" />}
                                                </a>                                                
                                            </div>
                                            <div className="video-list-text">
                                                {/* <h3>{data.title}</h3> */}
                                                <a onClick={(e) => linkTarget(data.article_id)}><h3>{data.title.slice(0, 46)}</h3></a>
                                                <p>{data.created_at}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}