import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../../components/Apiurl';
import './../../dev.css';
import Paginator from 'react-hooks-paginator';
//import { useForm } from "react-hook-form";

export default function ForumSub() {

    //const [headingId, setHeadingId] = useState(0);

    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [token, setToken] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [forumTagList, setForumTagList] = useState([]);

    const [selectedForumTag, setSelectedForumTag] = useState([]);
   // const [searchtext, setSearchtext] = React.useState('')
   // const { handleSubmit, formState } = useForm();
    const [noresult, setNoresult] = React.useState(false)

   // const onChangeSearch = (e) => { setSearchtext(e.currentTarget.value); }

    

    React.useEffect(() => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);

        const params = new URLSearchParams(window.location.search) // id=123
        let forum_heading_id = params.get('id')
      //  setHeadingId(forum_heading_id);

        axios.post(api_url + '/forum/getForumSubHeadingList', { "forum_heading_id" : forum_heading_id }).then((result) => {
            if (result.data.status) {
                var forumdata = result.data.response.data;
                if (forumdata.length > 0){                   
                    setData(forumdata);
                    setNoresult(false)
                }else{
                    setNoresult(true)
                }
                
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })

        axios.post(api_url + '/forum/getSubForumTagList', { "forum_heading_id": forum_heading_id }).then((result) => {
            if (result.data.status) {
                var tagdata = result.data.response.data;
                setForumTagList(tagdata);
            } else {
                // Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })

    }, [])


    React.useEffect(() => {
        if (offset > 0) {
            // $('html, body').animate({
            //     scrollTop: $("#scrolltop").offset().top
            // }, 2);
        }
        setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);

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

                        <div className="col-md-10 full-width">
                            <div className="search-forum">
                                <div>
                                    <h2 className="mb-0"> {data && data[0] && data[0].forumheading_name && data[0].forumheading_name} </h2>
                                    <p>This is <b>not</b> a moderated forum. Please be polite to your peers. Be kind and remember the human on the other end.</p>
                                </div>
                                {token && <div className="add-forum"><Link className="book-apoint" to={{ pathname: "/add-forum" }}>Request a Thread</Link></div>}
                            </div>
                            {!noresult && <div className="video-tag">
                                <h3>Sort By Tags</h3>
                                <ul>
                                    {forumTagList.length > 0 && forumTagList.map((data, index) => (
                                        <li>
                                            {selectedForumTag.length > 0 && selectedForumTag.some(cred => cred === data.tag_id) ? <a href="javascript:;" className="active" >{data.tag_name}</a> : <a href="javascript:;" >{data.tag_name}</a>}
                                        </li>
                                    ))}
                                </ul>
                            </div>}

                            <br/>

                            <div className="category-table">
                                
                                {!noresult && currentData.length > 0 && <div className="forum-table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Question</th>
                                                    <th>Replies</th>
                                                    <th>Last Post</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {currentData.map((data, index) => (
                                                <tr>
                                                    <td>
                                                        <div className="forum-tooltip-box">
                                                            <Link to={{ pathname: "/forum-detail", search: "?id=" + data.forum_id }}>
                                                                {data.topic.slice(0, 45)}
                                                                <span className="tooltip-title">{data.topic}</span>
                                                            </Link>
                                                        </div>
                                                        {/* <Link to={{ pathname: "/forum-detail", search: "?id=" + data.forum_id }}>{data.topic.slice(0, 45)}</Link> */}
                                                    </td>
                                                    <td>{(data.comment && data.comment[0].forum_comment_count) ? data.comment[0].forum_comment_count : 0}</td>
                                                    <td><span>{(data.comment && data.comment[0].created_at) ? data.comment[0].created_at : '-'}</span></td>
                                                </tr>
                                            ))}

                                            </tbody>
                                        </table>
                                    </div> }
                                

                                {noresult &&
                                    <div className="blog-box">
                                        <div className="no-data">No forum available.
                                        </div>
                                    </div>
                                }

                                <div className="pagination">
                                    {!noresult && currentData.length > 0 && <Paginator
                                            totalRecords={data.length}
                                            pageLimit={pageLimit}
                                            pageNeighbours={2}
                                            setOffset={setOffset}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}

                                        />}
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



//  <div className="col-md-7">
//                             <div className="category-table">
//                                 <h2 className="mb-0"> {data && data[0] && data[0].forumheading_name && data[0].forumheading_name} </h2>
//                                 <p>This is <b>not</b> a moderated forum. Please be polite to your peers. Be kind and remember the human on the other end.</p>
                                

//                                 {token && <div className="add-forum">                                    
//                                     {data && data[0] && data[0].forumheading_id &&  <Link className="book-apoint" to={{ pathname: "/add-forum", search: "?id=" + data[0].forumheading_id }}>
//                 Add Forum
//                                     </Link>}                                    
//                                 </div>}

                                

                                
//                                 {currentData.length > 0 && <div className="forum-table table-responsive">
//                                     <table className="table">
//                                         <thead>
//                                             <tr>
//                                                 <th>Topic Title</th>
//                                                 <th>Category</th>
//                                                 <th>Replies</th>                                                
//                                                 <th>Last Post</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {currentData.map((data, index) => (
//                                                 <tr>
//                                                     <td><Link to={{ pathname: "/forum-detail", search: "?id=" + data.forum_id }}>{data.topic}</Link></td>
//                                                     <td>{data.category_name}</td>
//                                                     <td>{(data.comment && data.comment.length > 0) ? data.comment[0].forum_comment_count : '0'}</td>                                                    
//                                                     <td><span>10 minutes ago</span>
//                                                      </td>
//                                                 </tr>
//                                             ))} 
//                                         </tbody>
//                                     </table>
//                                 </div>}
//                                 {
//                                     currentData.length == 0 &&
//                                     <div className="blog-box">
//                                         <div className="no-data">No forum available.
//                                         </div>
//                                     </div>
//                                 }
//                                 <div className="pagination">                                    
//                                         {
//                                         currentData.length > 0 && <Paginator
//                                             totalRecords={data.length}
//                                             pageLimit={pageLimit}
//                                             pageNeighbours={2}
//                                             setOffset={setOffset}
//                                             currentPage={currentPage}
//                                             setCurrentPage={setCurrentPage}

//                                         />}                                    
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-md-3 article-tags">

//                             <div className="search-box">
//                                 <form onSubmit={handleSubmit(search)}>
//                                     <div className="form-group">
//                                         <button type="button"><img src="images/search.png" alt="search" /></button>
//                                         <input type="text" onChange={onChangeSearch} className="form-control" name="search_name" placeholder="Search…" />
//                                     </div>
//                                 </form>
//                             </div> 

//                             <div className="video-tag">
//                                 <h3>Sort By Tags</h3>
//                                 <ul>
//                                     {forumTagList.length > 0 && forumTagList.map((data, index) => (
//                                         <li>
//                                             {selectedForumTag.length > 0 && selectedForumTag.some(cred => cred === data.tag_id) ? <a href="javascript:;" className="active" >{data.tag_name}</a> : <a href="javascript:;" >{data.tag_name}</a> }
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div className="banner-ads">
//                                 <a href="javascript:;"><img src="images/course-ad.png" alt="course-ad" /></a>
//                                 <a href="javascript:;"><img src="images/Banner-ad.png" alt="Banner-ad" /></a>
//                             </div>
//                         </div>
