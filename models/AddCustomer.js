var mongoose = require("mongoose");

var schema = mongoose.Schema({
    Fullname: {
        type: String,
        required: [true, "fullname is required"]
    },
    PresentAddressDetails: {
        Address: {
            type: String,
            required: [true, "Address is required"]
        },
        Pincode: {
            type: Number,
            min: [100000, "invalid pincode in PresentAddress"],
            max: [999999, "invalid pincode in PresentAddress"],
            required: [true, "pincode is required"]
        },
        Phone: {
            type: Number,
            min: [6000000000, "invalid Phone in PresentAddress"],
            max: [9999999999, "invalid Phone in PresentAddress"],
            required: [true, "Phone is required"]
        }
    },
    PermantAddress: {
        type: String,
        required: [true, "Premant Address is Required"]
    },
    Dob: {
        type: Date,
        required: [true, "Date of Birth is Required"]
    },
    PresentAge: {
        type: Number,
        required: [true, "Present Age is Required"]
    },
    EducationQualification: {
        type: String,
        required: [true, "Education Qualification is required"]
    },
    Occupation: {
        type: String,
        required: [true, "Occupation is required"]
    },
    YearlyIncome: {
        type: Number,
        required: [true, "Yearly income is required"]
    },
    FathersName: {
        type: String,
        required: [true, "Father's Name is required"]
    },
    PlaceOfBirth: {
        type: String,
        required: [true, "Place Of Birth is required"]
    },
    HusbandDeatils: {
        Name: {
            type: String,
            required: [true, "Husband's Name income is required"]
        },
        Age: {
            type: Number,
            required: [true, "Husband's Age income is required"]
        },
    },
    NomineeDeatils: {
        Name: {
            type: String,
            required: [true, "Nominee Name is required"]
        },
        Age: {
            type: Number,
            required: [true, "Nominee Age  is required"]
        },
        Relation: {
            type: String,
            required: [true, "Relation is required"]
        },
    },
    EmployementDetails: {
        EmployeeService: {
            type: String,
            required: [true, "Employee Service is required"]
        },
        CompanyAddress: {
            type: String,
            required: [true, "Company Address is required"]
        },
        Pincode: {
            type: Number,
            min: [100000, "invalid pincode in Employement Details"],
            max: [999999, "invalid pincode in Employement Details"],
            required: [true, "pincode is required"]
        },
    },
    PlansAndTermsDetails: {
        PlansAndTerms: {
            type: String,
            required: [true, "Plans&Terms is required in PlansAndTermsDetails"]
        },
        TotalBhema: {
            type: String,
            required: [true, "TotalBhema is required in PlansAndTermsDetails"]
        },
        Mode: {
            type: String,
            required: [true, "Mode is required in PlansAndTermsDetails"]
        },
        Premium: {
            type: String,
            required: [true, "Premium is required in PlansAndTermsDetails"]
        },
        
    },  
    policyInformation:{
        policyTaken:{
            type:Date,
            required:[true,"Policy taken is required"]
        },
        policyExpiry:{
            type:Date,
            required:[true,"policy Expiry is required"]
        }
    },
    CreatedBy:{
        type:String,
        required: [true, "Created By is Rsequired"]
    }

})

var AddCustomerSchema = mongoose.model("customers", schema);
module.exports = {
    AddCustomerSchema
}