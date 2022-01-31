import React, { useEffect } from 'react'

function ForumDescription(props) {

    const truncLength = 496;
    const [isShow, setShowHide] = React.useState(false);

    useEffect(() => {
        // console.log(props);
        // console.log('in in ');
    }, []);
    return (
        <div>
            {props.description && <p>                
                {isShow ? <p dangerouslySetInnerHTML={{ __html: props.description }}></p> : <p dangerouslySetInnerHTML={{ __html: props.description.substring(0, truncLength) }}></p>}
                {props.description.length > 495 &&<span onClick={() => setShowHide((previous) => !previous)}>{isShow ? "Read Less" : "Read more"}</span>}
            </p>}
 
            

        </div>
    )
}

export default ForumDescription


// className = "forum-read-more-des"

