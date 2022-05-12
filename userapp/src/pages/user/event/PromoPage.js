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
// import "./PromoPage.css";

export default function PromoPage() {
  let history = useHistory();
  const [joinMeeting, setJoinMeeting] = useState(false);
  const [eventId, setEventId] = React.useState(0);
  const [eventDetail, seteventDetail] = React.useState({});
  const [allevents, setallevents] = React.useState("");
  const [reflective, setReflectivecount] = React.useState("");
  const [reflectiveData, setReflectiveData] = useState([]);
  const [purchasseData, setPurchaseData] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [token, setToken] = useState('');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    let event_id = params.get("id");
    setEventId(event_id);

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
            console.log("eventdata : ", eventdata);
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
            console.log("eventdata : ", eventdata);
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
        console.log("Purchase Length : ", result.data.data);
        setPurchaseData(result.data.data);
        setallevents(result.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(api_url + "/event/getreflective", { event_id: event_id })
      .then((result) => {
        console.log(result.data.response.msg[0]?.session_no_of_participate);
        setReflectivecount(
          result.data.response.msg[0]?.session_no_of_participate
        );
      })
      .catch((err) => {
        console.log(err);
      });

    getreflectiveData(event_id);
  }, []);

  const cartEvent = (id, cost, type, gtype) => {
    var data = {
      event_id: id,
      cost: cost,
      type: type,
      group_type: gtype,
    };

    localStorage.setItem("eventPurchaseData", JSON.stringify(data));
    history.push("/event-cart");
  };

  const checkButton = (isExpired) => {
    // if (true) {
    if (isExpired) {
      return (
        <div>
          <div className="rate-btn mt-3">
            <a className="btn btn-default w-100">
              {eventDetail.cost && <span>${eventDetail.cost}</span>}
              <span>Event Already Expired</span>
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
                cartEvent(eventDetail.event_id, eventDetail.cost, "event", "")
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

  const groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const getreflectiveData = (event_id) => {
    console.log("Reflective Data");
    axios
      .post(api_url + "/event/getreflective", { event_id: parseInt(event_id) })
      .then((result) => {
        var data = result.data.response.msg;
        var data1 = groupArrayOfObjects(data, "group_number");
        const gdata = Object.values(data1);
        console.log("Reflective Data");
        console.log(gdata);
        setReflectiveData(gdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const group = (data) => {
    var loopvalue;
    return data[0].group_number;
  };

  const date = (data) => {
    const item = [];
    for (let i = 0; i < data.length; i++) {
      item.push(
        <li className="nav-item" role="presentation">
          <a
            href="#"
            className={i == 0 ? "nav-link active" : "nav-link"}
            id={"pills-Mon-tab" + data[i].group_number + i}
            data-bs-toggle="pill"
            data-bs-target={"#pills-Mon" + data[i].group_number + i}
            role="tab"
            aria-controls={"pills-Mon" + data[i].group_number + i}
            aria-selected={i === 0 ? "true" : null}
            style={{
              fontSize: "14px",
              marginTop: "10px",
              marginLeft: "-25px",
            }}
          >
            {new Date(data[i].session_time_zone).toDateString()}
          </a>
        </li>
      );
    }
    return item;
  };

  const time = (data) => {
    const item = [];
    for (let i = 0; i < data.length; i++) {
      item.push(
        <div
          className={i === 0 ? "tab-pane fade  show active" : "tab-pane fade"}
          id={"pills-Mon" + data[i].group_number + i}
          role="tabpanel"
          aria-labelledby={"pills-Mon" + data[i].group_number + i + "-tab"}
          style={{ justifyContent: "flex-start" }}
        >
          <div className="duration-inner">
            <ul style={{ justifyContent: "flex-start" }}>
              <li>
                <label className="check ">
                  {data[i].session_start_time +
                    " to " +
                    data[i].session_end_time}
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
              {endDateCondition(eventDetail.reflective_expiry_date) ||
              allevents > parseInt(data[i].session_no_of_participate) ? (
                <a target="_blank" className="btn btn-default w-100">
                  Event Unavilable
                </a>
              ) : reflectivePurchased(purchasseData) &&
                groupType(purchasseData, data[i].group_number) ? (
                data[i].join_url === "res?.start_url" ? (
                  <a
                    target="_blank"
                    className="btn btn-default w-100"
                    onClick={() => {
                      Swal.fire(
                        "Oops...",
                        "User Email Is Not Activeted",
                        "error"
                      );
                    }}
                  >
                    Join Meeting
                  </a>
                ) : (
                  <a target="_blank" href={data[i].join_url}>
                    Join Meeting
                  </a>
                )
              ) : reflectivePurchased(purchasseData) ? (
                <a
                  target="_blank"
                  className="btn btn-default w-100"
                  onClick={() => {
                    Swal.fire("Oops...", "Event already purchased", "error");
                  }}
                  //onClick={() => { alert("Event already purchased");}}
                >
                  Buy
                </a>
              ) : (
                <a
                  className="btn btn-default"
                  onClick={(e) =>
                    cartEvent(
                      eventDetail.event_id,
                      eventDetail.cost + eventDetail.session_cost,
                      "reflective",
                      data[i].group_number
                    )
                  }
                >
                  Submit
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }
    return item;
  };

  const reflectiveloop = () => {
    const item = [];
    for (let i = 0; i < reflectiveData.length; i++) {
      item.push(
        <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
          <text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {group(reflectiveData[i])}
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
            {date(reflectiveData[i])}
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
            {time(reflectiveData[i])}
          </div>
        </div>
      );
    }
    return item;
  };

  const endDateCondition = (date) => {
    var currentDate = new Date();
    var endDate = new Date(date);
    var currentDateMills = Date.parse(currentDate);
    var endDateMills = Date.parse(endDate);
    return currentDateMills > endDateMills;
  };

  const reflectivePurchased = (data) => {
    var value = false;
    for (let index = 0; index < data.length; index++) {
      if (purchasseData[index].event_type === "reflective") {
        value = true;
      }
    }
    return value;
  };

  const eventPurchased = (data) => {
    var value = false;
    for (let index = 0; index < data.length; index++) {
      if (purchasseData[index].event_type === "event") {
        value = true;
      }
    }
    return value;
  };

  const groupType = (data, type) => {
    var value = false;
    for (let index = 0; index < data.length; index++) {
      if (purchasseData[index].group_type === type) {
        value = true;
      }
    }
    return value;
  };

  return (
    <div>
      <Header />
      {!token && <section
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
      </section>}

      {token &&
        <div>
          <br />
          <section class="inner-header ">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <h2>Event Detail</h2>
                </div>
              </div>
            </div>
          </section>
        </div>
      }

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
                  style={{ "text-align": "right" }}
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
                        {eventDetail.event_purchase_id &&
                          eventPurchased(purchasseData) && (
                            <div className="rate-btn mt-3">
                              {endDateCondition(eventDetail.end_date) ? (
                                <a
                                  target="_blank"
                                  className="btn btn-default w-100"
                                >
                                  Event Unavilable
                                </a>
                              ) : (
                                <a
                                  target="_blank"
                                  href={eventDetail.zoom_link}
                                  className="btn btn-default w-100"
                                >
                                  Join Meeting
                                </a>
                              )}
                            </div>
                          )}

                        {(!eventDetail.event_purchase_id ||
                          !eventPurchased(purchasseData)) &&
                          checkButton(endDateCondition(eventDetail.end_date))}
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
              className={
                activeTab == "profile"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="reflective-card">
                <h4>{eventDetail.session_title}</h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: eventDetail.session_about,
                  }}
                ></p>
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

                  {reflectiveloop()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
