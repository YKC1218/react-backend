const express = require("express");
const Router = express.Router();
const db = require("../connection")
const cors = require('cors')
const bodyParser = require('body-parser')

Router.use(cors());
Router.use(express.json())
Router.use(bodyParser.urlencoded({extended:true}))

Router.post("/",(req, res)=>{
    const product_name = req.body.product_name
    const product_price = req.body.product_price
    const product_weight = req.body.product_weight
    const source = req.body.Source

    const sqlinsert="insert into product (product_name, product_price, product_weight, source) values (?,?,?,?)";
    db.query(sqlinsert, [product_name, product_price, product_weight, source],(err, result)=>{
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