import React, { useState } from 'react';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from '../../components/Apiurl';
import './../dev.css';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import $ from 'jquery';

export default function AddResearch() {

    let history = useHistory();

    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();
    

    React.useEffect(() => { 
    }, [])

    const addInformationAct = (data) => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };
        var textareaText = data.description;
        textareaText = textareaText.replace(/\r?\n/g, '<br />');
        data.description = textareaText;

        axios.post(api_url + "/researches/addResearchByuser", data, config)
            .then((result) => {
                if (result.data.status) {
                    Swal.fire("Success!", result.data.response.msg, "success");
                    history.push("/my-studies");
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            }).catch((err) => { console.log(err); });
    };
   

    return(
        <div>
            <Header />

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Add Research</h2>
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

                        <div className="col-md-8 articlebox">
                            <div className="row">
                                <div className="blog-box forumadd">
                                    <div className="forum-section">
                                        <div className="forum-box">
                                            <form onSubmit={handleSubmit(addInformationAct)}>
                                                <div className="forum-details">

                                                    <div className="form-group">
                                                        <Controller
                                                            name={"topic"}
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, value } }) => (
                                                                <input
                                                                    type="text"
                                                                    onChange={onChange}
                                                                    value={value}
                                                                    className="form-control"
                                                                    placeholder={`Research Title *`}
                                                                />
                                                            )}
                                                        ></Controller>
                                                        {errors.topic && errors.topic.type === "required" && (
                                                            <small className="error">Research title is required.<br /><br /></small>
                                                        )}
                                                    </div>

                                                    <div className="form-group">
                                                        <Controller
                                                            name={"description"}
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, value } }) => (
                                                                <textarea
                                                                    rows="6" cols="50"
                                                                    type="text"
                                                                    maxlength="5000"
                                                                    onChange={onChange}
                                                                    value={value}
                                                                    className="form-control"
                                                                    placeholder={`Research description *`}
                                                                />
                                                            )}
                                                        ></Controller>
                                                        {errors.topic && errors.topic.type === "required" && (
                                                            <small className="error">Research description is required.</small>
                                                        )}
                                                    </div>

                                                    {errors.topic && errors.topic.type === "required" && (<div><br /></div>)}
                                                 

                                                    <button type="submit" className="forum-btn">Submit</button>

                                                </div>

                                            </form>
                                        </div>
                                    </div>
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