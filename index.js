const express = require("express");
const app = express();
const port = 3000;
const randnum = Math.round(Math.random() * 10);
const CryptoJS = require("crypto-js");
const axios = require("axios");
const qs = require("qs");
const moment = require("moment");

function getToken() {
  var secret = "338736324b07cd82bb8e5ca97a4badb1";
  var data = {
    email: "jaspher@mailnesia.com",
    password: "welcome123!",
    client_id: "1316332209"
  };
  data = JSON.stringify(data);
  var signature = CryptoJS.MD5(data + secret).toString();
  var payload = {
    data: data,
    signature: signature
  };
  return axios({
    method: "POST",
    url: "https://gloapi.chinabrands.com/v2/user/login",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify(payload)
  });
}

app.get("/token", (req, res) => {
  var token;
  getToken().then(resp => {
    token = resp.data.msg.token;
    res.send(token);
  });
});

app.get("/categories", (req, res) => {
  getToken().then(resp => {
    token = resp.data.msg.token;
    var payload = {
      token: token
    };
    axios({
      method: "POST",
      url: "https://gloapi.chinabrands.com/v2/category/index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(payload)
    })
      .then(resp => {
        res.send(resp.data);
      })
      .catch(err => console.log(err));
  });
});

app.get("/products", (req, res) => {
  getToken().then(resp => {
    token = resp.data.msg.token;

    var payload = {
      token: token,
      type: 0
    };
    axios({
      method: "POST",
      url: " https://gloapi.chinabrands.com/v2/user/inventory",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(payload)
    })
      .then(resp => {
        res.send(resp.data);
      })
      .catch(err => console.log(err));
  });
});

app.get("/product/:prodSku", (req, res) => {
  //res.send( + req.params.prodSku);
  getToken().then(resp => {
    token = resp.data.msg.token;

    var payload = {
      token: token,
      cat_id: req.params.prodSku
    };
    axios({
      method: "POST",
      url: " https://gloapi.chinabrands.com/v2/product/search-sku",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(payload)
    })
      .then(resp => {
        res.send(resp.data);
      })
      .catch(err => console.log(err));
  });
});

app.get("/productinfo/:prodSku", (req, res) => {
  //res.send( + req.params.prodSku);
  getToken().then(resp => {
    token = resp.data.msg.token;

    var payload = {
      token: token,
      goods_sn: req.params.prodSku
    };
    axios({
      method: "POST",
      url: " https://gloapi.chinabrands.com/v2/product/index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(payload)
    })
      .then(resp => {
        res.send(resp.data);
      })
      .catch(err => console.log(err));
  });
});

app.get("/getshipping/:prodSku/:qty/:warehouse", (req, res) => {
  getToken().then(resp => {
    token = resp.data.msg.token;
    goods = JSON.stringify([
      { sku: req.params.prodSku, quantity: req.params.qty }
    ]);

    var payload = {
      token: token,
      country: "PH",
      warehouse: req.params.warehouse,
      //shipping: req.params.shipper,
      goods: goods
    };
    axios({
      method: "POST",
      url: "https://gloapi.chinabrands.com/v2/shipping/cost",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(payload)
    })
      .then(resp => {
        res.send(resp.data);
      })
      .catch(err => console.log(err));
  });
});

app.get("/getshippers", (req, res) => {
  //res.send( + req.params.prodSku);
  getToken().then(resp => {
    token = resp.data.msg.token;

    var payload = {
      token: token
    };
    axios({
      method: "POST",
      url: "https://gloapi.chinabrands.com/v2/shipping/index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(payload)
    })
      .then(resp => {
        res.send(resp.data);
      })
      .catch(err => console.log(err));
  });
});

app.listen(port, () => console.log(`Ziggurat started on port ${port}!`));
