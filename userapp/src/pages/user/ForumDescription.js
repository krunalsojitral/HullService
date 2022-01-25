import React, { useEffect } from 'react'

function ForumDescription(props) {

    const truncLength = 500;
    const [isShow, setShowHide] = React.useState(false);

    useEffect(() => {
        // console.log(props);
        // console.log('in in ');
    }, []);
    return (
        <div>
            {props.description && <p>                
                {isShow ? <p dangerouslySetInnerHTML={{ __html: props.description }}></p> : <p dangerouslySetInnerHTML={{ __html: props.description.substring(0, truncLength) }}></p>}
            </p>}
            {props.description.length > 499 && 
            <span className="forum-read-more-des" onClick={() => setShowHide((previous) => !previous)}>
                {isShow ? "Read Less" : "Read more"}
            </span>}

        </div>
    )
}

export default ForumDescription


