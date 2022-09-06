const jwt = require("jsonwebtoken");
var config = require("../config/development.json");

exports.generateToken = () => {
  // let token = jwt.sign({ access: 'access-' }, config.JWT_PRIVATE_KEY, { expiresIn: '2 days' });
  let token = jwt.sign({ access: 'access-' }, config.TOKEN_SECRET, {});
  return token;
}


