import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from './../../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
//import { useForm } from "react-hook-form";

export default function About() {
   

//     const { loginUser } = useAuth();

//    // const [isFirstRadioLoaded, setIsFirstRadioLoaded] = useState(false);  

//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = async (data) => {
//         var obj = {
//             email: data.email,
//             password: data.password
//         }

//        // setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
//         await loginUser(obj);

//     }

    return(
        <div>
            <Header/>
            <section class="inner-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>About</h2>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}