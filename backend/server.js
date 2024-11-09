require('dotenv').config();
const express = require ('express');
const mongoose = require ('mongoose');
const app = express();

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

// Import Models
const User = require('./models/User');
const FinanceApplication = require('./models/FinanceApplication');

// Testing route to add a user
app.get('/test-add-user', async (req,res) =>{
    try{
        const newUser = new User({
            name:'Raken Shahi',
            email:'rakenshahi+test@gmail.com',
            password:'raken',
        });
        await newUser.save();
        res.json({message:'User Created!!!', user:newUser});
    } catch (err){
        res.status(500).json({error:error.message});
    }
})

