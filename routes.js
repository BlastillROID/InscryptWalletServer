const express = require('express');
const router = express.Router();

const userServices = require('./Services/User.service');

router.post('/login', (req, res) => {
    userServices.login(req, res);
});

router.post('/register', (req, res) => {
    userServices.register(req, res);
});

router.put('/modify_account', (req, res) => {

});

router.delete('/deactivate_account', (req, res) => {

});
module.exports = router;