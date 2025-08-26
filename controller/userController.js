const User = require('../models/User');
const Student = require('../models/student');
const bcrypt = require('bcrypt');
async function addUser(req, res) {
    try {
        
        console.log(req.body);
        
        let user = new User(req.body);
        if (!user) {
            return res.status(400).send("Invalid user data");
        }
        user.userType = 'admin'; 
        let encryptedPassword = await bcrypt.hashSync(user.password, 10);
        user.password = encryptedPassword;
        await user.save();
        // let salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(user.password, salt);
        
        res.redirect('/'); 
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Internal Server Error");
    }
    
}
async function doLogin(req, res) {
    try {
        const { email, password } = req.body;
        const userPrsent = await User.findOne({ email });
        if (!userPrsent) {
            return res.status(400).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, userPrsent.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }
        let students = await Student.find({});
        // res.send("Login successful");
        res.render('welcomeAdmin',{
            students: students
        }); // Redirect to a welcome page after successful login
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    addUser,
    doLogin
};