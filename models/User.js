const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamps');
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type: String, enum: ['admin', 'student'], default: 'student'},
    CreatedAt: Date,
    UpdatedAt: Date
});
userSchema.plugin(timeStamp, {index: true});
const User = mongoose.model('User', userSchema);
module.exports = User;