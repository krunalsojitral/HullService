import React from 'react';

// import { useModal } from 'react-hooks-use-modal';
// import DirectionModel from "./DirectionModel";
// import RegisterPopup from "./RegisterPopup";

// import { useHistory, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
 import Header from './../sections/Header';
 import Footer from './../sections/Footer';
// import $ from 'jquery';
import api_url from './../components/Apiurl';
import axios from 'axios';
import Slider from "react-slick";
import Banner from "./banner";

export default function Landing() {

    const [partnerSlider, setPartnerSlider] = React.useState([]);
    const [content, setContent] = React.useState({});

    const customeSlider = React.createRef();

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    React.useEffect(() => {
        axios.get(api_url + '/cms/partnerList').then((result) => {
            if (result.data.status) {
                var partnerdata = result.data.response.data;
                setPartnerSlider(partnerdata);
            } 
        }).catch((err) => {})

        axios.get(api_url + '/cms/getHomeContentData').then((result) => {
            if (result.data.status) {
                var contentdata = result.data.response.data;                
                setContent(contentdata);
            }
        }).catch((err) => { })

        

    }, [])

    const next = () => {
        customeSlider.current.slickNext()
    }

    const prev = () => {
        customeSlider.current.slickPrev()
    }

    
    
    return (

        <div>
            <Header />
            
            <section className="banner-card">
                <div className="container-fluid">
                    <div className="row">
                        <Banner />                      
                    </div>
                </div>
            </section>

            <section className="callout-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 dangerouslySetInnerHTML={{ __html:  content.first_section_title  }}></h2>
                                <span dangerouslySetInnerHTML={{ __html: content.first_section_sub_title }}></span>
                                <p dangerouslySetInnerHTML={{ __html: content.first_section_upper_paragraph }}></p>
                                                            
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="join-letter">
                                <h3>Join Our Newsletter</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control" name=""/>
							    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name=""/>
							        </div>
                                        <div className="form-group text-right">
                                            <button type="button" className="btn-join">SUBSCRIBE</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="join-text">
                                <p dangerouslySetInnerHTML={{ __html: content.first_section_lower_paragraph }}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
		    </section>



            <section className="callout-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 dangerouslySetInnerHTML={{ __html: content.second_section_title }}></h2>
                                <span dangerouslySetInnerHTML={{ __html: content.second_section_sub_title }}></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="video">
                                {content.video_embeded_id && 
                                    <iframe title="video" allow="fullscreen;" src={`https://www.youtube.com/embed/${content.video_embeded_id}?rel=0&modestbranding=1&showinfo=0`}></iframe>}
                                {/* allowfullscreen <img alt="MediaPlayer" src="images/MediaPlayer.png"/> */}
                                <Link to='/' className="learn-btn">
                                    Learn More
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
            </section>

            <section className="Upcoming-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="Upcoming">
                                <h2>Upcoming Webinars</h2>
                                <div className="Upcoming-list">
                                    <div className="Upcoming-card">
                                        <h3>Webinar Titles</h3>
                                        <p>Color is perception. Our eyes see something (the sky, for example), and data sent from our eyes to our brains tells us it’s a certain color (blue). Objects reflect light in different combinations of wavelengths. Our brains pick up on those wavelength combinations and translate them into the phenomenon...</p>
                                        <div className="book-card">
                                            <Link to='/' className="book-btn">
                                                Book Now
                                            </Link>                                            
                                        </div>
                                    </div>
                                    <div className="Upcoming-card">
                                        <h3>Webinar Titles</h3>
                                        <p>Color is perception. Our eyes see something (the sky, for example), and data sent from our eyes to our brains tells us it’s a certain color (blue). Objects reflect light in different combinations of wavelengths. Our brains pick up on those wavelength combinations and translate them into the phenomenon...</p>
                                        <div className="book-card">
                                            <Link to='/' className="book-btn">
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="Upcoming-click">                                        
                                        <Link to='/' className="see-link">
                                            See >>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 border-left">
                            <div className="Recent">
                                <h2>Recent Posts</h2>
                                <div className="Recent-list">
                                    <div className="Recent-card">
                                        <h3>Webinar Titles</h3>
                                        <p>Color is perception. Our eyes see something (the sky, for example), and data sent from our eyes to our brains tells us it’s a certain color (blue). Objects reflect light in different combinations of wavelengths. Our brains pick up on those wavelength combinations and translate them into the phenomenon...</p>
                                        <div className="book-card text-right">
                                            <Link to='/' className="recent-btn">
                                                Read More
                                            </Link>                                            
                                        </div>
                                    </div>
                                    <div className="Recent-card">
                                        <h3>Webinar Titles</h3>
                                        <p>Color is perception. Our eyes see something (the sky, for example), and data sent from our eyes to our brains tells us it’s a certain color (blue). Objects reflect light in different combinations of wavelengths. Our brains pick up on those wavelength combinations and translate them into the phenomenon...</p>
                                        <div className="book-card text-right">
                                            <Link to='/' className="recent-btn">
                                                Read More
                                            </Link>                                            
                                        </div>
                                    </div>
                                    <div className="Recent-click">
                                        <Link to='/' className="see-link">
                                            See >>
                                        </Link>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="innovation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-3 col-xl-3 col-lg-3">
                            <div className="Health-img">
                                <img alt="innovation" src="images/innovation.png"/>
                            </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
                                <div className="Health-Text">
                                    <span>Mental Health</span>
                                    <h2>Exercises</h2>
                                    <Link to='/' className="Power-btn">
                                        Power Up
                                    </Link>                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            <section className="static-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="static-text">
                                <h3>Get Involved With The Virtual Center</h3>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-4 col-sm-4 col-md-4 col-xl-4">
                                    <div className="static-card">
                                        <span>MEMBERS</span>
                                        <h3>300+</h3>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-md-4 col-xl-4">
                                    <div className="static-card">
                                        <span>VOLUNTEERS</span>
                                        <h3>40+</h3>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-md-4 col-xl-4">
                                    <div className="static-card">
                                        <span>PARTNERS</span>
                                        <h3>20+</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="callout-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 dangerouslySetInnerHTML={{ __html: content.third_section_title }}></h2>
                                <span dangerouslySetInnerHTML={{ __html: content.third_section_sub_title }}></span>
                                <p dangerouslySetInnerHTML={{ __html: content.third_section_upper_paragraph }}></p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="join-text" dangerouslySetInnerHTML={{ __html: content.third_section_lower_paragraph }}>                                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="join-letter">
                                <img alt="becomes" src="images/becomes.png"/>
                                    <a href="javascript:void(0);" className="become-banner">BECOME A MEMBER</a>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="social-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-title">
                                    <h2>SOCIAL POSTS</h2>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="social-post">

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="partner">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="partner-tilte">
                                    <h3>Partners & Sponsors</h3>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="arrow-btn">
                                <button className="customNextBtn" onClick={(e) => prev()} ><i className="fa fa-angle-left"></i></button>
                                <button className="customPrevBtn" onClick={(e) => next()}><i className="fa fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>

                    

                        
                        <div className="row">
                            <div className="col-md-12">
                                <div className="partner-card">
                                    <Slider
                                        dots={false}
                                        slidesToShow={4}
                                        slidesToScroll={4}
                                        autoplay={true}
                                        infinite={false}
                                        autoplaySpeed={3000}
                                        ref={customeSlider}
                                    >
                                        {partnerSlider.length > 0 && partnerSlider.map((data, index) => (
                                            <img style={{ "Height": "350px !important" }} alt="avatar" src={data.partner} />
                                        ))}
                                    </Slider>  
                                        
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
            <Footer />
        </div>
        
    )
    

}


