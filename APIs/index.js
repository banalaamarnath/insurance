var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var path  = require("path");
var app = express();
var cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ type: 'application/json' }));
app.use(express.static('public'));
var validations = require("../validations/validations");
var controllers = require("../controllers/controllers");
var db = mongoose.connect('mongodb://localhost:27017/insurance', { useNewUrlParser: true, useUnifiedTopology: true });


//signup
app.post('/signup',validations.signupValidate,controllers.hashPassword,controllers.signupuser)

//login
app.post('/login',validations.loginValidate,controllers.login)

//AddCustomers
app.post('/AddCustomer',controllers.verifyToken,controllers.AddCustomers)

//get Customers
app.get('/Customers',controllers.verifyToken,controllers.Customers);

//edit Customer,get customer by Customerid to display in form
app.get('/EditCustomer',controllers.verifyToken,controllers.EditCustomer);

//update Customer
app.post('/UpdateCustomer',controllers.verifyToken,controllers.UpdateCustomer)

//View Customer
app.get('/ViewCustomer',controllers.verifyToken,controllers.ViewCustomer)

//delete Customer
app.delete('/deletecustomer',controllers.verifyToken,controllers.deletecustomer)

//filter customer
app.get("/filterCustomer",controllers.verifyToken,controllers.filterCustomer);

//dashboard
app.get("/dashboard",controllers.verifyToken,controllers.dashboard)

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,'../public','html','login.html'));    
})

app.listen(2222, function () {
    console.log("2222 is listhening");
})