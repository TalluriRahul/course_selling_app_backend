const express= require("express");
const {jwt,jwtpassword}=require("../jwt.js")
const adminMiddleware = require("../middleware/admin");
const {Admin, Course}=require("../db");
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.headers.username;
    const password=req.headers.password;

    await Admin.create({
        username:username,
        password:password
    })
    res.json({
        'msg':'Admin signed up successfully'
    })

});
router.post("/signin",async (req,res)=>{
    const username=req.headers.username;
    const password=req.headers.password;

    const userExist=await Admin.findOne({
        username:username
    })
    const token=jwt.sign({username:username,password:password},jwtpassword)
    if(userExist){
        res.json({
            token:token
        })
    }

})

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;
    const newCourse=Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({
        message:'Course created successfully',
        courseId:newCourse._id

    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const username=req.headers.username;
    const password=req.headers.password;
    res.json({
        courses:await Course.findOne({})
    })

});
module.exports = router;