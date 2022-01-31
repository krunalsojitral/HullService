import React from "react";
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
    CRow,
    CCol
} from "@coreui/react";
import { useForm, Controller } from "react-hook-form";

import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";

function UserRequest({
    modal,
    setModal,        
    setSelectedItem,    
    selectedItem,
    updateListing
}) {
    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    
    
    const addInformationAct = (finalData) => {        
        var obj = {
            user_id: selectedItem.id,            
            deactive_reason: finalData.deactive_reason,
            title: '',
            name: selectedItem.name,
            email: selectedItem.email
        };
        axios.post(api_url + "/user/added_deactivate_reason", obj)
            .then((result) => {
                if (result.data.status) {
                    var obj = {
                        id: selectedItem.id,
                        status: 0,
                    };
                    axios.post(api_url + "/user/changeuserStatus", obj)
                        .then((results) => {
                            if (results.data.status) {
                                setSelectedItem();
                                finalData.title = '';
                                finalData.deactive_reason = '';
                                setModal(!modal);
                                setValue("title", "");
                                setValue("deactive_reason", "");
                                updateListing();
                                Swal.fire("Success!", result.data.msg, "success");
                            } else {
                                Swal.fire("Oops...", results.data.response.msg, "error");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });                    
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
                <CModalTitle>User Detail</CModalTitle>
            </CModalHeader>

            <CCardBody>
                <table className="table table-striped table-hover">
                    <tbody>                            
                        <tr><td>Full Name :</td><td><strong>{selectedItem && selectedItem.name}</strong></td></tr>
                        <tr><td>Email :</td><td><strong>{selectedItem && selectedItem.email}</strong></td></tr>                        
                    </tbody>
                </table>

                <form>
                    <CModalBody>

                        {/* <CRow>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel className="forum-feedback"><b>Title : </b> &nbsp;</CLabel>
                                    <Controller
                                        name={"title"}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <input
                                                type="text"
                                                onChange={onChange}
                                                value={value}
                                                placeholder={`Title`}
                                                className="form-control"
                                            />
                                        )}
                                    ></Controller>
                                </CFormGroup>
                                {errors.title && errors.title.type === "required" && (
                                    <p style={{ color: "red", fontSize: "12px" }}>Please enter title.</p>
                                )}
                            </CCol>
                        </CRow> */}


                        <CRow>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel className="forum-feedback"><b>Reason : </b> &nbsp;</CLabel>
                                    <Controller
                                        name={"deactive_reason"}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <textarea rows="6" cols="45"
                                                type="text"
                                                onChange={onChange}
                                                value={value}
                                                className="form-control"
                                                placeholder={`Add the reason why this user is being deactivated`}
                                            />
                                        )}
                                    ></Controller>
                                </CFormGroup>
                                {errors.deactive_reason && errors.deactive_reason.type === "required" && (
                                    <p style={{ color: "red", fontSize: "12px" }}>Please enter reason.</p>
                                )}
                            </CCol>
                        </CRow>

                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="info" onClick={handleSubmit(data => addInformationAct(data))} >
                            Submit
                    </CButton>
                        <CButton color="secondary" onClick={() => setModal(false)}>
                            Cancel
                    </CButton>
                    </CModalFooter>
                </form>
            </CCardBody>

           
        </CModal>
    );
}

export default UserRequest;
