const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user);
    const isAdminRole = req.user.isAdmin ;
    if(!isAdminRole){
      return res.status(403).json( { message : "Access denied . User is not an Admin"});
    }
    //res.status(200).json({ msg : req.user.isAdmin });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;