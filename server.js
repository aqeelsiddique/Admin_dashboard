const app = require('./app');




const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
//////////////handling uncaught expection error\//
process.on("uncaughtExpection" , (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to uncaught expection`);
   process.exit(1)
})
//config
dotenv.config({path:"Dashboard/config/config.env"});
// Connecting to database
// port=6780
connectDatabase()
 app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
 })
//unhandled promise rejection
// Handling unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to unhandled promise rejection`);
   process.exit(1);
});