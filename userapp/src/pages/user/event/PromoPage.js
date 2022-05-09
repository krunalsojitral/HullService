import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../../../sections/Header";
import Footer from "./../../../sections/Footer";
import Sidebar from "./../Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import api_url from "../../../components/Apiurl";
import { useModal } from "react-hooks-use-modal";
import { useHistory } from "react-router-dom";
import Zoom from "./Zoom";


export default function PromoPage() {
  let history = useHistory();
  const [joinMeeting, setJoinMeeting] = useState(false);
  const [eventId, setEventId] = React.useState(0);
  const [eventDetail, seteventDetail] = React.useState({});
  const [allevents, setallevents] = React.useState("");
  const [reflective, setReflectivecount] = React.useState("");
  const [reflectiveData, setReflectiveData] = useState([]);
  const [Reflectivestate, setReflectivestate] = useState("");
  const [token, setToken] = useState('');

  const [activeTab, setActiveTab] = useState("home");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    let event_id = params.get("id");
    setEventId(event_id);
    getreflectiveData(event_id);
    const tokenString = localStorage.getItem("token");
    var token = JSON.parse(tokenString);
    setToken(token);
    const config = {
      headers: { Authorization: `${token}` },
    };

    if (token) {
      axios
        .post(
          api_url + "/event/getEventDataByIdWithLogin",
          { event_id: event_id },
          config
        )
        .then((result) => {
          if (result.data.status) {
            var eventdata = result.data.response.data;
            seteventDetail(eventdata);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(api_url + "/event/getEventDataById", { event_id: event_id })
        .then((result) => {
          if (result.data.status) {
            var eventdata = result.data.response.data;
            seteventDetail(eventdata);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .post(api_url + "/event/getallevents", { event_id: event_id })
      .then((result) => {
        if (result.data.status){
          setallevents(result.data.data.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(api_url + "/event/getreflective", { event_id: event_id })
      .then((result) => {
        if (result.data.status){
          console.log(result.data.data[0]?.session_no_of_participate);
          setReflectivecount(result.data.data[0]?.session_no_of_participate);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cartEvent = (id, cost, type) => {
    var data = {
      event_id: id,
      cost: cost,
      type: type,
    };

    localStorage.setItem("eventPurchaseData", JSON.stringify(data));
    history.push("/event-cart");
  };

  const zoomJoin = (id) => {
    // axios.post("http://localhost:6161/api/event/newmeeting", { userName, userEmail, passWord }).then((res) => {
    //     setData(res.data.response.data);
    //     console.log("res", res.data.response.data);
    //     var datas = res.data.response.data.join_url;
    // }).catch((err) => console.log("error", err));
  };

  const checkButton = () => {
    const ref = reflective != undefined ? reflective : 0;
    const allevent = allevents != undefined ? allevents : 0;
    if (ref < allevent) {
      // if (true) {
      return (
        <div>
          <div className="rate-btn mt-3">
            <a href="javascript:;" className="btn btn-default w-100">
              {eventDetail.cost && <span>${eventDetail.cost}</span>}
              <span>Register for events only</span>
            </a>
          </div>
          <div className="rate-btn mt-3">
            <a href="javascript:;" className="btn btn-default w-100">
              {eventDetail.cost && <span>${eventDetail.cost}</span>}
              <span>
                Register for Event and Reflection <br />
                Pracice Session
              </span>
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="rate-btn mt-3">
            <a
              onClick={(e) =>
                cartEvent(eventDetail.event_id, eventDetail.cost, "event")
              }
              className="btn btn-default w-100"
            >
              {eventDetail.cost && <span>${eventDetail.cost}</span>}
              <span>Register for events only</span>
            </a>
          </div>
          <div className="rate-btn mt-3">
            <a
              href="javascript:;"
              onClick={(e) => {
                setActiveTab("profile");
                //   cartEvent(
                //   eventDetail.event_id,
                //   (eventDetail.cost + eventDetail.session_cost,
                //   "eventwithsession"))
              }}
              className="btn btn-default w-100"
            >
              {eventDetail.cost && <span>${eventDetail.cost}</span>}
              <span>
                Register for Event and Reflection <br />
                Pracice Session
              </span>
            </a>
          </div>
        </div>
      );
    }
  };

  const getreflectiveData = (event_id) => {
    axios
      .post(api_url + "/event/getreflective", { event_id: parseInt(event_id) })
      .then((result) => {
        if (result.data.status){
          console.log(result.data.status);
          var data = result.data.data;
          console.log("groupedData");
          var data1 = groupArrayOfObjects(data, "group_number");
          const gdata = Object.values(data1);
          console.log(JSON.stringify(gdata));
          setReflectiveData(gdata);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  const group = (data) => {
    var loopvalue;
    for (let i = 0; i < data.length; i++) {
      loopvalue = data[i].group_number;
    }
    return loopvalue;
  };

  const date = (data) => {
    return data.map((item, index) => {
      return (
        <li className="nav-item" role="presentation">
          <a
            href="#"
            className="nav-link"
            id={"pills-Mon-tab" + item.group_number + index}
            data-bs-toggle="pill"
            data-bs-target={"#pills-Mon" + item.group_number + index}
            role="tab"
            aria-controls={"pills-Mon" + item.group_number + index}
            aria-selected={index === 0 ? "true" : null}
            style={{
              fontSize: "14px",
              marginTop: "10px",
              marginLeft: "-25px",
            }}
          >
            {new Date(item.session_time_zone).toDateString()}
          </a>
        </li>
      );
    });
  };

  const time = (data) => {
    return data.map((item, index) => {
      return (
        <div
          className={
            index === 0 ? "tab-pane fade  show active" : "tab-pane fade"
          }
          id={"pills-Mon" + item.group_number + index}
          role="tabpanel"
          aria-labelledby={"pills-Mon" + item.group_number + index + "-tab"}
          style={{ justifyContent: "flex-start" }}
        >
          <div className="duration-inner">
            <ul style={{ justifyContent: "flex-start" }}>
              <li>
                <label className="check ">
                  {item.session_start_time + " to " + item.session_end_time}
                  <input type="checkbox" checked="checked" name="is_name" />
                  <span className="checkmark"></span>
                </label>
              </li>
            </ul>
            <div
              style={{
                justifyContent: "flex-start",
                marginLeft: "15px",
              }}
            >
              <a
                className="btn btn-default"
                onClick={(e) =>
                  cartEvent(
                    eventDetail.event_id,
                    (eventDetail.cost + eventDetail.session_cost,
                    "eventwithsession")
                  )
                }
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Header />
      {!token ? 
      <section
        className="second-banner-sec"
        style={{
          background: `url('images/event-banner.png') no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="container">
          <div className="second-banner-inner">
            <div className="row">
              <div className="col-md-7">
                <div className="text-box">
                  <h2
                    className="wow animate__fadeIn"
                    data-wow-duration="1000ms"
                    data-wow-delay="1000ms"
                  >
                    Our Events
                  </h2>
                </div>
              </div>
              <div className="col-md-5">
                <div className="image-holder">
                  <img
                    src="images/second-banner-img.png"
                    alt=""
                    className="img-fluid wow animate__flipInX"
                    data-wow-duration="1500ms"
                    data-wow-delay="1000ms"
                  />
                </div>
              </div>
            </div>

            <div
              className="second-banner-shape wow animate__zoomIn"
              data-wow-duration="1500ms"
              data-wow-delay="1000ms"
            >
              <img
                src="images/second-banner-shape.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section> : null}

      <div className="event-main">
        <div className="container">
          <ul
            className="nav nav-tabs eventTabs wow animate__fadeIn"
            data-wow-duration="1000ms"
            data-wow-delay="1000ms"
            id="myTab"
            role="tablist"
          >
            <li role="presentation">
              <a
                href="#"
                className={activeTab == "home" ? "active" : ""}
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                onClick={() => setActiveTab("home")}
              >
                Event
              </a>
            </li>
            <li role="presentation">
              <a
                href="#"
                className={activeTab == "profile" ? "active" : ""}
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                onClick={() => setActiveTab("profile")}
              >
                Reflective Practice Sessions
              </a>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            <div
              className={
                activeTab == "home"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row">
                <div
                  className="back-btn-right clearfix"
                  style={{ "textAlign": "right" }}
                >
                  <div className="rate-btn mt-5 ">
                    <a href="#" className="btn btn-default white sm-btn">
                      <span>Back</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="eventDetail">
                <div className="row">
                  <div className="col-lg-5 text-lg-end">
                    <div className="img-holder ringLeft ">
                      {/* <img src="images/event.png" alt="" className="wow animate__fadeInLeft" data-wow-duration="1000ms" data-wow-delay="1000ms" /> */}
                      {!eventDetail.image && (
                        <img
                          alt="event-page"
                          className="event-detail-image wow animate__fadeInLeft"
                          data-wow-duration="1000ms"
                          data-wow-delay="1000ms"
                          src="images/event.png"
                        />
                      )}
                      {eventDetail.image && (
                        <img
                          alt="event-page"
                          className="event-detail-image wow animate__fadeInLeft"
                          data-wow-duration="1000ms"
                          data-wow-delay="1000ms"
                          src={eventDetail.image}
                        />
                      )}
                      <img
                        src="images/Ellipse2.png"
                        alt=""
                        className="ellipse wow animate__fadeIn"
                        data-wow-duration="1500ms"
                        data-wow-delay="1000ms"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="content event-card no-shadow">
                      <div className="event-card-left1">
                        <div className="event-name-title">
                          {!eventDetail.speaker_image && (
                            <img
                              src="images/user-icon.svg"
                              alt=""
                              className="img-fluid speaker-image"
                            />
                          )}
                          {eventDetail.speaker_image && (
                            <img
                              src={eventDetail.speaker_image}
                              alt=""
                              className="img-fluid speaker-image"
                            />
                          )}
                          {eventDetail.speaker_name}
                        </div>
                        <div className="desc event-list-line">
                          {eventDetail.title}{" "}
                        </div>
                        <ul className="mt-50">
                          <li>
                            <i>
                              <img src="images/clarity_date-solid.svg" alt="" />
                            </i>
                            <span>{eventDetail.start_date}</span>
                          </li>
                          <li>
                            <i>
                              <img src="images/bxs_time.svg" alt="" />
                            </i>
                            <span>
                              {eventDetail.start_time} - {eventDetail.end_time}
                            </span>
                          </li>
                          {eventDetail.location && (
                            <li>
                              <i>
                                <img src="images/loc.svg" alt="" />
                              </i>
                              <span>{eventDetail.location}</span>
                            </li>
                          )}
                        </ul>

                        {eventDetail.cost && <h4>${eventDetail.cost}</h4>}
                        {eventDetail.purchase_type == "unpaid" && <h4>Free</h4>}
                        {eventDetail.event_purchase_id && (
                          <div className="rate-btn mt-3">
                            <a
                              target="_blank"
                              href={eventDetail.zoom_link}
                              className="btn btn-default w-100"
                            >
                              Join Meeting
                            </a>
                          </div>
                        )}
                        {!eventDetail.event_purchase_id && checkButton()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <p
                    className="wow animate__fadeInUp"
                    data-wow-duration="1000ms"
                    data-wow-delay="1000ms"
                    dangerouslySetInnerHTML={{
                      __html: eventDetail.description,
                    }}
                  ></p>
                </div>
                <hr />
                <div className="about-event">
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="img-holder">
                        {!eventDetail.speaker_image && (
                          <img
                            className="wow animate__fadeInLeft"
                            data-wow-duration="800ms"
                            data-wow-delay="1000ms"
                            alt="event-page"
                            src="images/about.png"
                          />
                        )}
                        {eventDetail.speaker_image && (
                          <img
                            className="wow animate__fadeInLeft"
                            data-wow-duration="800ms"
                            data-wow-delay="1000ms"
                            alt="event-page"
                            src={eventDetail.speaker_image}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="content">
                        <h4
                          className="wow animate__fadeInUp"
                          data-wow-duration="500ms"
                          data-wow-delay="1000ms"
                        >
                          About {eventDetail.speaker_name}
                        </h4>
                        <p
                          className="wow animate__fadeInUp"
                          data-wow-duration="800ms"
                          data-wow-delay="1000ms"
                          dangerouslySetInnerHTML={{
                            __html: eventDetail.about_speaker,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="reflective-card">
                <h4>{eventDetail.session_title}</h4>
                <p dangerouslySetInnerHTML={{ __html: eventDetail.session_about}}></p>
                <div className="card-warning">
                  <i>
                    <img src="images/waring.svg" alt="" />
                  </i>
                  <div className="media-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lectus tincidunt vel sed egestas sit scelerisque
                    sollicitudin. Facilisi at viverra gravida at euismod
                    ultrices consequat neque non.
                  </div>
                </div>
                <div className="reflective-duration">
                  <h5>
                    <img src="images/bxs_time.svg" alt="" />
                    Duration : 4 Months(21 APRIL to 21 July)
                  </h5>

                  {reflectiveData.length > 0 && reflectiveData.map((item, index) => (
                    <div
                      className="card"
                      style={{ padding: "20px", marginTop: "20px" }}
                    >
                      <text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        {group(item)}
                      </text>

                      <ul
                        className="nav nav-pills"
                        id="pills-tab"
                        role="tablist"
                        style={{
                          justifyContent: "flex-start",
                          marginTop: "10px",
                        }}
                      >
                        {date(item)}
                      </ul>

                      <div
                        className="tab-content"
                        id="pills-tabContent"
                        style={{
                          justifyContent: "flex-start",
                          marginLeft: "-15px",
                          borderBottomWidth: "3px",
                          borderBottomColor: "black",
                        }}
                      >
                        {time(item)}
                      </div>
                    </div>
                  ))}
                  {/* <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link"
                        id="pills-Mon-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Mon"
                        role="tab"
                        aria-controls="pills-Mon"
                        aria-selected="true"
                      >
                        Mon
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link"
                        id="pills-Tue-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Tue"
                        role="tab"
                        aria-controls="pills-Tue"
                        aria-selected="false"
                      >
                        Tue
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link  active"
                        id="pills-Wed-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Wed"
                        role="tab"
                        aria-controls="pills-Wed"
                        aria-selected="false"
                      >
                        Wed
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link"
                        id="pills-Thu-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Thu"
                        role="tab"
                        aria-controls="pills-Thu"
                        aria-selected="false"
                      >
                        Thu
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link"
                        id="pills-Fri-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Fri"
                        role="tab"
                        aria-controls="pills-Fri"
                        aria-selected="false"
                      >
                        Fri
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-Mon"
                      role="tabpanel"
                      aria-labelledby="pills-Mon-tab"
                    >
                      ...
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-Tue"
                      role="tabpanel"
                      aria-labelledby="pills-Tue-tab"
                    >
                      ...
                    </div>
                    <div
                      className="tab-pane fade  show active"
                      id="pills-Wed"
                      role="tabpanel"
                      aria-labelledby="pills-Wed-tab"
                    >
                      <div className="duration-inner">
                        <ul>
                          <li>
                            <label className="check ">
                              10AM to 12PM
                              <input
                                type="checkbox"
                                checked="checked"
                                name="is_name"
                              />
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="check ">
                              2pm to 5PM
                              <input
                                type="checkbox"
                                checked="checked"
                                name="is_name"
                              />
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="check ">
                              2pm to 5PM
                              <input
                                type="checkbox"
                                checked="checked"
                                name="is_name"
                              />
                              <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                        <div className="text-center">
                          <a className="btn btn-default" href="#">
                            Submit
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-Thu"
                      role="tabpanel"
                      aria-labelledby="pills-Thu-tab"
                    >
                      ...
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-Fri"
                      role="tabpanel"
                      aria-labelledby="pills-Fri-tab"
                    >
                      ...
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="hero-banner-inner">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-7">
                            <div className="banner-text">
                                <h1>{eventDetail.title}</h1>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <div className="img-right">
                                <img src="images/brain.png" alt="brain"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="event-main event-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Event</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Reflective Practice Sessions</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="media">
                                                {!eventDetail.image && <img alt="event-page" src="images/event-page.png" />}
                                                {eventDetail.image && <img alt="event-page" src={eventDetail.image} />}
                                                    <div className="media-body">
                                                        <div className="media-left">
                                                            <div className="avatar">
                                                                <img src="images/avatar.png" alt="avatar"/>
                                                                <h2>{eventDetail.speaker_name}</h2>
                                                            </div>
                                                            <h3>{eventDetail.title}</h3>

                                                            <div className="event-icons">
                                                                <label><img src="images/date.png" alt="date"/>{eventDetail.start_date}</label>
                                                                <label><img src="images/time.png" alt="time"/>{eventDetail.start_time} - {eventDetail.end_time}</label>
                                                            {eventDetail.location && <label><img src="images/location.png" alt="location" />{eventDetail.location.substring(0, 40)}</label>}
                                                            </div>
                                                        </div>
                                                        <div className="media-right">
                                                            {eventDetail.cost && <h4>${eventDetail.cost}</h4>}                                                         
                                                            {eventDetail.purchase_type == 'unpaid' && <h4>Free</h4>}                                                         
                                                            {eventDetail.event_purchase_id && <div className="media-button">
                                                            
                                                             onClick={(e) => zoomJoin(eventDetail.event_id)}  
                                                            
                                                            <a target="_blank" href='javascript:;' className="thm-btn">Join Meeting</a>
                                                            </div>}
                                                            {!eventDetail.event_purchase_id && <div className="media-button">
                                                                <a onClick={(e) => cartEvent(eventDetail.event_id, eventDetail.cost)} className="thm-btn">Register for <br />events only</a>
                                                               
                                                                <a href="javascript:;" onClick={(e) => cartEvent(eventDetail.event_id, (eventDetail.cost + eventDetail.session_cost))} className="thm-btn-outline">Register for Event and <br />
                                                                    Reflection Pracice Session</a>
                                                            </div>}
                                                        </div>

                                                         <div>
                                                            {joinMeeting ? (
                                                                <div> 
                                                                    <Zoom />
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <button style={{ border: '1px solid #fff' }} onClick={() => setJoinMeeting(true)}>Join Meeting</button>
                                                                </div>
                                                            )}
                                                        </div>  
                                                        
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="event-texyt">
                                                <p dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="event-media">
                                                <div className="media">

                                                    
                                                    {!eventDetail.speaker_image && <img alt="event-page" src="images/event-detail.png" />}
                                                    {eventDetail.speaker_image && <img alt="event-page" src={eventDetail.speaker_image} />}
                                                    
                                                        <div className="media-body">
                                                            <h5>About {eventDetail.speaker_name}</h5>
                                                            <p dangerouslySetInnerHTML={{ __html: eventDetail.session_about }}></p>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row justify-content-center">
                                        <div className="col-sm-10">
                                            <div className="reflectiv-cntnt">
                                                <h3>{eventDetail.title}</h3>
                                                <p dangerouslySetInnerHTML={{ __html: eventDetail.description }}></p>
                                                <div className="alert">
                                                    <img src="images/alert.png" alt="alert"/>
                                                        <label>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tincidunt vel sed egestas sit scelerisque sollicitudin. Facilisi at viverra gravida at euismod ultrices consequat neque non.</label>
                                                </div>
                                                <div className="duration">
                                                    <img src="images/time.png" alt="time" className="mr-2"/>
                                                        Duration : 4 Months(21 APRIL to 21 July)
                                                </div>
                                                <div className="day-tabs">
                                                    <ul className="nav nav-tabs" id="myTab1" role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" id="mon-tab" data-toggle="tab" href="#mon" role="tab" aria-controls="mon" aria-selected="true">Mon</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="tue-tab" data-toggle="tab" href="#tue" role="tab" aria-controls="tue" aria-selected="false">Tue</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="wed-tab" data-toggle="tab" href="#wed" role="tab" aria-controls="wed" aria-selected="false">Wed</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="thu-tab" data-toggle="tab" href="#thu" role="tab" aria-controls="thu" aria-selected="false">Thu</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="fri-tab" data-toggle="tab" href="#fri" role="tab" aria-controls="fri" aria-selected="false">Fri</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane fade show active" id="mon" role="tabpanel" aria-labelledby="mon-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-1" type="checkbox" value="ch-1" name="ch-1" />
                                                                <label for="ch-1">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-2" type="checkbox" value="ch-2" name="ch-2" />
                                                                <label for="ch-2">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-3" type="checkbox" value="ch-3" name="ch-3" />
                                                                <label for="ch-3">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="tue" role="tabpanel" aria-labelledby="tue-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="get-up-1" type="checkbox" value="get-up-1" name="get-up-1" />
                                                                <label for="get-up-1">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="make-bed-1" type="checkbox" value="make-bed-1" name="make-bed-1" />
                                                                <label for="make-bed-1">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="clean-teeth-1" type="checkbox" value="clean-teeth-1" name="clean-teeth-1" />
                                                                <label for="clean-teeth-1">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="wed" role="tabpanel" aria-labelledby="wed-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-4" type="checkbox" value="ch-4" name="ch-4" />
                                                                <label for="ch-4">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-5" type="checkbox" value="ch-5" name="ch-5" />
                                                                <label for="ch-5">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-6" type="checkbox" value="ch-6" name="ch-6" />
                                                                <label for="ch-6">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="thu" role="tabpanel" aria-labelledby="thu-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-7" type="checkbox" value="ch-7" name="ch-7" />
                                                                <label for="ch-7">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-8" type="checkbox" value="ch-8" name="ch-8" />
                                                                <label for="ch-8">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-9" type="checkbox" value="ch-9" name="ch-9" />
                                                                <label for="ch-9">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="fri" role="tabpanel" aria-labelledby="fri-tab">
                                                            <div className="checkbox-block">
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-11" type="checkbox" value="ch-11" name="ch-11" />
                                                                <label for="ch-11">10AM to 12PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-22" type="checkbox" value="ch-22" name="ch-22" />
                                                                <label for="ch-22">2pm to 5PM</label>
                                                                
                                                                <input className="checkbox-effect checkbox-effect-1" id="ch-33" type="checkbox" value="ch-33" name="ch-33" />
                                                                <label for="ch-33">2pm to 5PM</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-block text-center">
                                                    <a href="javascript:;" onClick={(e) => cartEvent(eventDetail.event_id, (eventDetail.session_cost))} className="thm-btn">Submit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>                            
                            </div>


                        </div>
                    </div>
                </div>
            </section> */}

{!token ?
      <Footer /> : null }
    </div>
  );
}
