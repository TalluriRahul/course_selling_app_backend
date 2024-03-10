// Middleware for handling auth
const {Admin}=require("../db/index")
const {jwt,jwtpassword}=require("../jwt.js")
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
   const token= req.headers.authorization;
   console.log(jwtpassword);
   const decoded=jwt.verify(token,jwtpassword);
   req.username=decoded.username;
   if(req.username){
    next();
   }
   else{
    res.json("User not authenticated");
   }
    
}

module.exports = adminMiddleware;