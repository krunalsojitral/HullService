import React, { useEffect } from 'react'
import { useModal } from 'react-hooks-use-modal';
import ApplyInFutureResearchModel from "./ApplyInFutureResearchModel";



function ApplyInResearchPage(props) {
    
    useEffect(() => { open() }, []);

    const [Modal, open, close] = useModal('root', {});

    return (
        <Modal>
            <ApplyInFutureResearchModel close={close}></ApplyInFutureResearchModel>
        </Modal>
    )
}

export default ApplyInResearchPage
