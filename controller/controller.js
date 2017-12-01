var mongoose = require('mongoose');
var User = mongoose.model('userData');
var answer = require('../main');
const jwt = require('jsonwebtoken');
var token = '';
exports.createUser = (req,res) => {
    var user = new User({
        email: req.body.email,
        name: req.body.name,
        created_at: new Date(),
        updated_at: ""
    });
    user.save((error, response) => {
        if (error) {
            answer.failed(req.url, req.method, 'CreateUser()', new Date(), error, this.token, res);
        }
        else {
            answer.success(req.url, req.method, 'CreateUser()', new Date(), response, this.token, res);
        }
    });
}   

exports.getUser = (req, res) => {
    var email = req.params.email;
    User.find({}, (error, response) => {
        if (response !== null) {
            answer.success(req.url, req.method, 'GetUser()', new Date(), response,this.token, res);
            }
        else {
            answer.failed(req.url, req.method, 'GetUser()', new Date(), error, this.token, res);
            }
        });
}

exports.getToken = (req, res) => {
    this.token = jwt.sign({
        message: 'Something that you want'
    }, 'ThisIsSomethingThatIMustHideFromOthers', {
            expiresIn: '30m'
        });
    answer.success(req.url, req.method, 'GetToken()', new Date(), this.token,this.token, res);
}

exports.verifyLogin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
        jwt.verify(req.headers.authorization.split(' ')[1], 'ThisIsSomethingThatIMustHideFromOthers', function (err, decoded) {
            if (err) { 
                answer.failed(req.url, req.method, 'VerifyToken()', new Date(), err, this.token, res);
            }
            req.decoded = decoded;
            next();
        });
    } else {
        answer.failed(req.url, req.method, 'VerifyToken()', new Date(), 'Unauthorized user', this.token, res);
    }
}
