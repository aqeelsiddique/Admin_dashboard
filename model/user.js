const mongoose = require('mongoose');


///schema represent documenet mtlb ju hum database data save krthy hae wu humy kis tara chaiyae hothy us liyae used krthy hae
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
   
    

            
})











const Admin = mongoose.model('endpointtest', adminSchema )
module.exports= Admin;