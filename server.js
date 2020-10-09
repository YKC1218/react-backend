const express = require('express');
const app = express();

const read = require("./routes/read");
const create = require("./routes/create");
const Delete = require("./routes/delete");
const update = require("./routes/update");
const Register = require("./routes/register");
const login = require("./routes/login");


//用"/people" 取代PeopleRoutes入面既route
app.use("/product", read)
app.use("/create", create)
app.use("/delete", Delete)
app.use("/update", update)
app.use("/register",Register)
app.use(login)






app.listen(process.env.PORT || 8000, () => console.log('Server started on port 8000'));