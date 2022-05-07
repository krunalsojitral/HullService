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
                                        <h2 className="wow animate__fadeIn" data-wow-duration="800ms" data-wow-delay="10ms" data-wow-offset="1">About us </h2>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="image-holder">
                                        <img src="images/second-banner-img.png" alt="" className="img-fluid wow animate__flipInX" data-wow-duration="1500ms" data-wow-delay="10ms" data-wow-offset="1"/>
                                    </div>
                                </div>
                            </div>

                            <div className="second-banner-shape wow animate__zoomIn" data-wow-duration="1500ms" data-wow-delay="10ms" data-wow-offset="1">
                                <img src="images/second-banner-shape.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about-us-sec">
                    <div className="container">
                        <div className="about-inner">
                            <div className="row">
                                <div className="col-12">
                                    <div className="about-us-top">
                                        <div className="text-box">
                                            <p className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="10ms"> Imagine a future where developmental trauma no longer exists. Where children need not be removed from their families, generational patterns of abuse, neglect, violence, and addiction are broken, and families are empowered to meet the developmental needs of their babies from the time they learn they are pregnant. Picture a world where young people thrive within families and communities that support their mental health and well-being.  Parents, doctors, teachers, caregivers, clergy, social workers, and coaches have a shared understanding of brain development and the impacts of trauma. As a result, they are equipped with the knowledge, tools, and support to meet children’s developmental needs effectively.
                                                Pathways to Prevention: A Centre for Childhood Trauma was created to achieve this goal of realizing a future free from developmental trauma. The Centre is an international hub for experts and service providers in the field to engage in:
                                            </p>
                                        </div>
                                        <div className="text-inner">
                                            <ul>
                                                <li className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="8"><span><svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="32.567" cy="32.5201" r="31.6002" fill="#339F94" />
                                                    <path d="M26.3369 31.5378C26.5803 31.2939 26.8694 31.1005 27.1878 30.9686C27.5061 30.8368 27.8473 30.7691 28.1919 30.7695H36.9419C37.6381 30.7695 38.3058 31.0461 38.798 31.5384C39.2903 32.0307 39.5669 32.6983 39.5669 33.3945V40.3945C39.5669 41.0907 39.2903 41.7584 38.798 42.2507C38.3058 42.743 37.6381 43.0195 36.9419 43.0195H31.0286L30.0486 42.0395C30.5558 40.9797 30.8183 39.8195 30.8169 38.6445V41.2695H36.9419C37.174 41.2695 37.3965 41.1773 37.5606 41.0133C37.7247 40.8492 37.8169 40.6266 37.8169 40.3945V37.7695H30.8169V38.6445C30.8198 36.8422 30.2018 35.0939 29.0669 33.6938V32.5195H28.1919C28.106 32.5193 28.0205 32.5316 27.9381 32.5563C27.4474 32.1535 26.9097 31.8115 26.3369 31.5378ZM37.8169 33.3945C37.8169 33.1625 37.7247 32.9399 37.5606 32.7758C37.3965 32.6117 37.174 32.5195 36.9419 32.5195H30.8169V36.0195H37.8169V33.3945ZM23.8169 30.8168C23.2353 30.7525 22.6485 30.7525 22.0669 30.8168V22.0195C22.0669 21.0913 22.4356 20.201 23.092 19.5447C23.7484 18.8883 24.6386 18.5195 25.5669 18.5195H33.5924C34.2884 18.5201 34.9556 18.7971 35.4474 19.2895L42.2986 26.139C42.7904 26.6311 43.0667 27.2983 43.0669 27.994V43.0195C43.0669 43.9478 42.6981 44.838 42.0418 45.4944C41.3854 46.1508 40.4952 46.5195 39.5669 46.5195H34.1681C34.0375 46.1506 33.8258 45.8158 33.5486 45.5395L32.7786 44.7695H39.5669C40.031 44.7695 40.4761 44.5852 40.8043 44.257C41.1325 43.9288 41.3169 43.4837 41.3169 43.0195V29.0195H35.1919C34.4957 29.0195 33.828 28.743 33.3357 28.2507C32.8435 27.7584 32.5669 27.0907 32.5669 26.3945V20.2695H25.5669C25.1028 20.2695 24.6576 20.4539 24.3295 20.7821C24.0013 21.1103 23.8169 21.5554 23.8169 22.0195V30.8168ZM35.1919 27.2695H40.9546L34.3169 20.6318V26.3945C34.3169 26.6266 34.4091 26.8492 34.5732 27.0133C34.7373 27.1773 34.9598 27.2695 35.1919 27.2695ZM27.8471 42.3125C28.7745 41.0724 29.1977 39.527 29.0315 37.9874C28.8654 36.4478 28.1223 35.0283 26.9517 34.0145C25.7811 33.0008 24.27 32.468 22.7225 32.5235C21.1749 32.5789 19.7058 33.2185 18.6109 34.3135C17.5159 35.4085 16.8763 36.8776 16.8208 38.4251C16.7654 39.9727 17.2981 41.4838 18.3119 42.6543C19.3256 43.8249 20.7452 44.568 22.2848 44.7342C23.8244 44.9003 25.3697 44.4771 26.6099 43.5498L31.0724 48.0123C31.1536 48.0936 31.2501 48.1582 31.3563 48.2023C31.4625 48.2463 31.5763 48.2691 31.6913 48.2691C31.8062 48.2692 31.9201 48.2467 32.0264 48.2027C32.1326 48.1588 32.2292 48.0944 32.3105 48.0132C32.3919 47.9319 32.4564 47.8355 32.5005 47.7293C32.5446 47.6231 32.5673 47.5092 32.5674 47.3943C32.5675 47.2793 32.5449 47.1654 32.501 47.0592C32.4571 46.9529 32.3926 46.8564 32.3114 46.775L27.8489 42.3125H27.8471ZM27.3169 38.6445C27.3169 39.8049 26.856 40.9177 26.0355 41.7381C25.215 42.5586 24.1022 43.0195 22.9419 43.0195C21.7816 43.0195 20.6688 42.5586 19.8483 41.7381C19.0278 40.9177 18.5669 39.8049 18.5669 38.6445C18.5669 37.4842 19.0278 36.3714 19.8483 35.5509C20.6688 34.7305 21.7816 34.2695 22.9419 34.2695C24.1022 34.2695 25.215 34.7305 26.0355 35.5509C26.856 36.3714 27.3169 37.4842 27.3169 38.6445Z" fill="white" />
                                                </svg></span><p>Research to better understand and effectively treat the impacts of developmental trauma</p></li>
                                                <li className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="8"><span><svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="32.3775" cy="32.0142" r="31.6002" fill="#F15D4F" />
                                                    <path d="M43.3151 47.3262H41.1276V44.0449C41.1258 42.5951 40.5491 41.2051 39.5239 40.1798C38.4987 39.1546 37.1087 38.5779 35.6588 38.5762H29.0963C27.6464 38.5779 26.2565 39.1546 25.2312 40.1798C24.206 41.2051 23.6293 42.5951 23.6276 44.0449V47.3262H21.4401V44.0449C21.4424 42.0151 22.2498 40.069 23.6851 38.6337C25.1204 37.1984 27.0665 36.391 29.0963 36.3887H35.6588C37.6887 36.391 39.6347 37.1984 41.07 38.6337C42.5054 40.069 43.3127 42.0151 43.3151 44.0449V47.3262ZM20.3463 21.0762C20.0562 21.0762 19.778 21.1914 19.5729 21.3965C19.3678 21.6016 19.2526 21.8798 19.2526 22.1699V32.0137H21.4401V22.1699C21.4401 21.8798 21.3248 21.6016 21.1197 21.3965C20.9146 21.1914 20.6364 21.0762 20.3463 21.0762Z" fill="white" />
                                                    <path d="M19.2526 16.7012V18.8887H24.7213V26.5449C24.7213 28.5755 25.528 30.5229 26.9638 31.9587C28.3996 33.3945 30.347 34.2012 32.3776 34.2012C34.4081 34.2012 36.3555 33.3945 37.7913 31.9587C39.2272 30.5229 40.0338 28.5755 40.0338 26.5449V18.8887H45.5026V16.7012H19.2526ZM26.9088 18.8887H37.8463V22.1699H26.9088V18.8887ZM32.3776 32.0137C30.9272 32.0137 29.5362 31.4375 28.5106 30.4119C27.485 29.3863 26.9088 27.9953 26.9088 26.5449V24.3574H37.8463V26.5449C37.8463 27.9953 37.2701 29.3863 36.2446 30.4119C35.219 31.4375 33.828 32.0137 32.3776 32.0137Z" fill="white" />
                                                </svg></span><p>Education and training to better equip and support those impacted by developmental trauma effectively</p> </li>
                                                <li className="wow animate__fadeInUp" data-wow-duration="800ms" data-wow-delay="0ms" data-wow-offset="8"><span><img src="images/advocacy-icon.svg" alt="" className="img-fluid" /></span><p>Advocacy to transform policy and practice across systems so appropriate preventative supports are provided</p> </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="about-vision">
                                        <div className="about-vision-box">
                                            <span><img src="images/vission-icon.svg" alt="" className="img-fluid" /></span>
                                            <div className="text-box">
                                                <h4>Our Vision</h4>
                                                <p>A future free from developmental trauma.  </p>
                                            </div>
                                        </div>
                                        <div className="about-vision-box about-vision-box-second">
                                            <span><img src="images/mission-icon.svg" alt="" className="img-fluid" /></span>
                                            <div className="text-box">
                                                <h4>Our Vision</h4>
                                                <p>A future free from developmental trauma.  </p>
                                            </div>
                                        </div>
                                    </div>
                                    <section className="about-researcher">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <div className="content">
                                                    <h4>What is Developmental Trauma </h4>
                                                    <p>Developmental trauma describes the impact of early, frequently repeated trauma or loss, which happens in the context of a child’s important relationships and early attachments. It is most often the result of abandonment, abuse, and neglect during the first five years of a child’s life. These experiences disrupt cognitive, neurological, social, and psychological development and create a range of adverse health and social outcomes.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="img-holder text-end">
                                                    <img src="images/imageResearch.png" alt="" />
                                                    <img src="images/Ellipse48.png" alt="" className="ellipse" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="about-advocacy">
                            <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="about-advocacy-box" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <span><img src="images/research-icon2.svg" alt="" /></span>
                                    <h4>Research</h4>
                                    <a href="#" ><img src="images/left-short-arrow.svg" alt="" /></a>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="about-advocacy-box red-bg" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <span><img src="images/carbon-education.svg" alt="" /></span>
                                    <h4>Training Education</h4>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="images/left-short-arrow.svg" alt="" /></a>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="about-advocacy-box blue-bg" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <span><img src="images/speaker-icon.svg" alt="" /></span>
                                    <h4>Advocacy</h4>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="images/left-short-arrow.svg" alt="" /></a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="about-read">
                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                                    <div className="about-read-box">
                                        <span><svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M33.5 8.38281C32.4013 8.38281 31.3133 8.59922 30.2982 9.01968C29.2831 9.44015 28.3608 10.0564 27.5839 10.8333C26.807 11.6103 26.1907 12.5326 25.7702 13.5477C25.3498 14.5628 25.1334 15.6507 25.1334 16.7494C25.1334 17.8482 25.3498 18.9361 25.7702 19.9512C26.1907 20.9663 26.807 21.8886 27.5839 22.6655C28.3608 23.4424 29.2831 24.0587 30.2982 24.4792C31.3133 24.8997 32.4013 25.1161 33.5 25.1161C35.719 25.1161 37.847 24.2346 39.4161 22.6655C40.9851 21.0965 41.8666 18.9684 41.8666 16.7494C41.8666 14.5305 40.9851 12.4024 39.4161 10.8333C37.847 9.26429 35.719 8.38281 33.5 8.38281ZM52.3438 12.5619C50.6779 12.5619 49.0802 13.2237 47.9022 14.4017C46.7243 15.5796 46.0625 17.1773 46.0625 18.8432C46.0625 20.5091 46.7243 22.1067 47.9022 23.2847C49.0802 24.4627 50.6779 25.1244 52.3438 25.1244C54.0096 25.1244 55.6073 24.4627 56.7853 23.2847C57.9632 22.1067 58.625 20.5091 58.625 18.8432C58.625 17.1773 57.9632 15.5796 56.7853 14.4017C55.6073 13.2237 54.0096 12.5619 52.3438 12.5619ZM14.6563 12.5619C12.9904 12.5619 11.3927 13.2237 10.2147 14.4017C9.03677 15.5796 8.375 17.1773 8.375 18.8432C8.375 20.5091 9.03677 22.1067 10.2147 23.2847C11.3927 24.4627 12.9904 25.1244 14.6563 25.1244C16.3221 25.1244 17.9198 24.4627 19.0978 23.2847C20.2757 22.1067 20.9375 20.5091 20.9375 18.8432C20.9375 17.1773 20.2757 15.5796 19.0978 14.4017C17.9198 13.2237 16.3221 12.5619 14.6563 12.5619ZM20.9375 33.4701C20.9452 32.3646 21.3898 31.307 22.1743 30.528C22.9588 29.7491 24.0195 29.3119 25.125 29.3119H41.875C42.9856 29.3119 44.0507 29.7531 44.836 30.5384C45.6213 31.3237 46.0625 32.3888 46.0625 33.4994V46.0619C46.0622 47.3798 45.8559 48.6896 45.4511 49.9438C44.5239 52.7858 42.6138 55.2042 40.064 56.7648C37.5141 58.3253 34.4914 58.9257 31.5387 58.4581C28.586 57.9905 25.8967 56.4856 23.9537 54.2136C22.0107 51.9417 20.9413 49.0514 20.9375 46.0619V33.4701ZM16.75 33.4994C16.75 31.971 17.1562 30.5431 17.8723 29.3119H8.375C7.26441 29.3119 6.1993 29.7531 5.41399 30.5384C4.62868 31.3237 4.1875 32.3888 4.1875 33.4994V43.9682C4.18693 45.6822 4.6072 47.37 5.41139 48.8836C6.21559 50.3972 7.37911 51.6902 8.79979 52.649C10.2205 53.6079 11.8548 54.2032 13.5594 54.3828C15.2639 54.5624 16.9864 54.3207 18.5758 53.679C17.3705 51.3196 16.7446 48.7071 16.75 46.0578V33.4994ZM50.25 33.4994V46.0619C50.25 48.8048 49.5926 51.3926 48.4243 53.679C50.0136 54.3207 51.7361 54.5624 53.4406 54.3828C55.1452 54.2032 56.7795 53.6079 58.2002 52.649C59.6209 51.6902 60.7844 50.3972 61.5886 48.8836C62.3928 47.37 62.8131 45.6822 62.8125 43.9682V33.4994C62.8125 32.3888 62.3713 31.3237 61.586 30.5384C60.8007 29.7531 59.7356 29.3119 58.625 29.3119H49.1278C49.8396 30.5431 50.25 31.971 50.25 33.4994Z" fill="white" />
                                        </svg></span>
                                        <h4>Our Team</h4>
                                        <p>Get to know the team at Pathways to <br></br> Prevention.</p>
                                        <a href="#">Learn More</a>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="about-read-box">
                                        <span><svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M32.5 0C28.25 0 25 3.25 25 7.5V22.5C25 26.75 28.25 30 32.5 30H47.5L57.5 40V30C61.75 30 65 26.75 65 22.5V7.5C65 3.25 61.75 0 57.5 0H32.5ZM42.97 7.5H47.265L51.485 22.5H47.735L46.7175 18.75H42.9675L42.0325 22.5H38.75L42.97 7.5ZM45 10C44.75 11 44.47 12.22 44.2175 12.97L43.5175 16.25H46.485L45.78 12.9675C45.2825 12.22 45 11 45 10ZM7.5 25C3.25 25 0 28.25 0 32.5V47.5C0 51.75 3.25 55 7.5 55V65L17.5 55H32.5C36.75 55 40 51.75 40 47.5V32.5H32.5C27.75 32.5 23.985 29.25 22.735 25H7.5ZM18.985 32.265C23.235 32.265 25.235 35.765 25.235 39.765C25.235 43.265 24.0325 45.485 22.0325 46.485C23.0325 46.985 24.2175 47.25 25.4675 47.5L24.5325 50C22.7825 49.5 20.9675 48.72 19.2175 47.9675C18.9675 47.7175 18.53 47.735 18.28 47.735C15.28 47.485 12.5 45 12.5 40C12.5 35.75 14.985 32.265 18.985 32.265ZM18.985 35C16.985 35 16.015 37.25 16.015 40C16.015 43 16.985 45 18.985 45C20.985 45 22.03 42.75 22.03 40C22.03 37.25 20.985 35 18.985 35Z" fill="white" />
                                        </svg></span>
                                        <h4>Read Our FAQ</h4>
                                        <p>Do you have any questions? We’re here to help answer them.</p>
                                        <a href="#">Learn More</a>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="about-read-box">
                                        <span><img src="images/info-icon.svg" alt="" /></span>
                                        <h4>About Hull</h4>
                                        <p>Pathways to Prevention is a subdivision of <br></br> Hull Services. </p>
                                        <a href="#">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="governors-sec support-governors-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="governors-inner">
                                    <div className="image-holder"><svg width="176" height="176" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M87.6768 15.7422C57.5221 15.7422 32.9893 40.275 32.9893 70.4297C32.9893 100.584 57.5221 125.117 87.6768 125.117C117.831 125.117 142.364 100.584 142.364 70.4297C142.364 40.275 117.831 15.7422 87.6768 15.7422ZM87.6768 26.6797C111.799 26.6797 131.427 46.307 131.427 70.4297C131.427 94.5523 111.799 114.18 87.6768 114.18C63.5541 114.18 43.9268 94.5523 43.9268 70.4297C43.9268 46.307 63.5541 26.6797 87.6768 26.6797ZM82.208 37.6172V44.125C78.2648 45.5587 74.9996 48.4142 73.0533 52.1313C71.3582 55.4037 70.8481 59.1621 71.6096 62.768C72.2825 65.9052 73.8429 68.783 76.1049 71.0586C77.5978 72.5516 79.3752 73.7602 81.333 74.5969C83.2908 75.4336 85.4346 75.8984 87.6768 75.8984C88.4533 75.8984 89.1861 76.0461 89.8424 76.3141C90.492 76.5784 91.0821 76.97 91.578 77.4659C92.074 77.9618 92.4656 78.5519 92.7299 79.2016C92.9978 79.8578 93.1455 80.5906 93.1455 81.3672C93.1693 82.4444 92.8665 83.5037 92.277 84.4056C91.6874 85.3075 90.8387 86.0099 89.8424 86.4203C89.1861 86.6883 88.4533 86.8359 87.6768 86.8359C86.8947 86.8359 86.1674 86.6883 85.5111 86.4203C84.8621 86.1552 84.2726 85.7628 83.7775 85.2664C83.2707 84.7528 82.8709 84.1437 82.6015 83.4743C82.3321 82.8049 82.1983 82.0887 82.208 81.3672H71.2705C71.2711 85.6222 72.9561 89.7039 75.9572 92.7203C77.7135 94.5114 79.8496 95.8851 82.208 96.7398V103.242H93.1455V96.7344C95.903 95.7459 98.3485 94.0428 100.232 91.7992C102.115 89.5555 103.369 86.8519 103.864 83.9648C104.54 79.8639 103.603 75.6605 101.25 72.2344C100.063 70.4873 98.5567 68.9806 96.8096 67.7937C95.0386 66.592 93.0514 65.7452 90.958 65.3C89.8788 65.0748 88.7792 64.9612 87.6768 64.9609C86.8947 64.9609 86.1674 64.8133 85.5111 64.5453C84.8615 64.281 84.2714 63.8894 83.7755 63.3935C83.2796 62.8976 82.8879 62.3074 82.6236 61.6578C82.3457 60.9698 82.2045 60.2342 82.208 59.4922C82.208 58.7102 82.3557 57.9828 82.6236 57.3266C82.8879 56.6769 83.2796 56.0868 83.7755 55.5909C84.2714 55.095 84.8615 54.7034 85.5111 54.4391C86.1674 54.1711 86.9002 54.0234 87.6768 54.0234C90.7939 54.0234 93.1455 56.375 93.1455 59.4922H104.083C104.084 57.7754 103.811 56.0695 103.274 54.4391C102.469 52.0695 101.14 49.9118 99.3867 48.1262C97.6332 46.3406 95.5 44.973 93.1455 44.125V37.6172H82.208ZM11.1143 114.18V157.93H22.0518V125.117H51.4736C46.8364 122.016 42.6101 118.341 38.8955 114.18H11.1143ZM136.458 114.18C132.743 118.341 128.517 122.016 123.88 125.117H153.302V157.93H164.239V114.18H136.458ZM32.9893 136.055V146.992H142.364V136.055H32.9893Z" fill="white" />
                                    </svg></div>
                                    <div className="text-box">
                                        <h4>Support Pathways to Prevention</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur porttitor consequat, diam nunc adipiscing urna semper. Malesuada eu fringilla faucibus scelerisque phasellus tortor. Bibendum.</p>
                                        <a className="btn btn-default" href="#">Donate Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
                <Footer />
            </div>

            <div className="team-modal " >
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content"> 
                        <div className="modal-body" style={{background: '#daf6f9'}}>
                            <a data-bs-dismiss="modal"  className="close-icon" href="#!"><img src="images/crose-icon.svg" alt="" /></a>
                            <div className="team-modal-inner">
                                <div className="image-holder" style={{width: '200px'}}>
                                    <img src="images/research-icon-big.svg" alt="" className="img-fluid" />
                                </div>
                                <div className="text-box">
                                    <h4>Research </h4> 
                                    <p>Pathways to Prevention is a platform for research that seeks to understand the nature and dynamics of developmental trauma and effective treatments for recovery from difficult childhood experiences. These learnings will be disseminated to global influencers in health care, social services, government, and universities. The goal is to research, understand, and effectively treat the impact of developmental trauma before the issues become critical.  
                                    </p>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
    }