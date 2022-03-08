import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../../sections/Header';
import Footer from './../../sections/Footer';
import api_url from '../../components/Apiurl';
import axios from "axios";
import Swal from "sweetalert2";

export default function ViewProfile() {

    const [users, setUsers] = useState({});
    const [showEdit, setShowEdit] = React.useState(false);

    React.useEffect(() => {

        


        const params = new URLSearchParams(window.location.search) // id=123
        let user_id = params.get('id')        

        const typeString = localStorage.getItem('userdata');
        if (typeString) {
            var usersessiondata = JSON.parse(typeString);
            if (usersessiondata.id == user_id){                
                setShowEdit(true);
            }
                
        }

        
        axios.post(api_url + '/user/getAdminUserById', { user_id }).then((result) => {
            if (result.data.status) {
                var userdata = result.data.response.data;
                // if (userdata.avatar){
                //     const typeStrings = localStorage.getItem('userdata');    
                //     var newstring = JSON.parse(typeStrings);
                //     newstring.avatar = userdata.avatar
                //     localStorage.setItem('userdata', JSON.stringify(newstring));
                // }

                setUsers(userdata);               
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })

    }, [])

    return(
        <div>
            <Header/>

            <section className="inner-header">
                <div className="container">
                    <div className="row">                        
                        <div className="col-md-12">
                            <h2>{showEdit && "My Profile"}
                                {!showEdit && "View Profile"}
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="dashboard-card pofile-view">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="view-profile-card">
                                <div className="view-profile-header">
                                    {showEdit && users.role != 4 && <div className="row">
                                        <div className="col-md-12 upper-section">
                                            <div className="col-md-6">
                                                {users.joined_date && <div className="cal-date">
                                                    <div className="cal-date-icon">
                                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="cal-date-text">
                                                        <h3>Member Since</h3>
                                                        <p>{users.joined_date}</p>
                                                    </div>
                                                </div>}
                                                {users.renewal_date && <div className="cal-date">
                                                    <div className="cal-date-icon">
                                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="cal-date-text">
                                                        <h3>Renewal Date</h3>
                                                        <p>{users.renewal_date}</p>
                                                    </div>
                                                </div>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="view-profile-button">
                                                    <Link className="btn-edit" to={{ pathname: "/edit-profile" }}>
                                                        EDIT
                                                </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                                    {showEdit && users.role == 4 && <div className="row">
                                        <div className="col-md-12 upper-section">
                                            <div className="view-profile-button">
                                                <Link className="btn-edit" to={{ pathname: "/edit-profile" }}>
                                                    EDIT
                                                </Link>
                                            </div>
                                        </div>
                                    </div>}

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="view-pro-button">
                                                <div className="view-profile-title-icon">                                                    
                                                    {!users.avatar && <img alt="avatar" src="images/user.png" />}
                                                    {users.avatar && <img alt="avatar" src={users.avatar} alt="user-image" />}
                                                </div>
                                                <div className="view-profile-title-text">
                                                    <h3>{users.first_name} {users.last_name}</h3>
                                                    {((users.role == 2 || users.role == 3) && users.about_us) && <p dangerouslySetInnerHTML={{ __html: users.about_us }}></p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="view-profile-body">
                                    <div className="view-profile-details">
                                        <ul>
                                            
                                            {showEdit && <li><i className="fa fa-envelope"></i>{users.email}</li>}
                                            {((users.role == 2 || users.role == 3) && users.city) && <li><i className="fa fa-map-marker"></i>{users.city}</li>}
                                            {((users.role == 2 || users.role == 3) && users.organization) && <li><i className="fa fa-sitemap"></i>{users.organization}</li>}
                                            {(users.role == 2 && (users.sectorname || users.other_sector)) && <li><i className="fa fa-square"></i>{users.sectorname} {users.other_sector}</li>}
                                            {(users.role == 2 && users.level_of_education) && <li><i className="fa fa-graduation-cap"></i>{users.level_of_education}</li>}
                                            {(users.role == 2 && (users.occupationname || users.other_occupation)) && <li><i className="fa fa-briefcase"></i>{users.occupationname} {users.other_occupation}</li>}
                                            {(users.role == 3 && (users.academicdisciplinename || users.other_academic_discipline)) && <li><i className="fa fa-suitcase"></i>{users.academicdisciplinename}{users.other_academic_discipline}</li>}                                            
                                            {(users.role == 2 && (users.other_professional_interest_area || users.pinterestarea)) && <li>                                                
                                                <i className="fa fa-heart"></i>                                                                                                   
                                                {users.pinterestarea && <span>{users.pinterestarea}{users.other_professional_interest_area && <span>,&nbsp;</span>}</span>}
                                                {users.other_professional_interest_area && <span> Others; {users.other_professional_interest_area} </span>}
                                                
                                            </li>
                                            }
                                            {(users.role == 3 && (users.other_research_interest_area || users.pinterestarea)) && <li>
                                                <i className="fa fa-heart"></i>         
                                                {users.pinterestarea && <span>{users.pinterestarea}{users.other_research_interest_area && <span>,&nbsp;</span>} </span>}
                                                {users.other_research_interest_area && <span>Others; {users.other_research_interest_area}</span>}                                                
                                                </li>}                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>   
        <Footer/>
    </div>
    )
}