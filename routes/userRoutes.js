const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkRole } = require('../middleware/roleMiddleware');

// Only admin should be allowed to view the users lists
router.get('/', checkRole(['admin']), userController.getAllUsers);
router.post('/', checkRole(['admin']), userController.createUser);
router.put('/:id', checkRole(['admin']), userController.updateUser);


module.exports = router;