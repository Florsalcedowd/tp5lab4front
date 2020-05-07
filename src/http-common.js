import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9001/api/v1/instrumentos/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});
