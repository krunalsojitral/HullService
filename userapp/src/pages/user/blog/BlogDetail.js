import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../../components/Apiurl';
import './../../dev.css';
import { useModal } from 'react-hooks-use-modal';
import PurchaseModel from "./../../PurchaseModel";
import { useHistory } from "react-router-dom";

export default function BlogDetail() {
    let history = useHistory();

    const [blogId, setBlogId] = React.useState(0)
    const [blogDetail, setBlogDetail] = React.useState({})
    const [blogCost, setBlogCost] = React.useState({})
  //  const [blogPaid, setBlogPaid] = React.useState(false)
    const [relatedBlogDetail, setRelatedBlogDetail] = React.useState([])

    React.useEffect(() => {        

        const params = new URLSearchParams(window.location.search) // id=123
        let blog_id = params.get('id')
        setBlogId(blog_id);

        axios.post(api_url + '/blog/addView', { "blog_id": blog_id }).then((result) => {
            if (result.data.status) { }
        }).catch((err) => { console.log(err); })

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        if (token) {
            axios.post(api_url + '/blog/getBlogDataByIdAfterLogin', { blog_id }, config).then((result) => {
                if (result.data.status) {
                    var blogdata = result.data.response.data;
                    if (blogdata.purchase_type == "unpaid") {
                        setBlogDetail(blogdata);
                    } else {
                        if (blogdata.purchase_type == "unpaid") {
                            setBlogDetail(blogdata);
                        } else {
                            setBlogCost(blogdata.cost);
                            if (!token) {
                                open()
                            } else {                                
                                if (blogdata.blog_order){                                  
                                    setBlogDetail(blogdata);
                                }else{                                    
                                    open()
                                }                                
                                
                            }
                        }
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
            axios.post(api_url + '/blog/getRelatedPaidBlogList', { "blog_id": blog_id }, config).then((result) => {
                if (result.data.status) {
                    var blogdata = result.data.response.data;
                    setRelatedBlogDetail(blogdata);
                }
            }).catch((err) => { console.log(err); })
        } else {
            axios.post(api_url + '/blog/getBlogDataById', { blog_id }).then((result) => {
                if (result.data.status) {
                    var blogdata = result.data.response.data;
                    if (blogdata.purchase_type == "unpaid") {
                        setBlogDetail(blogdata);
                    } else {
                        if (blogdata.purchase_type == "unpaid") {
                            setBlogDetail(blogdata);
                        } else {                            
                            open();
                            // if (!token) {
                            //     open()
                            // } else {
                            //     console.log(blogdata);
                            //    // setBlogPaid(true);
                            //     setBlogDetail(blogdata);
                            // }
                        }
                    }
                } else {
                    Swal.fire('Oops...', result.data.response.msg, 'error')
                }
            }).catch((err) => {
                console.log(err);
            })
            axios.post(api_url + '/blog/getRelatedUnpaidBlogList', { "blog_id": blog_id }).then((result) => {
                if (result.data.status) {
                    var blogdata = result.data.response.data;
                    setRelatedBlogDetail(blogdata);
                }
            }).catch((err) => { console.log(err); })
        }

        

    }, [])

    const [Modal, open, close] = useModal('root', {});

    const linkTarget = (id) => {
        history.replace("/blog-detail?id=" + id);
        window.location.reload();
    };
   
    return (
        <div>
            <Header />

            <Modal>
                <PurchaseModel close={close} blogDetail={blogId} cost={blogCost}></PurchaseModel>
            </Modal>

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Blogs</h2>
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
                                    <h2>{blogDetail.title}</h2>
                                </div>                                
                                <div className="research-box">                                    
                                    <div className="research-profile">
                                        <img src="images/favicon.png" alt="author" />
                                        <p>Hull Service</p>
                                    </div>
                                        <div className="research-date">
                                        <label>{blogDetail.created_at}</label>
                                        </div>
                                        <div>
                                        {/* {blogPaid && <Link to={{ pathname: "/blog-payment", search: "?id=" + blogDetail.blog_id }}>
                                            Purchase Blog</Link>
                                        } */}
                                        </div>
                                    </div>
                                {blogDetail.image && <div className="video-image"><img src={blogDetail.image} alt="author" /></div>}
                                
                                <div className="editor-text" dangerouslySetInnerHTML={{ __html: blogDetail.description }}></div>
                                </div>
                            </div>
                        <div className="col-md-3 article-tags">
                            {blogDetail.tag && blogDetail.tag.length > 0 &&
                            <div className="video-tag">
                                <h3>Tags</h3>
                                <ul> {blogDetail.tag.map(data => (<li><a href="javascript:;">{data.label}</a></li> ))} </ul>
                            </div>}
                            <div className="video-list">
                                <h3>Other Blogs </h3>
                                <div className="video-list-card">
                                    {relatedBlogDetail.map(data => (
                                        <div className="video-list-view">
                                            <div className="video-list-icon">    
                                                <a onClick={(e) => linkTarget(data.blog_id)}>
                                                    {data.image && <img src={data.image} alt="blog" />}
                                                    {!data.image && <img src="images/blog.jpg" alt="blog" />}
                                                </a>                                                            
                                            </div>
                                            <div className="video-list-text">
                                                {/* <h3>{data.title}</h3> */}
                                                <a onClick={(e) => linkTarget(data.blog_id)}><h3>{data.title.slice(0, 46)}</h3></a>
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