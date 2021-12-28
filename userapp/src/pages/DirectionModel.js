import React,{ useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';

function DirectionModel(props) {  
    const [token, setToken] = React.useState('')
   
    let history = useHistory();
    useEffect(() => {

        const tokenString = localStorage.getItem('token');
        var token = JSON.parse(tokenString);
        setToken(token);

        console.log(props);

    }, []);

 

  

    

    return (
        <div className="popup" style={{ width: '450px',background: '#fff',padding: '19px',display: 'block'}}>

            <div><button className="modelclose" onClick={() => history.goBack()}>x</button></div>

            <div className="article-modal">
                <div className="modal-body">
                    <a href="#"><img src="images/logo.png" alt="logo" /></a>
                    <h3>Please Unlock to Continue Reading</h3>
                    <p>You’ll need to purchase the article or upgrade
                    your account to continue reading. Upgrading
                    your account gives you unlimited
                        access to all articles. </p>

                    {token && props.blogDetail && <Link to={{ pathname: "/blog-payment", search: "?id=" + props.blogDetail }}>
                        Purchase Blog
                    </Link>} 

                    {token && props.articleDetail && <Link to={{ pathname: "/article-payment", search: "?id=" + props.articleDetail }}>
                        Purchase Article
                    </Link>}

                    {token && props.videoDetail && <Link to={{ pathname: "/video-payment", search: "?id=" + props.videoDetail }}>
                        Purchase Article
                    </Link>}

                    

                    {/* <Link to='/userSelection' className="thm-btn">
                        Purchase Article
                    </Link> */}
                    
                    {!token && <Link to='/userSelection' className="thm-btn">
                        Upgrade Account
                    </Link>}
                    <br/>
                    {/* <a href="javascript:;" onClick={props.close}>Go back</a> */}
                    <button onClick={() => history.goBack()}>Go back</button>
                </div>
                
            </div>
            
            

        </div>
    )
}

export default DirectionModel
