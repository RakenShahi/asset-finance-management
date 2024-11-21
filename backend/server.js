require('dotenv').config();
const cors = require('cors');
const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
const allowedOrigins = [
    'http://ec2-3-107-212-234.ap-southeast-2.compute.amazonaws.com', // Front-end URL here EC2 Instance
    'http://localhost:3000' // optionally, if testing locally
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify allowed methods
    credentials: true, // if you are using cookies or sessions
  }));
// To parse JSON, Middleware
app.use(express.json());

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Mongo Database Connected !!!'))
.catch((err)=> console.error ('Error connecting to MongoDB::',err));

// Basic route to test the server
app.get('/', (req, res)=>{
    res.send ('Hello, World!aaaa');
})

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});

// Finance Application Route
const financeApplicationRoutes = require('./routes/financeApplicationRoutes');
app.use('/api/finance-applications',financeApplicationRoutes);

// User Route
const userRoutes = require('./routes/userRoutes');
app.use('/api/users',userRoutes);

