const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb+srv://tallurirahul787:qFHHX3rWDeRjz3hQ@cluster0.f84upct.mongodb.net/coursenew');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types. ObjectId,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price:Number,
    imageLink:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

// app.listen(3000,()=>{
//     console.log("Listening on port 3000");
// })

module.exports = {
    Admin,
    User,
    Course
}