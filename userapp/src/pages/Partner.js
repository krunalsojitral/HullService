import React, { useState } from "react";
import { Link } from "react-router-dom";
// import useAuth from './../../hooks/useAuth';
import Header from "./../sections/Header";
import Footer from "./../sections/Footer";
//import { useForm } from "react-hook-form";
import Slider from "react-slick";

export default function Partner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 3,
    centerPadding: "120px",
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const research_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 2,
    centerPadding: "50px",
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="wrapper">
      <Header />

      <section className="second-banner-sec" style={{ background: `url('./images/second-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <div className="container">
          <div className="second-banner-inner">
            <div className="row">
              <div className="col-md-6">
                <div className="text-box">
                  <h2 className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1">Partners</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-holder">
                  <img src="images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1" />
                </div>
              </div>
            </div>
            <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="1000ms" data-wow-delay="10ms" data-wow-offset="1">
              <img src="images/second-banner-shape.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div >
      </section >

      <section className="our-team-sec">
        <div className="our-team-box">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">
                  Pathways to Prevention: A Centre for Childhood Trauma is the natural progression of the work of Hull Services, a leader in the provision of mental health and support in Alberta. Rooted in decades of high-quality implementation of leading models and strategies in mental health, Hull Services and Pathways to Prevention have been invited into many collaborative opportunities for service provision, research, advocacy and training. As these relationships have naturally deepened and expanded, we have built our capacity and contribution to mental health in step with others in the field. Here are some of Pathways to Prevention’s strongest and most valued partnerships. 
                </p>
              </div>
            </div>
          </div>
        </div>        
      </section>

      <section className="our-team-sec">
        <div className="our-team-box">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading-second">
                  <h3 className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">Research Partners</h3>
                </div>
                <br/>
                <div className="image-holder">
                  <Slider className=""  {...settings}>
                    <div>
                      <a target="_blank" href="https://www.traumaconsortium.com/en/">
                      <img src="images/slide1.png" />
                      </a>
                    </div>
                    <div>
                      <a target="_blank" href="https://www.childrenandyouthmentalhealth.com/">
                        <img src="images/partner_logo/3.jpg" />
                      </a>
                    </div>
                    <div>
                      <a target="_blank" href="https://hbi.ucalgary.ca/mathison/research">
                        <img src="images/partner_logo/4.jpg" />
                      </a>
                    </div>                    
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
        {/* <div className="our-team-box educational-box">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading-second">
                  <h3 className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="1">Educational Partners</h3>
                </div>
                <div className="image-holder">
                  <Slider className=""  {...settings}>
                    <div>
                      <img src="images/slide1.png" />
                    </div>
                    <div>
                      <img src="images/slide2.png" />
                    </div>
                    <div>
                      <img src="images/slide3.png" />
                    </div>
                    <div>
                      <img src="images/slide4.png" />
                    </div>
                    <div>
                      <img src="images/slide5.png" />
                    </div>
                    <div>
                      <img src="images/slide6.png" />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="our-team-box">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading-second">
                  <h3 className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="1">Community Partners
                  </h3>
                </div>
                <br />
                <div className="image-holder">
                  <Slider className=""  {...research_settings}>
                    <div>
                      <a target="_blank" href="https://igotmind.ca/">
                        <img src="images/partner_logo/1.jpg" />
                      </a>
                    </div>
                    <div>
                      <a target="_blank" href="https://www.marymound.com/main/">
                        <img src="images/partner_logo/2.jpg" />
                      </a>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
