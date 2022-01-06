
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import $ from 'jquery';
import { Link } from 'react-router-dom';

function ApplyInFutureResearchModel(props) {
    const [token, setToken] = React.useState('')
    let history = useHistory();
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);
        console.log(props);

    }, []);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'child',
    });

    const onSubmit = (data) => { 

        console.log(data);
    }
    return (
        <div className="popup" style={{ width: '450px', background: '#fff', padding: '19px', display: 'block' }}>
            <div><button className="modelclose" onClick={props.close}>x</button></div>
            <div className="article-modal">
                <div className="modal-body">
                    {/* <a href="#"><img src="images/logo.png" alt="logo" /></a>
                    <h3>Apply to Participate in <b>Future Research Studies</b></h3>
                    <p>Please provide some information about yourself and your family.</p> */}

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
                                            <small className="error">First Name is required.</small>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Controller
                                            name={"dob"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type="text"
                                                    onChange={onChange}
                                                    value={value}
                                                    className="form-control"
                                                    placeholder={`Your DOB`}
                                                />
                                            )}
                                        ></Controller>
                                        {errors.dob && errors.dob.type === "required" && (
                                            <small className="error">First Name is required.</small>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Controller
                                            name={"email"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type="text"
                                                    onChange={onChange}
                                                    value={value}
                                                    className="form-control"
                                                    placeholder={`Your Email`}
                                                />
                                            )}
                                        ></Controller>
                                        {errors.email && errors.email.type === "required" && (
                                            <small className="error">Email is required.</small>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6"> <label className="child-label">Child 1</label></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <Controller
                                            name={"child_first"}
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type="text"
                                                    onChange={onChange}
                                                    value={value}
                                                    className="form-control"
                                                    placeholder={`Child age`}
                                                />
                                            )}
                                        ></Controller>
                                    </div>
                                </div>
                            </div>

                            
                            {fields.map((item, index) => (  
                                <div className="row" key={item.id}>
                                    <div className="col-md-6"> <label className="child-label">Child {index+2}</label></div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <Controller
                                                name={`child.${index}.value`}
                                                control={control}
                                                defaultValue={item.value}
                                                render={({ field }) => <input placeholder={`Child age`} className="form-control" {...field} />}                                                
                                            />
                                            <button onClick={() => remove(index)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))} 

                            

                            <div className="row">
                                <div className="col-md-12 text-right">
                                    <button className="child-btn" onClick={() => append({ value: "" })}>Add Child</button>
                                </div>
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

export default ApplyInFutureResearchModel