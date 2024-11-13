const express = require ('express');
const router = express.Router();
const FinanceApplication = require('../models/FinanceApplication');
const User = require('../models/User');
const auth = require ('../middleware/auth');

// Create a new Finance Application (Protected)
router.post('/createuserapplication', auth, async (req, res) => {
    console.log('Route of creating application of user')
    try {
      const { income, expenses, assets, liabilities } = req.body;
      console.log(income,expenses,assets,liabilities);
      const newApplication = new FinanceApplication({
        userId: req.user.userId,
        income,
        expenses,
        assets,
        liabilities,
      });
      const savedApplication = await newApplication.save();
      res.status(201).json(savedApplication);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get all Finance Applications for the logged-in User
router.get('/userapplications',auth, async (req,res) => {
    try{
        const applications = await FinanceApplication.find({userId:req.user.userId});
        res.json(applications);
    } catch (error){
        res.status(500).json({message: error.message});
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


// Update Finance Application for the logged-in User
router.put('/:id', auth, async (req, res) => {
    try {
      const applicationId = req.params.id;
      const { income, expenses, assets, liabilities } = req.body;
  
      // Check if the application exists and belongs to the logged-in user
      const updateApplication = await FinanceApplication.findOneAndUpdate(
        { _id: applicationId, userId: req.user.userId }, // Ensure the application belongs to the current user
        { income, expenses, assets, liabilities },
        { new: true } // Return the updated document
      );
  
      if (!updateApplication) {
        return res.status(400).json({ message: 'Application not found or does not belong to user' });
      }
  
      res.json(updateApplication);
    } catch (error) {
      console.error('Error in PUT /updateuserapplication:', error);
      res.status(500).json({ message: error.message });
    }
  });

// Delete a Finance Application by ID (Only for the logged-in User)
router.delete('/:id', auth, async (req, res) => {
    try {
        const applicationId = req.params.id;
        
        // Find and delete the application, ensuring it belongs to the logged-in user
        const deletedApplication = await FinanceApplication.findOneAndDelete({
            _id: applicationId,
            userId: req.user.userId, // Only delete if the user owns the application
        });

        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found or does not belong to the user' });
        }

        res.json({ message: 'Application Deleted' });
    } catch (error) {
        console.error('Error in DELETE /userapplication:', error);
        res.status(500).json({ message: error.message });
    }
});

 module.exports = router;