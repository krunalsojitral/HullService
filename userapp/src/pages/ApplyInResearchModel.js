import React, { useEffect } from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import api_url from './../components/Apiurl';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';

function ApplyInResearchModel(props) {

    let history = useHistory();
    const [researchTitle, setResearchTitle] = React.useState('')
    const [researchID, setResearchID] = React.useState('')
    const [researchesDetail, setResearchesDetail] = React.useState({})
    
    const {
        handleSubmit,
        control,                
        formState: { errors },
    } = useForm({
        defaultValues: {
            childs: [{ name: "default Value" }]
        }
    });

    useEffect(() => {   
        console.log(props);
        setResearchTitle(props.researchtitle);
        setResearchID(props.apply);
        axios.get(api_url + "/researches/getResearchesDataById", {})
            .then((result) => {
                if (result.data.status) {
                    var usersdata = result.data.response.data;
                    setResearchesDetail(usersdata);
                }
            })
            .catch((err) => { console.log(err); });    
    }, []);


  
    const onSubmit = (data) => {       
        data.researches_id = researchID;
        axios.post(api_url + "/researches/addParticipate", data)
            .then((result) => {
                if (result.data.status) {
                    Swal.fire("Success!", result.data.response.msg, "success");
                    $(".modelclose").click();
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            }).catch((err) => { console.log(err); });
    };
    const handleOpenDirection = () => {
        history.push('/');
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'childs'
    });

  

    return (
        <div className="popup" style={{ width: '600px', background: '#fff', padding: '19px', display: 'block', maxHeight: '640px', overflowY: 'scroll', scrollBehavior: 'smooth' }}>
            <div><button className="modelclose" onClick={props.close}>x</button></div>
            <div className="participate-modal">
                <div className="modal-body">
                    <a href="javascript:;" onClick={(e) => handleOpenDirection()}><img src="images/logo.png" alt="logo" /></a>
                    <h3>Apply to Participate in <b>{researchTitle}</b></h3>
                    <p>Please provide some information about yourself.</p>

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
                                    <div className="form-group">
                                        <Controller
                                            name="gender"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <select className="form-control" onChange={onChange} value={value}>
                                                    <option key="0" value="">Your Gender</option>
                                                    <option key="1" value="Male">Male</option>
                                                    <option key="2" value="Female">Female</option>
                                                    <option key="3" value="Transgender">Transgender</option>
                                                    <option key="4" value="Non-Binary">Non-Binary</option>
                                                    <option key="5" value="Gender-Non-Conforming">Gender Non-Conforming</option>
                                                    <option key="6" value="Decline-to-State">Decline to State</option>
                                                </select>
                                            )}
                                        ></Controller>
                                        {errors.gender && errors.gender.type === "required" && (
                                            <small className="error">Gender is required.</small>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <Controller
                                            name={"dob"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <ReactDatePicker
                                                    className="form-control"
                                                    selected={value}
                                                    onChange={onChange}
                                                    dateFormat="yyyy/MM/dd"
                                                    dateFormatCalendar="yyyy/MM/dd"
                                                    minDate={new Date(1900, 11)}
                                                    maxDate={new Date()}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    isClearable
                                                    placeholderText="Your DOB"
                                                />
                                            )}
                                        ></Controller>
                                        {errors.dob && errors.dob.type === "required" && (
                                            <small className="error">DOB is required.</small>
                                        )}
                                    </div>
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


                                {fields.map((item, index) => (
                                    <div className="row" key={item.id}>
                                        <div className="col-md-12">
                                            <div className="col-md-2"><label className="child-label">Child {index + 1}</label></div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <Controller
                                                        name={`childs.${index}.childName`}
                                                        control={control}
                                                        defaultValue={item.value}
                                                        render={({ field }) => <input type="text" placeholder={`Child Name`} className="form-control" {...field} />}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <Controller
                                                        name={`childs.${index}.childGender`}
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field: { onChange, value } }) => (
                                                            <select className="form-control" onChange={onChange} value={value}>
                                                                <option key="0" value="">Your Gender</option>
                                                                <option key="1" value="Male">Male</option>
                                                                <option key="2" value="Female">Female</option>
                                                                <option key="3" value="Transgender">Transgender</option>
                                                                <option key="4" value="Non-Binary">Non-Binary</option>
                                                                <option key="5" value="Gender-Non-Conforming">Gender Non-Conforming</option>
                                                                <option key="6" value="Decline-to-State">Decline to State</option>
                                                            </select>
                                                        )}
                                                    ></Controller>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <Controller
                                                        name={`childs.${index}.child`}
                                                        control={control}
                                                        // defaultValue={item.value}
                                                        render={({ field: { onChange, value } }) => (
                                                            <ReactDatePicker
                                                                className="form-control"
                                                                selected={value}
                                                                onChange={onChange}
                                                                minDate={new Date(1900, 11)}
                                                                maxDate={new Date()}
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                dateFormat="yyyy/MM/dd"
                                                                dateFormatCalendar="yyyy/MM/dd"
                                                                isClearable
                                                                placeholderText="Your DOB"
                                                            />
                                                        )}
                                                    // render={({ field }) => <input type="number" min="1" placeholder={`Child age`} className="form-control" {...field} />}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-1">
                                                <div className="delete-icon" onClick={() => remove(index)}><i className="fa fa-times" aria-hidden="true"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="row">
                                    <div className="col-md-12 text-right">
                                        <button type="button" className="child-btn" onClick={() => append({ value: "" })}>Add Child</button>
                                    </div>
                                </div>
                                
                                {researchesDetail.participate_text && 
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Controller
                                                control={control}
                                                name="participate_text"
                                                rules={{ required: true }}
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <input
                                                        type="checkbox"
                                                        onBlur={onBlur} // notify when input is touched
                                                        onChange={onChange} // send value to hook form
                                                        checked={value}
                                                        inputRef={ref}                                                    
                                                    />
                                                )}
                                            />
                                            <span>&nbsp;{researchesDetail.participate_text}</span><br/>
                                            {errors.participate_text && errors.participate_text.type === "required" && (
                                                <small className="error">This is required.</small>
                                            )}         
                                        </div>
                                    </div>}

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
    )
}

export default ApplyInResearchModel
