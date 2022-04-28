import "./Zoom.css";
import { useEffect, useState } from "react";
import axios from "axios";

var leaveUrl = "http://localhost:4200/event-promo?id=27"; // our redirect url



const Zoom = () => {
  // loading zoom libraries before joining on component did mount
  const [Data, setData] = useState(null);
  useEffect(() => {

    const { ZoomMtg } = require('@zoomus/websdk')
    
    showZoomDIv();

   var obj = {
     userEmail : "er.dipikapatel@gmail.com",
     userName : "kamal",
     passWord: "RaNUL7",
     meetingNumber: "89623942971"
   }
    axios.post("http://localhost:6161/api/event/joinmeeting", obj).then((res) => {
      // setData(res.data.response.data);
      // console.log("res", res.data.response.data);
      // var datas = res.data.response.data;  
      // console.log(datas.password);
      // console.log(datas);
      setData(res);
      console.log(res);
      console.log(res.data.signature);
      var signature = res.data.signature;   
      initiateMeeting(obj.meetingNumber, obj.password, signature);
      
    }).catch((err) => console.log("error", err));

    const initiateMeeting = (meetingNumber, password, signature) => {
      ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
      ZoomMtg.init({
        leaveUrl: leaveUrl,
        isSupportAV: true,
        success: (success) => {
          console.log('???????????');
          console.log(success);
          console.log(signature);
          console.log(meetingNumber);
          console.log(password);
          ZoomMtg.join({
            signature: signature,
            meetingNumber: meetingNumber,
            userName: "kamal",
            apiKey: "o4xds6wbTjiKWl7swm19aA",
            userEmail: "er.dipikapatel@gmail.com",
            passWord: "RaNUL7",
            success: (success) => {
              console.log(success);
            },
            error: (error) => {
              console.log(']]]]]]]]]]]]]]]]]');
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(']]]]]]]]-------------]]]]]]]]]');
          console.log(error);
        },
      });
    };
    
  }, []);

  

  
  const showZoomDIv = () => {
    document.getElementById("zmmtg-root").style.display = "block";
  };
  return <div className="App">Zoom</div>;
};

export default Zoom;