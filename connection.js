const mongooese = require('mongoose');

async function connectDB() {
    try {
        await mongooese.connect('mongodb://127.0.0.1:27017/ejsStudentProject');
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

module.exports = connectDB;
