const student = require('../models/student');
async function addStudent(req, res) {
    try {
        console.log(req.body);
        let studentData = new student(req.body);
        await studentData.save();
        // res.redirect('/'); // Redirect to home or another page after adding student
        // res.send("Student added successfully"); // Placeholder response
        let students =await student.find({});

        res.render('studentList',{
            students:students
        }); // Render a page to confirm student addition
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    addStudent
};