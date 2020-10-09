const express = require("express");
const Router = express.Router();
const db = require("../connection")
const cors = require('cors')
const bodyParser = require('body-parser')

Router.use(cors());
Router.use(express.json())
Router.use(bodyParser.urlencoded({extended:true}))

Router.delete("/:productname",(req, res)=>{
    const product_name = req.params.productname

    const sqldelete="delete from product where product_name=?";

    db.query(sqldelete, product_name,(err, result)=>{
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