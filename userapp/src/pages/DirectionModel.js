import React,{ useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';

function DirectionModel(props) {    
    let history = useHistory();
    useEffect(() => {
        
    }, []);

    const handleSelectUser = (type) => {
        if (type === 'user'){
            $(".user").addClass('active');
            $(".company").removeClass('active');
        }else{
            $(".company").addClass('active');
            $(".user").removeClass('active');
        }
        console.log(type);
        localStorage.setItem('selection', type);
    };

    
    const continueSubmit = () => {
        props.close()
        history.push('/register');
    }

    

    return (
        <div className="popup" style={{ width: '450px',background: '#fff',padding: '19px',display: 'block'}}>

           <div><button className="modelclose" onClick={props.close}>x</button></div>

            <div className="article-modal">
                <div className="modal-body">
                    <a href="#"><img src="images/logo.png" alt="logo" /></a>
                    <h3>Please Unlock to Continue Reading</h3>
                    <p>You’ll need to purchase the article or upgrade
                    your account to continue reading. Upgrading
                    your account gives you unlimited
                        access to all articles. </p>
                    <Link to='/userSelection' className="thm-btn">
                        Purchase Article
                    </Link>
                    
                    <Link to='/userSelection' className="thm-btn">
                        Upgrade Account
                    </Link>
                    {/* <a href="javascript:;" onClick={props.close}>Go back</a> */}
                    <button onClick={() => history.goBack()}>Go back</button>
                </div>
                
            </div>
            
            

        </div>
    )
}

export default DirectionModel
