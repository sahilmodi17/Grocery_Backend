const Admin = require("../models/Admin");
const User = require("../models/User");

const bcrypt = require("bcrypt");

const adminRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    cnfPassword,
    image,
  } = req.body;
  const tempData = { firstName, lastName, email, phoneNumber, password, image };

  try {
    if (cnfPassword) {
      if (password === cnfPassword) {
        const dup_email = await Admin.findOne({ email: email });
        if (dup_email) {
          // console.log("here")
          console.log(dup_email.email);
          return res.status(409).json({ msg: "Duplicate email" });
        }
        const admin = await Admin.create(tempData);
        const token = admin.createToken();
        console.log("1");
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 600000),
        });
        return res.status(200).json({ msg: "data entered", token });
      } else {
        return res.status(401).json({ msg: "Password does not match" });
      }
    } else {
      res.status(401).json({ msg: "enter confirm password" });
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
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({ status: "email invalid" });
    }

    const dbPassword = admin.password;
    console.log(dbPassword);
    console.log(password);

    bcrypt.compare(password, dbPassword, (err, data) => {
      if (err) {
        return res.status(404).json({ status: "something went wrong" });
      }
      console.log(data);

      if (data) {
        const token = admin.createToken();
        console.log("login token : " + token);
        res.cookie("token", token, {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // ms
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ status: "login successful for user", token });
      } else {
        return res.status(404).json({ status: "invalid password" });
      }
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ status: "email invalid" });
    }

    const dbPassword = user.password;
    console.log(dbPassword);
    console.log(password);

    bcrypt.compare(password, dbPassword, (err, data) => {
      if (err) {
        return res.status(404).json({ status: "something went wrong" });
      }
      console.log(data);

      if (data) {
        const token = user.createToken();
        console.log("login token : " + token);
        res.cookie("token", token, {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // ms
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ status: "login successful for user", token });
      } else {
        return res.status(404).json({ status: "invalid password" });
      }
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const userRegister = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, cnfPassword } =
    req.body;
  const tempData = { firstName, lastName, email, phoneNumber, password };

  try {
    if (cnfPassword) {
      if (password === cnfPassword) {
        const dup_email = await User.findOne({ email: email });
        if (dup_email) {
          // console.log("here")
          console.log(dup_email.email);
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
    } else {
      res.status(401).json({ msg: "enter confirm password" });
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
