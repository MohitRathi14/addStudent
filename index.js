const express = require('express');
const user = require('./routes/user');
const path = require('path');
const connectDB = require('./connection.js');
const makeAdmin = require('./makeadmin');
const student = require('./routes/student');
const app = express();
app.use(express.urlencoded({ extended: true }));
connectDB();
makeAdmin();
app.use(user)
app.use(student);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.listen(3000, (err) => {
    if(err){
        console.error('Error starting server:', err);
    }
    else {
        console.log('Server is running on http://localhost:3000');
    }
});