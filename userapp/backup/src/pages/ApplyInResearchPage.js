import React, { useRef, useEffect } from 'react'
import { useModal } from 'react-hooks-use-modal';
import ApplyInFutureResearchModel from "./ApplyInFutureResearchModel";





function ApplyInResearchPage() {

    const [Modal, open, close, isOpen] = useModal('root', {
        // preventScroll: true,
        //closeOnOverlayClick: false
    });

    React.useEffect(() => {
        if (isOpen){
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'unset';
        }else{
            document.body.style.overflow = 'auto';
            return () => document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const applyfuturebutton = (id) => {
        open();
    }

    return (
        <div>
            <Modal>
                <ApplyInFutureResearchModel close={close}></ApplyInFutureResearchModel>
            </Modal>
            <div className="studies-Btn">
                <button className="study-btn" onClick={(e) => applyfuturebutton()}>Click Here to Participate in Future Research
                <span>Be notified of studies you qualify for</span>
                </button>
            </div>
        </div>
    )
}

export default ApplyInResearchPage
