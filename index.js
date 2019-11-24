const express = require("express");
const app = express();
const port = 3000;
const randnum = Math.round(Math.random() * 10);
const CryptoJS = require("crypto-js");
const axios = require("axios");
const qs = require("qs");

app.get("/", (req, res) => {
  var secret = "338736324b07cd82bb8e5ca97a4badb1";
  var data = {
    email: "jaspher@mailnesia.com",
    password: "welcome123!",
    client_id: "1316332209"
  };
  data = JSON.stringify(data);
  var signature = CryptoJS.MD5(data + secret).toString();
  console.log(signature);
  var payload = {
    data: data,
    signature: signature
  };
  axios({
    method: "POST",
    url: "https://gloapi.chinabrands.com/v2/user/login",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify(payload)
  })
    .then(resp => {
      res.send(resp.data);
    })
    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Ziggurat started on port ${port}!`));
