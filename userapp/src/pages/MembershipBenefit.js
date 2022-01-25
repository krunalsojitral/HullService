import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import api_url from './../components/Apiurl';
import axios from "axios";
import { useModal } from 'react-hooks-use-modal';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import './dev.css';

export default function MembershipBenefit() {

    let history = useHistory();

    const [Modal, open, close] = useModal('root', {
        preventScroll: true,
    });

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

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

    const handleOpenDirection = () => {
        history.push('/');
    }

    const onSubmit = (data, e) => {
        
        axios.post(api_url + "/common/sendEmail", data)
            .then((result) => {
                reset()
                e.target.reset();
                setValue("name", "")
                setValue("email", "")
                setValue("description", "")
                Swal.fire("Success!", result.data.msg, "success");
                $(".modelclose").click();
            }).catch((err) => { console.log(err); });
    };
    

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

            {becomeMemberDetail.image && <section className="research-banner-img">
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
                                <button onClick={open} style={{'width':'100%'}} className="email-btn">Send A Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal>
                <div className="popup" style={{ width: '500px', background: '#fff', padding: '19px', display: 'block' }}>
                    <div><button className="modelclose" onClick={close}>x</button></div>
                    <div className="participate-modal">
                        <div className="modal-body">
                            <a href="javascript:;" onClick={(e) => handleOpenDirection()}><img src="images/logo.png" alt="logo" /></a>
                            <h3>Email Us</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="login-details research-popup">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <Controller
                                                    name={"name"}
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input
                                                            type="text"
                                                            onChange={onChange}
                                                            value={value}
                                                            className="form-control"
                                                            placeholder={`Your Name`}
                                                        />
                                                    )}
                                                ></Controller>
                                                {errors.name && errors.name.type === "required" && (
                                                    <small className="error">Name is required.</small>
                                                )}
                                            </div>
                                        </div>                                        
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <Controller
                                                    name={"email"}
                                                    control={control}
                                                    rules={{
                                                        required: true,
                                                        pattern: {
                                                            value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                                        },
                                                    }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <input
                                                            type="email"
                                                            onChange={onChange}
                                                            value={value}
                                                            className="form-control"
                                                            placeholder={`Your Email`}
                                                        />
                                                    )}
                                                ></Controller>
                                                {errors?.email?.type === "required" && <small className="error">Email is required.</small>}
                                                {errors?.email?.type === "pattern" && <small className="error">Invalid email address.</small>}
                                            </div>
                                        </div> 

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <Controller
                                                    name={"description"}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <textarea
                                                            rows="6" cols="50"
                                                            type="text"
                                                            maxlength="2000"
                                                            onChange={onChange}
                                                            value={value}
                                                            className="form-control"
                                                            placeholder={`Description`}
                                                        />
                                                    )}
                                                ></Controller>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <button className="submit-btn" type="submit">Submit</button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>



                </div>
            </Modal>

            <Footer />
        </div>
    )
}