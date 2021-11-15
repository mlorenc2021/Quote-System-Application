const express = require('express');
const router = express.Router();

// GET home page
// Homepage redirects to login page
router.get('/', (req,res) => {
    res.redirect('login');
});

module.exports = router;