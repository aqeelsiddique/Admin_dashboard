const Admin = require("../model/adminmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const SECRET_KEY = "apikeytoken"
const adminreg = async (req, res) => {
  try {

    var name = req.body.name;
    var lastname =req.body.lastname;
    var email = req.body.email;
    var password =req.body.password; 
    var repeatpassword =req.body.repeatpassword; 



    
    
    if (!name || !lastname || !email || !password || !repeatpassword) {
      return res.status(422).json({ error: "Please fill in all the fields properly" });
    }
    
    ////////////check if email already exists////////////
    const userExist = await Admin.findOne({ email: email });
    
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== repeatpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
  
      
      const admin = new Admin({
        name,
        lastname,
        email,
        password,
        repeatpassword,
      });

      /////////generate a token 
      const token = jwt.sign({email : admin.email, id: admin._id }, SECRET_KEY);

      
      // Save the data to the database
      await admin.save();
      console.log("token",token)


      
      // Redirect or respond with a success message
      res.redirect("/register");
      // res.status(201).json({ message: "User registered successfully" });
      
      console.log("admin", admin);
    }
  } catch (err) {
    console.log(err);
  }

}


const adminlogin = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {

      return res.status(400).send({ error: "invalid" });

    }
    const userlogin = await Admin.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      const token = jwt.sign({email : userlogin.email, id: userlogin._id }, SECRET_KEY);
      console.log("token", token);


      // const token = await userlogin.generateAuthToken();
      // console.log("token", token);
      // res.cookie("jwttoken", "Aqeel", {
      //   expires: new Date(Date.now() + 25892000000),
      //   httpOnly: true,
      // });
      ///create a cokki4res.cokkie
      if (!isMatch) {
        res.status(422).send({ message: "user error" });
      } else {
        res.redirect("/")
        // res.send({ meassage: " wellcome user  login sucessfully" });
      }
    } else {
      res.status(422).send({ message: "invalid" });
    }
  } catch (err) {
    console.log(err);
  }



}









module.exports = {
  adminreg,
  adminlogin

}