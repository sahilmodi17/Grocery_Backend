const Admin = require("../models/Admin");
const User = require("../models/User");

const bcrypt = require("bcrypt");

const adminRegister = async (req, res) => {
  res.send("register called");
};

const adminLogin = async (req, res) => {
  res.send("login called");
};

const userLogin = async (req, res) => {
  res.json({ msg: "user login called" });
};

const userRegister = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, cnfPassword } =
    req.body;
  const tempData = { firstName, lastName, email, phoneNumber, password };

  try {
    if(cnfPassword){
        if (password === cnfPassword) {
            const dup_email = await User.findOne({ email: email });
            if (dup_email) {
              // console.log("here")
              console.log(dup_email.email)
              return res.status(409).json({ msg: "Duplicate email" });
            }
            const user = await User.create(tempData);
            const token = user.createToken();
      
            res.cookie("token", token, {
              httpOnly: true,
              expires: new Date(Date.now() + 600000),
            });
            return res.status(200).json({ msg: "data enterd", token });
          } else {
            return res.status(401).json({ msg: "Password does not match" });
          }
    }else{
        res.status(401).json({msg : "enter confirm password"})
    }
    
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log(error.errors);
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(500).json({
        error: message,
      });
    }
  }

  // res.json({msg : "user register called"});
};

module.exports = {
  adminRegister,
  adminLogin,
  userLogin,
  userRegister,
};
