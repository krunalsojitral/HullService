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
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4>Landing Page</h4>
                    </div>
                </div>
            </div>
            
               
            <Footer />
        </div>
        
    )
    

}


