const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
router.post('/add/student', (req, res) => {
    studentController.addStudent(req, res);
});
router.get('/delete/Student/:id', (req, res) => {
    studentController.deleteStudent(req, res);
});
router.get('/edit/Student/page/:id', (req, res) => {
    studentController.editStudent(req, res);
});
router.post('/edit/Student/:id', (req, res) => {
    studentController.updateStudent(req, res);
});
module.exports = router;
