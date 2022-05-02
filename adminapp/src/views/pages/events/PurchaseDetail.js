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

function PurchaseDetail({
  modal,
  setModal,
  items,
  setItems
}) {
  

  React.useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
      return () => document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'auto';
      return () => document.body.style.overflow = 'auto';
    }
    
  }, [modal])

  const closePopup = () => { 
    setModal(!setModal)
  }

 

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader>
        <CModalTitle>Purchase Detail</CModalTitle>
        <p type="button" onClick={() => closePopup()} class="close" aria-label="Close">×</p>
      </CModalHeader>

      <CCardBody>
        {items && items.length > 0 && <table className="table table-striped table-hover">
          <tbody>
            <tr><td>User:</td><td><strong>{items && items[0].name}</strong></td></tr>
            {items[0].event_registration == 'yes' && <tr><td>Date of Payment for Event:</td><td><strong>{items && items[0].event_purchase_date}</strong></td></tr>}
            {items[0].event_registration == 'yes' && <tr><td>Payment ID for Event:</td><td><strong>{items && items[0].payment_id}</strong></td></tr>}

            {items[0].session_registration == 'yes' && <tr><td>Date of Payment for RP Sessions:</td><td><strong>{items && items[0].event_purchase_date}</strong></td></tr>}
            {items[0].session_registration == 'yes' && <tr><td>Payment ID for RP Sessions:</td><td><strong>{items && items[0].payment_id}</strong></td></tr>}

          </tbody>
        </table> }
      </CCardBody>

    </CModal>
  );
}

export default PurchaseDetail;
