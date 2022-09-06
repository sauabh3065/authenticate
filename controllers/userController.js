const { UserModel } =require("../models/user");
var md5 = require("md5");
const commonFunction = require("../modules/commonFunctions");
//-----------------------------------------------------------------------SignUp//-----------------------------------------------------------------------------

exports.signup = async function (req, res) {
  try {
    console.log('hiiiiiii')
    let { name, email, password } = req.body;
    eamil = email.toLowerCase();
    let checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      throw new Error("User already registered!");
    }
    req.body.password = md5(password);
    let save_user = new UserModel(req.body);
    let newUser = await save_user.save();
    if (!newUser) {
      throw new Error("Unable to add details.");
    }
    res.status(200).json({ data : newUser});
  } catch (error) {
    res.status(403).json(error.message);
  }
};

// ****************************************************************LOGIN**************************************************************************************************************** //

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if(!password || password == ''){
      return res.status(403).json({
        message:'password is required'
      })
    }
    if(!email || email == ''){
      return res.status(403).json({
        message:'Emailid is required'
      })
    }
    let convertedpass = md5(password)
    let checkUser = await UserModel.findOne({email:email});
      if (checkUser) {
        if(checkUser.password != convertedpass){
         return res.status(403).json({
          message:'Password is Wrong'
         })
        }
        accesstoken = commonFunction.generateToken();
        checkUser = await UserModel.findOneAndUpdate(
          { _id: checkUser._id },
          { accesstoken: accesstoken },
          { new: true }
        );
        res
          .status(200)
          .json({ msg: "You Logged in succes fully", userDetails: checkUser });
      } else {
              res.status(400).json({
                msg:'user not found'
              })
      }
    
  } catch (err) {
    res.status(403).json({ message: err });
    console.log(err);
  }
};

//****************************************************************************UPDATEEEEE*****************************************************************************************************************************     */
exports.getUserById = async ( req ,res)=>{
        try {
          let user = req.userData;
          if(user){
           res
          .status(200)
          .json({ msg: "user Details", userDetails: user });
          }else{
            throw new Error("User not found");
          }
        }catch(err){
          res.status(400).json({ message: err });
          console.log(err);
        }
       


}



