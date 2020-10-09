const express = require("express");
const Router = express.Router();
const db = require("../connection")
const cors = require('cors')
const bodyParser = require('body-parser')

Router.use(cors());
Router.use(express.json())
Router.use(bodyParser.urlencoded({extended:true}))

Router.put("/",(req, res)=>{
    const product_name = req.body.product_name
    const price = req.body.product_price
    const weight = req.body.product_weight
    const source = req.body.Source
    const sqlupdate="update product set product_price=?, product_weight=?, source=? where product_name = ?";

    db.query(sqlupdate,[price, weight, source, product_name],(err, result)=>{
        if(!err)//如果冇err就return下面
            {    
                //res.send("created new product");
                console.log(result)
            }
        else{
                console.log(err)
        }
    })
})

module.exports = Router;