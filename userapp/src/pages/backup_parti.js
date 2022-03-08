import React, { useEffect, useState } from 'react'
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import api_url from './../components/Apiurl';
import axios from "axios";
import ApplyInResearchModel from "./ApplyInResearchModel";
import ApplyInResearchPage from "./ApplyInResearchPage";
import { useModal } from 'react-hooks-use-modal';
import './dev.css';
import Paginator from 'react-hooks-paginator';

export default function ParticipateInResearch() {
    const pageLimit = 3;
    const [offset, setOffset] = useState(0);
    const [researchesDetail, setResearchesDetail] = React.useState({})
    const [data, setData] = useState([]);
    const [researchID, setResearchID] = React.useState('');
    const [currentData, setCurrentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    React.useEffect(() => {
        axios.get(api_url + "/researches/getResearchesDataById", {})
            .then((result) => {
                if (result.data.status) {
                    var usersdata = result.data.response.data;
                    setResearchesDetail(usersdata);
                }
            })
            .catch((err) => { console.log(err); });

        axios.get(api_url + "/researches/getFutureParticipateResearchesList", {})
            .then((result) => {
                if (result.data.status) {
                    var usersdata = result.data.response.data;
                    setData(usersdata);
                }
            })
            .catch((err) => { console.log(err); });
    }, []);

    const [Modal, open, close, isOpen] = useModal('root', {});
    const applybutton = (id) => {
        setResearchID(id);
        open();
    }

    React.useEffect(() => {
        if (offset > 0) {
            // $('html, body').animate({
            //     scrollTop: $("#scrolltop").offset().top
            // }, 2);
        }
        setCurrentData(data.slice(offset, offset + pageLimit));

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'auto';
            return () => document.body.style.overflow = 'auto';
        }

    }, [offset, data, isOpen]);




    const ProfileItem = (props) => {
        // const truncLength = 25;
        // const [isShow, setShowHide] = React.useState(false);

        // const [isCollapse, setIsCollapse] = useState(false)
        console.log("isShow");
        return (
            <div className="studies-card">
                <Modal>
                    <ApplyInResearchModel close={close} researchtitle={props.topic} apply={researchID}></ApplyInResearchModel>
                </Modal>

                <div className="row">
                    <div className="col-md-8">
                        <div className="studies-list">
                            <h3 className="tooltip-box">{props.topic}</h3>
                            <p>{props.description}</p>
                            {/* <p>
                                {" "}
                                {isShow
                                    ? props.description
                                    : props.description.substring(0, truncLength)}{" "}
                                    ...
                                    <button onClick={() => setShowHide((previous) => !previous)}>
                                    {isShow ? "Read Less" : "Read more"}
                                </button>
                            </p>


                            <p>
                                {props.description.substring(0, isCollapse ? truncLength : undefined)}...
        <button onClick={() => setIsCollapse(isCollapse => !isCollapse)}>
                                    {isCollapse ? 'Read Less' : 'Read more'}
                                </button>
                            </p> */}

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="studies-box">
                            <div className="studies-header">
                                <h3>{props.user_name}</h3>
                                <small>{props.name}</small>
                            </div>
                            <button className="btn-apply" onClick={(e) => applybutton(props.researches_id)}>Participate</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };


    return (
        <div>
            <Header />

            <section className="research-banner-title">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {researchesDetail.main_title && <h1>{researchesDetail.main_title}</h1>}
                            {researchesDetail.sub_title && <h4>{researchesDetail.sub_title}</h4>}
                        </div>
                    </div>
                </div>
            </section>

            {researchesDetail.image && <section className="research-banner-img">
                <img src={researchesDetail.image} />
            </section>}

            {researchesDetail.description && <section className="callout-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <p dangerouslySetInnerHTML={{ __html: researchesDetail.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            <section className="studies-research">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="studies-title">
                                <h2>Current Studies & Research</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <ApplyInResearchPage></ApplyInResearchPage>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            {currentData.map((profile, _) => (
                                <ProfileItem {...profile} />
                            ))}

                        </div>
                    </div>
                    <div className="row">
                        {currentData.length > 0 && <Paginator
                            totalRecords={data.length}
                            pageLimit={pageLimit}
                            pageNeighbours={2}
                            setOffset={setOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />}
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    )
}