
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
        name: 'books',
    });

    const onSubmit = (data) => { }
    return (
        <div className="popup" style={{ width: '450px', background: '#fff', padding: '19px', display: 'block' }}>
            <div><button className="modelclose" onClick={props.close}>x</button></div>
            <div className="article-modal">
                <div className="modal-body">
                    <a href="#"><img src="images/logo.png" alt="logo" /></a>
                    <h3>Apply to Participate in <b>Future Research Studies</b></h3>
                    <p>Please provide some information about yourself and your family.</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="login-details research-popup">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Controller
                                            name={"first_name"}
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
                                        {errors.first_name && errors.first_name.type === "required" && (
                                            <small className="error">First Name is required.</small>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Controller
                                            name={"first_name"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type="text"
                                                    onChange={onChange}
                                                    value={value}
                                                    className="form-control"
                                                    placeholder={`Your Age`}
                                                />
                                            )}
                                        ></Controller>
                                        {errors.first_name && errors.first_name.type === "required" && (
                                            <small className="error">First Name is required.</small>
                                        )}
                                    </div>
                                </div>
                            </div>

                            
                            {/* {fields.map((item, index) => (      
                                
                                <div className="row" key={item.id}>
                                <div className="col-md-6"> <label className="child-label">Child {index+1}</label></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <Controller
                                            name={`books.${index}.value`}
                                            control={control}
                                            defaultValue={item.value}
                                            render={({ field }) => <input className="form-control" {...field} />}
                                        />
                                        <button onClick={() => remove(index)}>Delete</button>
                                    </div>
                                </div>
                            </div>

                            // <li key={item.id}>
                            //     <Controller
                            //         name={`books.${index}.value`}
                            //         control={control}
                            //         defaultValue={item.value}
                            //         render={({ field }) => <input className="form-control" {...field} />}
                            //     />
                            //     <button onClick={() => remove(index)}>Delete</button>
                            // </li>
                        ))} */}

                            <div className="row">
                                <div className="col-md-6"> <label className="child-label">Child 1</label></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <Controller
                                            name={"first_name"}
                                            control={control}
                                            rules={{ required: true }}
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
                                        {errors.first_name && errors.first_name.type === "required" && (
                                            <small className="error">First Name is required.</small>
                                        )}
                                    </div>
                                </div>
                            </div>

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