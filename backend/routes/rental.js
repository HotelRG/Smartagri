// In your rental routes file

const express = require('express');

const {
    createrental,
    getallrental,
    getrental,
    deleterental,
    updaterental
} = require('../controllers/rentalcontroller');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getallrental);
router.get('/:id', getrental);
router.post('/', createrental); // Apply multer middleware here
router.delete('/:id', deleterental);
router.patch('/:id', updaterental);

module.exports = router;
