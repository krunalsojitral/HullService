import React from 'react';

// import { useModal } from 'react-hooks-use-modal';
// import PurchaseModel from "./PurchaseModel";
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
        slidesToScroll: 3,
        infinite: true,
    };

    // React.useEffect(() => {
    //     axios.get(api_url + '/cms/partnerList').then((result) => {
    //         if (result.data.status) {
    //             var partnerdata = result.data.response.data;
    //             setPartnerSlider(partnerdata);
    //         } 
    //     }).catch((err) => {})

    //     axios.get(api_url + '/cms/getHomeContentData').then((result) => {
    //         if (result.data.status) {
    //             var contentdata = result.data.response.data;                
    //             setContent(contentdata);
    //         }
    //     }).catch((err) => { })

        

    // }, [])

    const next = () => {
        customeSlider.current.slickNext()
    }

    const prev = () => {
        customeSlider.current.slickPrev()
    }

    
    
    return (

        <div>
            <Header />           
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div class="section-title"><h2>National Volunteer Week 2021</h2><span>Hull Services wants to give a big thank you to all our volunteers for all their support!</span></div>
                        <br/>
                        <p>Humans see colors in light waves. Mixing light—or the additive color mixing model—allows you to create colors by mixing red, green and blue light sources of various intensities. The more light you add, the brighter the color mix becomes. If you mix all three colors of light, you get pure, white light.</p>
                        <br />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <iframe width="100%" height="554px" title="video" allow="fullscreen;" src="https://www.youtube.com/embed/6nPAtW9ZYB0?rel=0&amp;modestbranding=1&amp;showinfo=0"></iframe>
                    </div>
                </div>
            </div>
            
               
            <Footer />
        </div>
        
    )
    

}


