//signup validations
function signupValidate(req, res, next) {
    var email = req.body.email;
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!email.match(emailRegex)) {
        res.status(400).send({ message: "Invalid Email" });
        return;
    }
    var mobile = req.body.mobile;
    var numberregex = /^[0-9]+$/;
    if (!mobile.match(numberregex)) {
        res.status(400).send({ message: "inavalid mobile" })
        return;
    }
    return next();
}

//login validations
function loginValidate(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password) {
        res.status(400).send({ message: "All are manidatory fields" });
        return;
    }
    return next();
}
module.exports = {
    signupValidate,
    loginValidate
}
