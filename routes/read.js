const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection")

Router.get("/",(req, res)=>{
    mysqlConnection.query("select * from product", (err, rows, fields)=>{
        if(!err)//如果冇err就return下面
            {    
                            
                const product=rows
                res.send(product);
            }
        else{
                console.log(err)
        }
    })
})

module.exports = Router;