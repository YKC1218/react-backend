const express = require("express");
const Router = express.Router();
const db = require("../connection")
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10

Router.use(cors());
Router.use(express.json())
Router.use(bodyParser.urlencoded({extended:true}))


Router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query(
        "INSERT INTO user (user_name, user_pd) VALUES (?,?)",
        [username, hash],
        (err, result) => {
          console.log(err);
        }
      );
    });
  });

module.exports = Router;