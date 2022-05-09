import React from 'react'
import Header from './../sections/Header';
import Footer from './../sections/Footer';




export default function AboutHull() {


    return (
        <div>
            <div className="wrapper">
                <Header />
                
                <section className="second-banner-sec" style={{ background: `url('images/about-banner-bg.png') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                    <div className="container">
                        <div className="second-banner-inner">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="text-box">
                                        <h2 className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1">About Hull Services </h2>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="image-holder">
                                        <img src="images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1" />
                                    </div>
                                </div>
                            </div>
                            <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="800ms" data-wow-delay="10ms">
                                <img src="images/second-banner-shape.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about-hull-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="about-hull-inner">
                                    <div className="about-text">
                                        <h4 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="10ms">About Pathways</h4>
                                        <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">Pathways to Prevention: Centre for Childhood Trauma is a division of Hull Services. This connection to Hull Services provides Pathways to Prevention with the synergies necessary to support research, training, education, and learning, directly influencing how services are delivered within Hull’s programs. This will enable Pathways to Prevention to build on Hull’s well-established reputation as a leader in the space of developmental trauma. While Hull Services continues to do transformational work with children and families, Pathways to Prevention will build the capacity of professionals, communities, and systems to work towards its goal of eradicating developmental trauma.
                                            Pathways to Prevention: Centre for Childhood Trauma operates in adherence to Hull’s core values and leadership philosophy and reports through to Hull Services’ Executive Director and Board of Governors.
                                        </p>
                                    </div>
                                    <div className="about-hull-logo wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" >
                                        <a href="#">
                                            <img src="images/about-hull-logo.png" alt="" className="img-fluid" />
                                        </a>
                                    </div>
                                    <div className="about-text">
                                        <h4 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="10ms">About Hull Services</h4>
                                        <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms">Hull Services has long had a reputation for providing leading-edge child, youth, and family mental health services. They work with children, youth, and families who have experienced significant challenges. Hull offers them an opportunity to seek well-being and happiness, focusing on mental health. Hull’s vision is for resilient young people and families to thrive within communities that support their mental health and well-being. In Calgary, they have been working toward this goal for more than 58 years.  They work with children who have often experienced chaotic, trouble-filled lives. Hull offers them and their families an opportunity to seek health and happiness, focusing on mental health. At Hull, they believe in dignity, wellness, and worth. This, combined with a commitment to building respectful relationships, holding space for authentic dialogue, and working effectively together, guides them in how they undertake planning, decision making, and collective work toward their vision.
                                        </p>
                                    </div>
                                    <div className="about-bottom">
                                        <div className="about-box">
                                            <div className="row">
                                                <div className="col-md-6 order-md-first order-last">
                                                    <div className="text-box">
                                                        <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1">Hull Services founder, and continuing inspiration, William Roper Hull, was an entrepreneur, visionary, and philanthropist. His contributions to Calgary, the province of Alberta, and Western Canada left a blueprint of good citizenship for legions of others to emulate. Mr. Hull also recognized that a good life requires a fabric of services, resources, and relationships. Because of William Roper Hull’s generosity, thousands of children and their families are helped each year through Hull Services.</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 order-md-last order-first">
                                                    <div className="image-holder">
                                                        <img src="images/about-hull-img.png" alt="" className="img-fluid  wow animate__fadeInRight" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1" />
                                                        <div className="image-shape">
                                                            <img src="images/abour-hull-round.png" alt="" className="img-fluid wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1" />
                                                        </div>
                                                    </div>
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

            <div className="team-modal">
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <a data-bs-dismiss="modal" className="close-icon" href="#"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder">
                                        <img src="images/clinical-team-img2.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="text-box">
                                        <h4>Bailey Lawson  </h4>
                                        <span>PSYCHOLOGIST</span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus velit cursus odio ultricies. Consectetur in vitae a viverra vestibulum. Felis dictumst pulvinar aliquet scelerisque viverra justo, sed vel. Eget eu, non neque, lorem sed. A ut ut tristique venenatis. Habitant enim quam facilisi et quis lorem et duis. Volutpat et mauris vitae sit. Turpis vel bibendum nunc aliquam pellentesque amet, fusce purus. Faucibus in ullamcorper ultrices tristique bibendum vitae posuere fringilla feugiat. Pulvinar ut euismod nunc ut pellentesque. Mi id quisque aliquam libero aliquet at natoque nisl.
                                            Id facilisis sed morbi accumsan vivamus purus diam risus elit. Arcu fringilla integer cursus nunc, leo vitae turpis. Tristique lacus est montes, fringilla purus, ut proin tortor, velit. Gravida cursus sodales eu a est. </p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <ul>
                                        <li><a href="#">
                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_95_1608" style={{ maskType: 'alpha', maskUnits: 'userSpaceOnUse', x: '0', y: '0', width: '19', height: '19' }}>
                                                    <g clipPath="url(#clip0_95_1608)">
                                                        <path d="M12.8024 3.73484H14.4457V0.872844C14.1622 0.833844 13.1872 0.746094 12.0517 0.746094C9.68245 0.746094 8.05945 2.23634 8.05945 4.97534V7.49609H5.44495V10.6956H8.05945V18.7461H11.2649V10.6963H13.7737L14.1719 7.49684H11.2642V5.29259C11.2649 4.36784 11.5139 3.73484 12.8024 3.73484Z" fill="black"></path>
                                                    </g>
                                                </mask>
                                                <g mask="url(#mask0_95_1608)">
                                                    <rect x="0.804688" y="-1.25391" width="18" height="23" fill="white"></rect>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_95_1608">
                                                        <rect width="18" height="18" fill="white" transform="translate(0.804688 0.746094)"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </a></li>
                                        <li><a href="#">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_95_1612" style={{ maskType: 'alpha', maskUnits: 'userSpaceOnUse', x: '0', y: '0', width: '21', height: '21' }}>
                                                    <g clipPath="url(#clip0_95_1612)">
                                                        <path d="M20.8047 4.54484C20.0609 4.87109 19.2684 5.08734 18.4422 5.19234C19.2922 4.68484 19.9409 3.88734 20.2459 2.92609C19.4534 3.39859 18.5784 3.73234 17.6459 3.91859C16.8934 3.11734 15.8209 2.62109 14.6509 2.62109C12.3809 2.62109 10.5534 4.46359 10.5534 6.72234C10.5534 7.04734 10.5809 7.35984 10.6484 7.65734C7.23969 7.49109 4.22344 5.85734 2.19719 3.36859C1.84344 3.98234 1.63594 4.68484 1.63594 5.44109C1.63594 6.86109 2.36719 8.11984 3.45719 8.84859C2.79844 8.83609 2.15219 8.64484 1.60469 8.34359C1.60469 8.35609 1.60469 8.37234 1.60469 8.38859C1.60469 10.3811 3.02594 12.0361 4.88969 12.4173C4.55594 12.5086 4.19219 12.5523 3.81469 12.5523C3.55219 12.5523 3.28719 12.5373 3.03844 12.4823C3.56969 14.1061 5.07719 15.2998 6.86969 15.3386C5.47469 16.4298 3.70344 17.0873 1.78594 17.0873C1.44969 17.0873 1.12719 17.0723 0.804688 17.0311C2.62094 18.2023 4.77344 18.8711 7.09469 18.8711C14.6397 18.8711 18.7647 12.6211 18.7647 7.20359C18.7647 7.02234 18.7584 6.84734 18.7497 6.67359C19.5634 6.09609 20.2472 5.37484 20.8047 4.54484Z" fill="black"></path>
                                                    </g>
                                                </mask>
                                                <g mask="url(#mask0_95_1612)">
                                                    <rect x="-1.19531" y="-2.25391" width="22" height="23" fill="white"></rect>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_95_1612">
                                                        <rect width="20" height="20" fill="white" transform="translate(0.804688 0.746094)"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </a></li>
                                        <li><a href="#">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_95_1618" style={{ maskType: 'alpha', maskUnits: 'userSpaceOnUse', x: '0', y: '0', width: '18', height: '18' }}>
                                                    <g clipPath="url(#clip0_95_1618)">
                                                        <path d="M10.7988 9.24609C10.7988 10.0712 10.1298 10.7402 9.30469 10.7402C8.47954 10.7402 7.81055 10.0712 7.81055 9.24609C7.81055 8.42094 8.47954 7.75195 9.30469 7.75195C10.1298 7.75195 10.7988 8.42094 10.7988 9.24609Z" fill="black"></path>
                                                        <path d="M11.8281 4.73047H6.78125C5.68269 4.73047 4.78906 5.6241 4.78906 6.72266V11.7695C4.78906 12.8681 5.68269 13.7617 6.78125 13.7617H11.8281C12.9267 13.7617 13.8203 12.8681 13.8203 11.7695V6.72266C13.8203 5.6241 12.9267 4.73047 11.8281 4.73047ZM9.30469 11.7363C7.93156 11.7363 6.81445 10.6192 6.81445 9.24609C6.81445 7.87296 7.93156 6.75586 9.30469 6.75586C10.6778 6.75586 11.7949 7.87296 11.7949 9.24609C11.7949 10.6192 10.6778 11.7363 9.30469 11.7363ZM12.1602 6.88867C11.8851 6.88867 11.6621 6.66572 11.6621 6.39062C11.6621 6.11553 11.8851 5.89258 12.1602 5.89258C12.4352 5.89258 12.6582 6.11553 12.6582 6.39062C12.6582 6.66572 12.4352 6.88867 12.1602 6.88867Z" fill="black"></path>
                                                        <path d="M13.3223 0.746094H5.28711C2.81555 0.746094 0.804688 2.75696 0.804688 5.22852V13.2637C0.804688 15.7352 2.81555 17.7461 5.28711 17.7461H13.3223C15.7938 17.7461 17.8047 15.7352 17.8047 13.2637V5.22852C17.8047 2.75696 15.7938 0.746094 13.3223 0.746094ZM14.8164 11.7695C14.8164 13.4172 13.4758 14.7578 11.8281 14.7578H6.78125C5.13354 14.7578 3.79297 13.4172 3.79297 11.7695V6.72266C3.79297 5.07495 5.13354 3.73438 6.78125 3.73438H11.8281C13.4758 3.73438 14.8164 5.07495 14.8164 6.72266V11.7695Z" fill="black"></path>
                                                    </g>
                                                </mask>
                                                <g mask="url(#mask0_95_1618)">
                                                    <rect x="-1.19531" y="-1.25391" width="20" height="20" fill="white"></rect>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_95_1618">
                                                        <rect width="17" height="17" fill="white" transform="translate(0.804688 0.746094)"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
