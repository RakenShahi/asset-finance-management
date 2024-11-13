const mongoose = require ('mongoose');

const financeApplicationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', // Allows mongoDB, mongoose to understand that userId points to a specific user
        required: true,
    },
    income:{
        type: Number,
        required: true,
    },
    expenses:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    assets:{
        type: Number,
        required: true,
    },
    liabilities:{
        type: Number,
        required: true,
    },
});

const FinanceApplication = mongoose.model('financeApplication', financeApplicationSchema);
module.exports = FinanceApplication;