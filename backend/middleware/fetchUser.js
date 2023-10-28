const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next) => {
   const JWT_SECRET = "AbdulRehman$King";
   try {
      const authToken = req.header("auth-token");
      if(!authToken){
         return res.status(401).send({error: "Pls authenticate using a valid token"});
      }
      const data = await jwt.verify(authToken, JWT_SECRET);
      req.user = data.user
      next();
   } catch (error) {
      return res.status(401).send({error: "Pls authenticate using a valid token"});
   }
}

module.exports = fetchUser;