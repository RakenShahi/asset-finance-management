const mongoose = require ('mongoose');

const financeApplicationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    personalDetails:{
        name: {type: String, required:true},
        address: {type: String, required:true},
        phone: {type: String, required:true}
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