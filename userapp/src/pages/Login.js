import React, { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import { useForm } from "react-hook-form";

export default function Login() {
    const ServicesRef = useRef(null);

    useEffect(() => {
        window.scrollTo({
            top: ServicesRef.current.offsetTop,
            behavior: "smooth",
            // You can also assign value "auto"
            // to the behavior parameter.
        });
    }, []);

    const { loginUser } = useAuth();
    // const [isFirstRadioLoaded, setIsFirstRadioLoaded] = useState(false);  

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        var obj = {
            email: data.email,
            password: data.password
        }
        // setIsFirstRadioLoaded(currentIsLoaded => !currentIsLoaded)
        await loginUser(obj);
    }

    return (
        <div>
            <Header />
            <section className="second-banner-sec" style={{ background: `url('images/contact-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="container">
                    <div className="second-banner-inner">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="text-box">
                                    <h2 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Login</h2>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="image-holder">
                                    <img src="images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                </div>
                            </div>
                        </div>
                        <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="1000ms">
                            <img src="images/second-banner-shape.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div >
            </section>


            <section ref={ServicesRef} className="login-sec">
                <div className="container">
                    <div className="researcher-heading">
                        <h3 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms" style={{ "visibility": "visible", "animation-duration": "500ms", "animation-name": "fadeInUp" }}>Login</h3>
                    </div>
					<div className="row">
						<div className="col-lg-12">
							<div className="login-content mt-6">
                                <div className="login-title">Welcome to the Pathways to prevention</div>
                                <div className="login-title-sub">A centre for childhood trauma</div>
								
                                <form onSubmit={handleSubmit(onSubmit)} className="wow animate__fadeIn mt-4" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} className="form-control" placeholder="Email *" />
                                                {errors?.email?.type === "required" && <small className="error">Email is required</small>}
                                                {errors?.email?.type === "pattern" && (<small className="error">Invalid email address</small>)}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Password *" />
                                                {errors?.password?.type === "required" && <small className="error">Password is required</small>}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ "text-align": "center" }}>
                                                <button className="btn btn-default signin-btn" type="submit">Sign in</button>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="mt-4 login-text">
                                                <Link className="forgot-btn" to='/forgotpassword'>
                                                    Forgot your password?
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </section >


            <Footer />
        </div>
    )
}