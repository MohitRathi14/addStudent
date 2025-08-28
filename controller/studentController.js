const student = require('../models/student');
const cloudinary = require('cloudinary').v2;
async function addStudent(req, res) {
    try {
        console.log(req.body);
        console.log(req.file);
        
        // res.redirect('/'); // Redirect to home or another page after adding student
        // res.send("Student added successfully"); // Placeholder response
        let result;
        if (req.file) {
            cloudinary.config({
            cloud_name : "da1p7hanx",
            api_key : "329818545746551",
            api_secret : "kSTAGeKMMBGIjaQZYNhp7Tgz0Iw",
            });
            result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            req.body.image = result.secure_url;
            
        }
        let studentData = new student(req.body);
        if (req.file) {
            studentData.studentImage = result.secure_url;
            
        }
        await studentData.save();
        console.log('student added');
        
        let students =await student.find({});

        res.render('studentList',{
            students:students
        }); // Render a page to confirm student addition
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function deleteStudent(req, res) {
    try {
        const studentId = req.params.id;
        await student.findByIdAndDelete(studentId);
        res.render('welcomeAdmin',{
            students: await student.find({})
        }); // Redirect to home or another page after deleting student
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).send("Internal Server Error");
    }   
}
async function editStudent(req, res) {
    try {
        const studentId = req.params.id;
        const studentData = await student.findById(studentId);
        if (!studentData) {
            return res.status(404).send("Student not found");
        }
        // Render a form pre-filled with student data for editing
        res.render('editStudent', { student: studentData });
    } catch (error) {
        console.error("Error fetching student for edit:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function updateStudent(req, res) {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;
        await student.findByIdAndUpdate(studentId, updatedData);
        res.render('welcomeAdmin',{ students: await student.find({}) }); // Redirect to home or another page after updating student
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    addStudent,
    deleteStudent,
    editStudent,
    updateStudent
};