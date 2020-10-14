var mongoose = require("mongoose");
var schema = mongoose.Schema({
    name: { type: String, required: [true, "name is required"] },
    branch: { type: String, required: [true, "branch is required"] },
    email: { type: String, require: [true, "email is required"] },
    mobile: { type: Number, require: [true, "mobile is required"] },
    password: { type: String, require: [true, "password is required"] }
});
var signupSchema = mongoose.model("userdata", schema);
module.exports = { signupSchema }