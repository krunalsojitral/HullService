import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import { useForm } from "react-hook-form";


export default function Forum() {
   
    const [forumList, setForumList] = useState([]);
    const [forumTagList, setForumTagList] = useState([]);
    const [token, setToken] = useState('');
    const [searchtext, setSearchtext] = React.useState('')
    const { handleSubmit, formState } = useForm();
    const [selectedForumTag, setSelectedForumTag] = useState([]);

    const onChangeSearch = (e) => { setSearchtext(e.currentTarget.value); }

    React.useEffect(() => { 

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);

        axios.post(api_url + '/forum/getForumHeadingList',{}).then((result) => {
            if (result.data.status) {
                var forumdata = result.data.response.data;
                setForumList(forumdata);
            } else {
               // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })

        axios.get(api_url + '/forum/getForumTagList',{}).then((result) => {
            if (result.data.status) {
                var tagdata = result.data.response.data;                
                setForumTagList(tagdata);
            } else {
               // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })
    }, [])

    const search = () => {        
        var obj = {
            "search": searchtext,            
        }
        axios.post(api_url + '/forum/getForumHeadingList', obj).then((result) => {
            if (result.data.status) {
                var tagdata = result.data.response.data;                
                setForumList(tagdata);
                setSelectedForumTag(result.data.response.forum_id)
            } else {
                // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })
    }
   

    return(
        <div>
            <Header/>
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
                        <div className="col-md-7">
                            
                            {forumList.map((data, index) => (
                                 <div className="category-table">

                                    <div className="category-maintitle">

                                        <div className="category-title">
                                            <h2 className="mb-0 mt-0">{data.forumheading_name}</h2>
                                            <Link to={{ pathname: "/forum-sub", search: "?id=" + data.forumheading_id }}>
                                                View More >>
                                        </Link>
                                        </div>

                                        {token && <div className="add-forum">                                            
                                            <Link className="book-apoint" to={{ pathname: "/add-forum" }}>
                                                Add Forum
                                            </Link>
                                        </div>}

                                     </div>

                                    
                                    


                                   

                                    
                                    <div className="forum-table table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Topic Title</th>
                                                    <th>Category</th>
                                                    <th>Replies</th>
                                                    <th>Views</th>
                                                    <th>Last Post</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.forum.map((forumdata, index) => (
                                                    <tr>
                                                        <td>{forumdata.topic}</td>
                                                        <td>{forumdata.category_name}</td>
                                                        <td>{forumdata.total_view}</td>
                                                        <td>{(forumdata.comment && forumdata.comment.length > 0) ? forumdata.comment[0].forum_comment_count :'0' }</td>
                                                        <td>{(forumdata.comment && forumdata.comment.length > 0) ? forumdata.comment[0].comment : '-'} <span>10 minutes ago</span></td>
                                                    </tr>
                                                ))}                                             
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="pagination"></div>
                                </div>
                             ))} 

                            {
                                forumList.length == 0 &&
                                <div className="blog-box">
                                    <div className="no-data">No forum available.</div>
                                </div>
                            }
                           
                        </div>
                        <div className="col-md-3 article-tags">

                            <div className="search-box">
                                <form onSubmit={handleSubmit(search)}>
                                    <div className="form-group">
                                        <button type="button"><img src="images/search.png" alt="search"/></button>
                                        <input type="text" onChange={onChangeSearch} className="form-control" name="search_name" placeholder="Search…" />
                                    </div>
                                </form>
                            </div>                                  


                            <div className="video-tag">
                                <h3>Sort By Tags</h3>
                                <ul>
                                    {forumTagList.length > 0 && forumTagList.map((data, index) => (
                                        <li>
                                            {selectedForumTag.length > 0 && selectedForumTag.some(cred => cred === data.tag_id) ? <a href="javascript:;" className="active" >{data.tag_name}</a> : <a href="javascript:;" >{data.tag_name}</a>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="banner-ads">
                                <a href="javascript:;"><img src="images/course-ad.png" alt="course-ad"/></a>
                                <a href="javascript:;"><img src="images/Banner-ad.png" alt="Banner-ad"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>                    
            <Footer/>
        </div>
    )
}