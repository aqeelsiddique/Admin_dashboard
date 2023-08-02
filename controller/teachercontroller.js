const Admin = require("../model/adminmodel");
const bcrypt = require("bcryptjs");
const Teacher = require("../model/teachermodel");

const teacherreg = async (req, res) => {

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
    const userExist = await Teacher.findOne({ email: email });
    
    if (userExist) {

      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== repeatpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else { 
      const teacher = new Teacher({
        name,
        lastname,
        email,
        password,
        repeatpassword,
      });
      
      // Save the data to the database
      await teacher.save();
      // Redirect or respond with a success message
      res.redirect("/teacherreg");
      // res.status(201).json({ message: "User registered successfully" });  
      console.log("teacher", teacher);
    }
  } catch (err) {
    console.log(err);
  }

}


const teacherlogin = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {

      return res.status(400).send({ error: "invalid" });

    }
    const userlogin = await Teacher.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
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
  teacherreg,
  teacherlogin

}