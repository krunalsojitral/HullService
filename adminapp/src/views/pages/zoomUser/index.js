import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import api_url from "../../Apiurl";
import Swal from "sweetalert2";

const DemoTable = () => {
  const [items, setItems] = useState([]);
  React.useEffect(() => {
    getNewList();
  }, []);

  const getNewList = (status) => {
    axios
      .get(api_url + "/event/listzoomuser")
      .then((result) => {
        if (result.data.status) {
          console.log(result.data.data);
          var usersdatas = result.data.data;
          setItems(usersdatas);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshzoomuser = () => {
    axios
      .get(api_url + "/event/schedule")
      .then((result) => {
        if (result.data.status) {
          console.log("update");
        } else {
          console.log("not update");
        }
      })
      .catch((err) => {
        console.log("not update");
      });
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          refreshzoomuser();
        }}
      >
        refresh
      </button>
      <table className="table caption-top">
        <caption>List of Zoom users</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>{item.status == 0 ? "pending" : "success"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemoTable;
