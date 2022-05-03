import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../sections/Header';
import Footer from './../sections/Footer';
import axios from 'axios';
import Swal from "sweetalert2";
import api_url from './../components/Apiurl';


const LandingPage = () => {

    const [eventdata, setEventData] = React.useState([]);
    const [noresult, setNoresult] = React.useState(false)

    React.useEffect(() => {
        axios.get(api_url + '/event/getLandingPageEvent').then((result) => {
            if (result.data.status) {
                var eventdatas = result.data.response.data;
                setEventData(eventdatas);
                if (eventdatas.length > 0) {

                    setEventData(eventdatas);
                    setNoresult(false);
                } else {
                    // setNoresult(true);
                }
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <div className="wrapper">
                <Header />
                <section className="banner-sec">
                    <div className="container-fluid">
                        <div className="banner-inner">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="text-box">
                                        <h1 className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">Pathways to <br></br> prevention</h1>
                                        <p className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="600ms">Imagine a future where developmental trauma no longer exists — children need not be removed from their families, generational patterns of abuse, neglect, violence and addiction are broken, and families are empowered to meet the developmental needs of their babies from the time they learn they are pregnant.  Pathways to Prevention: A Centre for Childhood Trauma was created to achieve this goal of realizing a future free from developmental trauma.</p>
                                        <Link className="btn btn-default wow animate__fadeInUp" to="/about-hull" data-wow-duration="1000ms" data-wow-delay="900ms">
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="image-holder  wow animate__fadeInRight" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                        <img src="images/banner-img.png" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                            <div className="banner-bg">
                                <img src="images/banner-bg.png" alt="" className="img-fluid  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="upcoming-event-sec">
                    <div className="container-fluid">
                        <div className="upcoming-event-inner">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Upcoming Events</h3>
                                    <div className="row">
                                        <div className="col-md-6 order-md-first order-last">
                                            <div className="image-holder">                                                
                                                {!eventdata.event_image && <img src="images/upcoming-img.png" alt="" className="img-fluid wow animate__fadeInLeft" data-wow-duration="1000ms" data-wow-delay="1000ms" />}
                                                {eventdata.event_image && <img src={eventdata.event_image} alt="" className="img-fluid wow animate__fadeInLeft" data-wow-duration="1000ms" data-wow-delay="1000ms" />} 
                                                <div className="image-shape">
                                                    <img src="images/upcoming-round.png" alt="" className="img-fluid wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 order-md-last order-first">
                                            <div className="text-box">
                                                <span className="wow animate__fadeInUp" data-wow-duration="1000ms">{eventdata.start_date}</span>
                                                <h4 className="wow animate__fadeInUp" data-wow-duration="1000ms">{eventdata.title}</h4>
                                                <p className="wow animate__fadeInUp" data-wow-duration="1100ms" dangerouslySetInnerHTML={{ __html: eventdata.description }}></p>
                                                <Link className="detail-btn wow animate__fadeInUp" to={{ pathname: "/event-promo", search: "?id=" + eventdata.event_id }} data-wow-duration="1000ms" data-wow-delay="900ms">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <Link className="btn btn-default wow animate__fadeInUp" to="/events" data-wow-duration="1000ms">
                                            All Upcoming Events
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="event-shape">
                        <img src="images/upcoming-event-shape.png" alt="" className="img-fluid  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                    </div>
                </section>
                <section className="training-courses-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title">
                                    <img src="images/title-img.png" alt="" className="img-fluid  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms" />
                                    <h3 className="wow animate__fadeInUp" data-wow-duration="1000ms">Explore our training and courses</h3>
                                    <p className="wow animate__fadeInUp" data-wow-duration="1000ms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sed eu varius ut. Faucibus suscipit ultrices pretium tincidunt turpis. Vulputate pharetra in lectus sit et. </p>
                                </div>
                                <div className="training-courses-inner">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="training-courses-box courses-box-first  ">
                                                <div className="courses-detail wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                                    <span><svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M68.4581 63.3324C71.0866 59.6634 72.5001 55.2634 72.5001 50.75C72.5001 46.2366 71.0866 41.8366 68.4581 38.1676L76.125 30.5007L80.8121 35.1879C81.4919 35.8675 82.4138 36.2492 83.375 36.2492C84.3362 36.2492 85.2581 35.8675 85.9379 35.1879L100.438 20.6879C101.117 20.0081 101.499 19.0862 101.499 18.125C101.499 17.1638 101.117 16.2419 100.438 15.5621L85.9379 1.06212C85.2581 0.382542 84.3362 0.000774384 83.375 0.000774384C82.4138 0.000774384 81.4919 0.382542 80.8121 1.06212L66.3121 15.5621C65.6325 16.2419 65.2508 17.1638 65.2508 18.125C65.2508 19.0862 65.6325 20.0081 66.3121 20.6879L70.9993 25.375L63.3324 33.0419C59.6634 30.4134 55.2634 28.9999 50.75 28.9999C46.2366 28.9999 41.8366 30.4134 38.1676 33.0419L29 23.8706V0H0V29H23.8743L33.0419 38.1676C30.4134 41.8366 28.9999 46.2366 28.9999 50.75C28.9999 55.2634 30.4134 59.6634 33.0419 63.3324L25.375 70.9993L20.6879 66.3121C20.0081 65.6325 19.0862 65.2508 18.125 65.2508C17.1638 65.2508 16.2419 65.6325 15.5621 66.3121L1.06212 80.8121C0.382542 81.4919 0.000774384 82.4138 0.000774384 83.375C0.000774384 84.3362 0.382542 85.2581 1.06212 85.9379L15.5621 100.438C16.2419 101.117 17.1638 101.499 18.125 101.499C19.0862 101.499 20.0081 101.117 20.6879 100.438L35.1879 85.9379C35.8675 85.2581 36.2492 84.3362 36.2492 83.375C36.2492 82.4138 35.8675 81.4919 35.1879 80.8121L30.5007 76.125L38.1676 68.4581C41.8366 71.0866 46.2366 72.5001 50.75 72.5001C55.2634 72.5001 59.6634 71.0866 63.3324 68.4581L72.5 77.6294V101.5H101.5V72.5H77.6257L68.4581 63.3324ZM83.375 8.75075L92.7493 18.125L83.375 27.4993L74.0007 18.125L83.375 8.75075ZM18.125 92.7493L8.75075 83.375L18.125 74.0007L27.4993 83.375L18.125 92.7493ZM21.75 21.75H7.25V7.25H21.75V21.75ZM36.25 50.75C36.25 47.8822 37.1004 45.0787 38.6937 42.6942C40.287 40.3097 42.5516 38.4512 45.2011 37.3537C47.8506 36.2563 50.7661 35.9691 53.5788 36.5286C56.3915 37.0881 58.9752 38.4691 61.003 40.497C63.0309 42.5248 64.4119 45.1085 64.9714 47.9212C65.5309 50.7339 65.2437 53.6494 64.1463 56.2989C63.0488 58.9484 61.1903 61.213 58.8058 62.8063C56.4213 64.3996 53.6178 65.25 50.75 65.25C46.9058 65.2452 43.2205 63.716 40.5023 60.9977C37.784 58.2795 36.2548 54.5942 36.25 50.75ZM79.75 79.75H94.25V94.25H79.75V79.75Z" fill="white" />
                                                    </svg></span>
                                                    <h4>NM Core Concepts</h4>
                                                </div>
                                                <div className="text-box">
                                                    <p className="wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">Pathways to Prevention is a leader in trauma-informed care in the community and worldwide. Our team of highly trained professionals facilitates public training and courses to build the capacity of other organizations and systems to more effectively identify and respond to developmental trauma in the populations they serve.</p>
                                                    <Link className="btn btn-default wow animate__fadeInUp" to="/courses-training" data-wow-duration="1000ms">
                                                        View Training & Courses
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="training-courses-box wow animate__fadeInUp">
                                                <div className="courses-detail informed-bg wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                                    <span><svg width="100" height="91" viewBox="0 0 100 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M74.9375 67.8374L50 81.8648L25.0625 67.8374V53.017L17.9375 49.0586V72.0042L50 90.0394L82.0625 72.0042V49.0586L74.9375 53.017V67.8374Z" fill="white" />
                                                        <path d="M50 0L0.125 25.8611V32.0362L50 59.7438L92.75 35.9946V55.6692H99.875V25.8611L50 0ZM85.625 31.8022L78.5 35.7604L50 51.5946L21.5 35.7604L14.375 31.8022L9.43671 29.0586L50 8.02587L90.5633 29.0586L85.625 31.8022Z" fill="white" />
                                                    </svg></span>
                                                    <h4>Trauma Informed Schools</h4>
                                                </div>
                                                <div className="courses-detail focused-bg wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                                    <span><svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M91 6.7766V20.3298C91 21.1 90.694 21.8388 90.1494 22.3834C89.6047 22.9281 88.866 23.234 88.0957 23.234C87.3255 23.234 86.5868 22.9281 86.0421 22.3834C85.4975 21.8388 85.1915 21.1 85.1915 20.3298V6.7766C85.1915 6.51984 85.0895 6.27361 84.9079 6.09206C84.7264 5.9105 84.4802 5.80851 84.2234 5.80851H70.6702C69.9 5.80851 69.1612 5.50253 68.6166 4.95787C68.0719 4.41322 67.766 3.67451 67.766 2.90426C67.766 2.134 68.0719 1.39529 68.6166 0.850636C69.1612 0.305983 69.9 0 70.6702 0H84.2234C86.0207 0 87.7443 0.713961 89.0152 1.98482C90.286 3.25568 91 4.97933 91 6.7766ZM88.0957 67.766C87.3255 67.766 86.5868 68.0719 86.0421 68.6166C85.4975 69.1612 85.1915 69.9 85.1915 70.6702V84.2234C85.1915 84.4802 85.0895 84.7264 84.9079 84.9079C84.7264 85.0895 84.4802 85.1915 84.2234 85.1915H70.6702C69.9 85.1915 69.1612 85.4975 68.6166 86.0421C68.0719 86.5868 67.766 87.3255 67.766 88.0957C67.766 88.866 68.0719 89.6047 68.6166 90.1494C69.1612 90.694 69.9 91 70.6702 91H84.2234C86.0207 91 87.7443 90.286 89.0152 89.0152C90.286 87.7443 91 86.0207 91 84.2234V70.6702C91 69.9 90.694 69.1612 90.1494 68.6166C89.6047 68.0719 88.866 67.766 88.0957 67.766ZM20.3298 85.1915H6.7766C6.51984 85.1915 6.27361 85.0895 6.09206 84.9079C5.9105 84.7264 5.80851 84.4802 5.80851 84.2234V70.6702C5.80851 69.9 5.50253 69.1612 4.95787 68.6166C4.41322 68.0719 3.67451 67.766 2.90426 67.766C2.134 67.766 1.39529 68.0719 0.850636 68.6166C0.305983 69.1612 0 69.9 0 70.6702V84.2234C0 86.0207 0.713961 87.7443 1.98482 89.0152C3.25568 90.286 4.97933 91 6.7766 91H20.3298C21.1 91 21.8388 90.694 22.3834 90.1494C22.9281 89.6047 23.234 88.866 23.234 88.0957C23.234 87.3255 22.9281 86.5868 22.3834 86.0421C21.8388 85.4975 21.1 85.1915 20.3298 85.1915ZM2.90426 23.234C3.67451 23.234 4.41322 22.9281 4.95787 22.3834C5.50253 21.8388 5.80851 21.1 5.80851 20.3298V6.7766C5.80851 6.51984 5.9105 6.27361 6.09206 6.09206C6.27361 5.9105 6.51984 5.80851 6.7766 5.80851H20.3298C21.1 5.80851 21.8388 5.50253 22.3834 4.95787C22.9281 4.41322 23.234 3.67451 23.234 2.90426C23.234 2.134 22.9281 1.39529 22.3834 0.850636C21.8388 0.305983 21.1 0 20.3298 0H6.7766C4.97933 0 3.25568 0.713961 1.98482 1.98482C0.713961 3.25568 0 4.97933 0 6.7766V20.3298C0 21.1 0.305983 21.8388 0.850636 22.3834C1.39529 22.9281 2.134 23.234 2.90426 23.234ZM68.6372 70.0894C66.4091 65.8859 63.0779 62.3688 59.0015 59.9159C54.9251 57.463 50.2575 56.1669 45.5 56.1669C40.7425 56.1669 36.0749 57.463 31.9985 59.9159C27.9221 62.3688 24.5909 65.8859 22.3628 70.0894C22.0028 70.7692 21.3877 71.2784 20.6527 71.5053C19.9176 71.7322 19.1226 71.6582 18.442 71.2995C17.7714 70.9303 17.2704 70.3151 17.0446 69.5836C16.8189 68.8522 16.886 68.0616 17.2319 67.3787C20.8834 60.442 26.9683 55.0983 34.3186 52.3734C31.2657 50.0361 29.0219 46.8008 27.9028 43.1223C26.7836 39.4439 26.8454 35.5072 28.0793 31.8656C29.3132 28.2241 31.6573 25.0607 34.782 22.8203C37.9068 20.5798 41.6551 19.3749 45.5 19.3749C49.3449 19.3749 53.0932 20.5798 56.2179 22.8203C59.3427 25.0607 61.6868 28.2241 62.9207 31.8656C64.1546 35.5072 64.2164 39.4439 63.0972 43.1223C61.9781 46.8008 59.7343 50.0361 56.6814 52.3734C64.0317 55.0983 70.1166 60.442 73.7681 67.3787C74.114 68.0616 74.1811 68.8522 73.9554 69.5836C73.7296 70.3151 73.2286 70.9303 72.558 71.2995C72.142 71.5248 71.6758 71.6414 71.2027 71.6383C70.6746 71.6377 70.1568 71.4932 69.7047 71.2203C69.2527 70.9473 68.8836 70.5564 68.6372 70.0894ZM45.5 50.3404C47.9891 50.3404 50.4223 49.6023 52.4919 48.2195C54.5615 46.8366 56.1746 44.8711 57.1271 42.5714C58.0797 40.2718 58.3289 37.7414 57.8433 35.3001C57.3577 32.8588 56.1591 30.6164 54.399 28.8563C52.639 27.0962 50.3965 25.8976 47.9552 25.412C45.514 24.9264 42.9835 25.1757 40.6839 26.1282C38.3843 27.0807 36.4187 28.6938 35.0359 30.7634C33.653 32.833 32.9149 35.2662 32.9149 37.7553C32.9276 41.0892 34.2577 44.2828 36.6151 46.6403C38.9725 48.9977 42.1661 50.3277 45.5 50.3404Z" fill="white" />
                                                    </svg></span>
                                                    <h4>NM Focused Trauma 	 </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="training-courses-box courses-box-last ">
                                                <div className="courses-detail reflective-bg wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                                    <span><svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V83.9998H67.1608V77.9998H5.99998V5.99998H86.9997V12.36H92.9997V0H0ZM92.9997 29.9999C92.9997 31.5912 92.3676 33.1173 91.2424 34.2425C90.1172 35.3678 88.591 35.9999 86.9997 35.9999C85.4085 35.9999 83.8823 35.3678 82.7571 34.2425C81.6319 33.1173 80.9998 31.5912 80.9998 29.9999C80.9998 28.4086 81.6319 26.8825 82.7571 25.7573C83.8823 24.6321 85.4085 23.9999 86.9997 23.9999C88.591 23.9999 90.1172 24.6321 91.2424 25.7573C92.3676 26.8825 92.9997 28.4086 92.9997 29.9999ZM98.9997 29.9999C98.9997 33.1825 97.7354 36.2347 95.485 38.4852C93.2346 40.7356 90.1823 41.9999 86.9997 41.9999C83.8172 41.9999 80.7649 40.7356 78.5145 38.4852C76.2641 36.2347 74.9998 33.1825 74.9998 29.9999C74.9998 26.8173 76.2641 23.7651 78.5145 21.5147C80.7649 19.2642 83.8172 18 86.9997 18C90.1823 18 93.2346 19.2642 95.485 21.5147C97.7354 23.7651 98.9997 26.8173 98.9997 29.9999Z" fill="white" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M72.2787 47.49C73.9518 45.8928 76.1756 45.0012 78.4887 45H90.7346C95.1266 45 99.2156 46.494 102.366 49.47C105.396 52.332 106.974 56.001 107.619 59.478C108.633 64.9439 107.583 70.9169 105 76.2119V100.5C105 102.382 104.292 104.195 103.017 105.58C101.743 106.965 99.9939 107.819 98.1182 107.975C96.2426 108.13 94.3771 107.574 92.8921 106.418C91.407 105.262 90.411 103.589 90.1016 101.733L88.4997 92.1209L86.8977 101.733C86.5883 103.589 85.5923 105.262 84.1073 106.418C82.6222 107.574 80.7567 108.13 78.8811 107.975C77.0054 107.819 75.2567 106.965 73.9819 105.58C72.7072 104.195 71.9996 102.382 71.9997 100.5V72.2789C70.6316 73.0689 69.0796 73.4849 67.4997 73.4849H52.1938C49.8068 73.4849 47.5176 72.5367 45.8298 70.8489C44.142 69.1611 43.1938 66.8719 43.1938 64.4849C43.1938 62.098 44.142 59.8088 45.8298 58.121C47.5176 56.4332 49.8068 55.485 52.1938 55.485H63.8937L72.2787 47.487V47.49ZM77.9997 82.4249V100.5C78.0007 100.876 78.1427 101.237 78.3976 101.513C78.6525 101.789 79.0018 101.96 79.3762 101.991C79.7507 102.022 80.1231 101.911 80.4199 101.68C80.7166 101.45 80.916 101.116 80.9787 100.746L84.1077 81.9779C84.2241 81.2774 84.5853 80.6409 85.1269 80.1817C85.6686 79.7225 86.3555 79.4702 87.0657 79.4699H89.9336C90.6438 79.4702 91.3307 79.7225 91.8724 80.1817C92.414 80.6409 92.7752 81.2774 92.8916 81.9779L96.0206 100.746C96.0833 101.116 96.2827 101.45 96.5794 101.68C96.8762 101.911 97.2486 102.022 97.6231 101.991C97.9975 101.96 98.3468 101.789 98.6017 101.513C98.8566 101.237 98.9986 100.876 98.9996 100.5V75.4979C98.9995 75.0177 99.1148 74.5444 99.3356 74.1179C101.652 69.6479 102.495 64.7489 101.721 60.573C101.25 58.035 100.149 55.629 98.2466 53.832C96.3056 51.999 93.7316 51 90.7346 51H78.4917C77.7207 51 76.9767 51.297 76.4187 51.828L67.1667 60.654C66.6092 61.1867 65.8679 61.4843 65.0967 61.485H52.1938C51.3981 61.485 50.6351 61.801 50.0724 62.3636C49.5098 62.9262 49.1938 63.6893 49.1938 64.4849C49.1938 65.2806 49.5098 66.0437 50.0724 66.6063C50.6351 67.1689 51.3981 67.4849 52.1938 67.4849H67.4997C68.2709 67.4843 69.0122 67.1867 69.5697 66.6539L72.9297 63.4499C73.3548 63.0447 73.8895 62.7732 74.4674 62.669C75.0454 62.5648 75.6412 62.6325 76.181 62.8638C76.7209 63.095 77.181 63.4797 77.5042 63.97C77.8275 64.4603 77.9998 65.0347 77.9997 65.6219V82.4279V82.4249Z" fill="white" />
                                                    </svg></span>
                                                    <h4>Reflective Practice</h4>
                                                </div>
                                                <div className="courses-detail trauma-bg wow animate__fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                                    <span><svg width="72" height="111" viewBox="0 0 72 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.0687 24.75C32.3507 24.75 35.4984 23.4462 37.8191 21.1254C40.1399 18.8047 41.4437 15.6571 41.4437 12.375C41.4437 9.09295 40.1399 5.94532 37.8191 3.62455C35.4984 1.30379 32.3507 0 29.0687 0C25.7866 0 22.639 1.30379 20.3183 3.62455C17.9975 5.94532 16.6937 9.09295 16.6937 12.375C16.6937 15.6571 17.9975 18.8047 20.3183 21.1254C22.639 23.4462 25.7866 24.75 29.0687 24.75ZM29.0687 19.25C30.8921 19.25 32.6407 18.5257 33.9301 17.2364C35.2194 15.947 35.9437 14.1984 35.9437 12.375C35.9437 10.5516 35.2194 8.80295 33.9301 7.51364C32.6407 6.22433 30.8921 5.5 29.0687 5.5C27.2453 5.5 25.4967 6.22433 24.2073 7.51364C22.918 8.80295 22.1937 10.5516 22.1937 12.375C22.1937 14.1984 22.918 15.947 24.2073 17.2364C25.4967 18.5257 27.2453 19.25 29.0687 19.25ZM2.22319 35.5987C5.72944 30.8165 11.6282 30.25 15.3187 30.25H42.8187C53.0872 30.25 59.932 34.6555 64.1587 40.205C67.4807 44.5583 68.9905 49.4725 69.6587 51.645L69.6752 51.6973C69.7715 52.0107 69.8402 52.2308 69.8952 52.3903C70.4328 54.0029 70.4592 55.7422 69.9709 57.3705C69.4826 58.9987 68.5035 60.4365 67.1672 61.4872C68.4778 62.194 69.5726 63.2423 70.3357 64.521C71.0987 65.7997 71.5015 67.261 71.5012 68.75V107.25C71.5012 107.979 71.2115 108.679 70.6958 109.195C70.18 109.71 69.4806 110 68.7512 110C68.0219 110 67.3224 109.71 66.8067 109.195C66.2909 108.679 66.0012 107.979 66.0012 107.25V68.75C66.0012 68.0207 65.7115 67.3212 65.1958 66.8055C64.68 66.2897 63.9806 66 63.2512 66C62.5219 66 61.8224 66.2897 61.3067 66.8055C60.7909 67.3212 60.5012 68.0207 60.5012 68.75V70.5843C60.5012 71.3136 60.2115 72.0131 59.6958 72.5288C59.18 73.0445 58.4806 73.3343 57.7512 73.3343C57.0219 73.3343 56.3224 73.0445 55.8067 72.5288C55.2909 72.0131 55.0012 71.3136 55.0012 70.5843V68.75C55.0012 66.1182 56.2332 63.7725 58.1555 62.26C56.306 61.266 54.9069 59.6022 54.245 57.6097C54.1185 57.233 53.9975 56.8507 53.8792 56.4795L53.915 56.573L53.849 56.3833C53.123 54.1035 52.4492 52.0548 51.0385 50.204C50.3222 49.2306 49.3929 48.4339 48.3215 47.8748V102.165C48.3239 104.285 47.5103 106.325 46.0493 107.861C44.5884 109.397 42.5921 110.311 40.4748 110.415C38.3574 110.519 36.2814 109.803 34.6774 108.417C33.0734 107.031 32.0645 105.081 31.8599 102.971L29.8524 82.5H28.2904L26.2829 102.971C26.0784 105.081 25.0695 107.031 23.4655 108.417C21.8615 109.803 19.7855 110.519 17.6681 110.415C15.5508 110.311 13.5545 109.397 12.0936 107.861C10.6326 106.325 9.81895 104.285 9.82145 102.165V62.15C9.16145 61.303 8.52895 60.4725 7.9267 59.6612C5.35544 56.2045 2.97944 52.646 1.54944 49.3102C0.355943 46.5217 -1.54156 40.7275 2.22319 35.596V35.5987ZM15.3187 35.75C11.7849 35.75 8.45195 36.4018 6.6562 38.8493C4.77794 41.4067 5.50669 44.5885 6.60119 47.146C7.76719 49.863 9.8187 52.998 12.3377 56.3833C13.0829 57.387 13.8832 58.4292 14.7302 59.5072L14.8649 59.6777L19.5262 54.791C17.9782 52.6441 16.3405 50.5632 14.6174 48.554C14.139 48.0033 13.8989 47.2852 13.9499 46.5575C14.001 45.8298 14.339 45.1522 14.8897 44.6738C15.4403 44.1953 16.1585 43.9552 16.8862 44.0062C17.6139 44.0573 18.2915 44.3953 18.7699 44.946C20.3826 46.82 21.921 48.7566 23.3817 50.7513L37.7092 35.75H15.3242H15.3187ZM45.1425 35.8435C45.0452 35.9981 44.9328 36.1428 44.807 36.2752L26.6762 55.2723C28.0237 57.1203 29.3767 58.9408 30.8782 60.775C32.264 62.4685 32.9202 64.6432 32.7026 66.8206C32.4849 68.998 31.4112 70.9997 29.7177 72.3855C28.0242 73.7713 25.8495 74.4275 23.6721 74.2099C21.4947 73.9922 19.493 72.9185 18.1072 71.225C17.2272 70.147 16.2922 69.0717 15.3214 67.9717V102.163C15.3234 102.867 15.596 103.545 16.0829 104.054C16.5698 104.564 17.2338 104.867 17.9379 104.901C18.6419 104.936 19.3322 104.698 19.8663 104.238C20.4003 103.778 20.7373 103.131 20.8077 102.429L23.3047 77H34.8382L37.3325 102.432C37.3956 103.139 37.7299 103.795 38.2654 104.261C38.8008 104.727 39.4958 104.968 40.205 104.934C40.9142 104.9 41.5826 104.592 42.0703 104.076C42.558 103.56 42.8271 102.875 42.8214 102.165V41.0025L45.9702 41.4673C50.7607 42.1712 53.5877 44.4702 55.4137 46.8682C57.4432 49.5302 58.3562 52.4068 59.052 54.5958L59.0905 54.714C59.2197 55.1238 59.338 55.5033 59.4617 55.869C59.6996 56.5518 60.1969 57.1134 60.8458 57.4322C61.4947 57.7511 62.2431 57.8015 62.929 57.5727C63.6149 57.3438 64.183 56.854 64.5104 56.2094C64.8378 55.5647 64.8982 54.8171 64.6785 54.1283C64.5936 53.8641 64.5111 53.5992 64.431 53.3335L64.4227 53.3115C63.7627 51.1748 62.484 47.0718 59.789 43.5325C56.8547 39.6825 52.265 36.4238 45.1452 35.8408L45.1425 35.8435ZM22.8124 59.3148L18.7589 63.5608C19.9882 64.944 21.2147 66.341 22.3614 67.7407C22.588 68.0266 22.8691 68.2645 23.1884 68.4406C23.5077 68.6167 23.8589 68.7276 24.2215 68.7667C24.584 68.8059 24.9508 68.7725 25.3003 68.6686C25.6499 68.5647 25.9753 68.3923 26.2576 68.1614C26.5399 67.9305 26.7734 67.6458 26.9447 67.3238C27.1159 67.0018 27.2214 66.649 27.255 66.2859C27.2885 65.9227 27.2496 65.5565 27.1403 65.2086C27.031 64.8607 26.8536 64.538 26.6185 64.2593C25.3071 62.6441 24.0389 60.9944 22.8152 59.312L22.8124 59.3148Z" fill="white" />
                                                    </svg></span>
                                                    <h4>Trauma </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <Footer />
            </div>
        </div>
    )
}
export default LandingPage;