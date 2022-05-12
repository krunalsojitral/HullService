import React,{ useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


function DirectionModel(props) {  
    const [token, setToken] = React.useState('')
    const [resourceType, setResourceType] = React.useState('')
    const [resourceId, setResourceId] = React.useState('')
   
    let history = useHistory();
    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);

        console.log(props);
        if (props.blogDetail){
            setResourceType('Blog');
            setResourceId(props.blogDetail);
        } else if (props.articleDetail) {
            setResourceType('Article');
            setResourceId(props.articleDetail);
        } else if (props.videoDetail) {
            setResourceType('Video');
            setResourceId(props.videoDetail);
        } else if (props.courseDetail) {
            setResourceType('Course');
            setResourceId(props.courseDetail);
        }
    }, []);

    
    const selectionButton = (type) => {
        if (resourceType == 'Blog') {            
            localStorage.setItem('last_visit_url', '/blog-detail?id=' + resourceId);
        } else if (resourceType == 'Article') {            
            localStorage.setItem('last_visit_url', '/article-detail?id=' + resourceId);
        } else if (resourceType == 'Video') {            
            localStorage.setItem('last_visit_url', '/video-detail?id=' + resourceId);
        } else if (resourceType == 'Course') {
            localStorage.setItem('last_visit_url', '/professional-development-detail?id='+resourceId);
        }
       
        if (type == 'signin'){
            history.push('/login');
        }else{
            history.push('/userSelection');
        }
    }

 

  

    

    return (
        <div className="popup" style={{ width: '450px',background: '#fff',padding: '19px',display: 'block'}}>

            <div><button className="modelclose" onClick={() => history.goBack()}>x</button></div>

            <div className="article-modal">
                <div className="modal-body">
                    <Link to={{ pathname: "/" }}>
                        <img src="images/logo.png" alt="logo" />
                    </Link>


                    <h3>Please Unlock to Continue Reading</h3>
                    {!token && <p>Selected {resourceType} is paid. Please log in to buy the {resourceType}</p>}

                    {token && <div className="puchase-price">${props.cost}</div>}

                    {token && props.blogDetail && <Link className="puchase-btn" to={{ pathname: "/blog-payment", search: "?id=" + props.blogDetail }}>
                        Purchase Blog
                    </Link>} 

                    {token && props.articleDetail && <Link className="puchase-btn" to={{ pathname: "/article-payment", search: "?id=" + props.articleDetail }}>
                        Purchase Article
                    </Link>}

                    {token && props.videoDetail && <Link className="puchase-btn" to={{ pathname: "/video-payment", search: "?id=" + props.videoDetail }}>
                        Purchase Video
                    </Link>}
                    
                    
                    {!token && 
                    <div>
                        <button className="puchase-btn" onClick={() => selectionButton('signin')}>Sign-in</button>
                        <button className="puchase-btn" onClick={() => selectionButton('signup')}>Sign-up</button>
                        {/* <Link to='/login' onClick={() => history.goBack()} className="thm-btn">
                            Sign-in
                        </Link>
                        <Link to='/userSelection' className="thm-btn">
                            Sign-up
                        </Link> */}
                    </div>
                    }
                    <br/>
                    {/* <a href="javascript:;" onClick={props.close}>Go back</a> */}
                    <button onClick={() => history.goBack()}>Go back</button>
                </div>
                
            </div>
            
            

        </div>
    )
}

export default DirectionModel
