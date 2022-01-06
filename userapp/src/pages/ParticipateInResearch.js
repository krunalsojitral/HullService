import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import api_url from './../components/Apiurl';
import axios from "axios";
import ApplyInResearchModel from "./ApplyInResearchModel";
import ApplyInResearchPage from "./ApplyInResearchPage";
import { useModal } from 'react-hooks-use-modal';
import './dev.css';

export default function ParticipateInResearch() {
    const [researchesDetail, setResearchesDetail] = React.useState({})
    const [researchesList, setResearchesList] = React.useState([]);
    const [researchID, setResearchID] = React.useState('');
    
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
                    setResearchesList(usersdata);
                }
            })
            .catch((err) => { console.log(err); });
    }, []);

    const [Modal, open, close] = useModal('root', {});
    const applybutton = (id) => { 
        setResearchID(id);
        open(); 
    }

    

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

                            {researchesList.map((data, index) => (
                            <div class="studies-card" key={index}>
                                <Modal>
                                    <ApplyInResearchModel close={close} researchtitle={data.topic} apply={researchID}></ApplyInResearchModel>
                                </Modal>
                                
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="studies-list">
                                            <h3 className="tooltip-box">{data.topic}</h3>
                                            <p>{data.description}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="studies-box">
                                            <div class="studies-header">
                                                <h3>{data.user_name}</h3>
                                                <small>{data.name}</small>
                                            </div>
                                                <button class="btn-apply" onClick={(e) => applybutton(data.researches_id)}>Participate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                           
                        </div>
                    </div>
                </div>
            </section>

          
            <Footer />
        </div>
    )
}