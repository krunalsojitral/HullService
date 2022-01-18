import React, { useEffect, useState } from 'react'
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import api_url from './../components/Apiurl';
import axios from "axios";
import ApplyInResearchModel from "./ApplyInResearchModel";
import ApplyInResearchPage from "./ApplyInResearchPage";
import ParticipateInResearchDescription from "./ParticipateInResearchDescription";
import { useModal } from 'react-hooks-use-modal';
import './dev.css';
import Paginator from 'react-hooks-paginator';

export default function ParticipateInResearch() {
    const pageLimit = 10;
    const [offset, setOffset] = useState(0);
    const [researchesDetail, setResearchesDetail] = React.useState({})
    const [data, setData] = useState([]);
    const [researchID, setResearchID] = React.useState('');
    const [researchTitle, setResearchTitle] = React.useState('');
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

    const [Modal, open, close] = useModal('root', {});
    const applybutton = (id, title) => {
        setResearchID(id);
        setResearchTitle(title)
        open(); 
    }

    React.useEffect(() => {
        if (offset > 0) {
            // $('html, body').animate({
            //     scrollTop: $("#scrolltop").offset().top
            // }, 2);
        }
        setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);
    
    // const ProfileItem = (props) => {
    //     console.log(props);
    //     return (
    //         <div>
    //             <p>test</p>
    //         </div>
    //     );
    // }

    return (
        <div>
            <Header/>

            <section class="research-banner-title">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            {researchesDetail.main_title && <h1>{researchesDetail.main_title}</h1>}
                            {researchesDetail.sub_title && <h4>{researchesDetail.sub_title}</h4>}
                        </div>
                    </div>
                </div>
            </section>

            {researchesDetail.image && <section class="research-banner-img">
                <img src={researchesDetail.image} />
            </section>}

            {researchesDetail.description && <section class="callout-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-title">                                
                                <p dangerouslySetInnerHTML={{ __html: researchesDetail.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            <section class="studies-research">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="studies-title">
                                <h2>Current Studies & Research</h2>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <ApplyInResearchPage></ApplyInResearchPage>                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">

                            {/* {currentData.map((profile, _) => (
                                <ProfileItem {...profile} />
                            ))} */}

                            <Modal>
                                <ApplyInResearchModel close={close} researchtitle={researchTitle} apply={researchID}></ApplyInResearchModel>
                            </Modal>

                            {currentData.map((row, index) => (
                            <div class="studies-card" key={index}>
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="studies-list">
                                            <h3 className="tooltip-box">{row.topic}</h3>
                                                <ParticipateInResearchDescription description={row.description}></ParticipateInResearchDescription>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="studies-box">
                                            <div class="studies-header">
                                                <h3>{row.user_name}</h3>
                                                <small>{row.name}</small>
                                            </div>
                                            <button class="btn-apply" onClick={(e) => applybutton(row.researches_id, row.topic)}>Participate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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