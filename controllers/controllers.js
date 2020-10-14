var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var signup = require("../models/signup");
var AddCustomer = require("../models/AddCustomer");

var signupSchema = signup.signupSchema;
var AddCustomerSchema = AddCustomer.AddCustomerSchema
var secertkey = "tokenkey";

//signupuser
function signupuser(req, res) {
    console.log("in");
    var data = new signupSchema({ name: req.body.fullname, branch: req.body.branch, email: req.body.email, mobile: req.body.mobile, password: req.hashedPassword })
    console.log(data);
    console.log("name", req.body.name);
    data.save(function (err, sucess) {
        if (err) {
            res.status(400).send(err.message);
            console.log(err.message);
        }
        if (sucess) {
            req.hashedPassword = null
            res.type('json');
            res.status(200).send({ message: "inserted sucessfully" });

        }
    })
}

//hashpassword
function hashPassword(req, res, next) {
    var saltRounds = 5;
    bcrypt.hash(req.body.password, saltRounds, function (err, hashingPassword) {
        if (err) {
            res.status(400).send({ message: "Something went wrong with hasingPassword" });
            return;
        }
        if (hashingPassword) {
            req.hashedPassword = hashingPassword;
            console.log("hashedPassword:", req.hashedPassword);
            //bcrypt.compare(req.body.password,req.hashedPassword,function(err,result){
            // console.log("password:",result);
            return next();
            //})

        }
    })
}

//checking login details
function login(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    signupSchema.findOne({ email: username }, { email: 1, password: 1 }, function (err, data) {
        if (err) {
            res.status(400).send({ message: "Something went wrong or invalid credetainls" })
            return;
        }
        if (data) {
            console.log("login data:", data.password);
            bcrypt.compare(password, data.password, function (err, result) {
                if (err) {
                    res.status(400).send({ message: "Something Went wrong" });
                    return;
                }
                if (!result) {
                    console.log("invalid details");
                    res.status(400).send({ message: "Invalid Login Details" });
                    return;
                }
                else {
                    console.log("login sucessfull");
                    var _id = data._id;
                    var token = jwt.sign({ _id: _id }, secertkey, { expiresIn: '10hr' }, function (err, token) {
                        if (err) {
                            res.status(400).send({ messaage: "Failed to generate token" });
                            return;
                        }
                        if (token) {
                            console.log("token:", token);
                            res.status(200).send({ message: "login sucessfull", token: token })
                        }
                    })

                }
            })
        }
    })


}

//Verify Token
function verifyToken(req, res, next) {
    //req.headers.token = null;
    var token = req.cookies['token'];
    console.log("headers", req.headers);
    console.log("cookie", req.cookies['token']);
    console.log("Token:", token);
    jwt.verify(token, secertkey, function (err, result) {
        if (err) {
            res.status(400).send({ messaage: "Something Went Wrong or Invalid Token" });
            return;
        }
        if (result) {
            console.log(result);
            req.id = result._id;
            console.log("req.idd", req.id)
        }

    })
    return next();
}

//get Customers based on user
function Customers(req, res) {
    var id = req.id;
    console.log("Customers", id);
    AddCustomerSchema.find({ "CreatedBy": id }, function (err, result) {
        if (err) {
            res.status(400).send({ message: "Something went wrong or Data not Found" });
            return;
        }
        if (result) {
            console.log(result);
            res.status(200).send(result);
        }
    })
}

//Display Customer to Update
function EditCustomer(req, res) {
    console.log("id:", req.query.id);
    AddCustomerSchema.findById(req.query.id, function (err, result) {
        if (err) {
            res.status(404).send({ message: "data not found or Something went wrong" });
        }
        if (result) {
            res.status(200).send(result);
            console.log(result);
        }
    })
}

//Update Customer
function UpdateCustomer(req, res) {
    var data = {
        PresentAddressDetails: {
            Address: req.body.PresentAddress,
            Pincode: req.body.PresentAddressPincode,
            Phone: req.body.PresentAddressPhone
        },
        HusbandDeatils: {
            Name: req.body.HusbandName,
            Age: req.body.HusbandAge
        },
        NomineeDeatils: {
            Name: req.body.NomineeName,
            Age: req.body.NomineeAge,
            Relation: req.body.NomineeRelation
        },
        EmployementDetails: {
            EmployeeService: req.body.EmployeeService,
            CompanyAddress: req.body.CompanyAddress,
            Pincode: req.body.CompanyAddressPincode
        },
        PlansAndTermsDetails: {
            PlansAndTerms: req.body.PlansAndTerms,
            TotalBhema: req.body.TotalBhema,
            Mode: req.body.Mode,
            Premium: req.body.Premium
        },
        Fullname: req.body.FullName,
        PermantAddress: req.body.PermanentAddress,
        Dob: req.body.Dob,
        PresentAge: req.body.PresentAge,
        EducationQualification: req.body.EducationQualification,
        Occupation: req.body.Occupation,
        YearlyIncome: req.body.YearlyIncome,
        FathersName: req.body.FatherName,
        PlaceOfBirth: req.body.PlaceOfBirth,
        policyInformation: {
            policyTaken: req.body.policyTaken,
            policyExpiry: req.body.policyExpiry
        },
    }
    AddCustomerSchema.findByIdAndUpdate(req.body.Customerid, data, function (err, result) {
        if (err) {
            res.status(500).send({ messaage: "Update Failed" });
            console.log("error:", err);
            return;
        }
        if (result) {
            res.status(200).send({ messaage: "Updated Sucessfully" });
            console.log("result:", result);
        }
    })
}


