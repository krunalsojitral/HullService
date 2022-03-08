import React, { useEffect } from "react";
import {
    CModalBody,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CFormGroup,   
    CCardBody,
    CButton,
    CLabel,
} from "@coreui/react";
import { useForm, Controller } from "react-hook-form";

import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";

function UserRequest({
    modal,
    setModal,
    updateListing,    
    setSelectedItem,    
    selectedItem,
}) {
    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {        
        if (modal === true && selectedItem) {
            setValue("name", selectedItem.name);
        } else {
            setValue("name", "");
        }

        if (modal){
            reset({ comment: '' });
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'unset';
        }else{
            document.body.style.overflow = 'auto';
            return () => document.body.style.overflow = 'auto';
        }
        
    }, [modal]);
    
    const addInformationAct = (finalData, status) => {

        var obj = {
            id: selectedItem.forum_id,
            status: status,
            comment: finalData.comment,
        };
        axios.post(api_url + "/forum/approveRejectedRequest", obj)
            .then((result) => {
                if (result.data.status) {
                    setSelectedItem();
                    updateListing();
                    finalData.comment = '';
                    Swal.fire("Success!", result.data.msg, "success");
                    setModal(!modal);
                    setValue("comment", "");
                   
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            })
            .catch((err) => {
                console.log(err);
            });

    };
    return (
        <CModal show={modal} onClose={setModal}>
            <CModalHeader closeButton>
                <CModalTitle>Request Detail</CModalTitle>
            </CModalHeader>

            <CCardBody>
                <table className="table table-striped table-hover">
                    <tbody>                            
                        <tr><td>Requested by</td><td><strong>{selectedItem && selectedItem.created_by}</strong></td></tr>
                        <tr><td>Topic</td><td><strong>{selectedItem && selectedItem.topic}</strong></td></tr>
                        <tr><td>Thread title</td><td><strong>{selectedItem && selectedItem.question}</strong></td></tr>
                        <tr><td>Thread description</td><td>
                            <div className={selectedItem && selectedItem.description.length >380 ? "overflow-description": ""}>
                                {selectedItem && <strong dangerouslySetInnerHTML={{ __html: selectedItem.description }}></strong>}
                            </div>
                        </td></tr>                        
                    </tbody>
                </table>
            </CCardBody>

            <form>
                <CModalBody>
                    <CFormGroup> 
                        <CLabel className="forum-feedback"><b>Feedback : </b> &nbsp;</CLabel>
                        <Controller
                            name={"comment"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <textarea rows="6" cols="45"
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    placeholder={`Provide your approval/rejection comments`}
                                />
                            )}
                        ></Controller>
                    </CFormGroup>
                    {errors.comment && errors.comment.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>Please enter feedback.</p>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton type="submit" color="info" onClick={handleSubmit(data => addInformationAct(data, 1))} >
                        Approve
                    </CButton>
                    <CButton type="submit" color="info" onClick={handleSubmit(data => addInformationAct(data, 2))}>
                        Reject
                    </CButton>
                    <CButton color="secondary" onClick={() => setModal(false)}>
                        Cancel
                    </CButton>
                </CModalFooter>
            </form>
        </CModal>
    );
}

export default UserRequest;
