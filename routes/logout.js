const express = require("express");
const Router = express.Router();
const db = require("../connection");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10
Router.use(bodyParser.urlencoded({extended:true}));


const cookieParser = require("cookie-parser");
const session = require("express-session");
Router.use(express.json());
Router.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET","POST"],
  credentials:true
}));
Router.use(cookieParser());
Router.use(express.json());


Router.get('/', (req, res)=> {
    if (session) {
            res.clearCookie('userId');
            res.send({loggedIn: false})
        }
      })
    ;

    
module.exports = Router;