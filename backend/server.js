require('dotenv').config();
const cors = require('cors');
const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
app.use(cors());

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