//AddCustomer
function AddCustomers(req, res) {
    // var PresentAddress = PresentAddressDetails.Address;
    // var PresentAddressPincode = PresentAddressDetails.Pincode;
    // var PresentAddressPhone = PresentAddressDetails.Phone;
    // var HusbandName = HusbandDeatils.Name;
    // var HusbandAge = HusbandDeatils.Age;
    // var NomineeName = NomineeDeatils.Name;
    // var NomineeAge = NomineeDeatils.Age;
    // var NomineeRelation = NomineeDeatils.Relation;
    // var EmployeeService = EmployementDetails.EmployeeService;
    // var CompanyAddress = EmployementDetails.CompanyAddress;
    // var CompanyAddressPincode = EmployementDetails.Pincode;
    // var PlansAndTerms = PlansAndTermsDetails.PlansAndTerms;
    // var TotalBhema = PlansAndTermsDetails.TotalBhema;
    // var Mode = PlansAndTermsDetails.Mode;
    // var Premium = PlansAndTermsDetails.Premium;
    var data = new AddCustomerSchema({
        Fullname: req.body.FullName,
        "PresentAddressDetails.Address": req.body.PresentAddress,
        "PresentAddressDetails.Pincode": req.body.PresentAddressPincode,
        "PresentAddressDetails.Phone": req.body.PresentAddressPhone,
        PermantAddress: req.body.PermanentAddress,
        Dob: req.body.Dob,
        PresentAge: req.body.PresentAge,
        EducationQualification: req.body.EducationQualification,
        Occupation: req.body.Occupation,
        YearlyIncome: req.body.YearlyIncome,
        FathersName: req.body.FatherName,
        PlaceOfBirth: req.body.PlaceOfBirth,
        "HusbandDeatils.Name": req.body.HusbandName,
        "HusbandDeatils.Age": req.body.HusbandAge,
        "NomineeDeatils.Name": req.body.NomineeName,
        "NomineeDeatils.Age": req.body.NomineeAge,
        "NomineeDeatils.Relation": req.body.NomineeRelation,
        "EmployementDetails.EmployeeService": req.body.EmployeeService,
        "EmployementDetails.CompanyAddress": req.body.CompanyAddress,
        "EmployementDetails.Pincode": req.body.CompanyAddressPincode,
        "PlansAndTermsDetails.PlansAndTerms": req.body.PlansAndTerms,
        "PlansAndTermsDetails.TotalBhema": req.body.TotalBhema,
        "PlansAndTermsDetails.Mode": req.body.Mode,
        "PlansAndTermsDetails.Premium": req.body.Premium,
        "policyInformation.policyTaken": req.body.policyTaken,
        "policyInformation.policyExpiry": req.body.policyExpiry,
        CreatedBy: req.id

    });
    console.log("data:", data);
    data.save(function (err, result) {
        if (err) {
            res.status(400).send(err.message);
            console.log("bg", err.message);
        }
        if (result) {
            console.log("result:", result);
            res.status(200).send({ message: "Customer added sucessfully" })
        }
    })

}

//View Customer
function ViewCustomer(req, res) {
    AddCustomerSchema.findById(req.query.id, function (err, result) {
        if (err) {
            res.status(400).send({ messaage: "Something went Wrong or Data not found" });
            return;
        }
        if (result) {
            res.status(200).send(result);
            console.log("view:", result);
        }
    })
}

//delete cutomer
function deletecustomer(req, res) {
    console.log("delete", req.query, req.body);
    AddCustomerSchema.findByIdAndDelete(req.body.id, function (err, result) {
        if (err) {
            res.status(400).send({ messaage: "something went wrong" });
            return;
        }
        if (result) {
            res.status(200).send({ message: "deleted sucessfully" });
            console.log("delete", result.message);
        }

    })
}

//filter customer
function filterCustomer(req, res) {
    var from = req.query.from;
    var to = req.query.to;
    AddCustomerSchema.find({ $and:[{"policyInformation.policyTaken": { $gte: new Date(from) }},{"policyInformation.policyTaken": { $lte: new Date(to) }}] },function(err,result){
        if(err){
            console.log("err:",err);
            res.status(400).send({message:"Something went wrong"});
            return;
        }
        if(result){
            console.log("filter:",result)
            res.status(200).send(result);
        }
    })
    console.log(from, to)
}

//dashboard // query sort by next policy expire customer
function dashboard(req,res){
AddCustomerSchema.find({}).sort({"policyInformation.policyExpiry":1}).exec(function(err,result){
    if(err){
        res.status(400).send({message:"something went wrong"});
        return;
    }
    if(result){
        res.status(200).send(result);
        console.log("sort:",result);
    }
})
}
module.exports = {
    signupuser,
    hashPassword,
    login,
    verifyToken,
    Customers,
    AddCustomers,
    EditCustomer,
    UpdateCustomer,
    ViewCustomer,
    deletecustomer,
    filterCustomer,
    dashboard

}