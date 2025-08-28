const User = require('./models/User');
const bcrypt = require('bcrypt');
async function makeAdmin() {
    try {
         let userExists = await User.findOne({ email: User.email });
        if (userExists) {
            console.log('Admin user already exists');
            return;
        }
        else {
            let user = new User();
            user.firstName = "Mohit";
            user.lastName = "Rathi";
            user.email = "mohit@gmail.com";
            user.password = await bcrypt.hashSync("Mohit@123", 10);
            user.userType = 'admin';


            console.log('Creating admin user');
            await user.save();
        }
        console.log('Admin user created');
    } catch (error) {
        console.error("Error creating admin user:", error);
        
    }
}
module.exports = makeAdmin;