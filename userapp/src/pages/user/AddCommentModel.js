import React,{ useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import api_url from '../../components/Apiurl';
import Swal from "sweetalert2";
import $ from 'jquery';

function AddCommentModel(props) {
   
    let history = useHistory();
    const [forumId, setForumId] = React.useState(0);

    useEffect(() => {
        console.log(props.forumdetail);
        setForumId(props.forumdetail);
    }, []);


    const onSubmit = (data) => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        const config = {
            headers: { Authorization: `${token}` }
        };

        data.forum_id = forumId;

        axios.post(api_url + "/forum/addComment", data, config)
            .then((result) => {
                if (result.data.status) {
                    $(".modelclose").click();
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            }).catch((err) => { console.log(err); });
    }
 

  
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    

    return (
        <div className="popup" style={{ width: '450px',background: '#fff',padding: '19px',display: 'block'}}>
            <div><button className="modelclose" onClick={props.close}>x</button></div>
            <div className="article-modal">
                <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="login-details">                            
                            <div className="sub-title">Add Comment</div>
                            <div className="form-group">
                                <Controller
                                    name={"comment"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <input
                                            type="comment"
                                            onChange={onChange}
                                            value={value}
                                            className="form-control"
                                            placeholder={`Comment *`}
                                        />
                                    )}
                                ></Controller>
                                {errors.comment && errors.comment.type === "required" && (
                                    <small className="error">First Name is required.</small>
                                )}
                            </div>                          
                            
                            <button type="submit" className="sign-btn">Submit</button>
                            <button type="button" onClick={props.close} name="cancel" >Cancel</button>
                        </div>                           
                    </form>                 
                </div>
            </div>

        </div>
    )
}

export default AddCommentModel
