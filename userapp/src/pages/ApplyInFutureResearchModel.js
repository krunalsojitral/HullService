import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
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

    const onSubmit = (data) => {


    }





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
                                
                                    <div className="col-md-8">
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
                                    <div className="col-md-4">
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
                                        {errors.first_name && errors.first_name.type === "required" && (
                                            <small className="error">First Name is required.</small>
                                        )}
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
    )
}

export default ApplyInFutureResearchModel