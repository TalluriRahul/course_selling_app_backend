const {User, Course}=require("../db/index")
const {jwt,jwtpassword}=require("../jwt"
)
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const adminMiddleware = require("../middleware/admin");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username=req.headers.username;
    const password=req.headers.password;

    await User.create({
        username:username,
        password:password
    })
    res.json({
        'msg':'User signed up successfully'
    })

});
router.post("/signin",async (req,res)=>{
    const username=req.headers.username;
    const password=req.headers.password;

    const userExist=await User.findOne({
        username:username
    })
    const token=jwt.sign({username:username,password:password},jwtpassword)
    if(userExist){
        res.json({
            token:token
        })
    }

})

router.get('/courses',userMiddleware, async (req, res) => {
    // Implement listing all courses logic
    res.json({
        course:await Course.find({})
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    await User.updateOne({username:username},{
        
            "$push":{
                purchasedCourses:courseId
            } //push here refers to the table linking we have done in the DB
            //the purchases courses property in the User table contain the object Id of Courses linking the Courses table. the push here pushed the purchases course id into the table.
        }
    )
    res.json({
        'msg':'Purchase Complete'
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username=req.headers.username;
    const user=await User.findOne({
        username:username
    });
    console.log(user.purchasedCourses);
    const coursespurchased=await Course.find({
        _id:{
            "$in":user.purchasedCourses

            //in here serves as the input to the filter, where we are bringing in other table property as the filtering reference... here the courses with id's in the purchasesCourses property in the User are only returned. 
        }
    
});
        res.json({
            coursespurchased:coursespurchased
        
        })
    
});

module.exports = router