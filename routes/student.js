const express = require('express');
const multer = require('multer');
const router = express.Router();
const uplaod = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10 *1024 *1024 },
})
const studentController = require('../controller/studentController');
router.post('/add/student',uplaod.single('studentImage'), (req, res) => {
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
