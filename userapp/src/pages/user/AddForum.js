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

export default function AddForum() {

    let history = useHistory();

    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();
   
    const [tagList, setTagList] = React.useState([]);
    const [selectedTag, setSelectedTag] = React.useState([])
    const [headingList, setHeadingList] = React.useState([]);
    const [categoryList, setCategoryList] = React.useState([]);
    

    React.useEffect(() => { 

        setTimeout(() => {
            $(".dropdown-heading-value .gray").text("Tag");
        }, 50);

        axios.get(api_url + "/common/tagList", {})
            .then((result) => {
                if (result.data.status) {
                    var roledata = result.data.response.data;
                    var obj = roledata.map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.tag_name;
                        retObj['value'] = data.tag_id;
                        return retObj;
                    });
                    setTagList(obj);
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            })
            .catch((err) => { console.log(err); });

        axios.get(api_url + "/common/getHeadingList", {})
            .then((result) => {
                if (result.data.status) {
                    var headingdata = result.data.response.data;
                    setHeadingList(headingdata);
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            })
            .catch((err) => { console.log(err); });


        axios.get(api_url + "/common/categoryList", {})
            .then((result) => {
                if (result.data.status) {
                    var roledata = result.data.response.data;
                    setCategoryList(roledata);
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            })
            .catch((err) => { console.log(err); });
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
        data.tag = selectedTag;
        

        axios.post(api_url + "/forum/addforumByuser", data, config)
            .then((result) => {
                if (result.data.status) {

                    Swal.fire({
                        title: "Success!",
                        icon: "success",
                        text: "Your request for the forum has been successfully sent to Admin.",
                        confirmButtonText: 'Ok'
                    })
                    .then((res) => {
                        if (res.value) {
                            history.push("/forum");
                        }
                        // else if (res.dismiss == 'cancel') {
                        //   console.log('cancel');
                        // }
                    });
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            }).catch((err) => { console.log(err); });
    };

    const removeSkill = (value) => {
        var removeskill = selectedTag.filter(function (place) { return place.value !== value })
        setSelectedTag(removeskill);
    };
   

    return(
        <div>
            <Header />

            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Thread Request</h2>
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

                                                    {/* <div className="form-group">
                                                        <Controller
                                                            name="category"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, value } }) => (
                                                                <select className="form-control" onChange={onChange} value={value}>
                                                                    <option key="0" value="">Forum Category</option>
                                                                    {categoryList.map((item) => (
                                                                        <option key={item.category_id} value={item.category_id}>
                                                                            {item.category_name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        ></Controller>
                                                        {errors.category && errors.category.type === "required" && (
                                                            <small className="error">Category is required.</small>
                                                        )}
                                                       
                                                    </div> */}

                                                    <div className="form-group select-dropdown">
                                                        <Controller
                                                            name="heading"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, value } }) => (
                                                                <select className="form-control" onChange={onChange} value={value}>
                                                                    <option key="0" value="">Select a Topic</option>
                                                                    {headingList.map((item) => (
                                                                        <option key={item.forumheading_id} value={item.forumheading_id}>
                                                                            {item.forumheading_name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        ></Controller>
                                                        {errors.heading && errors.heading.type === "required" && (
                                                            <small className="error">Heading is required.<div><br /></div></small>
                                                        )}
                                                    </div>

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
                                                                    placeholder={`Enter your question  *`}
                                                                />
                                                            )}
                                                        ></Controller>
                                                        {errors.topic && errors.topic.type === "required" && (
                                                            <small className="error">Question is required.<br /><br /></small>
                                                        )}

                                                    </div>


                                                    <div className="form-group">
                                                        <Controller
                                                            name={"description"}
                                                            control={control}
                                                            //rules={{ required: true }}
                                                            render={({ field: { onChange, value } }) => (
                                                                <textarea
                                                                    rows="6" cols="50"
                                                                    type="text"
                                                                    maxlength="2000"
                                                                    onChange={onChange}
                                                                    value={value}
                                                                    className="form-control"
                                                                    placeholder={`Add description to discuss more about your question (Optional)`}
                                                                />
                                                            )}
                                                        ></Controller>
                                                        {/* {errors.topic && errors.topic.type === "required" && (
                                                            <small className="error">Description is required.</small>
                                                        )} */}
                                                    </div>

                                                    {errors.topic && errors.topic.type === "required" && (<div><br /></div>)}

                                                    <div className="form-group">
                                                        <MultiSelect
                                                                options={tagList}
                                                                value={selectedTag}
                                                                selectionLimit="2"
                                                                hasSelectAll={false}
                                                                onChange={setSelectedTag}
                                                                labelledBy="Select"
                                                            />
                                                        {selectedTag.map(item => (
                                                            <span className="interest-area">{item.label}&nbsp;<i onClick={(e) => removeSkill(item.value)} className="fa fa-times"></i></span>
                                                            
                                                        ))}        
                                                    </div>                                                   

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