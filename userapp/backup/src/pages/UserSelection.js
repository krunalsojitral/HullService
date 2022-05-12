import React from 'react';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useHistory } from 'react-router-dom';

export default function UserSelection() {

    let history = useHistory();
    const handleSelectUser = (type) => {     
        localStorage.setItem('selection', type);
        history.push("/register");
    };

    

    return (
        <div>
            <Header/>
        <div className="login-section">
            <div className="container">
                 <div className="row"> 
                    <div className="col-md-12">
                        <div className="login-box user-selection-box">
                            <div className="login-img">
                                <img alt="logo" src="images/logo.png" />
                            </div>
                            <div className="login-details">
                                <h2>Welcome to the Virtual Centre for the Study and Prevention of Developmental Trauma</h2>
                                <span>Please Choose the Most Appropriate Option</span>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="selection-card">
                                        <div className="selection-img">
                                            <img alt="Professional" src="images/Professional.png"/>
                                        </div>
                                        <div className="selection-text">
                                            <h3>Professional / Service Provider</h3>
                                            <p>Select this if you are one of the following: healthcare worker (postnatal/prenatal), educator, social service worker, mental health agency, legal agency, child and youth care worker</p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleSelectUser('professional')} className="btn-research">Professional</button>
                                </div>
                                <div className="col-md-4">
                                    <div className="selection-card">
                                        <div className="selection-img">
                                            <img alt="Researcher" src="images/Researcher.png"/>
                                        </div>
                                        <div className="selection-text">
                                            <h3>Researcher</h3>
                                        <p>Select this if you are one of the following:  </p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleSelectUser('researcher')} className="btn-research">Researcher</button>
                                </div>
                                <div className="col-md-4">
                                    <div className="selection-card">
                                        <div className="selection-img">
                                            <img alt="Researcher" src="images/Researcher.png" />
                                        </div>
                                        <div className="selection-text">
                                            <h3>General Public</h3>
                                            <p>Select this if you are one of the following:  </p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleSelectUser('general')} className="btn-research">General Public</button>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-12">
                                    <div className="register-general-public-text">
                                        If you do not fall into any of the above categories click here to <b className="signup-text" onClick={(e) => handleSelectUser('general')}><u>sign-up</u></b>
                                    </div>                                        
                                </div>                                    
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <Footer />
</div>
    )
}