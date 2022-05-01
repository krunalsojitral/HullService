import React from "react";
import Header from './sections/header'
import Footer from './sections/footer'
require('../../assets/css/style.css')
require('../../assets/css/responsive.css') 
// const imgLogo = require('./images/second-banner-bg.png') 

export default function Contact() {


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

    return (
        <body>
            <div className="wrapper">
                <Header />
                <section className="second-banner-sec" style={{ background: `url(${require('./images/contact-banner-bg.png')}) no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                    <div className="container">
                        <div className="second-banner-inner">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="text-box">
                                        <h2 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Contact Us</h2>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="image-holder">
                                        <img src={require("./images/second-banner-img.png")} alt="" className="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="1000ms" />
                                    </div>
                                </div>
                            </div>
                            <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="1000ms">
                                <img src={require("./images/second-banner-shape.png")} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact-sec">
                    <div className="contact-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="contact-left">
                                        <div className="contact-info">
                                            <div className="heading-second">
                                                <h3 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Connect with us</h3>
                                            </div>
                                            <ul>
                                                <li className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms"><span><svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.8919 27.0989C9.04996 25.5277 7.34263 23.8052 5.78776 21.9495C3.45443 19.1626 0.683595 15.0122 0.683595 11.0572C0.682583 9.03735 1.28079 7.0626 2.40252 5.38286C3.52425 3.70313 5.11907 2.39391 6.98515 1.62091C8.85123 0.847901 10.9047 0.645854 12.8856 1.04034C14.8666 1.43482 16.686 2.40809 18.1136 3.83699C19.0641 4.78325 19.8174 5.90861 20.3301 7.14796C20.8428 8.3873 21.1045 9.71602 21.1003 11.0572C21.1003 15.0122 18.3294 19.1626 15.9961 21.9495C14.4412 23.8052 12.7339 25.5277 10.8919 27.0989ZM10.8919 6.6822C9.73161 6.6822 8.61881 7.14314 7.79834 7.96361C6.97786 8.78408 6.51693 9.89688 6.51693 11.0572C6.51693 12.2175 6.97786 13.3303 7.79834 14.1508C8.61881 14.9713 9.73161 15.4322 10.8919 15.4322C12.0523 15.4322 13.165 14.9713 13.9855 14.1508C14.806 13.3303 15.2669 12.2175 15.2669 11.0572C15.2669 9.89688 14.806 8.78408 13.9855 7.96361C13.165 7.14314 12.0523 6.6822 10.8919 6.6822Z" fill="#F15C4E" />
                                                </svg></span>2266 Woodpark Avenue S.W.</li>
                                                <li className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="1000ms"><span><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.7131 15.0617C21.5778 14.9262 21.4171 14.8186 21.2402 14.7452C21.0633 14.6719 20.8736 14.6341 20.6821 14.6341C20.4906 14.6341 20.3009 14.6719 20.124 14.7452C19.9471 14.8186 19.7864 14.9262 19.651 15.0617L17.3265 17.3863C16.2488 17.0654 14.2377 16.3363 12.9631 15.0617C11.6885 13.7871 10.9594 11.7761 10.6385 10.6984L12.9631 8.37378C13.0987 8.23847 13.2062 8.07775 13.2796 7.90084C13.3529 7.72392 13.3907 7.53427 13.3907 7.34274C13.3907 7.15121 13.3529 6.96156 13.2796 6.78465C13.2062 6.60773 13.0987 6.44702 12.9631 6.3117L7.12979 0.478366C6.99448 0.34282 6.83377 0.235286 6.65685 0.161916C6.47993 0.0885464 6.29028 0.0507812 6.09875 0.0507812C5.90723 0.0507812 5.71758 0.0885464 5.54066 0.161916C5.36374 0.235286 5.20303 0.34282 5.06771 0.478366L1.11271 4.43337C0.558545 4.98753 0.246462 5.74878 0.258128 6.52607C0.29167 8.60274 0.841462 15.8157 6.52604 21.5002C12.2106 27.1848 19.4235 27.7332 21.5017 27.7682H21.5425C22.3125 27.7682 23.0402 27.4648 23.5915 26.9136L27.5465 22.9586C27.682 22.8233 27.7895 22.6625 27.8629 22.4856C27.9363 22.3087 27.974 22.1191 27.974 21.9275C27.974 21.736 27.9363 21.5464 27.8629 21.3694C27.7895 21.1925 27.682 21.0318 27.5465 20.8965L21.7131 15.0617ZM21.5279 24.85C19.7079 24.8194 13.4808 24.3309 8.58813 19.4367C3.67938 14.5279 3.20396 8.27899 3.17479 6.49545L6.09875 3.57149L9.87 7.34274L7.98438 9.22837C7.81297 9.39965 7.68694 9.61094 7.61768 9.84315C7.54843 10.0754 7.53813 10.3212 7.58771 10.5584C7.62271 10.7261 8.47875 14.7029 10.8996 17.1238C13.3204 19.5446 17.2973 20.4007 17.465 20.4357C17.702 20.4866 17.9481 20.4772 18.1805 20.4081C18.413 20.339 18.6243 20.2126 18.795 20.0404L20.6821 18.1548L24.4533 21.9261L21.5279 24.85Z" fill="#F15C4E" />
                                                </svg></span>403-251-8000</li>
                                                <li className="wow animate__fadeInUp" data-wow-duration="1100ms" data-wow-delay="1000ms"><span><svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M30.0846 3.24088C30.0846 1.63672 28.7721 0.324219 27.168 0.324219H3.83464C2.23047 0.324219 0.917969 1.63672 0.917969 3.24088V20.7409C0.917969 22.345 2.23047 23.6575 3.83464 23.6575H27.168C28.7721 23.6575 30.0846 22.345 30.0846 20.7409V3.24088ZM27.168 3.24088L15.5013 10.5325L3.83464 3.24088H27.168ZM27.168 20.7409H3.83464V6.15755L15.5013 13.4492L27.168 6.15755V20.7409Z" fill="#F15C4E" />
                                                </svg></span>info@pathwaystoprevention</li>
                                            </ul>
                                        </div>
                                        <div className="contact-social">
                                            <div className="heading-second">
                                                <h3 className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">Connect with us </h3>
                                            </div>
                                            <div className="contact-socail-media">
                                                <ul>
                                                    <li className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms"><a href="#">
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
                                                    <li className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                                        <a href="#">
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
                                                        </a>

                                                    </li>
                                                    <li className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms"><a href="#">
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
                                <div className="col-lg-7">
                                    <div className="contact-right">
                                        <form className="wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Phone" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea className="form-control" placeholder="Do you want to share more info with us?"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <button className="btn btn-default">SUBMIT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="text-box">
                                <h4 className="wow animate__fadeInUp" data-wow-duration="500ms" data-wow-delay="1000ms">Are you looking to book one of our clinicians for a speaking engagement?
                                    <a href="#" className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="1000ms"> Click here to request a speaker.</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="newsletter-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="newsletter-inner  wow animate__fadeIn" data-wow-duration="1000ms" data-wow-delay="1000ms">
                                    <h4>Subscribe to get the latest news from us</h4>
                                    <form>
                                        <input type="text" className="form-control" placeholder="Email Address" />
                                        <a href="#">Submit</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

            <div className="team-modal">
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <a data-bs-dismiss="modal" className="close-icon" href="#"><img src="images/crose-icon.svg" alt="" /></a>
                                <div className="team-modal-inner">
                                    <div className="image-holder">
                                        <img src={require("./images/clinical-team-img2.png")} alt="" className="img-fluid" />
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





        </body>
    )
}







