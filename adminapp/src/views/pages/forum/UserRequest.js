import React, { useEffect } from "react";
import {
    CModalBody,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CFormGroup,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CLabel,
} from "@coreui/react";
import { useForm, Controller } from "react-hook-form";

import { useHistory } from "react-router-dom";
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
    } = useForm();

    useEffect(() => {
        console.log(selectedItem);
        if (modal === true && selectedItem) {
            setValue("name", selectedItem.name);
        } else {
            setValue("name", "");
        }
    }, [modal]);
    
    const addInformationAct = (finalData, status) => {
        
        console.log(finalData);

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
                   
                } else {
                    Swal.fire("Oops...", result.data.response.msg, "error");
                }
            })
            .catch((err) => {
                console.log(err);
                //Swal.fire('Oops...', err, 'error')
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
                        <tr><td>Created by</td><td><strong>{selectedItem && selectedItem.created_by}</strong></td></tr>
                        <tr><td>Thread title</td><td><strong>{selectedItem && selectedItem.question}</strong></td></tr>
                        <tr><td>Thread description</td><td><strong>{selectedItem && selectedItem.description}</strong></td></tr>
                        <tr><td>Heading</td><td><strong>{selectedItem && selectedItem.topic}</strong></td></tr>
                    </tbody>
                </table>
            </CCardBody>

            <form>
                <CModalBody>
                    <CFormGroup> 
                        <CLabel>Feedback</CLabel>                       
                        <Controller
                            name={"comment"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <textarea rows="6" cols="55"
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
                        Approved
                    </CButton>
                    <CButton type="submit" color="info" onClick={handleSubmit(data => addInformationAct(data, 2))}>
                        Rejected
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
