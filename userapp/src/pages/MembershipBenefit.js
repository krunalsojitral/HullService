import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Link } from 'react-router-dom';
import api_url from './../components/Apiurl';
import axios from "axios";

export default function MembershipBenefit() {

    const [becomeMemberDetail, setBecomeMemberDetail] = React.useState({})
    React.useEffect(() => {
        axios.get(api_url + "/common/getBecomeMemberContent", {})
            .then((result) => {
                if (result.data.status) {
                    var usersdata = result.data.response.data;
                    setBecomeMemberDetail(usersdata);
                }
            })
            .catch((err) => { console.log(err); });
    }, []);
    

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-title">
                            {becomeMemberDetail.main_title && <h1>{becomeMemberDetail.main_title}</h1>}
                            {becomeMemberDetail.sub_title && <p>{becomeMemberDetail.sub_title}</p>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <section className="page-banner">

            </section> */}

            {becomeMemberDetail.image && <section class="research-banner-img">
                <img src={becomeMemberDetail.image} />
            </section>}

            <section className="page-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {becomeMemberDetail.description && <div className="Become-text" dangerouslySetInnerHTML={{ __html: becomeMemberDetail.description }}>                                
                            </div>}

                            {becomeMemberDetail.testimonials && <div className="testimonials-card" dangerouslySetInnerHTML={{ __html: becomeMemberDetail.testimonials }}>                                
                            </div>}

                            {becomeMemberDetail.second_description && <div className="Become-text" dangerouslySetInnerHTML={{ __html: becomeMemberDetail.second_description }}>                                
                            </div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 bg-become">
                            <div className="Become-cta">
                                {becomeMemberDetail.become_member_title && <h3>{becomeMemberDetail.become_member_title}</h3>}
                                {becomeMemberDetail.become_member_description && <p dangerouslySetInnerHTML={{ __html: becomeMemberDetail.become_member_description }}></p>}
                                <Link className="join-btn" to='/userSelection'>
                                    Join or Renew Today
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6  col-sm-6 bg-Email">
                            <div className="Email-cta">
                                <h3>Email Us</h3>
                                {becomeMemberDetail.email_us_description && <p dangerouslySetInnerHTML={{ __html: becomeMemberDetail.email_us_description }}></p>}
                                <a href="#" className="email-btn">Send A Message</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}