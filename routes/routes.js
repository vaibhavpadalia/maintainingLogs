var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

router.route('/v1/getUser')
    .get(controller.verifyLogin,controller.getUser);

router.route('/v1/createUser')
    .post(controller.verifyLogin,controller.createUser);

router.route('/v1/getToken')
    .get(controller.getToken);

module.exports = router;