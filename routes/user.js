const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');


router.get('/',  (req, res) => {
    res.render('home');
});
router.get('/user/signup', (req, res) => {
    res.render('signup');
});
router.post('/add/user', (req, res) => {
    userController.addUser(req, res);
});
router.post('/Login', (req, res) => {
    // Handle login logic here    
    userController.doLogin(req, res);
});
router.get('/student/add/page', (req, res) => {
    res.render('addStudent');
});
module.exports = router;