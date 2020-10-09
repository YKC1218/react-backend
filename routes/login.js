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


Router.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

Router.get('/login', (req, res)=>{
  if(req.session.user){
    res.send({loggedIn:true, user:req.session.user})
  } else{
    res.send({loggedIn:false});
  }
});


Router.post('/login', (req, res)=>{
    const username= req.body.username; //係frontend AXIOS request時 既variable username
    const password= req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash)=>{
        if (err){
            console.log(err)
        }
    })

    db.query(
        "SELECT * FROM user WHERE user_name = ?;",
        username,
        (err, result) => {
          
          if (err) {
            res.send({ err: err });
          }

//check有冇呢個username
          if (result.length > 0) {
            //check 比較user input既pd 同DB比較加密後pd 正唔正確
            bcrypt.compare(password, result[0].user_pd, (error, response) => {
              //有response=密碼正確
              if (response) {
                  req.session.user = result
                  console.log(req.session.user);
                res.send(result);
              } else {
                res.send({ message: "Wrong username/password combination!" });
              }
            });
          } else {
            res.send({ message: "User doesn't exist" });
          }
        }
      );
    });

  Router.get('/logout', (req, res)=> {
      if (req.session.user) {
              res.clearCookie('userId');
              res.send({loggedIn: false})
          }
        })
      ;


module.exports = Router;