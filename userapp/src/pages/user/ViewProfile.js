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

    React.useEffect(() => {

        const params = new URLSearchParams(window.location.search) // id=123
        let user_id = params.get('id')        
        
        axios.post(api_url + '/user/getAdminUserById', { user_id }).then((result) => {
            if (result.data.status) {
                var userdata = result.data.response.data;
                setUsers(userdata);               
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => { console.log(err); })

    }, [])

    return(
        <div>
            <Header/>

            <section class="inner-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>View Profile</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section class="dashboard-card pofile-view">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="view-profile-card">
                                <div class="view-profile-header">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="view-profile-button">
                                                <Link class="btn-edit" to={{ pathname: "/edit-profile" }}>
                                                    EDIT
                                                </Link>                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="view-pro-button">
                                                <div class="view-profile-title-icon">                                                    
                                                    {!users.avatar && <img alt="avatar" src="images/user.png" />}
                                                    {users.avatar && <img alt="avatar" src={users.avatar} alt="user-image" />}
                                                </div>
                                                <div class="view-profile-title-text">
                                                    <h3>{users.first_name} {users.last_name}</h3>
                                                    <p>{users.about_us}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="view-profile-body">
                                    <div class="view-profile-details">
                                        <ul>
                                            <li><i class="fa fa-envelope"></i>{users.email}</li>
                                            <li><i class="fa fa-map-marker"></i>{users.city}</li>
                                            <li><i class="fa fa-sitemap"></i>{users.organization}</li>
                                            <li><i class="fa fa-square"></i>{users.sectorname} {users.other_sector}</li>
                                            <li><i class="fa fa-graduation-cap"></i>{users.level_of_education}</li>
                                            <li><i class="fa fa-briefcase"></i>{users.occupationname} {users.other_occupation}</li>
                                            <li><i class="fa fa-suitcase"></i>{users.academicdisciplinename} {users.other_academic_discipline}</li>
                                            {users.role == 2 && <li>
                                                <i class="fa fa-heart"></i>
                                                {users.other_professional_interest_area}, {users.pinterestarea}</li>}
                                            {users.role == 3 && <li>
                                                <i class="fa fa-heart"></i>                                                
                                                {users.other_research_interest_area}, {users.rinterestarea}
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