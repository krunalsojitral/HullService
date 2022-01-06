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
        if (modal === true && selectedItem) {
            setValue("name", selectedItem.name);
        } else {
            setValue("name", "");
        }
    }, [modal]);
    
    const addInformationAct = (finalData, status) => {

        var obj = {
            id: selectedItem.researches_id,
            status: status,
            comment: finalData.comment,
        };
        axios.post(api_url + "/researches/approveRejectedRequest", obj)
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
                        <tr><td>Research Title</td><td><strong>{selectedItem && selectedItem.topic}</strong></td></tr>
                        <tr><td>Research Description</td><td>
                            <div className={selectedItem && selectedItem.description.length > 380 ? "overflow-description" : ""}>
                                {selectedItem && <strong dangerouslySetInnerHTML={{ __html: selectedItem.description }}></strong>}
                            </div>
                        </td></tr>
                        <tr><td>Created by</td><td><strong>{selectedItem && selectedItem.created_by}</strong></td></tr>
                        <tr><td>Created Date</td><td><strong>{selectedItem && selectedItem.created_on}</strong></td></tr>

                        {selectedItem && selectedItem.user_status == 2 && <tr><td>Admin Comment</td><td>
                            <div className={selectedItem && selectedItem.comment.length > 380 ? "overflow-description" : ""}>
                                {selectedItem && selectedItem.comment && <strong dangerouslySetInnerHTML={{ __html: selectedItem.comment }}></strong>}
                            </div>                            
                            </td></tr>}
                    </tbody>
                </table>
            </CCardBody>            
            {selectedItem && selectedItem.user_status == 0 && <form>
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
                        {errors.comment && errors.comment.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px", marginLeft:"80px" }}>Please enter feedback.</p>
                        )}
                    </CFormGroup>
                   
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
            </form>}
        </CModal>
    );
}

export default UserRequest;
