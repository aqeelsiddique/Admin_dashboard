const mongoose = require("mongoose");


const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/Dashboard';


// Add this line to set 'strictQuery' to false before connecting
// mongoose.set('strictQuery', false);
// Connect to MongoDB instance
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.log('MongoDB connection error: ' + err)); 