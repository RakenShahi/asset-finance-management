const express = require ('express');
const router = express.Router();
const FinanceApplication = require('../models/FinanceApplication');

// Create a new Finance Application
router.post('/', async (req,res) =>{
    try{
        const newApplication = new FinanceApplication(req.body);
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

// Get all Finance Applications
router.get('/', async (req, res)=> {
    try{
        const applications = await FinanceApplication.find();
        res.json(applications);
    } catch (error){
        res.status(500).json({error:error.message});
    }
});

// Get Finance Applicaiton by ID
router.get('/:id', async (req,res) => {
    try{
        const application = await FinanceApplication.findById(req.params.id);
        if (!application) return res.status(404).json({message: 'Application not found'});
        res.json(application);
    } catch (error){
        res.status(500).json({
            error:error.message
        });
    }
});


// Update a Finance Application by ID
router.put('/:id', async (req,res) => {
    try{
        const updateApplication = await FinanceApplication.findByIdAndUpdate (
            req.params.id,
            req.body,
            {
                new : true
            }
        )
        if (!updateApplication) return res.status(400).json({message: 'Application not found'});
        res.json(updateApplication);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Delete a Finance Application by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedApplication = await FinanceApplication.findByIdAndDelete(req.params.id);
        if (!deletedApplication) return res.status(404).json({message: 'Applicaiton not Found'});
        res.json({message: 'Application Deleted'});
    } catch (error){
        res.status(500).json({error:error.message});
    }
});

 module.exports = router;