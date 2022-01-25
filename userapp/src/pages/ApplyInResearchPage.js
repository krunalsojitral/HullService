import React, { useEffect } from 'react'
import { useModal } from 'react-hooks-use-modal';
import ApplyInFutureResearchModel from "./ApplyInFutureResearchModel";



function ApplyInResearchPage(props) {
    
    useEffect(() => { }, []);
    const [Modal, open, close] = useModal('root', {
        preventScroll: true,
    });

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
