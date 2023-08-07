const { adminreg, adminlogin } = require("../controller/admincontroller")
const { teacherreg, teacherlogin } = require("../controller/teachercontroller")
const { isAuthenticatedUser } = require("../middleware/auth")

const Admin = require("../model/adminmodel")
const endpointtesting = require('../model/user')
module.exports = function (app) {
///////////////////////////this route code sections is admin dashboard///////////
app.get(("/" ), isAuthenticatedUser, (req,res)=>{
    res.render("index")

})

app.get('/register', (req,res)=>{
    res.render("register")
})
app.post("/adminreg", adminreg)



app.get('/login',(req,res)=>{
    res.render("login")
})
app.post("/adminlogin", adminlogin)

app.get('/tables',(req,res)=>{
    res.render("tables")
})
app.get('/blank',(req,res)=>{
    res.render("blank")
})
app.get('/buttons',(req,res)=>{
    res.render("buttons")
})
app.get('/cards',(req,res)=>{
    res.render("cards")
})
app.get('/charts',(req,res)=>{
    res.render("charts")
})
app.get('/utilities-animation',(req,res)=>{
    res.render("utilities-animation")
})
app.get('/utilities-border',(req,res)=>{
    res.render("utilities-border")
})
app.get('/utilities-color',(req,res)=>{
    res.render("utilities-color")
})
app.get('/utilities-other',(reteq,res)=>{
    res.render("utilities-other")
})


///////////////////////////////////////////////teacher code section//////////////////

app.get('/teacherreg', (req, res) => {
    res.render("teacherregister")
})
app.post("/teacherreg", teacherreg)

app.get("/teacherlogin", (req, res) => {
    res.render("teacherlogin.hbs")
})
app.post("teacherlogin", teacherlogin)

  //////////////////testing code for endpoint ..............
  // Handling user signup
app.post("/test", async (req, res) => {
    const user = await new endpointtesting({
      username: req.body.username,
      password: req.body.password
    });
    
    return res.status(200).json(user);
  });
  




}
