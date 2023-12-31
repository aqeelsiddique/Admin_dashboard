const express = require('express');
const app = express();
const port = process.env.PORT | 8000;
const hbs = require("hbs");
const path = require("path")
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const statuc_path = path.join(__dirname,"./src/public");
const template_path = path.join(__dirname,"./templates/views")
const partials_path = path.join(__dirname,"./templates/partials")
 
app.use(express.static(statuc_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);



require('./route/route')(app);



module.exports = app; 
