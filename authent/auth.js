const connection = require("../modules/db_connection");
const jwt = require("jsonwebtoken");
const config = require('../config/development.json')


const { UserModel } = require("../models/user");
// exports.requireToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader;
//     if (token === null) {
//       res.sendStatus(401);
//       res.json({ msg: "token is not available" });
//     } // if there isn't any token
//     jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).res.json({ msg: "Jwt verification error" });
//       }
//       req.user = user;
//       next();
//     });
//   } catch (err) {
//     res.status(400).json({ message: err });
//     console.log(err);
//   }

  



// };

exports.requireToken = async (req, res, next) => {
  let { access_token } = req.headers;
  if (access_token) {
      // console.log("access_token : ",access_token);
      jwt.verify(access_token,config.TOKEN_SECRET, async function (err, decoded) {
          if (!err) {
              let user = await UserModel.findOne({accesstoken: access_token }).lean(true)
              if (!user) {
                  res.status(401).json({ status: 400, message: "Invalid access_token"});
                  return;
              }
              req.userData = user;
              next();
          } else {
              res.status(401).json({message: "Enter a valid access token"});
              return;
          }
      })
  } else {
      res.status(500).json({message: "access_token missing"});
  }
}
