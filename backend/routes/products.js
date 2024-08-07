// In your product routes file

const express = require('express');

const {
    createproduct,
    getallproduct,
    getproduct,
    deleteproduct,
    updateproduct
} = require('../controllers/productcontroller');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getallproduct);
router.get('/:id', getproduct);
router.post('/', createproduct); // Apply multer middleware here
router.delete('/:id', deleteproduct);
router.patch('/:id', updateproduct);

module.exports = router;
