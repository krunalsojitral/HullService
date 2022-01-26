import React from 'react';
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

export default function VideoDetail() {

    let history = useHistory();
    const [videoId, setVideoId] = React.useState(0);
    const [videoDetail, setVideoDetail] = React.useState({})
    const [videoCost, setVideoCost] = React.useState({})
    const [relatedVideoDetail, setRelatedVideoDetail] = React.useState([])

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search) // id=123
        let video_id = params.get('id')
        setVideoId(video_id);

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = { headers: { Authorization: `${token}` } };
        axios.post(api_url + '/video/getVideoDataById', { video_id }).then((result) => {
            if (result.data.status) {
                var videodata = result.data.response.data;
                if (videodata.purchase_type == "unpaid") {
                    setVideoDetail(videodata);
                } else {

                    if (videodata.purchase_type == "unpaid") {
                        setVideoDetail(videodata);
                    }else{
                        setVideoCost(videodata.cost)
                        open()
                    }
                    
                    // if (!token) {
                    //     open()
                    // } else {
                    //     setVideoDetail(videodata);
                    // }
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })

        if (token) { 
            axios.post(api_url + '/video/getRelatedPaidVideoList', { "video_id" : video_id }, config).then((result) => {
                if (result.data.status) {
                    var videodata = result.data.response.data;
                    setRelatedVideoDetail(videodata);
                } 
            }).catch((err) => { console.log(err); })
        }else{
            axios.post(api_url + '/video/getRelatedUnpaidVideoList', { "video_id": video_id }).then((result) => {
                if (result.data.status) {
                    var videodata = result.data.response.data;
                    setRelatedVideoDetail(videodata);
                } 
            }).catch((err) => { console.log(err); })
        }

        

    }, [])

    const [Modal, open, close] = useModal('root', {});

    const linkTarget = (id) => {        
        history.replace("/video-detail?id=" + id);
        window.location.reload();
    };

    return(
        <div>
            <Header/>

            <Modal>
                <DirectionModel close={close} videoDetail={videoId} cost={videoCost}></DirectionModel>
            </Modal>

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Video Detail</h2>
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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="video-box">
                                        <iframe width="100%" height="555px" src={`https://www.youtube.com/embed/${videoDetail.video_embeded_id}?rel=0&modestbranding=1&showinfo=0`} title="YouTube video player" allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="video-text">
                                        <h3>{videoDetail.title}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: videoDetail.description }}></p>
                                        {/* <a href="#" className="see-more">See more</a> */}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    {videoDetail.tag && videoDetail.tag.length > 0 &&
                                        <div className="video-tag">
                                            <h3>Tags</h3>
                                            <ul>
                                            {videoDetail.tag.map(data => (<li><a href="javascript:;">{data.label}</a></li>))}
                                            </ul>
                                        </div>
                                    }                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="video-list">
                                <h3>Other Videos</h3>
                                <div className="video-list-card">

                                    {relatedVideoDetail.map((data, index) => (
                                        <div key={index} className="video-list-view">
                                            <div className="video-list-icon">
                                                <iframe width="100%" height="90px" src={data.video+"?rel=0"} title="YouTube video player" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                            </div>
                                            <div className="video-list-text">                                                
                                                <a onClick={(e) => linkTarget(data.video_id)}><h3>{data.title.slice(0, 46)}</h3></a>
                                                {/* <Link to={{ pathname: "/video-detail", search: "?id=" + data.video_id }}> <h3>{data.title.slice(0, 46)}</h3></Link> */}
                                                <div className="video-inner-text">
                                                    <img className="user-profile" src="images/hull-icon.png" alt="author" />
                                                    <div>
                                                        <p>Hull Service</p>
                                                        {/* <small><img src="images/star.png" alt="star" />4.7 (687 Review)</small>  */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    
                                </div>
                                <div className="adds-card">
                                    <img src="images/adds.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
                                   
            <Footer/>
        </div>
    )
}